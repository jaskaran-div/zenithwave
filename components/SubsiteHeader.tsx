"use client";

import Logo from "@/components/Logo";
import {
  AuthButtons,
  MenuButton,
  headerClass,
  useHeaderState,
} from "@/components/Header";
import { mainHref, siteUrls } from "@/lib/site";

type Props = {
  /** Section name shown beside the logo, e.g. "Funded Accounts". */
  section: string;
  /** In-page anchors for this site. */
  links: { href: string; label: string }[];
  /** Optional main-site page to promote instead of Sign in / Sign up (path on the main site). */
  cta?: { href: string; label: string };
};

/** Navbar for the subdomain sites. Links back to the main site are absolute. */
export default function SubsiteHeader({ section, links, cta }: Props) {
  const { open, setOpen, scrolled } = useHeaderState();
  const close = () => setOpen(false);
  const back = [
    { href: siteUrls.main, label: "Main site" },
    { href: mainHref("/contact"), label: "Contact" },
  ];

  return (
    <>
      <header className={headerClass(scrolled, open)}>
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <a
            href="/"
            aria-label={`ZenithWave Capital ${section}`}
            className="flex min-h-11 items-center gap-3"
            onClick={close}
          >
            <Logo />
            <span className="label hidden border-l border-line pl-3 text-[11px] text-brass sm:inline">
              {section}
            </span>
          </a>

          <nav
            aria-label={section}
            className="hidden items-center gap-0.5 xl:flex"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-[10px] px-3.5 text-sm font-medium text-muted transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
            <span aria-hidden="true" className="mx-2 h-5 w-px bg-line" />
            {back.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="inline-flex min-h-11 items-center rounded-[10px] px-3.5 text-sm font-medium text-muted transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {cta ? (
            <a
              href={mainHref(cta.href)}
              className="btn-lime hidden !min-h-11 !px-5 !text-sm xl:inline-flex"
            >
              {cta.label} →
            </a>
          ) : (
            <AuthButtons className="hidden items-center gap-2 xl:flex" />
          )}

          <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
        </div>
      </header>

      {/* Mobile menu — outside <header>: the header's backdrop-blur would otherwise
          become the containing block of this fixed panel and collapse it. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[77px] bottom-0 z-40 overflow-y-auto bg-ink transition-[opacity,visibility] duration-500 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          aria-label={`${section} mobile`}
          className="wrap flex flex-col pt-3 pb-10"
        >
          <p className="label pt-4 pb-2 text-brass">{section}</p>
          {[...links, ...back].map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={close}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              className={`flex min-h-16 items-center justify-between border-b border-line font-serif text-[2rem] text-bone transition-all duration-700 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span>{l.label}</span>
              <span className="label text-muted">
                {i < links.length ? `0${i + 1}` : "↗"}
              </span>
            </a>
          ))}
          {cta ? (
            <a
              href={mainHref(cta.href)}
              onClick={close}
              className={`btn-lime mt-8 transition-all delay-500 duration-700 ${open ? "opacity-100" : "opacity-0"}`}
            >
              {cta.label} →
            </a>
          ) : (
            <AuthButtons
              onClick={close}
              className={`mt-8 grid grid-cols-2 gap-2.5 transition-all delay-500 duration-700 [&>a]:!min-h-[52px] ${open ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </nav>
      </div>
    </>
  );
}
