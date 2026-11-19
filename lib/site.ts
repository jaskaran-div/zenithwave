// ─────────────────────────────────────────────────────────────────────────────
// ZenithWave Capital — single source of truth for site content.
// Gathered (Nov 2026) from Companies House + the publicly indexed pages of
// zenithwavecapital.com (home, about-us, courses, professional-programme,
// funded-accounts, prop-firm-account, for-institutions, it-consulting-services,
// contact-us).
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "ZenithWave Capital",
  legalName: "ZenithWave Capital Limited",
  companyNumber: "16252585",
  incorporated: "14 February 2025",
  url: "https://zenithwavecapital.com",
  tagline: "Financial & trading education, funded accounts and advanced IT services.",
  description:
    "ZenithWave Capital is a UK-registered provider of CISI-aligned trading education, funded trading accounts and advanced IT services.",
  copyrightYear: 2026,
  address: {
    lines: ["Office 3A:1, Rathbone House", "Dexter House, 24–28 Tanfield Road", "Croydon, CR0 1BT", "United Kingdom"],
    short: "Croydon, London, UK",
  },
  phones: {
    general: { label: "+44 7990 064079", href: "tel:+447990064079" },
    business: { label: "+44 7391 354212", href: "tel:+447391354212" },
  },
  emails: {
    support: "support@zenithwavecapital.com",
    compliance: "compliance@zenithwavecapital.com",
    partnerships: "peter@zenithwavecapital.com",
  },
  links: {
    learningPlatform: "https://learn.zenithwavecapital.com/",
    trustpilot: "https://uk.trustpilot.com/review/zenithwavecapital.com",
  },
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0507741272465!2d-0.10685439999999999!3d51.3673694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876070739bcd91f%3A0xa6d5b54c0944500a!2sZenithWave%20Capital!5e0!3m2!1sen!2suk!4v1717510400000!5m2!1sen!2suk",
} as const;

// ── Sites ────────────────────────────────────────────────────────────────────
// The main site, Funded Accounts and IT Services are served from one Next.js
// app; proxy.ts routes each subdomain to its own section. Override any URL with
// the env vars below (see .env.example). In dev, *.localhost subdomains resolve
// to your machine in Chrome, Edge and Firefox.
const dev = process.env.NODE_ENV !== "production";
export const siteUrls = {
  main: process.env.NEXT_PUBLIC_MAIN_URL ?? (dev ? "http://localhost:3000" : "https://zenithwavecapital.com"),
  funded: process.env.NEXT_PUBLIC_FUNDED_URL ?? (dev ? "http://funded.localhost:3000" : "https://funded.zenithwavecapital.com"),
  it: process.env.NEXT_PUBLIC_IT_URL ?? (dev ? "http://it.localhost:3000" : "https://it.zenithwavecapital.com"),
};

/** Absolute link to a page on the main site (for use on the subdomain sites). */
export const mainHref = (path: string) => `${siteUrls.main}${path}`;

// ── Sign in / Sign up ────────────────────────────────────────────────────────
// TODO: replace "#" with your account-portal links. Used in every navbar.
export const authLinks = {
  signIn: "#",
  signUp: "#",
};

type NavLink = { href: string; label: string; external?: boolean };

/** Main-site navbar. External links open the subdomain sites in a new tab. */
export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: siteUrls.funded, label: "Funded Accounts", external: true },
  { href: siteUrls.it, label: "IT Services", external: true },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Courses & programmes live in lib/programmes.ts
// Funding models, prices and rules live in lib/plans.ts

export const fundedFaqs = [
  {
    q: "Which funding models can I choose?",
    a: "Six: One, Two and Three Step Assessments, One and Two Step Crypto Assessments, and Instant Funding. Assessments ask you to hit a profit target in each phase within the drawdown limits; Instant Funding gives you a funded account straight away.",
  },
  {
    q: "What profit split do I receive?",
    a: "75% on One, Two and Three Step accounts, 80% on Instant Funding and 90% on crypto accounts. The 90/10 Profit Share add-on raises a forex account to 90%.",
  },
  {
    q: "How often are payouts?",
    a: "Funded accounts are paid on a 30-day cycle as standard. The Rapid Payout add-on moves you to bi-weekly, weekly or daily payouts.",
  },
  {
    q: "Which platforms can I trade on?",
    a: "DXtrade, MTR, cTrader and PropX. Crypto assessments run on DXtrade and PropX.",
  },
  {
    q: "Who provides the funding assessments?",
    a: "All funding assessments are provided by Prop Account, LLC, and all assessment fees are paid to Prop Account, LLC. ZenithWave Capital Limited is an affiliate of Prop Account, LLC.",
  },
];

// ── IT services ──────────────────────────────────────────────────────────────
export const itServices = [
  {
    title: "Data Engineering & Analytics",
    body: "Scalable ETL pipelines, data lake and warehouse implementation, real-time dashboards and predictive & prescriptive analytics.",
    icon: "data",
  },
  {
    title: "Cloud & DevOps",
    body: "Infrastructure as code, CI/CD pipelines and cloud architecture that keeps your systems fast, secure and always on.",
    icon: "cloud",
  },
  {
    title: "Web & Mobile Development",
    body: "High-performance websites, web apps and mobile apps built with modern frameworks and a client-first approach.",
    icon: "code",
  },
  {
    title: "Quality Engineering & Testing",
    body: "Automated and manual QA, test strategy and quality engineering to ship reliable software with confidence.",
    icon: "check",
  },
  {
    title: "UX & Product Design",
    body: "Research-driven UX and interface design that turns complex workflows into intuitive experiences.",
    icon: "design",
  },
  {
    title: "AI & Automation",
    body: "AI-integrated solutions and intelligent automation that turn your data into decisions and save hours every week.",
    icon: "ai",
  },
] as const;

// ── Company ──────────────────────────────────────────────────────────────────
export const team = [
  {
    name: "Major Singh",
    role: "Managing Director",
    bio: "Oversees company strategy, culture and long-term vision, bringing a background in accountancy, entrepreneurship and operations.",
    image: "/images/team/Major-Singh-Profile.png",
  },
  {
    name: "Neil Crammond",
    role: "Trading Strategy & Mentorship",
    bio: "Leads trading strategy, risk management and direct mentorship, drawing on experience in floor trading and market commentary.",
  },
  {
    name: "Peter Antal",
    role: "Head of Business Development",
    bio: "Drives partnerships and commercial direction, working with institutions and partners across the UK.",
  },
  {
    name: "Ratender Dhull",
    role: "Head of Operations",
    bio: "Runs day-to-day operations, ensuring every learner and partner receives a seamless experience.",
  },
];

export const disclaimer =
  "ZenithWave Capital Limited provides educational content and services. Nothing on this website constitutes investment advice. Trading financial instruments involves substantial risk and may not be suitable for everyone; past performance is not indicative of future results. ZenithWave Capital Limited is an affiliate of Prop Account, LLC. All funding assessments are provided by Prop Account, LLC and all assessment fees are paid to Prop Account, LLC. CISI is an independent professional body; references to CISI-aligned programmes do not imply endorsement.";
