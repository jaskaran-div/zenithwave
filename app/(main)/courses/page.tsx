import type { Metadata } from "next";
import Link from "next/link";
import CourseCatalogue from "@/components/CourseCatalogue";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { PageIntro, SectionHead } from "@/components/ui";
import { programmeHref } from "@/lib/plans";
import { getProgramme, programmes } from "@/lib/programmes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Courses & Programmes",
  description:
    "CISI-aligned courses, OCN London quality-assured ISFT Series certificates, the ACFT, London immersion and trading residency, ISFT Awards and financial literacy programmes.",
};

const formats = [
  ["Live", "Live sessions", "Weekly sessions with trainers and practitioners."],
  ["Coaching", "Mentoring", "1-to-1 feedback on plans, trades and projects."],
  ["Practice", "Demo & simulation", "Practise with demo accounts and live-priced simulations."],
  ["Assessment", "Recognised results", "Quizzes, projects and certificates that show your progress."],
];

export default function CoursesPage() {
  const pro = getProgramme("professional-programme")!;
  return (
    <PageTransition>
      <PageIntro
        kicker="/ 01 — Education"
        meta={`${programmes.length} programmes · ages 9 to professional`}
        title={
          <>
            Master the
            <br />
            <em className="text-lime">markets.</em>
          </>
        }
        action={
          <a href={site.links.learningPlatform} className="btn-lime">
            Open learning platform ↗
          </a>
        }
      >
        From financial literacy for young learners to OCN London quality-assured ISFT certificates, the ACFT and live trading
        residencies — <span className="text-bone">find the programme that fits where you are.</span>
      </PageIntro>

      <section className="wrap pb-[100px]">
        <CourseCatalogue />
      </section>

      {/* Professional programme */}
      <section id="professional-programme" className="wrap scroll-mt-24 pb-[100px]">
        <Reveal variant="zoom">
          <div className="flex flex-wrap overflow-hidden rounded-3xl bg-lime text-on-lime">
            <div className="min-w-0 flex-[1.2_1_480px] px-[clamp(24px,4vw,64px)] py-14">
              <span className="label">/ Flagship programme</span>
              <h2 className="display mt-4 text-[clamp(48px,6vw,96px)] !leading-[0.92]">
                Professional
                <br />
                <em>Programme.</em>
              </h2>
              <p className="mt-6 max-w-[520px] text-lg leading-[1.55] text-on-lime/85">{pro.summary}</p>
              <div className="mt-8 flex items-baseline gap-3.5">
                <span className="font-serif text-[88px] leading-[0.9]">{pro.price}</span>
                <span className="text-xl text-on-lime/65 line-through">{pro.wasPrice}</span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={programmeHref(pro.slug)} className="btn-ink">
                  Apply now →
                </Link>
                <Link href={`/courses/${pro.slug}`} className="btn border border-on-lime/30 font-medium text-on-lime hover:bg-on-lime/10">
                  View details
                </Link>
              </div>
            </div>
            <ol className="min-w-0 flex-[1_1_380px] bg-ink text-bone">
              {pro.included!.concat(["CISI Level 4 preparation", "Six in-depth trading modules"]).map((h, i, a) => (
                <li key={h} className={`flex gap-5 px-8 py-[26px] ${i < a.length - 1 ? "border-b border-line" : ""}`}>
                  <span className="label text-lime">0{i + 1}</span>
                  <span className="text-[17px]">{h}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-[100px]">
          <SectionHead
            title={
              <>
                How you
                <br />
                <em className="text-muted">learn.</em>
              </>
            }
          />
          <div className="grid border-t border-bone/[0.14] sm:grid-cols-2 lg:grid-cols-4">
            {formats.map(([k, t, b], i) => (
              <Reveal key={t} delay={i * 90} className={`pt-7 pr-6 pb-4 ${i ? "lg:border-l lg:border-bone/[0.14] lg:pl-6" : ""}`}>
                <p className="label text-lime">{k}</p>
                <h3 className="mt-3 text-[22px] font-semibold">{t}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
