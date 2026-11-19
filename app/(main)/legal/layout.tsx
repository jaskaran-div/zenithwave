import PageTransition from "@/components/PageTransition";
import LegalNav from "./LegalNav";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <section className="wrap pt-7 pb-[100px]">
      <div className="label flex flex-wrap justify-between gap-2 border-b border-line pb-3.5 text-muted">
        <span>/ Legal &amp; policies</span>
        <span>ZenithWave Capital Limited</span>
      </div>
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
