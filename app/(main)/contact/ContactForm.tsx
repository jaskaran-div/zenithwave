"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react";
import { getProgramme, programmes } from "@/lib/programmes";
import { sendContactMessage, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

const topics = [
  { key: "courses", label: "Courses" },
  { key: "funded", label: "Funded Accounts" },
  { key: "it", label: "IT Services" },
  { key: "other", label: "Other" },
] as const;

const inputClass =
  "w-full rounded-[10px] border border-bone/[0.16] bg-ink px-4 text-base text-bone placeholder:text-dim outline-none transition focus:border-lime focus:ring-[3px] focus:ring-lime/20 aria-[invalid=true]:border-[#c2410c]";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2 block text-[11px] text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#c2410c]">
          {error}
        </p>
      )}
    </div>
  );
}

const draftFor = (programmeSlug: string) => {
  const prog = getProgramme(programmeSlug);
  if (prog)
    return prog.comingSoon
      ? `Hi, please notify me when enrolment opens for the ${prog.title}.`
      : `Hi, I’m interested in the ${prog.title}. Please share fees, start dates and how to enrol.`;
  return "";
};

export default function ContactForm() {
  const params = useSearchParams();
  const initialTopic = topics.find((t) => t.key === params.get("topic"))?.key;
  const initialProgramme = getProgramme(params.get("programme") ?? "")?.slug ?? "";

  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const [topic, setTopic] = useState<string>(initialTopic ?? (initialProgramme ? "courses" : "funded"));
  const [programmeSlug, setProgrammeSlug] = useState(initialProgramme);
  const [message, setMessage] = useState(() => draftFor(initialProgramme));
  const [edited, setEdited] = useState(false);
  const e = state.errors ?? {};

  const programme = topic === "courses" ? getProgramme(programmeSlug) : undefined;

  const redraft = (nextProg: string) => {
    if (!edited) setMessage(draftFor(nextProg));
  };
  const chooseProgramme = (slug: string) => {
    setProgrammeSlug(slug);
    redraft(slug);
  };
  const chooseTopic = (key: string) => {
    setTopic(key);
    if (key === "courses") redraft(programmeSlug);
    else if (!edited) setMessage("");
  };

  if (state.status === "success") {
    return (
      <div className="animate-rise px-8 py-[72px] text-center">
        <span className="inline-flex h-[72px] w-[72px] items-center justify-center rounded-full bg-lime text-on-lime">
          <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5 10 17 19 7" />
          </svg>
        </span>
        <h2 className="mt-7 font-serif text-5xl">Message sent.</h2>
        <p role="status" className="mx-auto mt-3 max-w-[420px] text-[17px] leading-relaxed text-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6 px-7 py-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="topic" value={topics.find((t) => t.key === topic)?.label ?? "Other"} />
      <input type="hidden" name="programme" value={programme?.slug ?? ""} />

      <fieldset>
        <legend className="label mb-3 text-[11px] text-muted">I’m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={t.key === topic}
              onClick={() => chooseTopic(t.key)}
              className={`min-h-11 rounded-full border px-[18px] text-sm transition-all duration-300 ${
                t.key === topic ? "border-lime bg-lime font-semibold text-on-lime" : "border-bone/20 text-bone hover:border-bone/45"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── Selected programme ── */}
      {topic === "courses" && (
        <div className="animate-rise overflow-hidden rounded-[14px] border border-lime/40 bg-lime/[0.05]">
          <div className="flex flex-col gap-2 border-b border-lime/20 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="programme-select" className="label text-[11px] text-lime">
              {programme ? "Selected programme" : "Choose a programme (optional)"}
            </label>
            <select
              id="programme-select"
              value={programmeSlug}
              onChange={(ev) => chooseProgramme(ev.target.value)}
              className="min-h-10 max-w-full rounded-lg border border-bone/20 bg-ink px-3 text-sm text-bone outline-none focus:border-lime sm:max-w-[340px]"
            >
              <option value="">No programme selected</option>
              {programmes.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          {programme && (
            <div key={programme.slug} className="animate-rise flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className="font-serif text-[26px] leading-tight">{programme.title}</p>
                <p className="label mt-1.5 text-[10px] text-muted">
                  {programme.duration} · {programme.price ?? (programme.comingSoon ? "Coming soon" : "Price on request")}
                </p>
              </div>
              <Link href={`/courses/${programme.slug}`} className="label shrink-0 text-lime hover:underline">
                View details ↗
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="firstName" label="First name *" error={e.firstName}>
          <input id="firstName" name="firstName" defaultValue={state.values?.firstName} required autoComplete="given-name" placeholder="Jane" className={`${inputClass} min-h-[52px]`} aria-invalid={!!e.firstName} aria-describedby={e.firstName ? "firstName-error" : undefined} />
        </Field>
        <Field id="lastName" label="Last name *" error={e.lastName}>
          <input id="lastName" name="lastName" defaultValue={state.values?.lastName} required autoComplete="family-name" placeholder="Smith" className={`${inputClass} min-h-[52px]`} aria-invalid={!!e.lastName} aria-describedby={e.lastName ? "lastName-error" : undefined} />
        </Field>
        <Field id="email" label="Email *" error={e.email}>
          <input id="email" name="email" defaultValue={state.values?.email} type="email" required autoComplete="email" placeholder="jane@example.com" className={`${inputClass} min-h-[52px]`} aria-invalid={!!e.email} aria-describedby={e.email ? "email-error" : undefined} />
        </Field>
        <Field id="phone" label="Phone (optional)" error={e.phone}>
          <input id="phone" name="phone" defaultValue={state.values?.phone} type="tel" autoComplete="tel" placeholder="+44 …" className={`${inputClass} min-h-[52px]`} aria-invalid={!!e.phone} aria-describedby={e.phone ? "phone-error" : undefined} />
        </Field>
      </div>

      <Field id="message" label="Message *" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={message}
          onChange={(ev) => {
            setMessage(ev.target.value);
            setEdited(true);
          }}
          placeholder="Tell us how we can help…"
          className={`${inputClass} resize-y py-3.5 leading-normal`}
          aria-invalid={!!e.message}
          aria-describedby={e.message ? "message-error" : undefined}
        />
      </Field>

      {state.status === "error" && (
        <p role="alert" className="animate-rise rounded-[10px] border border-[#c2410c]/40 bg-[#c2410c]/10 px-4 py-3 text-sm text-[#9a3412]">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-[380px] text-[13px] leading-relaxed text-muted">
          By submitting you agree to our{" "}
          <Link href="/legal/terms-and-conditions" className="text-bone underline-offset-4 hover:underline">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy-policy" className="text-bone underline-offset-4 hover:underline">
            privacy policy
          </Link>
          .
        </p>
        <button type="submit" disabled={pending} className="btn-lime disabled:cursor-not-allowed disabled:opacity-60">
          {pending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-on-lime/30 border-t-on-lime" /> Sending…
            </>
          ) : (
            "Send message →"
          )}
        </button>
      </div>
    </form>
  );
}
