/**
 * ZenithWave Capital logo — vector mark + live-text wordmark, so it stays sharp
 * at any size. The mark is a vector redraw of the brand logo artwork.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-logo inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 100 68" aria-hidden="true" className="h-8 w-auto sm:h-9">
        <defs>
          <linearGradient id="zw-mark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4d6bff" />
            <stop offset="1" stopColor="#1f3fd6" />
          </linearGradient>
        </defs>
        <path fill="url(#zw-mark)" d="M50 3 L85 44 Q91 54 98 64 Q75 56 50 58 Q25 56 2 50 Q8 47 15 44 Z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="brand-word text-[19px] sm:text-[21px]">ZENITHWAVE</span>
        <span className="mt-[3px] text-[9.5px] font-semibold tracking-[0.42em] sm:text-[10.5px]">CAPITAL</span>
      </span>
    </span>
  );
}
