"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { authLinks, navLinks, site } from "@/lib/site";

/** Opens the subdomain sites (Funded Accounts, IT Services) in a new tab. */
const newTab = { target: "_blank", rel: "noopener noreferrer" } as const;

export function AuthButtons({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <div className={className}>
      <a href={authLinks.signIn} onClick={onClick} className="btn-line !min-h-11 !px-5 !text-sm">
        Sign in
      </a>
      <a href={authLinks.signUp} onClick={onClick} className="btn-lime !min-h-11 !px-5 !text-sm">
        Sign up
      </a>
    </div>
  );
}

export function useHeaderState() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return { open, setOpen, scrolled };
}

export function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-bone/20 text-bone xl:hidden"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
      </svg>
    </button>
  );
}

export const headerClass = (scrolled: boolean, open: boolean) =>
  `sticky top-0 z-50 border-b transition-colors duration-500 ${scrolled || open ? "border-line bg-ink/85 backdrop-blur-xl" : "border-line bg-ink"}`;

export default function Header() {
  const pathname = usePathname();
  const { open, setOpen, scrolled } = useHeaderState();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => setOpen(false);

  return (
    <header className={headerClass(scrolled, open)} style={{ viewTransitionName: "site-header" }}>
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Link href="/" aria-label="ZenithWave Capital home" className="flex min-h-11 items-center" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((l) =>
            l.external ? (
              <a
                key={l.href}
                href={l.href}
                {...newTab}
                className="inline-flex min-h-11 items-center gap-1 rounded-[10px] px-3.5 text-sm font-medium text-muted transition-colors hover:text-bone"
              >
                {l.label}
                <span aria-hidden="true" className="text-brass">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-[10px] px-3.5 text-sm font-medium transition-colors ${
                  isActive(l.href) ? "bg-bone/[0.08] text-bone" : "text-muted hover:text-bone"
                }`}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <AuthButtons className="hidden items-center gap-2 xl:flex" />

        <MenuButton open={open} onClick={() => setOpen((v) => !v)} />
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[77px] bottom-0 overflow-y-auto bg-ink transition-[opacity,visibility] duration-500 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="wrap flex flex-col pt-3 pb-10">
          {navLinks.map((l, i) => {
            const cls = `flex min-h-16 items-center justify-between border-b border-line font-serif text-[2rem] transition-all duration-700 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            } ${!l.external && isActive(l.href) ? "text-lime" : "text-bone"}`;
            const style = { transitionDelay: open ? `${80 + i * 50}ms` : "0ms" };
            const meta = <span className="label text-muted">{l.external ? "↗" : `0${i + 1}`}</span>;
            return l.external ? (
              <a key={l.href} href={l.href} {...newTab} onClick={close} style={style} className={cls}>
                <span>{l.label}</span>
                {meta}
              </a>
            ) : (
              <Link key={l.href} href={l.href} onClick={close} style={style} className={cls}>
                <span>{l.label}</span>
                {meta}
              </Link>
            );
          })}
          <AuthButtons
            onClick={close}
            className={`mt-8 grid grid-cols-2 gap-2.5 transition-all delay-500 duration-700 [&>a]:!min-h-[52px] ${open ? "opacity-100" : "opacity-0"}`}
          />
          <a href={site.links.learningPlatform} className={`btn-line mt-2.5 transition-all delay-500 duration-700 ${open ? "opacity-100" : "opacity-0"}`}>
            Learning platform ↗
          </a>
          <p className="label mt-10 leading-relaxed text-muted">
            {site.legalName} · No. {site.companyNumber}
            <br />
            {site.emails.support}
          </p>
        </nav>
      </div>
    </header>
  );
}
