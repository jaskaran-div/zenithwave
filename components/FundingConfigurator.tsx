"use client";

import { useState } from "react";
import { authLinks } from "@/lib/site";
import {
  addOnsFor,
  allBalances,
  balancesFor,
  fundingModels,
  planName,
  platformLabels,
  priceFor,
  shortBalance,
  usd,
  type AddOnId,
  type FundingModel,
  type Platform,
} from "@/lib/plans";

const PLATFORMS: Platform[] = ["DXTRADE", "MTR", "CTRADER", "PropX"];

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-line pt-6 pb-8 first:border-t-0 first:pt-0">
      <legend className="float-left mb-4 flex w-full items-baseline gap-3">
        <span className="label text-brass">{n}.</span>
        <span className="text-lg font-semibold">{title}</span>
      </legend>
      <div className="clear-both">{children}</div>
    </fieldset>
  );
}

const chip = (on: boolean, disabled = false) =>
  `rounded-xl border px-4 text-left transition-all duration-300 ${
    disabled
      ? "cursor-not-allowed border-bone/10 text-dim opacity-50"
      : on
        ? "border-lime bg-lime text-on-lime shadow-[0_10px_30px_-14px_rgb(43_69_232/0.7)]"
        : "border-bone/20 bg-panel text-bone hover:border-bone/45"
  }`;

/** Pick the closest available balance when the chosen one isn't offered. */
const nearest = (m: FundingModel, balance: number) => {
  const list = balancesFor(m);
  return list.includes(balance) ? balance : list.reduce((a, b) => (Math.abs(b - balance) < Math.abs(a - balance) ? b : a));
};

export default function FundingConfigurator() {
  const [modelId, setModelId] = useState(fundingModels[0].id);
  const [balance, setBalance] = useState(5000);
  const [platform, setPlatform] = useState<Platform>("DXTRADE");
  const [picked, setPicked] = useState<AddOnId[]>([]);

  const model = fundingModels.find((m) => m.id === modelId) ?? fundingModels[0];
  const price = priceFor(model, balance, platform);
  const available = addOnsFor(model, balance, platform);
  const active = available.filter((a) => picked.includes(a.id));
  const addOnTotal = active.reduce((sum, a) => sum + (price * a.pct) / 100, 0);
  const total = price + addOnTotal;

  const chooseModel = (m: FundingModel) => {
    setModelId(m.id);
    setBalance((b) => nearest(m, b));
    setPlatform((p) => (m.platforms.includes(p) ? p : m.platforms[0]));
  };

  const toggle = (id: AddOnId) => {
    const addOn = available.find((a) => a.id === id);
    setPicked((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      // Rapid Payout tiers are one add-on: picking one replaces the other.
      const others = addOn?.group ? cur.filter((x) => available.find((a) => a.id === x)?.group !== addOn.group) : cur;
      return [...others, id];
    });
  };

  const rules: [string, string][] = [
    ...model.phases.map((p): [string, string] => [`${p.name} target`, `${p.target}% · ${usd((balance * p.target) / 100)}`]),
    ...(model.phases.length === 0 ? [["Evaluation", "None — funded instantly"] as [string, string]] : []),
    [`Max drawdown · ${model.drawdownType.toLowerCase()}`, `${model.maxDrawdown}% · ${usd((balance * model.maxDrawdown) / 100)}`],
    ["Daily loss limit", model.dailyLoss ? `${model.dailyLoss}% · ${usd((balance * model.dailyLoss) / 100)}` : "None"],
    ["Leverage", `1:${model.leverage}`],
    ["Profit split", picked.includes("profitShare") && available.some((a) => a.id === "profitShare") ? "90%" : `${model.profitSplit}%`],
    ["Payout cycle", active.find((a) => a.group === "rapid")?.label.replace(/Rapid Payout \((.*)\)/, "$1") ?? "Every 30 days"],
    ["Expert advisors", model.eas ? "Allowed" : "Not allowed"],
    ["Weekend holding", model.weekendHolding || picked.includes("holdWeekend") ? "Allowed" : "Closed Friday"],
  ];

  return (
    <div className="flex flex-wrap items-start gap-6">
      {/* ── Choices ── */}
      <div className="min-w-0 flex-[1.4_1_560px] rounded-[20px] border border-bone/[0.14] bg-panel p-[clamp(20px,3vw,36px)]">
        <Step n={1} title="Product category">
          <div role="radiogroup" aria-label="Product category" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {fundingModels.map((m) => {
              const on = m.id === model.id;
              return (
                <button key={m.id} type="button" role="radio" aria-checked={on} onClick={() => chooseModel(m)} className={`${chip(on)} min-h-[72px] py-3`}>
                  <span className="block font-semibold">{m.name}</span>
                  <span className={`label mt-1 block text-[10px] ${on ? "text-on-lime/75" : "text-muted"}`}>
                    {m.phases.length ? `${m.phases.length} phase${m.phases.length > 1 ? "s" : ""}` : "No evaluation"} · {m.profitSplit}% split
                  </span>
                </button>
              );
            })}
          </div>
          <p key={model.id} className="animate-rise mt-4 text-[15px] text-muted">
            {model.blurb}
          </p>
        </Step>

        <Step n={2} title="Account balance">
          <div role="radiogroup" aria-label="Account balance" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {allBalances.map((b) => {
              const offered = b in model.prices;
              const on = offered && b === balance;
              return (
                <button
                  key={b}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={!offered}
                  onClick={() => setBalance(b)}
                  className={`${chip(on, !offered)} min-h-14 font-serif text-[26px] leading-none`}
                  title={offered ? undefined : `Not offered on ${model.name}`}
                >
                  {usd(b)}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={3} title="Platform">
          <div role="radiogroup" aria-label="Platform" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PLATFORMS.map((p) => {
              const offered = model.platforms.includes(p);
              const on = offered && p === platform;
              return (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  disabled={!offered}
                  onClick={() => setPlatform(p)}
                  className={`${chip(on, !offered)} min-h-12 text-center font-semibold`}
                  title={offered ? undefined : `Not available for ${model.name}`}
                >
                  {platformLabels[p]}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={4} title="Add-ons">
          {available.length === 0 ? (
            <p className="text-[15px] text-muted">No add-ons for this account.</p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {available.map((a) => {
                const on = picked.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={`flex min-h-[60px] cursor-pointer items-center gap-3.5 rounded-xl border px-4 py-3 transition-colors duration-300 ${
                      on ? "border-lime bg-lime/[0.07]" : "border-bone/20 hover:border-bone/45"
                    }`}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggle(a.id)} className="h-[18px] w-[18px] shrink-0 accent-lime" />
                    <span className="min-w-0 flex-1 text-[15px] font-medium">{a.label}</span>
                    <span className="shrink-0 text-right text-sm">
                      <span className="font-semibold text-lime">+{usd((price * a.pct) / 100, true)}</span>
                      <span className="block text-xs text-muted">{a.pct}%</span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
          {available.some((a) => a.group) && <p className="mt-3 text-xs text-muted">Choose one Rapid Payout speed.</p>}
        </Step>
      </div>

      {/* ── Summary ── */}
      <aside className="on-dark min-w-0 flex-[1_1_360px] rounded-[20px] bg-ink lg:sticky lg:top-24" aria-live="polite">
        <div className="border-b border-line p-7">
          <p className="label text-[11px] text-brass">Your challenge</p>
          <p className="mt-2 text-[15px] leading-snug text-muted">{planName(model, balance, platform)}</p>
          <p key={`${model.id}-${balance}-${platform}`} className="animate-rise mt-4 font-serif text-[clamp(52px,5vw,72px)] leading-[0.9]">
            {usd(total, true)}
          </p>
          {active.length > 0 && (
            <ul className="mt-4 space-y-1 text-sm text-muted">
              <li className="flex justify-between gap-3">
                <span>{shortBalance(balance)} challenge</span>
                <span>{usd(price, true)}</span>
              </li>
              {active.map((a) => (
                <li key={a.id} className="flex justify-between gap-3">
                  <span>{a.label}</span>
                  <span>+{usd((price * a.pct) / 100, true)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <dl className="grid grid-cols-2">
          {rules.map(([k, v], i) => (
            <div key={k} className={`border-b border-line px-6 py-4 ${i % 2 ? "border-l" : ""}`}>
              <dt className="label text-[10px] text-muted">{k}</dt>
              <dd className="mt-1 text-[15px] font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="p-6">
          <a href={authLinks.signUp} className="btn-lime w-full">
            Purchase challenge →
          </a>
          <p className="mt-3 text-center text-xs text-muted">
            Already have an account?{" "}
            <a href={authLinks.signIn} className="text-bone underline-offset-4 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}
