import PageTransition from "@/components/PageTransition";
import LegalHero from "./LegalHero";
import LegalNav from "./LegalNav";

export default function LegalLayout({ children }: LayoutProps<"/legal">) {
  return (
    <>
      <LegalHero />
      <section className="wrap pb-[100px]">
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
    </>
  );
}
