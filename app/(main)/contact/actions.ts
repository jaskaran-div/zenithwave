"use server";

import nodemailer from "nodemailer";
import { getProgramme } from "@/lib/programmes";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<"firstName" | "lastName" | "email" | "phone" | "message", string>>;
  /** Submitted values, echoed back so fields survive React's post-action form reset. */
  values?: Partial<Record<"firstName" | "lastName" | "email" | "phone", string>>;
};

const TOPICS = ["Courses", "Funded Accounts", "IT Services", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string, max: number) {
  return String(formData.get(name) ?? "").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot — real users never fill this hidden field.
  if (field(formData, "company", 200)) {
    return { status: "success", message: "Thanks! Your message has been sent." };
  }

  const data = {
    firstName: field(formData, "firstName", 100),
    lastName: field(formData, "lastName", 100),
    email: field(formData, "email", 200),
    phone: field(formData, "phone", 40),
    message: field(formData, "message", 5000),
  };
  const rawTopic = field(formData, "topic", 60);
  const topic = TOPICS.includes(rawTopic) ? rawTopic : "Other";
  const programme = getProgramme(field(formData, "programme", 120));
  const selection = programme ? programme.title : "";
  const values = { firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone };

  const errors: ContactState["errors"] = {};
  if (!data.firstName) errors.firstName = "Please enter your first name.";
  if (!data.lastName) errors.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone && !/^[+\d\s()-]{6,}$/.test(data.phone)) errors.phone = "Please enter a valid phone number.";
  if (data.message.length < 10) errors.message = "Please enter a message (at least 10 characters).";
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_HOST / SMTP_USER / SMTP_PASS are not configured.");
    return {
      status: "error",
      message: `Sorry, we couldn't send your message right now. Please email us at ${site.emails.support}.`,
      values,
    };
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const fullName = `${data.firstName} ${data.lastName}`;
  const text = [
    `Name: ${fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Interested in: ${topic}`,
    ...(selection ? [`Selected: ${selection}`] : []),
    "",
    data.message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${SMTP_USER}>`,
      to: CONTACT_TO || site.emails.support,
      replyTo: { name: fullName, address: data.email },
      subject: `[${topic}]${selection ? ` ${selection} —` : ""} New enquiry from ${fullName}`,
      text,
      html: `<p><strong>Name:</strong> ${escapeHtml(fullName)}<br/><strong>Email:</strong> ${escapeHtml(data.email)}<br/><strong>Phone:</strong> ${escapeHtml(data.phone || "-")}<br/><strong>Interested in:</strong> ${escapeHtml(topic)}${selection ? `<br/><strong>Selected:</strong> ${escapeHtml(selection)}` : ""}</p><p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return {
      status: "error",
      message: `Sorry, we couldn't send your message right now. Please email us at ${site.emails.support}.`,
      values,
    };
  }

  return { status: "success", message: "Thanks! Your message has been sent. We'll get back to you soon." };
}
