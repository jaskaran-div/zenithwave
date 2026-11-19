"use client";

import { useId, useState } from "react";

export default function Accordion({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-t border-bone/[0.14]">
      {items.map((f, i) => {
        const on = i === open;
        return (
          <div key={f.q} className="border-b border-bone/[0.14]">
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="flex min-h-[76px] w-full items-center justify-between gap-6 px-1 py-[18px] text-left text-lg font-medium sm:text-xl"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-base transition-all duration-300 ${
                    on ? "rotate-45 border-lime bg-lime text-on-lime" : "border-bone/20 text-lime"
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div id={`${id}-${i}`} className="accordion-panel" data-open={on}>
              <div>
                <p className="pr-16 pb-[26px] pl-1 text-base leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
