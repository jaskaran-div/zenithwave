"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const legalPages = [
  { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/refund-policy", label: "Refund Policy" },
];

export default function LegalNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Legal" className="border-t border-bone/[0.14]">
      {legalPages.map((p, i) => {
        const on = pathname === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            aria-current={on ? "page" : undefined}
            className={`row-hover flex min-h-14 items-center justify-between border-b border-bone/[0.14] px-1 transition-colors ${
              on ? "text-lime" : "text-muted hover:text-bone"
            }`}
          >
            <span>{p.label}</span>
            <span className="label text-[11px]">0{i + 1}</span>
          </Link>
        );
      })}
    </nav>
  );
}
