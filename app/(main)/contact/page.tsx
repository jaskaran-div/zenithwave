import type { Metadata } from "next";
import { Suspense } from "react";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with ZenithWave Capital about courses, funded accounts or IT services.",
};

const directory = [
  { k: "General & support", v: site.emails.support, href: `mailto:${site.emails.support}` },
  { k: "Phone", v: site.phones.general.label, href: site.phones.general.href },
  { k: "Partnerships — Peter Antal", v: site.emails.partnerships, href: `mailto:${site.emails.partnerships}` },
  { k: "Compliance & privacy", v: site.emails.compliance, href: `mailto:${site.emails.compliance}` },
];

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-6 px-7 py-8">
      <div className="flex flex-wrap gap-2">
        {[120, 150, 190, 110, 80].map((w) => (
          <span key={w} className="h-11 animate-pulse rounded-full bg-bone/[0.06]" style={{ width: w }} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-[52px] animate-pulse rounded-[10px] bg-bone/[0.06]" />
        ))}
      </div>
      <span className="h-36 animate-pulse rounded-[10px] bg-bone/[0.06]" />
    </div>
  );
}

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="wrap pt-7">
        <div className="label flex flex-wrap justify-between gap-2 border-b border-line pb-3.5 text-muted">
          <span>/ Contact</span>
          <span>Croydon, London · UK</span>
        </div>
        <h1 className="display animate-rise mt-14 mb-[72px] text-[clamp(4rem,11vw,10.5rem)] !leading-[0.88] tracking-[-0.04em]">
          Let’s <em className="text-lime">talk.</em>
        </h1>
      </section>

      <section className="wrap flex flex-wrap items-start gap-6 pb-[100px]">
        <Reveal className="min-w-0 flex-[999_1_560px] overflow-hidden rounded-[20px] border border-bone/[0.14] bg-panel">
          <div className="label flex justify-between border-b border-line px-7 py-3.5 text-muted">
            <span>New enquiry</span>
            <span className="hidden sm:inline">All fields marked * are required</span>
          </div>
          <Suspense fallback={<FormSkeleton />}>
            <ContactForm />
          </Suspense>
        </Reveal>

        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
          <Reveal delay={100} className="overflow-hidden rounded-[20px] border border-bone/[0.14]">
            <div className="label border-b border-line px-6 py-3.5 text-muted">Directory</div>
            {directory.map((d, i) => (
              <a key={d.k} href={d.href} className={`row-hover block px-6 py-5 ${i < directory.length - 1 ? "border-b border-line" : ""}`}>
                <span className="label block text-[11px] text-muted">{d.k}</span>
                <span className="mt-1.5 block text-[17px] break-all">{d.v}</span>
              </a>
            ))}
          </Reveal>
          <Reveal delay={200}>
            <address className="rounded-[20px] bg-lime px-6 py-7 text-on-lime not-italic">
              <span className="label block text-[11px]">Registered office</span>
              <span className="mt-3 block font-serif text-[30px] leading-[1.15]">
                Office 3A:1, Rathbone House
                <br />
                Dexter House, 24–28 Tanfield Road
                <br />
                Croydon CR0 1BT
              </span>
            </address>
          </Reveal>
        </div>
      </section>

      <section className="wrap pb-[100px]">
        <Reveal variant="zoom" className="overflow-hidden rounded-[20px] border border-bone/[0.14]">
          <iframe
            src={site.mapEmbed}
            title="ZenithWave Capital office location"
            className="h-[380px] w-full border-0 [filter:grayscale(1)_contrast(0.95)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </section>
    </PageTransition>
  );
}
