import Link from "next/link";
import { MaskTitle } from "@/components/Hero";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-24">
      <p className="hero-crumb">
        <span>Error</span>
        <span className="hero-tag">404</span>
      </p>
      <MaskTitle className="text-[clamp(3.4rem,9vw,8.2rem)]">
        Off the <em className="text-lime">chart.</em>
      </MaskTitle>
      <p className="mt-6 max-w-md text-lg text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-10">
        <Link href="/" className="btn-ref">
          Back to home →
        </Link>
      </div>
    </section>
  );
}
