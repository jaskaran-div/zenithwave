// ─────────────────────────────────────────────────────────────────────────────
// Programme catalogue.
// • "ZenithWave" entries: from the indexed zenithwavecapital.com pages.
// • All other entries: from derivion.in/programs and isftglobal.com (Nov 2026).
// Where a source page did not publish a value (e.g. fees), the field is omitted
// and the UI shows "Price on request".
// ─────────────────────────────────────────────────────────────────────────────

export type Category = "ZenithWave" | "ISFT Series" | "ISFT Excellence" | "ISFT Awards" | "Literacy";

export type Module = {
  title: string;
  meta?: string;
  topics: string[];
  milestone?: string;
};

export type Programme = {
  slug: string;
  category: Category;
  badge: string;
  title: string;
  tagline: string;
  summary: string;
  audience: string;
  duration: string;
  format: string;
  price?: string;
  wasPrice?: string;
  credits?: string;
  certification?: string;
  starts?: string;
  overview: string[];
  outcomes: string[];
  modules: Module[];
  assessment?: string[];
  included?: string[];
  entry?: string[];
  faqs?: { q: string; a: string }[];
  comingSoon?: boolean;
  featured?: boolean;
};

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "ZenithWave", label: "ZenithWave", blurb: "CISI-aligned courses and our flagship Professional Programme." },
  { id: "ISFT Series", label: "ISFT Series", blurb: "Job-ready certificates quality-assured by OCN London." },
  { id: "ISFT Excellence", label: "ISFT Excellence", blurb: "ACFT, London immersion and live trading residency pathways." },
  { id: "ISFT Awards", label: "ISFT Awards", blurb: "Short, accredited introductions to markets and trading." },
  { id: "Literacy", label: "Financial Literacy", blurb: "Money, AI and online-safety literacy for ages 9 to adult." },
];

const seriesAssessment = (p1: string, p2: string, n: string) => [
  `Module quizzes: 25 multiple-choice questions in 75 minutes, 70% pass mark, auto-marked, retakes allowed.`,
  p1,
  p2,
  `Final case: a one-hour case that opens once all ${n} modules are passed.`,
  "Projects marked by the Head Educator against a published brief — feedback within 10 working days, one free resubmission.",
  "One overall grade: Pass (70–74%), Merit (75–84%) or Distinction (85%+).",
];

const seriesIncluded = (extra: string[]) => [
  "Recorded lessons and notes for every module",
  "One live session a week with a trainer",
  ...extra,
  "Learning platform (LMS) with auto-marked quizzes",
  "OCN London certification, ISFT certificate and statement of results",
];

export const programmes: Programme[] = [
  // ══════════════════════════ ZENITHWAVE ══════════════════════════
  {
    slug: "professional-programme",
    category: "ZenithWave",
    badge: "Flagship",
    title: "Professional Programme",
    tagline: "Six modules, CISI Level 4 preparation and 12 weeks of 1-to-1 mentoring.",
    summary:
      "Our flagship six-module trading programme combining complete CISI Level 4 preparation, 12 weeks of 1-to-1 mentoring and a pathway to a funded trading account.",
    audience: "Developing traders aiming for a professional standard",
    duration: "12 weeks of mentoring",
    format: "Live webinars, 1-to-1 mentoring, simulation trading rooms",
    price: "£2,999",
    wasPrice: "£3,500",
    certification: "CISI Level 4 preparation",
    overview: [
      "The Professional Programme is ZenithWave’s most complete route from learning to trading. It combines a six-module trading curriculum with full CISI Level 4 preparation and personal mentoring.",
      "Graduates become eligible for a funded account pathway, connecting structured education with live trading.",
    ],
    outcomes: [
      "Professional-standard market knowledge aligned to CISI Level 4",
      "A tested, written trading plan with risk rules",
      "Disciplined execution built through mentoring and simulation",
      "Eligibility for a funded trading account",
    ],
    modules: [
      { title: "Six in-depth trading modules", topics: ["Market structure and products", "Technical and fundamental analysis", "Risk and money management", "Trading psychology", "Trade planning and execution", "Performance review"] },
      { title: "CISI Level 4 preparation", topics: ["Complete syllabus preparation", "Practice questions and revision support"] },
      { title: "12 weeks of 1-to-1 mentoring", topics: ["Personal trading reviews", "Plan refinement", "Accountability and goal setting"] },
    ],
    included: ["Live webinars & Q&A sessions", "Simulation trading rooms", "12 weeks of 1-to-1 mentoring", "Funded account eligibility on completion"],
    featured: true,
  },
  {
    slug: "foundation-of-global-investing",
    category: "ZenithWave",
    badge: "CISI Level 3",
    title: "Foundation of Global Investing",
    tagline: "A recognised CISI Level 3 credential in six weeks.",
    summary:
      "A globally recognised CISI Level 3 credential, practical portfolio skills and career-ready market knowledge — all in six weeks. Entry level, no prior experience needed.",
    audience: "Beginners — no prior experience required",
    duration: "6 weeks",
    format: "Online with live sessions",
    price: "£1,800–£2,000",
    certification: "CISI Level 3",
    overview: [
      "An entry-level programme that builds a solid foundation in global investing and leads to a recognised CISI Level 3 credential.",
    ],
    outcomes: ["CISI Level 3 credential", "Practical portfolio skills", "Career-ready market knowledge"],
    modules: [{ title: "Core syllabus", topics: ["Global markets and asset classes", "Portfolio construction basics", "Risk and return", "Exam preparation"] }],
    entry: ["No prior experience required"],
  },
  {
    slug: "investment-strategy-and-portfolio-mastery",
    category: "ZenithWave",
    badge: "CISI Level 4",
    title: "Investment Strategy & Portfolio Mastery",
    tagline: "Institutional-grade portfolio construction.",
    summary: "A CISI-aligned programme for building, managing and optimising investment portfolios with institutional-grade strategy.",
    audience: "Learners progressing beyond Level 3",
    duration: "27 hours of learning",
    format: "4 hours of video · 4 free e-books",
    price: "from £2,200",
    certification: "CISI-aligned",
    overview: ["A CISI-aligned programme focused on investment strategy and the practical management of portfolios."],
    outcomes: ["Build and manage diversified portfolios", "Apply institutional investment strategy", "Evaluate and optimise portfolio performance"],
    modules: [{ title: "Programme content", meta: "27 hours", topics: ["4 hours of video lessons", "4 free e-books", "Portfolio strategy and optimisation"] }],
  },
  {
    slug: "financial-trading-advanced-program",
    category: "ZenithWave",
    badge: "Advanced",
    title: "Financial Trading Advanced Program",
    tagline: "Move beyond basic strategies.",
    summary: "Designed for aspiring and developing traders who want to move beyond basic strategies and trade with structure and confidence.",
    audience: "Aspiring and developing traders",
    duration: "27 hours of learning",
    format: "4 hours of video",
    overview: ["An advanced programme for traders ready to move beyond the basics and trade with structure."],
    outcomes: ["Apply advanced trading strategies", "Trade with structure and confidence", "Apply learning in live market conditions"],
    modules: [{ title: "Programme content", meta: "27 hours", topics: ["Advanced strategies", "Live market application", "Structured trade planning"] }],
  },
  {
    slug: "trader-accelerator",
    category: "ZenithWave",
    badge: "Accelerator",
    title: "Trader Accelerator",
    tagline: "Discipline, sizing — and funded account access.",
    summary:
      "A step-by-step pathway for traders who want professional discipline and consistent results — with direct access to a funded trading account.",
    audience: "Traders seeking consistency",
    duration: "Self-paced pathway",
    format: "Step-by-step pathway with funded account access",
    overview: ["A focused pathway on the habits that separate consistent traders: risk management, position sizing and professional discipline."],
    outcomes: ["Consistent risk management", "Correct position sizing", "Professional trading discipline", "Access to a funded trading account"],
    modules: [{ title: "Pathway", topics: ["Risk management", "Position sizing", "Professional discipline", "Funded account access"] }],
  },

  // ══════════════════════════ ISFT SERIES ══════════════════════════
  {
    slug: "isft-series-1-financial-markets-foundations-certificate",
    category: "ISFT Series",
    badge: "Series 1 · 16 credits",
    title: "ISFT-Series-1: Financial Markets Foundations Certificate",
    tagline: "Your job-ready start in financial markets.",
    summary: "How shares, currencies, commodities and bonds work — and how to place and manage your first orders with sensible risk limits.",
    audience: "True beginners — no finance background or trading account needed",
    duration: "≈16 weeks · 160 learning hours",
    format: "Online · weekly live session · demo accounts",
    credits: "16 credits · 8 modules",
    certification: "OCN London quality-assured · ISFT Series certificate",
    starts: "New batch on the 1st of every month",
    overview: [
      "One complete programme covering how shares, currencies, commodities and bonds work, who takes part in markets, how regulation protects traders, and how to place and manage orders with sensible risk limits.",
      "Designed by Head Educator Neil Crammond, a practising trader with 40+ years across LIFFE, CBOT and CME. Study at roughly 10 hours a week; practice uses demo accounts — no real-money trading.",
    ],
    outcomes: [
      "Read market structure",
      "Compare asset classes",
      "Place and manage orders on a trading platform",
      "Read the bond market and how interest rates drive bond prices",
    ],
    modules: [
      { title: "Financial Markets and Asset Classes", meta: "20 hrs · Quiz", topics: ["Market structure", "Main asset classes", "Primary vs secondary markets", "Risk and return", "Market participants", "Indian and global context"] },
      { title: "Market Structure and Trading Instruments", meta: "20 hrs · Quiz", topics: ["Exchanges, brokers and clearing houses", "Order matching", "Spot, futures and options", "Bid, offer, spread, volume and liquidity"] },
      { title: "Trading Platforms, Orders and Risk Management", meta: "20 hrs · Quiz + Project 1", topics: ["Platform functions", "Order types", "Risk per trade and position sizing", "Stop-losses", "Trading discipline", "Common beginner mistakes"] },
      { title: "Financial Markets Overview and Structure", meta: "20 hrs · Quiz", topics: ["How exchanges, regulators and clearing houses interact", "Developed vs emerging markets including India", "SEBI, FCA and SEC", "Market confidence"] },
      { title: "Equities and Stock Markets", meta: "20 hrs · Quiz", topics: ["Share ownership", "IPOs vs secondary trading", "Basic valuation", "Index trading (Nifty, S&P 500)"] },
      { title: "Foreign Exchange and Currency Markets", meta: "20 hrs · Quiz", topics: ["FX market scale and structure", "Currency pair quoting", "Drivers of currency value", "INR in global FX"] },
      { title: "Commodities and Energy Markets", meta: "20 hrs · Quiz", topics: ["Hard vs soft commodities", "Participants and exchanges", "Spot and futures trading", "Supply and demand drivers", "Gold and crude oil in Indian markets"] },
      { title: "Bonds, Interest Rates and Derivatives", meta: "20 hrs · Quiz + Project 2", topics: ["Bond yield and returns", "Price–interest rate relationship", "Futures and options", "Hedging vs speculation", "Comparative analysis"] },
    ],
    assessment: seriesAssessment(
      "Project 1 (Module 3): a 400–600 word trading scenario justifying order type, position size, stop-loss and risk approach.",
      "Project 2 (Module 8): an 800–1,200 word comparative market report on two asset classes using recent data.",
      "eight",
    ),
    included: seriesIncluded(["Demo trading accounts", "Two projects and a final case"]),
    entry: ["No formal entry requirements", "Basic literacy, numeracy and English"],
    faqs: [
      { q: "Do I need a finance background?", a: "No. The programme starts from the beginning." },
      { q: "Do I need a trading account?", a: "No. Practice uses demo accounts." },
      { q: "How long does it take?", a: "About 16 weeks at roughly 10 hours a week. You can go faster or slower within your access period." },
      { q: "Will it get me a job?", a: "It targets skills for entry-level trading support, broking, investor-services and markets operations roles, but employers make hiring decisions and no job is guaranteed." },
    ],
    featured: true,
  },
  {
    slug: "isft-series-2-technical-analysis-and-trading-certificate",
    category: "ISFT Series",
    badge: "Series 2 · 24 credits",
    title: "ISFT-Series-2: Technical Analysis & Trading Certificate",
    tagline: "Read the economy, read the chart, build a plan you can test.",
    summary: "From economic data and central banks to candlesticks, indicators and Market Profile — ending with a full, backtested trade plan.",
    audience: "Aspiring analysts, traders and research-support roles",
    duration: "≈24 weeks · 240 learning hours",
    format: "Online · weekly live session · demo accounts & past data",
    credits: "24 credits · 12 modules",
    certification: "OCN London quality-assured · ISFT Series certificate",
    starts: "New batch on the 1st of every month",
    overview: [
      "Covers how economic data and central banks move markets, then teaches chart reading — from candlesticks and trends to indicators and Market Profile — ending with building and testing a full trade plan.",
      "Skills are market-agnostic across equities, FX, commodities and futures, with case studies drawn from real central bank decisions and data releases.",
    ],
    outcomes: [
      "Explain how data and central bank policy move markets",
      "Read and trade the main chart patterns and indicators",
      "Build a plan with an entry, a stop and a target",
      "Backtest a strategy by win rate, risk/reward, drawdown and profit factor",
    ],
    modules: [
      { title: "Fundamental Analysis and Economic Indicators", meta: "20 hrs · Quiz", topics: ["Fundamental data categories", "GDP, inflation and employment data", "Reading economic calendars"] },
      { title: "Central Banks and Monetary Policy", meta: "20 hrs · Quiz", topics: ["Central bank objectives and tools (incl. RBI)", "Interest rate policy", "QE and QT", "Effects on currency, bond and equity markets"] },
      { title: "Applied News Trading and Market Strategy", meta: "20 hrs · Quiz", topics: ["Risks and opportunities of news trading", "Volatility around releases", "News-event plans", "Post-trade evaluation"] },
      { title: "Economics for Financial Traders", meta: "20 hrs · Quiz + Project 1", topics: ["Growth, inflation and rates", "Trade balances and capital flows", "Links to Indian markets", "Written news-trading plan"] },
      { title: "Foundations of Technical Analysis", meta: "20 hrs · Quiz", topics: ["Core assumptions", "Technical vs fundamental analysis", "Chart types", "Timeframe selection"] },
      { title: "Candlestick Patterns: Structure and Types", meta: "20 hrs · Quiz", topics: ["Candlestick anatomy", "Doji, hammer and engulfing", "Market context"] },
      { title: "Candlestick Reversal Patterns", meta: "20 hrs · Quiz", topics: ["Morning star, evening star, shooting star", "Bullish and bearish reversals", "Reliability factors"] },
      { title: "Support, Resistance and Breakout Trading", meta: "20 hrs · Quiz", topics: ["Identifying levels", "Tested levels", "Breakouts and false breakouts", "Risk management"] },
      { title: "Trends, Channels and Wedges", meta: "20 hrs · Quiz", topics: ["Trend identification", "Trendline construction", "Price channels", "Rising and falling wedges"] },
      { title: "Chart Patterns and Fibonacci Analysis", meta: "20 hrs · Quiz", topics: ["Head and shoulders", "Double tops and bottoms", "Triangles and targets", "Fibonacci retracement and extension"] },
      { title: "Moving Averages, Bollinger Bands and Oscillators", meta: "20 hrs · Quiz", topics: ["SMA vs EMA", "Crossovers", "Bollinger Bands", "RSI and MACD"] },
      { title: "Market Profile, Volatility Time Bands and Advanced Tools", meta: "20 hrs · Quiz + Project 2", topics: ["Market Profile principles", "Volatility Time Bands", "Range Deviation Pivots", "Multi-chart portfolio"] },
    ],
    assessment: seriesAssessment(
      "Project 1 (Module 4): an 800–1,200 word news-trading plan on a real scheduled release, plus a post-event evaluation.",
      "Project 2 (Module 12): five annotated charts across markets and timeframes, plus a 1,500–2,000 word analytical report.",
      "twelve",
    ),
    included: seriesIncluded(["Demo accounts and past data for practice and backtesting"]),
    entry: ["No formal entry requirements", "Series 1 or equivalent market knowledge recommended"],
    faqs: [
      { q: "Is Series 1 required?", a: "No. It’s the best starting point for newcomers but optional if you already have market knowledge." },
      { q: "Will I trade real money?", a: "No. Practice uses demo accounts and past data." },
      { q: "What’s the workload?", a: "About 10 hours a week over 24 weeks, heaviest in the chart-analysis modules." },
      { q: "Will it get me a job?", a: "It’s designed for roles such as technical analyst, junior trader and research support, but employers make hiring decisions and no job is guaranteed." },
    ],
    featured: true,
  },
  {
    slug: "isft-series-3-derivatives-and-fixed-income-markets-certificate",
    category: "ISFT Series",
    badge: "Series 3 · 20 credits",
    title: "ISFT-Series-3: Derivatives & Fixed Income Markets Certificate",
    tagline: "How professionals price, hedge and think about rates.",
    summary: "Futures pricing, margin and hedging; bonds, yields and the yield curve; and a dedicated module on the Indian G-Sec market.",
    audience: "Aspiring treasury, fixed income and derivatives desk support",
    duration: "≈20 weeks · 200 learning hours",
    format: "Online · weekly live session",
    credits: "20 credits · 10 modules",
    certification: "OCN London quality-assured · ISFT Series certificate",
    starts: "New batch on the 1st of every month",
    overview: [
      "Teaches mechanics first — contract specification, pricing and margin — before strategy. Covers futures, bonds, yields, the Indian G-Sec market, bond futures and yield curve trades.",
      "Applied learning: construct and justify a futures hedge, then analyse a bond market scenario in a written report.",
    ],
    outcomes: [
      "Price, margin and hedge with futures",
      "Calculate bond yields and read the yield curve",
      "Explain how the Indian G-Sec market works and how a retail investor buys",
      "Entry-level readiness for treasury, fixed income and derivatives support roles",
    ],
    modules: [
      { title: "Introduction to Futures and Derivatives", meta: "20 hrs · Quiz", topics: ["Standardised futures", "Forwards vs options", "Exchange and clearing house roles"] },
      { title: "Futures Pricing, Margin and Basis", meta: "20 hrs · Quiz", topics: ["Spot–futures relationship", "Basis and convergence", "Initial and maintenance margin", "Margin calls"] },
      { title: "Hedging and Risk Management with Futures", meta: "20 hrs · Quiz", topics: ["Hedging principles", "Leverage risk", "Stop-losses and position sizing"] },
      { title: "Applied Futures Trading Strategies", meta: "20 hrs · Quiz + Project 1", topics: ["Trend-following", "Spread trading", "Constructing a hedge", "Calculating initial margin"] },
      { title: "Understanding Bonds and How They Work", meta: "20 hrs · Quiz", topics: ["Face value, coupon, maturity", "Bond returns", "Bonds as diversifiers"] },
      { title: "Bond Risks, Market Structure and Price Drivers", meta: "20 hrs · Quiz", topics: ["Interest rate, credit and inflation risk", "Duration", "Primary and secondary markets"] },
      { title: "Bond Types, Issuers and Classifications", meta: "20 hrs · Quiz", topics: ["Government, corporate and municipal bonds", "Credit ratings", "Sovereign vs corporate risk"] },
      { title: "Bond Yields, Pricing and Yield Curve Trading", meta: "20 hrs · Quiz", topics: ["Price–yield relationship", "Current yield", "Normal, flat and inverted curves"] },
      { title: "Indian Government Securities: Market and Access", meta: "20 hrs · Quiz", topics: ["RBI’s role", "T-Bills and dated securities", "RBI Retail Direct", "Retail participation"] },
      { title: "Bond Futures and Applied Market Strategies", meta: "20 hrs · Quiz + Project 2", topics: ["Bond futures pricing", "Hedging interest rate risk", "Scenario analysis"] },
    ],
    assessment: seriesAssessment(
      "Project 1 (Module 4): an 800–1,200 word futures hedging scenario report.",
      "Project 2 (Module 10): a 1,500–2,000 word bond market analytical report.",
      "ten",
    ),
    included: seriesIncluded(["Worked examples and simple formulas for pricing, margin and yield"]),
    entry: ["No formal entry requirements", "Series 1 or equivalent market knowledge recommended"],
    faqs: [
      { q: "Is this an NISM exam course?", a: "No. It’s a foundation course; NISM exams are separate and ISFT is not affiliated with NISM." },
      { q: "How much maths is needed?", a: "Basic arithmetic only." },
      { q: "Is it only about Indian bonds?", a: "No. It covers bonds generally, with one Indian G-Sec module." },
      { q: "Is a job guaranteed?", a: "No. It builds job-relevant skills, but hiring decisions rest with employers." },
    ],
  },
  {
    slug: "isft-series-4-trader-risk-and-mindset-certificate",
    category: "ISFT Series",
    badge: "Series 4 · 16 credits",
    title: "ISFT-Series-4: Trader Risk & Mindset Certificate",
    tagline: "Protect your capital, then protect your decisions.",
    summary: "Leverage, position size and loss limits — plus the biases and emotions that undermine trading decisions.",
    audience: "People who trade or plan to — prop, retail and junior desk roles",
    duration: "≈16 weeks · 160 learning hours",
    format: "Online · weekly live session",
    credits: "16 credits · 8 modules",
    certification: "OCN London quality-assured · ISFT Series certificate",
    starts: "New batch on the 1st of every month",
    overview: [
      "A programme on a trader’s own risk — leverage, position size, loss limits — and on the biases and emotions that undermine decisions. It does not cover bank credit or market risk work.",
      "Uses calculations, worked examples, a written risk report and a reflective trading journal.",
    ],
    outcomes: [
      "Control leverage, set loss limits and size every trade",
      "Write and follow a trading plan",
      "Recognise biases and emotions and use routines to manage them",
      "Readiness for prop, retail or risk-aware junior desk roles",
    ],
    modules: [
      { title: "Understanding Leverage and Margin", meta: "20 hrs · Quiz", topics: ["How leverage amplifies gains and losses", "Margin and leverage", "Risks of high leverage"] },
      { title: "Risk and Money Management", meta: "20 hrs · Quiz", topics: ["Risk per trade", "Diversification", "Position sizing against account size"] },
      { title: "Building a Trading Plan", meta: "20 hrs · Quiz", topics: ["Why a documented plan matters", "Entry, exit, risk and review", "Risk parameters"] },
      { title: "Risk Management Strategies", meta: "20 hrs · Quiz + Project 1", topics: ["Stop-losses, scaling out and hedging", "Approaches by market condition", "Recommending an approach"] },
      { title: "Trading Emotions: Recognition and Control", meta: "20 hrs · Quiz", topics: ["Common trading emotions", "Recognition techniques", "Structured decision processes"] },
      { title: "Market Psychology and Behavioural Finance", meta: "20 hrs · Quiz", topics: ["Confirmation bias, loss aversion, herding", "Bubbles and crashes", "Historical events"] },
      { title: "Visualisation, Self-Talk and Mental Performance", meta: "20 hrs · Quiz", topics: ["Visualisation", "Constructive self-talk", "Pre-session routines"] },
      { title: "Trade Execution, Goal Setting and P&L Management", meta: "20 hrs · Quiz + Project 2", topics: ["Goal-setting principles", "P&L pitfalls", "Reflective journalling"] },
    ],
    assessment: seriesAssessment(
      "Project 1 (Module 4): a 1,000–1,500 word risk management report on a trading scenario.",
      "Project 2 (Module 8): a 1,000–1,200 word structured reflective journal.",
      "eight",
    ),
    included: seriesIncluded(["Worked leverage, margin and position-sizing calculations", "Structured reflective trading journal"]),
    entry: ["No formal entry requirements", "Series 1 or equivalent recommended", "Basic arithmetic for leverage and sizing"],
    faqs: [
      { q: "Is it the same as bank risk management?", a: "No. It covers a trader’s own risk, not bank credit or market risk work." },
      { q: "Is it therapy or coaching?", a: "No. It’s education about behaviour and decision-making in trading." },
      { q: "Do I need trading experience?", a: "No, though it’s most useful if you trade or plan to." },
    ],
  },

  // ══════════════════════════ ISFT EXCELLENCE ══════════════════════════
  {
    slug: "isft-acft",
    category: "ISFT Excellence",
    badge: "ACFT · 8 weeks",
    title: "Advanced Certificate in Financial Trading (ACFT)",
    tagline: "Become a global financial trader.",
    summary: "An 8-week intensive covering markets, products, risk, trading techniques and decision-making through simulations and case studies.",
    audience: "Students, graduates and professionals",
    duration: "8 weeks · ≈2 hours guided learning daily",
    format: "Online with industry practitioners and mentorship",
    price: "₹2.5 Lakhs",
    certification: "Advanced Certificate in Financial Trading",
    overview: [
      "Learn how financial markets are analysed and navigated — combining market concepts, products, risk, trading techniques and decision-making through exercises, live-priced simulations and case studies.",
      "Taught by Head Trainer Neil Crammond with tutors Peter Glancy and Tony Andrews.",
    ],
    outcomes: [
      "Financial markets & derivatives: structure, asset classes and futures risks",
      "Fundamental & macro analysis: indicators, policy and market events",
      "Technical analysis: charts, overlays, momentum and setups",
      "Trading, risk & psychology: plans, P&L, diaries and behaviour",
    ],
    modules: [
      { title: "Financial Markets & Operations", meta: "Weeks 1–2", topics: ["Market structure", "Derivatives and asset classes", "Economic indicators", "Fundamental and news analysis", "Technical analysis with live data"] },
      { title: "Financial Products & Associated Risk", meta: "Weeks 3–4", topics: ["Bonds and short-term interest rates", "FX", "Commodities and futures", "Options", "Equities and global indices"] },
      { title: "Financial Trading Techniques", meta: "Weeks 5–6", topics: ["Analysing data and patterns", "Supply, demand and valuation", "Building trading plans", "Execution, P&L and risk", "Trading psychology"] },
      { title: "Lab Training, Assessment & Evaluation", meta: "Weeks 7–8", topics: ["MCQ assessments", "Daily trading diaries and portfolio", "Trade execution and review", "Tutor feedback"] },
    ],
    assessment: [
      "MCQ knowledge check — 70% minimum score",
      "Trading portfolio — at least 10 completed daily trading diaries",
      "Practical trading day — analyse, plan, execute, record and review trades",
    ],
    included: ["Guided learning with industry practitioners", "Institutional-level mentorship", "Live-priced market simulations and performance reviews", "Alumni network access"],
    featured: true,
  },
  {
    slug: "isft-liip",
    category: "ISFT Excellence",
    badge: "London · 6 days",
    title: "London Industry Immersion Programme (LIIP)",
    tagline: "Learning beyond the classroom — in the City of London.",
    summary: "A 6-day, 5-night in-person immersion: UK university visit, trading floor, exchange or brokerage visit, masterclasses and networking.",
    audience: "Students, graduates and professionals",
    duration: "6 days / 5 nights",
    format: "In person",
    price: "₹6 Lakhs",
    certification: "Certificate of participation",
    overview: [
      "LIIP places participants in London’s financial ecosystem, connecting academic learning with the institutional and cultural context of the City of London.",
      "It can stand alone or act as a capstone to the ACFT qualification.",
    ],
    outcomes: ["Global financial context", "Academic perspective from a UK university", "Exposure to trading floors, exchanges and brokerages", "Masterclasses and professional networking"],
    modules: [
      { title: "Arrival & Orientation", meta: "Day 1", topics: ["Airport transfer and check-in", "City orientation and briefing", "Welcome dinner with cohort and faculty"] },
      { title: "UK University Visit", meta: "Day 2", topics: ["Campus tour", "Live academic session with faculty and students"] },
      { title: "Trading Floor Experience", meta: "Day 3", topics: ["Funded-account demonstration", "Hands-on trading workshop with a mentor"] },
      { title: "Applied Academic Session", meta: "Day 4", topics: ["In-house academic session", "Applied case study", "Group project"] },
      { title: "Exchange, Brokerage & Industry", meta: "Day 5", topics: ["Exchange or brokerage visit", "Masterclass and networking mixer", "Certificate ceremony"] },
    ],
  },
  {
    slug: "isft-trp",
    category: "ISFT Excellence",
    badge: "Residency · 4 months",
    title: "Trading Residency Programme (TRP)",
    tagline: "Live market participation from day one.",
    summary: "Four months of live trading with an evaluation account, a funded account through ZenithWave Capital on passing, mentorship and a certified track record.",
    audience: "Learners ready to trade live",
    duration: "4 months · 10 months professional access",
    format: "Live trading · weekly sessions · 1-to-1 mentoring",
    price: "₹3 Lakhs",
    certification: "ISFT-certified performance record",
    overview: [
      "TRP moves education beyond theory into a structured trading environment — real market exposure across US and European markets, institutional-level mentorship and practical trading methods.",
      "Pass the live evaluation and receive a $50,000 funded account through ZenithWave Capital with an 80% profit split. One free evaluation retry is included.",
    ],
    outcomes: ["Trading discipline and routine", "Emotional control in volatile markets", "Risk management and capital preservation", "A verified, documented trading record"],
    modules: [
      { title: "Live Evaluation", meta: "Stage 1", topics: ["10% profit benchmark", "Maximum 6% drawdown", "ISFT 3% daily loss cap"] },
      { title: "Funded Trading", meta: "Stage 2", topics: ["$50,000 funded account via ZenithWave Capital", "80% profit split", "One free evaluation retry"] },
      { title: "Mentorship & Performance", meta: "Stage 3", topics: ["Daily Morning Missive", "Weekly live analysis with Neil Crammond", "Two 1-to-1 sessions monthly", "80-day trading diary", "Monthly guest sessions"] },
      { title: "Verified Performance", meta: "Stage 4", topics: ["Monthly performance reports", "P&L and win-rate analysis", "Drawdown and consistency tracking", "Rule-compliance tracking"] },
    ],
    included: ["Live evaluation account and funded account access on passing", "Daily Morning Missive", "Weekly live market sessions", "Two 1-to-1 mentoring sessions per month", "Recorded analysis library", "ISFT-certified performance record"],
    featured: true,
  },
  {
    slug: "isft-acft-trp",
    category: "ISFT Excellence",
    badge: "Combined",
    title: "ACFT + Trading Residency Programme",
    tagline: "Accredited education, then live trading.",
    summary: "The 8-week ACFT followed by the 4-month Trading Residency — evaluation, funded trading, mentorship and a certified track record.",
    audience: "Aspiring professional traders",
    duration: "8 weeks + 4 months",
    format: "Online ACFT · live trading residency",
    price: "₹5.5 Lakhs",
    certification: "ACFT · ISFT-certified performance record",
    overview: ["Combines accredited financial trading education with live market participation, evaluation, funded trading, mentorship and performance tracking — moving learners from theory to applied trading."],
    outcomes: ["Structured knowledge of markets and products", "Disciplined trading habits and risk management", "A documented trading record for interviews"],
    modules: [
      { title: "ACFT", meta: "8 weeks", topics: ["Markets and operations", "Products, pricing and risk", "Analysis and trading techniques", "Trading psychology", "Professional skills"] },
      { title: "Trading Residency", meta: "4 months", topics: ["Evaluation account from day one", "$25,000 funded account after evaluation · 80% split", "Weekly reviews and 1-to-1 mentoring", "80-day diary and monthly reports"] },
    ],
  },
  {
    slug: "isft-acft-liip",
    category: "ISFT Excellence",
    badge: "Combined",
    title: "ACFT + London Industry Immersion",
    tagline: "Accredited education, then a week in the City.",
    summary: "The 8-week online ACFT followed by one week of industry immersion in London.",
    audience: "Students, graduates and professionals",
    duration: "8 weeks online + 1 week in London",
    format: "Online · in person in London",
    price: "₹7.5 Lakhs",
    certification: "Advanced Certificate in Financial Trading",
    overview: ["Structured financial trading education plus a one-week industry experience in the City of London — an accredited qualification, applied market learning and exposure to the UK financial ecosystem."],
    outcomes: ["Analytical thinking and decision quality", "Professional communication", "Career readiness for trading, investment management and banking"],
    modules: [
      { title: "ACFT", meta: "8 weeks", topics: ["Markets and operations", "Products and risk", "Trading techniques and analysis", "Trading psychology", "Trading Lab with real-time priced markets"] },
      { title: "London Immersion", meta: "1 week", topics: ["UK university visit", "Trading floor experience", "Exchange or brokerage visit", "Masterclasses and networking"] },
    ],
  },
  {
    slug: "isft-trp-liip",
    category: "ISFT Excellence",
    badge: "Combined",
    title: "Trading Residency + London Immersion",
    tagline: "Live trading plus international exposure.",
    summary: "Four months of live trading residency with a funded account pathway, plus a week of industry immersion in London.",
    audience: "Learners ready to trade live",
    duration: "4 months + 1 week in London",
    format: "Live trading · in person in London",
    price: "₹7 Lakhs",
    certification: "ISFT-certified performance record",
    overview: ["A combined pathway of live market participation, trading discipline, mentorship, funded-account progression and a one-week London industry immersion."],
    outcomes: ["Practical trading experience and a documented record", "Professional mentorship", "International industry exposure"],
    modules: [
      { title: "Trading Residency", meta: "4 months", topics: ["Evaluation: 10% target, 3% daily loss marker", "$25,000 funded account after evaluation · 80% split", "Psychology coaching and 1-to-1 mentoring", "Diary and performance tracking"] },
      { title: "London Immersion", meta: "1 week", topics: ["UK university visit", "Trading floor experience", "Exchange or brokerage visit", "Networking"] },
    ],
  },
  {
    slug: "isft-acft-liip-trp",
    category: "ISFT Excellence",
    badge: "Complete pathway",
    title: "ACFT + LIIP + TRP — Complete Pathway",
    tagline: "Education, immersion and residency — the full journey.",
    summary: "The complete route: 8-week ACFT, a week in London and a 4-month trading residency with a funded account pathway.",
    audience: "Aspiring professional traders",
    duration: "≈4 months + 1 week",
    format: "Online · London · live trading",
    price: "₹10 Lakhs",
    certification: "ACFT · ISFT-certified track record",
    overview: ["A combined pathway linking accredited trading education, a London industry immersion and an extended live trading residency with mentorship and documented performance."],
    outcomes: ["A certified trading track record", "Practical skills and a structured plan", "London industry exposure and networking", "Alumni network access"],
    modules: [
      { title: "ACFT", meta: "8 weeks", topics: ["Equities, indices, FX, commodities, options, bonds and STIRs", "Fundamental, news and technical analysis", "Simulations and trading psychology"] },
      { title: "London Immersion", meta: "6 days / 5 nights", topics: ["UK university visit", "Trading floor experience", "Exchange or brokerage exposure", "Masterclass and networking"] },
      { title: "Trading Residency", meta: "4 months", topics: ["Evaluation account from day one", "$25,000 funded account after evaluation · 80% split", "Mentorship and guest sessions", "80-day diary and performance tracking"] },
    ],
    featured: true,
  },

  // ══════════════════════════ ISFT AWARDS ══════════════════════════
  {
    slug: "isft-award-in-introduction-to-financial-trading",
    category: "ISFT Awards",
    badge: "Award · 3 credits",
    title: "ISFT Award in Introduction to Financial Trading",
    tagline: "Understand the market. Trade with discipline.",
    summary: "Market structure, asset classes, trading platforms and risk management — with a practical written trading scenario.",
    audience: "Entry-level learners with no trading background",
    duration: "4–8 weeks · 28 GLH + 32 self-study",
    format: "Online, self-paced on the Derivion Academy LMS",
    credits: "3 units · 1 credit each",
    certification: "Accredited by OCN London (bespoke, not Ofqual-regulated)",
    overview: [
      "Covers how markets are structured, the main asset classes, how trading platforms work, and how to manage risk before placing an order.",
      "Prepares learners for further study through the ISFT Level 3 awards.",
    ],
    outcomes: ["Understand market structure and risk-aware decisions", "Core literacy in instruments and trading discipline", "Readiness for further ISFT study"],
    modules: [
      { title: "Financial Markets and Asset Classes", meta: "10 GLH + 10 self-study", topics: ["Purpose and structure of markets", "Main asset classes", "Market participants", "NSE and BSE in a global context"] },
      { title: "Market Structure and Trading Instruments", meta: "9 GLH + 11 self-study", topics: ["How markets are structured", "Trading instruments", "Bid, offer, spread, volume, liquidity", "Reading a basic quote"] },
      { title: "Trading Platforms, Orders and Risk Management", meta: "9 GLH + 11 self-study", topics: ["Trading platforms", "Order types", "Risk management", "Trading discipline"], milestone: "A 400–600 word trading scenario: order type, position size and stop-loss plan." },
    ],
    assessment: ["Each unit: 25-question online MCQ, auto-marked, 70% pass mark", "Unit 3: 400–600 word written trading scenario marked by the Head Educator"],
    included: ["Derivion Academy LMS access", "Video lectures and written study materials", "Auto-marked unit tests", "Toolkits and calculators"],
    entry: ["No formal qualifications", "Basic literacy and numeracy", "Able to study in English"],
    faqs: [
      { q: "Do I need prior experience or a trading account?", a: "No to both." },
      { q: "How long does it take?", a: "Most learners finish in four to eight weeks." },
    ],
  },
  {
    slug: "isft-award-in-applied-financial-markets-trading",
    category: "ISFT Awards",
    badge: "Award",
    title: "ISFT Award in Applied Financial Markets Trading",
    tagline: "Coming soon.",
    summary: "The next step in the ISFT Awards. Register your interest to be notified when enrolment opens.",
    audience: "To be announced",
    duration: "To be announced",
    format: "To be announced",
    overview: ["This award is in development. Register your interest and we’ll contact you when details and enrolment are published."],
    outcomes: [],
    modules: [],
    comingSoon: true,
  },
  {
    slug: "isft-award-in-introduction-to-financial-markets",
    category: "ISFT Awards",
    badge: "Award",
    title: "ISFT Award in Introduction to Financial Markets",
    tagline: "Coming soon.",
    summary: "An introductory ISFT award on how financial markets work. Register your interest to be notified when enrolment opens.",
    audience: "To be announced",
    duration: "To be announced",
    format: "To be announced",
    overview: ["This award is in development. Register your interest and we’ll contact you when details and enrolment are published."],
    outcomes: [],
    modules: [],
    comingSoon: true,
  },

  // ══════════════════════════ LITERACY ══════════════════════════
  {
    slug: "sprout-literacy",
    category: "Literacy",
    badge: "Ages 9–11",
    title: "Sprout Literacy",
    tagline: "Money & online safety for children 9–11.",
    summary: "Digital money, screen safety, AI awareness and fraud defence through concrete, relatable stories — built on the “Stop & Ask” reflex.",
    audience: "Children aged 9–11",
    duration: "3 hours · 5 modules",
    format: "Hybrid: short story episodes, activities and family discussion",
    overview: [
      "Covers five literacy areas — financial, digital, AI, cyber and legal — using concrete examples. Abstract topics such as shares, interest rates and investing are deliberately left out.",
      "The central habit is “Stop & Ask”: pause whenever money, screens or personal details are involved. Merit-based fee assistance is available for community and school groups.",
    ],
    outcomes: ["Stop & Ask before spending or sharing", "Verify confident screens, fake voices and “free” offers", "Needs vs wants and saving for goals", "Never share PINs, passwords or OTPs", "Say no to pressure and ask a trusted adult"],
    modules: [
      { title: "Money-Smart Sprout", meta: "≈1 hour · 10 episodes", topics: ["What is money?", "Needs and wants", "The Magic of Gullak (saving)", "Spending wisely", "Digital money", "Too good to be true"], milestone: "A personal Gullak savings goal and a Needs vs Wants map." },
      { title: "Digital-Smart Sprout", meta: "≈30 min · 5 episodes", topics: ["The invisible wallet", "“Free” isn’t free", "Mystery boxes", "The internet remembers"], milestone: "Audit a mobile game for hidden spending triggers." },
      { title: "Screen-Smart Sprout", meta: "≈30 min · 5 episodes", topics: ["The machine that can spend", "Fake requests", "Voice cloning"], milestone: "Spot three clues of manipulated media asking for money." },
      { title: "Cyber-Smart Sprout", meta: "≈30 min", topics: ["PINs, OTPs and passwords as secret keys", "Recognising urgency", "Online strangers", "Involving a trusted adult"], milestone: "Write a personal cyber safety rulebook." },
      { title: "Fair-and-Smart Sprout", meta: "≈30 min", topics: ["Say No", "Expect Fair", "Your money matters", "Get Help"], milestone: "Roleplay “Stop, Say No, and Ask a Grown-up”." },
    ],
    included: ["Interactive digital story episodes", "Guided activity worksheets", "Gullak Savings Tracker", "Screen Detective Challenges", "Family discussion guide"],
    entry: ["Children aged 9–11", "No prior money knowledge needed"],
    faqs: [
      { q: "Are shares or investing taught?", a: "No. These topics are explicitly excluded." },
      { q: "How are parents involved?", a: "Through guided conversation prompts and joint family activities." },
    ],
  },
  {
    slug: "bloom-literacy",
    category: "Literacy",
    badge: "Ages 11–14",
    title: "Bloom Literacy",
    tagline: "Money, AI & online safety for teens 11–14.",
    summary: "Earning, budgeting, deepfake defence and consumer rights for teens handling their first digital wallets — built on “Verify Before You Act”.",
    audience: "Teenagers aged 11–14",
    duration: "4 hours · 5 modules",
    format: "Hybrid: digital masterclasses and applied projects",
    overview: [
      "For teenagers handling their first digital wallets, subscriptions and AI-driven platforms. The core reflex is “Verify Before You Act”.",
      "Weekend or after-school hybrid batches for individuals and schools. Merit-based scholarships available.",
    ],
    outcomes: ["Independent digital prudence", "Synthetic media resilience", "Consumer rights competence"],
    modules: [
      { title: "Money-Smart Teenager", meta: "≈1 hour · 8 episodes", topics: ["Earning your own money", "Budgeting", "Saving with purpose", "The real cost of borrowing", "Comparing before buying"], milestone: "A 30-day teen budget and a purchase valuation audit." },
      { title: "Digital-Smart Teenager", meta: "≈45 min · 6 episodes", topics: ["Tapping is spending", "Recurring subscriptions", "In-game spending", "Payment records"], milestone: "A digital footprint and subscription audit." },
      { title: "AI-Smart Teenager", meta: "≈45 min · 6 episodes", topics: ["Undetectable fakes", "Voice cloning and call-back verification", "Fake celebrity endorsements", "Confidently wrong AI"], milestone: "Verify three simulated viral clips and claims." },
      { title: "Cyber-Smart Teenager", meta: "≈45 min", topics: ["OTP and PIN safety", "UPI collect requests and QR traps", "2FA and account takeover", "Reporting"], milestone: "Configure 2FA and an incident response plan." },
      { title: "Fair-and-Rights-Smart Teenager", meta: "≈45 min", topics: ["Reading terms", "Consumer rights", "Data as currency", "Evidence and complaints"], milestone: "A consumer dispute dossier." },
    ],
    included: ["Teen Budget Simulator", "Subscription Tracker Sheet", "Deepfake Verification Toolkit", "Cyber Incident Response Checklist", "Digital workbook and simulation portal"],
    entry: ["Ages 11–14", "Teen registration with parent confirmation"],
    faqs: [
      { q: "How does Bloom differ from Sprout?", a: "Sprout builds foundational safe habits (“Stop & Ask”); Bloom builds independent capability with deeper budgeting, deepfake defence and “Verify Before You Act”." },
      { q: "Does Bloom cover UPI?", a: "Yes — UPI mechanics, collect requests, QR traps, subscription billing and transaction trails." },
    ],
  },
  {
    slug: "harvest-literacy",
    category: "Literacy",
    badge: "Adults 18+",
    title: "Harvest Literacy",
    tagline: "Adult financial literacy & fraud awareness.",
    summary: "Personal finance, credit traps, market mechanics, AI fraud, cyber deception and legal recourse — “Judge, Verify & Know Your Recourse”.",
    audience: "Adults 18+ — students, earners, investors, professionals",
    duration: "6.5 hours · 5 modules",
    format: "Hybrid: masterclasses and reconstructed case studies",
    overview: [
      "Helps adults protect their savings across personal finance, credit traps, market mechanics, AI-driven fraud, cyber deception and consumer legal recourse.",
      "Educational only — no investment tips or advisory services. Corporate group pricing available.",
    ],
    outcomes: ["Capital & wealth defence", "Cyber & AI threat neutrality", "Legal redressal readiness"],
    modules: [
      { title: "Harvest Financial", meta: "≈2.5 hours · 9 units", topics: ["Budgeting and emergency funds", "Credit, loans and the EMI trap", "How markets actually work", "Insurance", "The finfluencer trap", "Rights and recourse"], milestone: "A personal financial health and debt framework." },
      { title: "Harvest Digital", meta: "≈1 hour", topics: ["UPI AutoPay mandates", "Dark patterns", "Buy Now Pay Later", "Digital asset succession"], milestone: "A mandate clearance audit." },
      { title: "Harvest AI", meta: "≈1 hour", topics: ["Deepfakes in social engineering", "Fake brokerages and dashboards", "Hallucinated AI outputs", "Verification protocols"], milestone: "An AI scam-detection checklist." },
      { title: "Harvest Cyber", meta: "≈1 hour", topics: ["Phishing, smishing, vishing, quishing", "Fake KYC and refund links", "SIM swaps and malicious APKs", "Golden-hour response"], milestone: "A cyber emergency response dossier." },
      { title: "Harvest Legal", meta: "≈1 hour", topics: ["Digital consumer rights", "DPDPA data rights", "RBI Ombudsman, SEBI SCORES, Consumer Commissions", "Evidence preservation"], milestone: "A formal grievance redressal dossier." },
    ],
    included: ["Financial Health & EMI Calculator", "Digital Mandate Auditor", "Five reconstructed case studies", "RBI Ombudsman Escalation Guide"],
    entry: ["Aged 18 or over"],
    faqs: [
      { q: "Is this investment advice?", a: "No. It is financial education on defence, market mechanics, credit and fraud avoidance." },
      { q: "What are the case studies?", a: "Five reconstructed analyses of real market failures and impossible-yield schemes." },
    ],
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
