import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label text-lime">/ Error 404</p>
      <h1 className="display animate-rise mt-6 text-[clamp(3.6rem,10vw,9rem)]">
        Off the <em className="text-lime">chart.</em>
      </h1>
      <p className="mt-6 max-w-md text-lg text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-10">
        <Link href="/" className="btn-lime">
          Back to home →
        </Link>
      </div>
    </section>
  );
}
