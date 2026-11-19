"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, programmes, type Category } from "@/lib/programmes";

type Filter = "All" | Category;

export default function CourseCatalogue() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programmes.filter(
      (p) =>
        (filter === "All" || p.category === filter) &&
        (!q || `${p.title} ${p.summary} ${p.badge} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  const count = (c: Filter) => (c === "All" ? programmes.length : programmes.filter((p) => p.category === c).length);
  const blurb = categories.find((c) => c.id === filter)?.blurb;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {(["All", ...categories.map((c) => c.id)] as Filter[]).map((c) => {
            const label = c === "All" ? "All" : categories.find((x) => x.id === c)!.label;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={c === filter}
                onClick={() => setFilter(c)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-[18px] text-sm font-medium transition-all duration-300 ${
                  c === filter ? "border-lime bg-lime text-on-lime" : "border-bone/20 text-bone hover:border-bone/45"
                }`}
              >
                {label}
                <span className={`font-mono text-[11px] ${c === filter ? "text-on-lime/70" : "text-muted"}`}>{count(c)}</span>
              </button>
            );
          })}
        </div>
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Search programmes</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programmes"
            className="min-h-11 w-full rounded-full border border-bone/20 bg-transparent pr-4 pl-10 text-sm text-bone outline-none placeholder:text-dim focus:border-lime"
          />
        </label>
      </div>

      <p aria-live="polite" className="label mt-5 mb-7 text-muted">
        {shown.length} programme{shown.length === 1 ? "" : "s"}
        {blurb ? ` — ${blurb}` : ""}
      </p>

      {shown.length === 0 ? (
        <div className="card px-8 py-16 text-center">
          <p className="font-serif text-4xl">No programmes match “{query}”.</p>
          <button type="button" onClick={() => { setQuery(""); setFilter("All"); }} className="btn-line mt-6">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <Link
              key={p.slug}
              href={`/courses/${p.slug}`}
              className="card card-hover group animate-rise flex flex-col overflow-hidden"
            >
              <div className="label flex items-center justify-between gap-3 border-b border-line px-6 py-4">
                <span className="text-lime">{p.badge}</span>
                <span className="text-muted">{p.comingSoon ? "Coming soon" : categories.find((c) => c.id === p.category)!.label}</span>
              </div>
              <div className="flex flex-1 flex-col gap-3.5 px-6 py-7">
                <h2 className="font-serif text-[32px] leading-[1.04]">{p.title}</h2>
                <p className="leading-relaxed text-muted">{p.summary}</p>
                <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4 text-sm">
                  <div>
                    <dt className="label text-[10px] text-muted">Duration</dt>
                    <dd className="mt-1">{p.duration}</dd>
                  </div>
                  <div>
                    <dt className="label text-[10px] text-muted">Format</dt>
                    <dd className="mt-1 line-clamp-2">{p.format}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-[18px]">
                <span className={`text-xl font-semibold ${p.price ? "" : "text-muted"}`}>
                  {p.price ?? (p.comingSoon ? "Register interest" : "Price on request")}
                  {p.wasPrice && <span className="ml-2 text-sm font-normal text-muted line-through">{p.wasPrice}</span>}
                </span>
                <span className="arrow-dot !h-11 !w-11">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
