"use client";

import { usePathname } from "next/navigation";
import { WaveHero } from "@/components/Hero";

const titles: Record<string, string> = {
  "/legal/terms-and-conditions": "Terms and Conditions",
  "/legal/privacy-policy": "Privacy Policy",
  "/legal/refund-policy": "Refund Policy",
};

/** Wave hero for the legal pages; the title follows the current policy. */
export default function LegalHero() {
  const title = titles[usePathname()] ?? "Legal & policies";
  return (
    <WaveHero
      key={title}
      short
      kicker="Legal & policies"
      meta="ZenithWave Capital Limited"
      title={title}
      titleClassName="text-[clamp(3rem,7vw,6.5rem)]"
    />
  );
}
