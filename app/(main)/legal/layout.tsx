import PageTransition from "@/components/PageTransition";
import LegalNav from "./LegalNav";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <section className="wrap pt-7 pb-[100px]">
      <p className="hero-crumb mt-[clamp(12px,4vh,56px)]">
        <span>Legal &amp; policies</span>
        <span className="hero-tag">ZenithWave Capital Limited</span>
      </p>
      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside>
          <div className="lg:sticky lg:top-28">
            <LegalNav />
          </div>
        </aside>
        <PageTransition>
          <article className="max-w-[760px]">{children}</article>
        </PageTransition>
      </div>
    </section>
  );
}
