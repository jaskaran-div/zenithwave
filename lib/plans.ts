// ─────────────────────────────────────────────────────────────────────────────
// Funding models — taken from the platform's AllPlans.csv export.
// Only the six purchasable product categories are listed. Prices are USD
// ("price" column of the first-phase plan); rules come from each phase plan
// and the funded plan it upgrades to.
//
// Prices are the same on every platform except the entries in `priceOverrides`.
// ─────────────────────────────────────────────────────────────────────────────

export type Platform = "DXTRADE" | "MTR" | "CTRADER" | "PropX";

export const platformLabels: Record<Platform, string> = {
  DXTRADE: "DXtrade",
  MTR: "MTR",
  CTRADER: "cTrader",
  PropX: "PropX",
};

export type AddOnId = "profitShare" | "holdWeekend" | "payoutProtector" | "rapidBiWeekly" | "rapidWeekly" | "rapidDaily";

export type AddOn = {
  id: AddOnId;
  label: string;
  /** Percentage of the challenge price. */
  pct: number;
  /** Add-ons sharing a group are mutually exclusive (one Rapid Payout tier). */
  group?: "rapid";
};

export const addOns: AddOn[] = [
  { id: "profitShare", label: "90/10 Profit Share", pct: 20 },
  { id: "holdWeekend", label: "Hold Positions Over Weekends", pct: 10 },
  { id: "payoutProtector", label: "Payout Protector", pct: 25 },
  { id: "rapidBiWeekly", label: "Rapid Payout (Bi-Weekly)", pct: 5, group: "rapid" },
  { id: "rapidDaily", label: "Rapid Payout (Daily)", pct: 15, group: "rapid" },
  { id: "rapidWeekly", label: "Rapid Payout (Weekly)", pct: 10, group: "rapid" },
];

const ALL_ADDONS: AddOnId[] = addOns.map((a) => a.id);
const CRYPTO_ADDONS: AddOnId[] = ["payoutProtector", "rapidBiWeekly", "rapidWeekly", "rapidDaily"];
const FX_PLATFORMS: Platform[] = ["DXTRADE", "MTR", "CTRADER", "PropX"];
const CRYPTO_PLATFORMS: Platform[] = ["DXTRADE", "PropX"];

export type Phase = { name: string; target: number };

export type FundingModel = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  /** Profit target per evaluation phase (empty for Instant Funding). */
  phases: Phase[];
  maxDrawdown: number;
  drawdownType: "Trailing" | "Static";
  /** 0 = no daily loss limit. */
  dailyLoss: number;
  leverage: number;
  profitSplit: number;
  eas: boolean;
  /** Weekend holding included (otherwise available as an add-on). */
  weekendHolding: boolean;
  platforms: Platform[];
  addOns: AddOnId[];
  /** Account balance → price (USD). */
  prices: Record<number, number>;
};

export const fundingModels: FundingModel[] = [
  {
    id: "one-step",
    name: "One Step Assessment",
    short: "One Step",
    blurb: "A single evaluation phase — hit the target once and you're funded.",
    phases: [{ name: "Phase 1", target: 10 }],
    maxDrawdown: 6,
    drawdownType: "Trailing",
    dailyLoss: 5,
    leverage: 20,
    profitSplit: 75,
    eas: true,
    weekendHolding: false,
    platforms: FX_PLATFORMS,
    addOns: ALL_ADDONS,
    prices: { 5000: 70, 10000: 125, 25000: 280, 50000: 445, 100000: 875, 200000: 1800, 250000: 2300, 500000: 4975 },
  },
  {
    id: "two-step",
    name: "Two Step Assessment",
    short: "Two Step",
    blurb: "The classic route — a challenge phase, then a lighter verification.",
    phases: [
      { name: "Phase 1", target: 10 },
      { name: "Phase 2", target: 5 },
    ],
    maxDrawdown: 8,
    drawdownType: "Static",
    dailyLoss: 4,
    leverage: 30,
    profitSplit: 75,
    eas: true,
    weekendHolding: false,
    platforms: FX_PLATFORMS,
    addOns: ALL_ADDONS,
    prices: { 5000: 60, 10000: 110, 25000: 250, 50000: 350, 100000: 550, 200000: 1100, 250000: 1300, 500000: 2900 },
  },
  {
    id: "three-step",
    name: "Three Step Assessment",
    short: "Three Step",
    blurb: "Three modest 5% targets and no daily loss limit — the lowest entry price.",
    phases: [
      { name: "Phase 1", target: 5 },
      { name: "Phase 2", target: 5 },
      { name: "Phase 3", target: 5 },
    ],
    maxDrawdown: 5,
    drawdownType: "Static",
    dailyLoss: 0,
    leverage: 20,
    profitSplit: 75,
    eas: true,
    weekendHolding: false,
    platforms: FX_PLATFORMS,
    addOns: ALL_ADDONS,
    prices: { 5000: 45, 10000: 90, 25000: 180, 50000: 250, 100000: 375, 200000: 750, 250000: 1000, 500000: 2100 },
  },
  {
    id: "one-step-crypto",
    name: "One Step Crypto Assessment",
    short: "One Step Crypto",
    blurb: "One phase on crypto markets, with weekend holding and a 90% split.",
    phases: [{ name: "Phase 1", target: 9 }],
    maxDrawdown: 6,
    drawdownType: "Static",
    dailyLoss: 0,
    leverage: 5,
    profitSplit: 90,
    eas: false,
    weekendHolding: true,
    platforms: CRYPTO_PLATFORMS,
    addOns: CRYPTO_ADDONS,
    prices: { 5000: 60, 10000: 120, 25000: 300, 50000: 550, 100000: 1220, 200000: 2500 },
  },
  {
    id: "two-step-crypto",
    name: "Two Step Crypto Assessment",
    short: "Two Step Crypto",
    blurb: "Two crypto phases with a wider 9% drawdown and a 90% split.",
    phases: [
      { name: "Phase 1", target: 6 },
      { name: "Phase 2", target: 9 },
    ],
    maxDrawdown: 9,
    drawdownType: "Static",
    dailyLoss: 0,
    leverage: 5,
    profitSplit: 90,
    eas: false,
    weekendHolding: true,
    platforms: CRYPTO_PLATFORMS,
    addOns: CRYPTO_ADDONS,
    prices: { 5000: 40, 10000: 90, 25000: 250, 50000: 500, 100000: 1000, 200000: 2200 },
  },
  {
    id: "instant",
    name: "Instant Funding",
    short: "Instant",
    blurb: "Skip the evaluation — trade a funded account from day one.",
    phases: [],
    maxDrawdown: 8,
    drawdownType: "Trailing",
    dailyLoss: 5,
    leverage: 50,
    profitSplit: 80,
    eas: true,
    weekendHolding: false,
    platforms: FX_PLATFORMS,
    addOns: ALL_ADDONS,
    prices: { 5000: 250, 10000: 450, 25000: 1200, 50000: 2600, 100000: 6000 },
  },
];

/**
 * Platform-specific exceptions found in the CSV.
 * CHECK: Instant Funding 100K on PropX is $600 in the export while every other
 * platform is $6,000 — likely a typo in the source data. Remove this entry once
 * the platform price is confirmed/fixed.
 */
const priceOverrides: Partial<Record<string, number>> = {
  "instant|100000|PropX": 600,
};

/** Add-ons the CSV disables for one specific plan. */
const addOnExclusions: Partial<Record<string, AddOnId[]>> = {
  // Two Step 100K on cTrader has Rapid Payout switched off in the export.
  "two-step|100000|CTRADER": ["rapidBiWeekly", "rapidWeekly", "rapidDaily"],
};

const key = (m: FundingModel, balance: number, platform: Platform) => `${m.id}|${balance}|${platform}`;

export const balancesFor = (m: FundingModel) =>
  Object.keys(m.prices)
    .map(Number)
    .sort((a, b) => a - b);

export const priceFor = (m: FundingModel, balance: number, platform: Platform) =>
  priceOverrides[key(m, balance, platform)] ?? m.prices[balance];

export const addOnsFor = (m: FundingModel, balance: number, platform: Platform) => {
  const off = addOnExclusions[key(m, balance, platform)] ?? [];
  return addOns.filter((a) => m.addOns.includes(a.id) && !off.includes(a.id));
};

/** Every balance offered across all models, for the balance picker. */
export const allBalances = [...new Set(fundingModels.flatMap(balancesFor))].sort((a, b) => a - b);

export const usd = (n: number, cents = false) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });

export const shortBalance = (n: number) => (n >= 1000 ? `${n / 1000}K` : String(n));

/** Plan name in the same format the platform uses. */
export const planName = (m: FundingModel, balance: number, platform: Platform) =>
  `Zenithwave Capital - ${m.name} - ${shortBalance(balance)} - ${platform}`;

export const fromPrice = Math.min(...fundingModels.flatMap((m) => Object.values(m.prices)));
export const maxBalance = Math.max(...allBalances);

/** Link to the contact form with a programme pre-selected. */
export const programmeHref = (slug: string) => `/contact?topic=courses&programme=${slug}`;
