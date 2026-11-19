import Link from "next/link";
import Accordion from "@/components/Accordion";
import PageTransition from "@/components/PageTransition";
import { WaveHero } from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { ArrowRight, ArrowUpRight, Kicker, SectionHead, Ticker } from "@/components/ui";
import { fromPrice, fundingModels, maxBalance, programmeHref, usd } from "@/lib/plans";
import { getProgramme, programmes } from "@/lib/programmes";
import { fundedFaqs, siteUrls } from "@/lib/site";

/** Subdomain sites open in a new tab. */
const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

const catalogue = programmes.filter((p) => p.featured);
const pro = getProgramme("professional-programme")!;

const desks = [
  {
    href: "/courses",
    title: "Education",
    body: "CISI-aligned courses from Level 3 foundations to Level 4 professional preparation, with live webinars and 1-to-1 mentoring.",
    tag: "From £1,800",
  },
  {
    href: siteUrls.funded,
    external: true,
    title: "Funded Accounts",
    body: `Six funding models — one, two or three-step assessments, crypto, or Instant Funding — on accounts up to ${usd(maxBalance)}.`,
    tag: `From ${usd(fromPrice)}`,
  },
  {
    href: siteUrls.it,
    external: true,
    title: "IT Services",
    body: "Data engineering, cloud & DevOps, web & mobile, QA, UX and AI — technology that delivers.",
    tag: "Custom build",
  },
];

const steps = [
  { title: "Learn", body: "Build your foundation with CISI-aligned courses, e-books and live sessions." },
  { title: "Evaluate", body: "Pass a one, two or three-step assessment within the drawdown limits — or skip it with Instant Funding." },
  { title: "Get funded", body: "Trade on DXtrade, MTR, cTrader or PropX and keep 75–90% of your profits." },
  { title: "Scale", body: "Size up to $500,000, with payouts every 30 days — or faster with Rapid Payout." },
];

const homeFaqs = [
  fundedFaqs[0],
  fundedFaqs[1],
  fundedFaqs[2],
  {
    q: "Do I need experience to start a course?",
    a: "No. Level 3 courses are entry level and assume no prior experience. Level 4 programmes take you to a professional standard.",
  },
  fundedFaqs[4],
];

export default function Home() {
  return (
    <PageTransition>
      {/* ═══ HERO ═══ */}
      <WaveHero
        title={
          <>
            Learn the craft.
            <br />
            <em className="text-lime">Trade the capital.</em>
          </>
        }
      >
        <p className="text-[1.12rem] leading-[1.55] text-muted">
          <span className="text-bone">CISI-aligned trading education, funded trading accounts and advanced IT services</span> — one UK
          platform to take you from your first trade to trading with capital.
        </p>
        <ol className="flow mt-6" aria-label="At a glance">
          <li>$500K max account</li>
          <li>90% top split</li>
          <li>6 funding models</li>
        </ol>
        <div className="mt-[30px] flex flex-wrap items-center gap-4">
          <a href={siteUrls.funded} {...newTab} className="btn-ref">
            Get funded <ArrowUpRight />
          </a>
          <Link href="/courses" className="btn-ref btn-ref-ghost">
            Explore courses
          </Link>
        </div>
      </WaveHero>

      <div className="mt-[72px]">
        <Ticker />
      </div>

      {/* ═══ FOUR DESKS ═══ */}
      <section className="wrap pt-[120px] pb-10">
        <SectionHead
          title={
            <>
              One firm.
              <br />
              <em className="text-muted">Three desks.</em>
            </>
          }
          side="Whether you’re starting out, seeking capital or building technology — there’s a desk for you."
        />
        <div className="border-t border-bone/[0.14]">
          {desks.map((d, i) => (
            <Reveal key={d.href} delay={i * 80}>
              <DeskLink
                href={d.href}
                external={"external" in d}
                className="row-hover flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-bone/[0.14] px-2 py-8"
              >
                <span className="label w-12 text-muted">0{i + 1}</span>
                <span className="flex-[1_1_280px] font-serif text-[clamp(34px,3.6vw,52px)] leading-none">{d.title}</span>
                <span className="flex-[2_1_320px] leading-relaxed text-muted">{d.body}</span>
                <span className="label text-lime">{d.tag}</span>
                <span className="arrow-dot">{"external" in d ? <ArrowUpRight /> : <ArrowRight />}</span>
              </DeskLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ FUNDING MODELS ═══ */}
      <section className="wrap py-[100px]">
        <SectionHead
          title={
            <>
              Choose your
              <br />
              <em>capital.</em>
            </>
          }
          side={
            <a href={siteUrls.funded} {...newTab} className="btn-lime">
              Build your challenge <ArrowUpRight />
            </a>
          }
        />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {fundingModels.map((m, i) => (
            <Reveal key={m.id} delay={i * 70}>
              <a href={`${siteUrls.funded}/#configure`} {...newTab} className="card card-hover group flex h-full flex-col gap-5 p-7">
                <span className="label flex justify-between text-[11px] text-muted">
                  <span>{m.phases.length ? `${m.phases.length} phase${m.phases.length > 1 ? "s" : ""}` : "No evaluation"}</span>
                  <span className="text-brass">{m.profitSplit}% split</span>
                </span>
                <span className="font-serif text-[34px] leading-[1.02]">{m.name}</span>
                <span className="text-[15px] leading-relaxed text-muted">{m.blurb}</span>
                <span className="mt-auto flex items-center justify-between border-t border-line pt-4">
                  <span>
                    <span className="label block text-[10px] text-muted">From</span>
                    <span className="text-[22px] font-semibold text-lime">{usd(Math.min(...Object.values(m.prices)))}</span>
                  </span>
                  <span className="arrow-dot !h-11 !w-11">
                    <ArrowUpRight />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ PATHWAY ═══ */}
      <section className="border-y border-line bg-ink-2">
        <div className="wrap py-[100px]">
          <SectionHead
            className="mb-16"
            title={
              <>
                From learner
                <br />
                to <em className="text-lime">funded trader.</em>
              </>
            }
            side="A structured system that connects learning with live trading — every step built around discipline and risk."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120} className="pr-7">
                <div className="grow-line h-[3px] bg-brass" style={{ opacity: 1 - i * 0.22 }} />
                <p className="label mt-7 text-lime">Step 0{i + 1}</p>
                <h3 className="mt-3 font-serif text-[40px]">{s.title}</h3>
                <p className="mt-3 mb-8 leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATALOGUE ═══ */}
      <section className="wrap pt-[120px]">
        <SectionHead
          title={
            <>
              The course
              <br />
              <em className="text-muted">catalogue.</em>
            </>
          }
          side={
            <Link href="/courses" className="btn-line">
              All {programmes.length} programmes →
            </Link>
          }
        />
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="label grid grid-cols-[140px_minmax(0,1fr)_170px_160px_56px] gap-6 border-b border-bone/[0.14] px-2 pb-3.5 text-[11px] text-muted">
              <span>Level</span>
              <span>Programme</span>
              <span>Duration</span>
              <span>Price</span>
              <span />
            </div>
            {catalogue.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <Link
                  href={`/courses/${c.slug}`}
                  className="row-hover grid grid-cols-[140px_minmax(0,1fr)_170px_160px_56px] items-center gap-6 border-b border-bone/[0.14] px-2 py-7"
                >
                  <span className="label">{c.badge}</span>
                  <span>
                    <span className="block font-serif text-[30px] leading-[1.1]">{c.title}</span>
                    <span className="mt-1.5 block text-[15px] text-muted">{c.tagline}</span>
                  </span>
                  <span className="text-[15px] text-muted">{c.duration}</span>
                  <span className={`text-[17px] font-semibold ${c.price ? "" : "text-muted"}`}>{c.price ?? "On request"}</span>
                  <span className="arrow-dot !h-11 !w-11">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROFESSIONAL PROGRAMME ═══ */}
      <section className="wrap pt-14 pb-[120px]">
        <Reveal variant="zoom">
          <div className="flex flex-wrap items-end justify-between gap-12 rounded-3xl bg-lime px-[clamp(24px,4vw,64px)] py-14 text-on-lime">
            <div className="min-w-0 flex-[1_1_460px]">
              <span className="label">/ Flagship</span>
              <h2 className="display mt-4 text-[clamp(48px,6vw,96px)] !leading-[0.92]">
                The Professional
                <br />
                <em>Programme.</em>
              </h2>
              <p className="mt-6 max-w-[520px] text-lg leading-[1.55] text-on-lime/85">
                Six modules, complete CISI Level 4 preparation, 12 weeks of 1-to-1 mentoring — and a pathway to a funded account.
              </p>
            </div>
            <div className="flex min-w-0 flex-[0_1_360px] flex-col gap-5">
              <div className="flex items-baseline gap-3.5">
                <span className="font-serif text-[88px] leading-[0.9]">{pro.price}</span>
                <span className="text-xl text-on-lime/65 line-through">{pro.wasPrice}</span>
              </div>
              <ul className="border-t border-on-lime/25 text-[15px]">
                {["6 in-depth trading modules", "12 weeks of 1-to-1 mentoring", "Funded account eligibility"].map((h) => (
                  <li key={h} className="border-b border-on-lime/25 py-2.5">
                    {h}
                  </li>
                ))}
              </ul>
              <Link href={programmeHref(pro.slug)} className="btn-ink">
                Apply for the programme →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ IT ═══ */}
      <section className="wrap pb-[120px]">
        <Reveal>
          <a href={siteUrls.it} {...newTab} className="card card-hover group flex h-full flex-col gap-7 p-10">
            <Kicker>IT services</Kicker>
            <h3 className="font-serif text-[52px] leading-[0.98]">
              Technology
              <br />
              <em className="text-muted">that delivers.</em>
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Data engineering", "Cloud & DevOps", "Web & mobile", "QA & testing", "UX design", "AI & automation"].map((t) => (
                <span key={t} className="rounded-full border border-bone/20 px-3.5 py-2 text-sm">
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-auto flex items-center justify-between font-semibold">
              See IT services
              <span className="arrow-dot">
                <ArrowUpRight />
              </span>
            </span>
          </a>
        </Reveal>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-line">
        <div className="wrap flex flex-wrap gap-12 py-[100px]">
          <Reveal className="min-w-0 flex-[1_1_320px]">
            <Kicker>Questions</Kicker>
            <h2 className="mt-4 font-serif text-[clamp(44px,5vw,72px)] leading-[0.95]">
              Good to
              <br />
              <em>know.</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="min-w-0 flex-[2_1_560px]">
            <Accordion items={homeFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="border-t border-line">
        <Reveal className="wrap py-[120px] text-center">
          <span className="label text-muted">/ Begin</span>
          <h2 className="display mx-auto mt-5 max-w-[1100px] text-[clamp(52px,8vw,128px)] !leading-[0.92]">
            Ready when <em className="text-lime">the market is.</em>
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/contact?topic=funded" className="btn-lime !min-h-14 !px-[30px] !text-[17px]">
              Talk to our team →
            </Link>
            <a href={siteUrls.funded} {...newTab} className="btn-line !min-h-14 !px-[30px] !text-[17px]">
              Start a challenge ↗
            </a>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}

/** Desk row: internal pages use <Link>; subdomain sites open in a new tab. */
function DeskLink({ href, external, className, children }: { href: string; external: boolean; className: string; children: React.ReactNode }) {
  return external ? (
    <a href={href} {...newTab} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
