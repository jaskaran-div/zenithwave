"use client";

import { useState } from "react";
import { itServices, mainHref } from "@/lib/site";

const tags: string[][] = [
  ["ETL pipelines", "Data lakes & warehouses", "Real-time dashboards", "Predictive analytics"],
  ["Infrastructure as code", "CI/CD", "Cloud architecture"],
  ["Websites", "Web apps", "Mobile apps"],
  ["Test automation", "Manual QA", "Test strategy"],
  ["User research", "Interface design", "Prototyping"],
  ["AI integration", "Workflow automation", "Decision support"],
];

export default function ServiceTabs() {
  const [pick, setPick] = useState(0);
  const cur = itServices[pick];

  return (
    <div className="flex flex-wrap items-start gap-6">
      <div role="tablist" aria-label="Services" aria-orientation="vertical" className="min-w-0 flex-[1.2_1_480px] border-t border-bone/[0.14]">
        {itServices.map((s, i) => {
          const on = i === pick;
          return (
            <button
              key={s.title}
              type="button"
              role="tab"
              id={`svc-tab-${i}`}
              aria-selected={on}
              aria-controls="svc-panel"
              onClick={() => setPick(i)}
              onMouseEnter={() => setPick(i)}
              className={`flex min-h-[92px] w-full items-center gap-5 border-b border-bone/[0.14] py-5 text-left transition-all duration-300 ${
                on ? "bg-lime/[0.07] pl-5 text-bone" : "pl-2 text-muted hover:text-bone"
              }`}
            >
              <span className="label w-11 text-muted">0{i + 1}</span>
              <span className="flex-1 font-serif text-[clamp(30px,3vw,44px)] leading-[1.05]">{s.title}</span>
              <span className={`pr-4 font-mono text-lg text-lime transition-opacity ${on ? "opacity-100" : "opacity-0"}`}>→</span>
            </button>
          );
        })}
      </div>
      <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${pick}`} className="card min-w-0 flex-[1_1_380px] overflow-hidden lg:sticky lg:top-28">
        <div className="label flex justify-between border-b border-line px-6 py-3.5 text-muted">
          <span>Service 0{pick + 1} / 06</span>
          <span className="text-lime">● Available</span>
        </div>
        <div key={pick} className="animate-rise px-7 py-9">
          <h2 className="font-serif text-5xl leading-none">{cur.title}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{cur.body}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {tags[pick].map((t) => (
              <span key={t} className="rounded-full border border-bone/20 px-3.5 py-2 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-line px-7 py-5">
          <a href={mainHref(`/contact?topic=it&service=${cur.slug}`)} className="btn-lime w-full">
            Discuss this service →
          </a>
        </div>
      </div>
    </div>
  );
}
