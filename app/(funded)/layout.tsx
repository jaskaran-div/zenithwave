import Footer from "@/components/Footer";
import SubsiteHeader from "@/components/SubsiteHeader";

/** Funded Accounts site — served on the funded subdomain (see proxy.ts). */
export default function FundedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SubsiteHeader
        section="Funded Accounts"
        links={[
          { href: "#configure", label: "Challenges" },
          { href: "#models", label: "Compare models" },
          { href: "#how-it-works", label: "How it works" },
          { href: "#faq", label: "FAQ" },
        ]}
      />
      <main className="flex-1">{children}</main>
      <Footer subsite />
    </>
  );
}
