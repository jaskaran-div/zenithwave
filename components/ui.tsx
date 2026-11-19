import type { ReactNode } from "react";
import Reveal from "./Reveal";

export function ArrowRight({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Mono meta bar + giant serif headline + side copy — the opening of every inner page. */
export function PageIntro({
  kicker,
  meta,
  title,
  children,
  action,
}: {
  kicker: string;
  meta: string;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="wrap pt-7">
      <div className="label flex flex-wrap justify-between gap-2 border-b border-line pb-3.5 text-muted">
        <span>{kicker}</span>
        <span>{meta}</span>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-10 pt-14 pb-20">
        <h1 className="display animate-rise flex-[2_1_600px] text-[clamp(3.4rem,9vw,8.75rem)]">{title}</h1>
        {(children || action) && (
          <div className="animate-rise min-w-0 flex-[1_1_320px]" style={{ ["--delay" as string]: "150ms" }}>
            {children && <p className="text-lg leading-relaxed text-muted">{children}</p>}
            {action && <div className="mt-7">{action}</div>}
          </div>
        )}
      </div>
    </section>
  );
}

/** Two-line serif section title with optional side copy. */
export function SectionHead({ title, side, className = "" }: { title: ReactNode; side?: ReactNode; className?: string }) {
  return (
    <Reveal className={`mb-12 flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <h2 className="h-section">{title}</h2>
      {side && <div className="max-w-[380px] text-[17px] leading-relaxed text-muted">{side}</div>}
    </Reveal>
  );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label text-lime ${className}`}>/ {children}</span>;
}

const tickerItems = [
  "Forex",
  "Indices",
  "Commodities",
  "Equities",
  "Options",
  "Crypto",
  "Derivatives",
  "Risk management",
  "Technical analysis",
  "Fundamental news trading",
];

export function Ticker() {
  const run = (
    <span className="pr-12">
      {tickerItems.map((t) => (
        <span key={t}>
          {t.toUpperCase()} <span className="text-lime">/</span>{" "}
        </span>
      ))}
    </span>
  );
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line whitespace-nowrap">
      <div className="animate-ticker label inline-flex py-[18px] text-sm text-muted hover:[animation-play-state:paused]">
        {run}
        {run}
      </div>
    </div>
  );
}
