import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/Hero";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { SectionHead } from "@/components/ui";
import { site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "ZenithWave Capital makes professional-grade trading education and opportunity accessible. Meet the team behind the UK-registered firm in Croydon.",
};

const values = [
  ["I.", "Clarity of purpose", "We align vision with disciplined execution — so traders operate with conviction."],
  ["II.", "Risk mastery", "Capital protection is sacred. We train traders to manage risk like elite institutions."],
  ["III.", "Data-driven thinking", "Every move is backed by logic, structure and precision — not emotion."],
  ["IV.", "Lifelong learning", "Markets evolve — so must we. Continuous growth is a core principle."],
  ["V.", "Empowered community", "We rise together. Our learners support, inspire and elevate one another."],
  ["VI.", "Integrity in action", "We lead with transparency, ethics and accountability — always."],
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("");

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        kicker="About ZenithWave"
        meta={`Incorporated 14 Feb 2025 · No. ${site.companyNumber}`}
        title={
          <>
            Professional trading,
            <br />
            <em className="text-lime">made accessible.</em>
          </>
        }
      />
      <section className="wrap">
        <div className="flex flex-wrap gap-12 border-y border-line pt-14 pb-[100px]">
          <Reveal as="p" className="min-w-0 flex-[1.4_1_480px] font-serif text-[clamp(26px,2.4vw,36px)] leading-[1.25]">
            We believe anyone willing to commit can build the skills to succeed — given the right training, mentorship and support.{" "}
            <span className="text-muted">So we built a structured system that connects learning with live trading.</span>
          </Reveal>
          <Reveal delay={120} className="grid min-w-0 flex-[1_1_320px] grid-cols-2 border-t border-bone/[0.14]">
            {[
              ["2025", "Founded in the UK"],
              ["CISI", "Aligned curriculum"],
              ["$500K", "Max funded account"],
              ["3", "Desks"],
            ].map(([v, k], i) => (
              <div key={k} className={`py-5 ${i < 2 ? "border-b border-bone/[0.14]" : ""} ${i % 2 ? "border-l border-bone/[0.14] pl-4" : "pr-4"}`}>
                <p className="font-serif text-[44px] leading-none">{v}</p>
                <p className="label mt-1.5 text-[11px] text-muted">{k}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="wrap py-[100px]">
        <SectionHead
          title={
            <>
              What we
              <br />
              <em className="text-muted">stand for.</em>
            </>
          }
        />
        <div className="grid border-t border-l border-bone/[0.14] md:grid-cols-2 lg:grid-cols-3">
          {values.map(([n, t, b], i) => (
            <Reveal key={t} delay={(i % 3) * 90} className="border-r border-b border-bone/[0.14] p-9">
              <p className="label text-lime">{n}</p>
              <h3 className="mt-4 font-serif text-[34px]">{t}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-line bg-ink-2">
        <div className="wrap py-[100px]">
          <SectionHead
            title={
              <>
                The people
                <br />
                <em className="text-lime">behind it.</em>
              </>
            }
            side="Practitioners in trading, operations and business development, based in Croydon, London."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <article className="card card-hover group h-full overflow-hidden">
                  <div className="relative aspect-[4/4.6] overflow-hidden bg-panel-2">
                    {"image" in m && m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center font-serif text-8xl text-bone/25 transition duration-700 group-hover:scale-110 group-hover:text-lime/60">
                        {initials(m.name)}
                      </span>
                    )}
                  </div>
                  <div className="p-[22px]">
                    <p className="label text-[11px] text-lime">{m.role}</p>
                    <h3 className="mt-2 font-serif text-[32px]">{m.name}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{m.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
}
