import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import ServiceTabs from "@/components/ServiceTabs";
import { PageIntro, SectionHead } from "@/components/ui";
import { mainHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "IT Services",
  description:
    "Technology that delivers — data engineering & analytics, cloud & DevOps, web & mobile development, QA, UX and AI from ZenithWave Capital.",
};

const process = [
  ["Discover", "We understand your goals, users and constraints."],
  ["Design", "Architecture and UX planned around outcomes."],
  ["Build", "Agile delivery with CI/CD and continuous QA."],
  ["Scale", "Monitoring, optimisation and ongoing support."],
];

export default function ITServicesPage() {
  return (
    <PageTransition>
      <PageIntro
        kicker="/ ZenithWave Capital — IT services"
        meta="Data · Cloud · Web · QA · UX · AI"
        title={
          <>
            Technology
            <br />
            <em className="text-lime">that delivers.</em>
          </>
        }
        action={
          <a href={mainHref("/contact?topic=it")} className="btn-lime">
            Start a project →
          </a>
        }
      >
        Custom IT solutions that protect, scale and innovate —{" "}
        <span className="text-bone">deep technical expertise across web, mobile, cloud, data, UX and QA</span>, with a client-first approach.
      </PageIntro>

      <section id="services" className="wrap scroll-mt-24 pb-[100px]">
        <ServiceTabs />
      </section>

      <section id="process" className="scroll-mt-24 border-t border-line bg-ink-2">
        <div className="wrap py-[100px]">
          <SectionHead
            className="mb-14"
            title={
              <>
                From idea
                <br />
                <em className="text-muted">to impact.</em>
              </>
            }
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([t, b], i) => (
              <Reveal key={t} delay={i * 120} className="pr-7">
                <div className="grow-line h-[3px] bg-brass" style={{ opacity: 1 - i * 0.22 }} />
                <p className="label mt-6 text-lime">0{i + 1}</p>
                <h3 className="mt-2.5 font-serif text-[38px]">{t}</h3>
                <p className="mt-2.5 mb-8 text-[15px] leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
