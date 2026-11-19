import Link from "next/link";
import { disclaimer, mainHref, site, siteUrls } from "@/lib/site";

/** external: absolute URL. newTab: a subdomain site, opened in a new tab like the navbar. */
type FooterLink = { href: string; label: string; external?: boolean; newTab?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "All courses" },
      { href: "/courses#professional-programme", label: "Professional Programme" },
      { href: site.links.learningPlatform, label: "Learning platform ↗", external: true },
    ],
  },
  {
    title: "Trade",
    links: [
      { href: siteUrls.funded, label: "Funded accounts ↗", external: true, newTab: true },
      { href: `${siteUrls.funded}/#models`, label: "Compare models ↗", external: true, newTab: true },
      { href: `${siteUrls.funded}/#faq`, label: "Funding FAQ ↗", external: true, newTab: true },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: siteUrls.it, label: "IT services ↗", external: true, newTab: true },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms-and-conditions", label: "Terms & conditions" },
      { href: "/legal/privacy-policy", label: "Privacy policy" },
      { href: "/legal/refund-policy", label: "Refund policy" },
    ],
  },
];

/** `subsite`: rendered on a subdomain site, so main-site paths become absolute URLs. */
export default function Footer({ subsite = false }: { subsite?: boolean }) {
  return (
    <footer className="on-dark overflow-hidden bg-ink">
      <div className="wrap pt-[72px]">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-[420px] flex-[1_1_320px]">
            <p className="font-serif text-4xl leading-[1.1]">
              Learn the craft. <em className="text-brass">Trade the capital.</em>
            </p>
            <div className="mt-7 flex flex-col gap-1.5 text-[15px] text-muted">
              <a href={`mailto:${site.emails.support}`} className="text-bone hover:text-brass">
                {site.emails.support}
              </a>
              <a href={site.phones.general.href} className="text-bone hover:text-brass">
                {site.phones.general.label}
              </a>
              <span>Office 3A:1, Rathbone House, Croydon CR0 1BT</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-10">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3 text-[15px]">
                <h2 className="label mb-1 text-brass">/ {col.title}</h2>
                {col.links.map((l) =>
                  l.external || subsite ? (
                    <a
                      key={l.label}
                      href={l.external ? l.href : mainHref(l.href)}
                      {...(l.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-bone transition-colors hover:text-brass"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link key={l.label} href={l.href} className="text-bone transition-colors hover:text-brass">
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-14 max-w-[1100px] border-t border-line pt-7 text-[13px] leading-relaxed text-muted">
          <strong className="font-semibold text-bone">Risk warning &amp; disclosures.</strong> {disclaimer}
        </p>
        <div className="label mt-6 flex flex-wrap justify-between gap-3 text-muted">
          <span>
            © {site.copyrightYear} {site.legalName} · England &amp; Wales · No. {site.companyNumber}
          </span>
          <a href={site.links.trustpilot} className="text-brass hover:underline">
            Review us on Trustpilot ↗
          </a>
        </div>
        <p aria-hidden="true" className="mt-10 -mb-[0.18em] font-serif text-[clamp(72px,17vw,260px)] leading-[0.9] tracking-[-0.03em] whitespace-nowrap text-bone/[0.08] select-none">
          ZenithWave
        </p>
      </div>
    </footer>
  );
}
