"use client";

import { useState } from "react";
import type { Module } from "@/lib/programmes";

export default function ModuleList({ modules }: { modules: Module[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const all = open.size === modules.length;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(all ? new Set() : new Set(modules.map((_, i) => i)))}
          className="label min-h-11 px-2 text-lime hover:underline"
        >
          {all ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="border-t border-bone/[0.14]">
        {modules.map((m, i) => {
          const on = open.has(i);
          return (
            <li key={m.title} className="border-b border-bone/[0.14]">
              <h3>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`module-${i}`}
                  onClick={() => toggle(i)}
                  className="row-hover flex min-h-[84px] w-full items-center gap-5 px-1 py-5 text-left"
                >
                  <span className="label w-10 shrink-0 text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1">
                    <span className="block font-serif text-[26px] leading-tight sm:text-[30px]">{m.title}</span>
                    {m.meta && <span className="label mt-1.5 block text-[11px] text-muted">{m.meta}</span>}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono transition-all duration-300 ${
                      on ? "rotate-45 border-lime bg-lime text-on-lime" : "border-bone/20 text-lime"
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div id={`module-${i}`} className="accordion-panel" data-open={on}>
                <div>
                  <div className="pb-7 pl-[60px] sm:pr-14">
                    <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {m.topics.map((t) => (
                        <li key={t} className="flex items-baseline gap-2.5 text-[15px] text-muted">
                          <span className="text-lime">—</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                    {m.milestone && (
                      <p className="mt-5 rounded-xl border border-lime/30 bg-lime/[0.06] px-4 py-3 text-sm">
                        <span className="label mr-2 text-[11px] text-lime">Milestone</span>
                        {m.milestone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
