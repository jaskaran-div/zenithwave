import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import WaveField from "@/components/WaveField";

// Hero design from the ZenithWave brand site: condensed bold headline whose
// words rise out of a mask one after another, a quiet sub-block, and (on the
// big heroes) the animated wave field. IT Services and Contact keep their
// original heroes.

/** Wraps every word in a rising mask, keeping <em>/<br> structure. */
function maskWords(node: ReactNode, counter: { i: number }): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string") {
      const parts = child.split(/(\s+)/);
      return parts.map((part, k) => {
        if (!part) return null;
        if (/^\s+$/.test(part)) return " ";
        const i = counter.i++;
        return (
          <span key={`${i}-${k}`} className="mask">
            <span style={{ ["--i" as string]: i }}>{part}</span>
          </span>
        );
      });
    }
    if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      if (el.props.children == null) return child;
      return cloneElement(el, {}, maskWords(el.props.children, counter));
    }
    return child;
  });
}

export function MaskTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h1 className={`hero-display ${className}`}>{maskWords(children, { i: 0 })}</h1>;
}

/** Small label line above the headline, with an optional brass tag. */
function Crumb({ kicker, meta }: { kicker?: ReactNode; meta?: ReactNode }) {
  if (!kicker && !meta) return null;
  return (
    <p className="hero-crumb hero-fade" style={{ ["--delay" as string]: "0ms" }}>
      {kicker && <span>{kicker}</span>}
      {meta && <span className="hero-tag">{meta}</span>}
    </p>
  );
}

/** Full-height hero with the wave field — home page and the Funded Accounts site. */
export function WaveHero({
  kicker,
  meta,
  title,
  children,
  short = false,
  titleClassName = "text-[clamp(2.8rem,7vw,6.6rem)] max-w-[17ch]",
}: {
  kicker?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
  /** Sub-block: copy, route list, actions. */
  children?: ReactNode;
  /** Slightly shorter hero (inner pages). */
  short?: boolean;
  titleClassName?: string;
}) {
  return (
    <section className={`relative grid grid-rows-[auto_1fr] overflow-hidden ${short ? "min-h-[80svh]" : "min-h-[92svh] sm:min-h-[calc(100svh-76px)]"}`}>
      <div className="wrap pointer-events-none relative z-[2] pt-[clamp(36px,8vh,96px)] [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <Crumb kicker={kicker} meta={meta} />
        <MaskTitle className={titleClassName}>{title}</MaskTitle>
        {children && (
          <div className="hero-fade relative z-[3] mt-7 max-w-[46ch] sm:mr-[6%] sm:ml-auto">{children}</div>
        )}
      </div>
      <WaveField className="absolute inset-[40%_0_0_0] z-[1] sm:inset-[30%_0_0_0]" />
    </section>
  );
}

/** Inner-page hero — the same wave hero as the home page, slightly shorter. */
export function PageHero({
  kicker,
  meta,
  title,
  children,
  action,
  titleClassName = "text-[clamp(3rem,8.4vw,8.2rem)] max-w-[14ch]",
}: {
  kicker?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
  /** Intro paragraph. */
  children?: ReactNode;
  action?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <WaveHero short kicker={kicker} meta={meta} title={title} titleClassName={titleClassName}>
      {(children || action) && (
        <>
          {children && <p className="text-[1.12rem] leading-relaxed text-muted">{children}</p>}
          {action && <div className="mt-[30px] flex flex-wrap items-center gap-4">{action}</div>}
        </>
      )}
    </WaveHero>
  );
}
