import type { Metadata } from "next";
import Accordion from "@/components/Accordion";
import FundingConfigurator from "@/components/FundingConfigurator";
import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { WaveHero } from "@/components/Hero";
import { Kicker, SectionHead } from "@/components/ui";
import { balancesFor, fromPrice, fundingModels, maxBalance, platformLabels, shortBalance, usd } from "@/lib/plans";
import { fundedFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Funded Accounts",
  description: `Six funding models — One, Two and Three Step, crypto assessments and Instant Funding. Accounts from $5,000 to ${usd(maxBalance)}, challenges from ${usd(fromPrice)}, profit splits up to 90%.`,
};

const steps = [
  { title: "Choose your model", body: "One, two or three steps, crypto, or Instant Funding." },
  { title: "Pick size & platform", body: `${usd(5000)} to ${usd(maxBalance)} on DXtrade, MTR, cTrader or PropX.` },
  { title: "Pass the assessment", body: "Hit each phase target within the drawdown limits." },
  { title: "Trade funded", body: "Keep 75–90% of the profits you make." },
  { title: "Get paid", body: "Every 30 days — or faster with Rapid Payout." },
];

export default function FundedAccountsPage() {
  return (
    <PageTransition>
      <WaveHero
        short
        kicker="ZenithWave Capital — Funded accounts"
        meta={`$5K – ${usd(maxBalance / 1000)}K · Up to 90% split`}
        titleClassName="text-[clamp(3rem,8.4vw,8.2rem)] max-w-[14ch]"
        title={
          <>
            Fund. Trade.
            <br />
            <em className="text-lime">Conquer.</em>
          </>
        }
      >
        <p className="text-[1.12rem] leading-relaxed text-muted">
          Six funding models, eight account sizes and four platforms —{" "}
          <span className="text-bone">challenges from {usd(fromPrice)}, or skip the evaluation entirely with Instant Funding.</span>
        </p>
        <div className="mt-[30px] flex flex-wrap items-center gap-4">
          <a href="#configure" className="btn-ref">
            Build your challenge ↓
          </a>
        </div>
      </WaveHero>

      {/* Purchase challenge */}
      <section id="configure" className="wrap scroll-mt-24 pb-[100px]">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>Purchase challenge</Kicker>
            <h2 className="h-section mt-4">
              Choose your
              <br />
              <em>funding model.</em>
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <FundingConfigurator />
        </Reveal>
      </section>

      {/* Compare models */}
      <section id="models" className="scroll-mt-24 border-y border-line bg-ink-2">
        <div className="wrap py-[100px]">
          <SectionHead
            title={
              <>
                Six models.
                <br />
                <em className="text-muted">Clear rules.</em>
              </>
            }
            side="Every model, side by side. Drawdown and targets are a percentage of your starting balance."
          />
          <Reveal className="overflow-x-auto rounded-[18px] border border-bone/[0.14] bg-panel">
            <table className="w-full min-w-[980px] border-collapse text-[15px]">
              <thead>
                <tr className="label text-left text-[11px] text-muted">
                  {["Model", "Profit targets", "Max drawdown", "Daily loss", "Leverage", "Split", "Sizes", "Platforms", "From"].map((h) => (
                    <th key={h} scope="col" className="border-b border-bone/[0.14] px-5 py-[18px] font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fundingModels.map((m, i) => {
                  const sizes = balancesFor(m);
                  const last = i === fundingModels.length - 1;
                  const cell = `px-5 py-5 align-top ${last ? "" : "border-b border-line"}`;
                  return (
                    <tr key={m.id} className="row-hover">
                      <th scope="row" className={`${cell} text-left font-serif text-[24px] leading-tight font-normal`}>
                        {m.name}
                      </th>
                      <td className={cell}>{m.phases.length ? m.phases.map((p) => `${p.target}%`).join(" / ") : "None"}</td>
                      <td className={cell}>
                        {m.maxDrawdown}% <span className="text-muted">{m.drawdownType.toLowerCase()}</span>
                      </td>
                      <td className={cell}>{m.dailyLoss ? `${m.dailyLoss}%` : "None"}</td>
                      <td className={cell}>1:{m.leverage}</td>
                      <td className={cell}>{m.profitSplit}%</td>
                      <td className={cell}>
                        ${shortBalance(sizes[0])}–${shortBalance(sizes[sizes.length - 1])}
                      </td>
                      <td className={cell}>{m.platforms.map((p) => platformLabels[p]).join(", ")}</td>
                      <td className={`${cell} font-semibold text-lime`}>{usd(Math.min(...Object.values(m.prices)))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Reveal>
          <p className="label mt-4 text-muted">Add-ons: 90/10 profit share · weekend holding · payout protector · rapid payouts (bi-weekly, weekly, daily)</p>
        </div>
      </section>

      {/* Steps */}
      <section id="how-it-works" className="wrap scroll-mt-24 py-[100px]">
        <SectionHead
          title={
            <>
              Five steps
              <br />
              <em className="text-muted">to funded.</em>
            </>
          }
        />
        <div className="grid border-t border-bone/[0.14] sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className={`py-7 pr-6 ${i ? "lg:border-l lg:border-bone/[0.14] lg:pl-6" : ""}`}>
              <div className="h-[3px] w-7 rounded-sm bg-brass" />
              <p className="label mt-5 text-lime">0{i + 1}</p>
              <h3 className="mt-3.5 text-[22px] font-semibold">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-line">
        <div className="wrap flex flex-wrap gap-12 py-[100px]">
          <Reveal className="min-w-0 flex-[1_1_320px]">
            <Kicker>Funding FAQ</Kicker>
            <h2 className="mt-4 font-serif text-[clamp(44px,5vw,72px)] leading-[0.95]">
              Questions,
              <br />
              <em>answered.</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="min-w-0 flex-[2_1_560px]">
            <Accordion items={fundedFaqs} />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
