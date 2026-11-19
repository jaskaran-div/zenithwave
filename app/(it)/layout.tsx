import type { Viewport } from "next";
import Footer from "@/components/Footer";
import SubsiteHeader from "@/components/SubsiteHeader";

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
};

/**
 * IT Services site — served on the IT subdomain (see proxy.ts).
 * Keeps the original dark ink/lime palette via `.theme-classic` (globals.css);
 * the main and funded sites use the brand palette.
 */
export default function ITLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-classic flex min-h-screen flex-1 flex-col">
      <SubsiteHeader
        section="IT Services"
        links={[
          { href: "#services", label: "Services" },
          { href: "#process", label: "Process" },
        ]}
        cta={{ href: "/contact?topic=it", label: "Start a project" }}
      />
      <main className="flex-1">{children}</main>
      <Footer subsite />
    </div>
  );
}
