import Link from "next/link";
import { WaveHero } from "@/components/Hero";

export default function NotFound() {
  return (
    <WaveHero
      kicker="Error"
      meta="404"
      title={
        <>
          Off the <em className="text-lime">chart.</em>
        </>
      }
      titleClassName="text-[clamp(3.4rem,9vw,8.2rem)] max-w-[14ch]"
    >
      <p className="text-lg text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-[30px]">
        <Link href="/" className="btn-ref">
          Back to home →
        </Link>
      </div>
    </WaveHero>
  );
}
