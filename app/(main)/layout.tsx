import Footer from "@/components/Footer";
import Header from "@/components/Header";

/** Main site — zenithwavecapital.com */
export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
