import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/Accordion";
import ModuleList from "@/components/ModuleList";
import { MaskTitle } from "@/components/Hero";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/ui";
import { programmeHref } from "@/lib/plans";
import { categories, getProgramme, programmes } from "@/lib/programmes";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.title, description: p.summary };
}

function Block({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="border-t border-line py-14">
      <p className="label text-lime">/ {kicker}</p>
      <h2 className="mt-3 mb-8 font-serif text-[clamp(36px,4vw,52px)] leading-none">{title}</h2>
      {children}
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3 rounded-xl border border-bone/[0.12] bg-panel px-4 py-3.5 text-[15px] leading-relaxed">
          <span className="text-lime">✓</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function ProgrammePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();

  const cat = categories.find((c) => c.id === p.category)!;
  const related = programmes.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const enrolLabel = p.comingSoon ? "Register interest" : "Enquire & enrol";

  const facts = [
    ["Audience", p.audience],
    ["Duration", p.duration],
    ["Format", p.format],
    ...(p.credits ? [["Credits", p.credits]] : []),
    ...(p.certification ? [["Certification", p.certification]] : []),
    ...(p.starts ? [["Start dates", p.starts]] : []),
  ];

  return (
    <PageTransition>
      {/* Breadcrumb + hero */}
      <section className="wrap pt-7">
        <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2 border-b border-line pb-3.5 text-muted">
          <Link href="/courses" className="hover:text-bone">
            Courses
          </Link>
          <span aria-hidden="true">/</span>
          <span>{cat.label}</span>
          <span aria-hidden="true">/</span>
          <span className="text-bone">{p.badge}</span>
        </nav>
        <div className="grid gap-10 pt-14 pb-16 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <span className="label inline-flex items-center gap-2 rounded-full border border-lime/40 px-3 py-1 text-lime">
              {p.comingSoon && <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-lime" />}
              {p.comingSoon ? "Coming soon" : p.badge}
            </span>
            <MaskTitle className="mt-6 text-[clamp(2.6rem,6vw,5.6rem)]">{p.title}</MaskTitle>
            <p className="animate-rise mt-6 font-serif text-[clamp(22px,2.2vw,30px)] text-lime italic" style={{ ["--delay" as string]: "100ms" }}>
              {p.tagline}
            </p>
            <div className="mt-8 max-w-[680px] space-y-4 text-lg leading-relaxed text-muted">
              {p.overview.map((o) => (
                <p key={o}>{o}</p>
              ))}
            </div>
          </div>

          {/* Sticky enrol card */}
          <aside className="lg:row-span-2">
            <div className="animate-rise overflow-hidden rounded-[20px] border border-bone/[0.14] bg-panel lg:sticky lg:top-28" style={{ ["--delay" as string]: "200ms" }}>
              <div className="border-b border-line px-6 py-6">
                <p className="label text-[11px] text-muted">Programme fee</p>
                <p className="mt-2 flex items-baseline gap-3">
                  <span className="font-serif text-[48px] leading-none">{p.price ?? (p.comingSoon ? "TBA" : "On request")}</span>
                  {p.wasPrice && <span className="text-lg text-muted line-through">{p.wasPrice}</span>}
                </p>
              </div>
              <dl>
                {facts.map(([k, v]) => (
                  <div key={k} className="border-b border-line px-6 py-4">
                    <dt className="label text-[10px] text-muted">{k}</dt>
                    <dd className="mt-1 text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-2.5 p-6">
                <Link href={programmeHref(p.slug)} className="btn-lime w-full">
                  {enrolLabel} →
                </Link>
                <Link href="/courses" className="btn-line w-full">
                  All programmes
                </Link>
              </div>
            </div>
          </aside>

          {/* Body */}
          <div className="min-w-0">
            {p.outcomes.length > 0 && (
              <Block kicker="Outcomes" title="What you’ll be able to do">
                <Bullets items={p.outcomes} />
              </Block>
            )}

            {p.modules.length > 0 && (
              <Block kicker="Curriculum" title={`${p.modules.length} ${p.modules.length === 1 ? "part" : "parts"}, step by step`}>
                <ModuleList modules={p.modules} />
              </Block>
            )}

            {p.assessment && (
              <Block kicker="Assessment" title="How you’re assessed">
                <ol className="space-y-3">
                  {p.assessment.map((a, i) => (
                    <li key={a} className="flex gap-4 border-b border-line pb-3 text-[15px] leading-relaxed text-muted">
                      <span className="label pt-0.5 text-lime">0{i + 1}</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {p.included && (
              <Block kicker="Included" title="What’s included">
                <Bullets items={p.included} />
              </Block>
            )}

            {p.entry && (
              <Block kicker="Entry" title="Entry requirements">
                <Bullets items={p.entry} />
              </Block>
            )}

            {p.faqs && (
              <Block kicker="FAQ" title="Questions, answered">
                <Accordion items={p.faqs} />
              </Block>
            )}

            {p.comingSoon && (
              <Block kicker="Next step" title="Be first to know">
                <p className="mb-6 max-w-[560px] text-lg text-muted">Register your interest and we’ll contact you as soon as details and enrolment are published.</p>
                <Link href={programmeHref(p.slug)} className="btn-lime">
                  Register interest →
                </Link>
              </Block>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-ink-2">
          <div className="wrap py-[90px]">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="h-section">
                More in <em className="text-muted">{cat.label}.</em>
              </h2>
              <Link href="/courses" className="btn-line">
                View all programmes →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 90}>
                  <Link href={`/courses/${r.slug}`} className="card card-hover group flex h-full flex-col gap-4 p-7">
                    <span className="label text-lime">{r.comingSoon ? "Coming soon" : r.badge}</span>
                    <h3 className="font-serif text-[28px] leading-[1.05]">{r.title}</h3>
                    <p className="flex-1 text-[15px] leading-relaxed text-muted">{r.summary}</p>
                    <span className="flex items-center justify-between font-semibold">
                      {r.price ?? "View programme"}
                      <span className="arrow-dot">
                        <ArrowRight />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
}
