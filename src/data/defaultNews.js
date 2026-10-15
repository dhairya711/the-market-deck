// Default curated high-signal intelligence stories
export const categories = [
  { id: 'all', label: 'All News', icon: '📰' },
  { id: 'tech', label: 'Tech Specs 💻', icon: '💻' },
  { id: 'energy', label: 'Energy & Grid ⚡', icon: '⚡' },
  { id: 'stonks', label: 'Stonks Arena 📈', icon: '📈' },
  { id: 'metal', label: 'Metal Shine ✨', icon: '✨' },
  { id: 'vc', label: 'VC Inflow 🚀', icon: '🚀' },
  { id: 'regulation', label: 'Regulation Patrol ⚖️', icon: '⚖️' },
  { id: 'global', label: 'Global Dial 🌐', icon: '🌐' },
  { id: 'yield', label: 'Yield Flow 💸', icon: '💸' },
  { id: 'smart', label: 'Smart Reads 🧠', icon: '🧠' },
  { id: 'brain-gym', label: 'Brain Gym 🎲', icon: '🎲', isSpecial: true },
];

export const initialNews = [
  {
    id: 'lead-1',
    isLead: true,
    title: 'stonks playground Holiday 2026: Are NSE, BSE closed tomorrow on May 28 for Bakri Id? Check market vibe holidays here ⚡',
    titleExecutive: 'Market Schedule Advisory: NSE and BSE Trading Closure for Bakri Id',
    source: 'ECONOMIC TIMES',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: 'MAY 27, 2026 • 10:34 AM',
    timeAgo: 'Just now',
    summary: 'Indian stonks arena will observe a shortened trading week due to the Bakri Id holiday. Marks the ninth market vibe holiday of 2026, with seven more scheduled before year-end. MCX has partial closure while NCDEX remains fully closed.',
    bullets: [
      'Equities, Equity Derivatives, and SLB segment will be completely shut for trading.',
      'Commodity markets (MCX) will be closed in the morning session (9:00 AM - 5:00 PM) but will open for the evening session (5:00 PM onwards).',
      'Settlement holiday status: Trades executed on May 27 will settle on May 29. Margin calls must be maintained prior to evening cutoff.'
    ],
    whyItMatters: 'Liquidity thinness often leads to elevated pre-holiday volatility. Plan derivative roll-overs and option expiries without getting caught in holiday time-decay spikes.',
    tickers: ['$NSE', '$BSE', '$NIFTY', '$MCX'],
    sentiment: 'neutral',
    noiseFiltered: 'Stripped 800 words of generic holiday greeting fluff, travel itinerary recommendations, and ad-laden filler.',
    readTime: '2 min read',
    content: `
### Key Tactical Summary for Traders & Investors

Indian markets (NSE & BSE) will observe an official trading break on Thursday, May 28, 2026. This represents the 9th scheduled market break of the calendar year.

#### 1. Segment-by-Segment Operations
* **Equity Cash & F&O**: Completely closed for the entire day.
* **Currency Derivatives**: Completely closed.
* **Commodities (MCX)**: Closed morning session (9:00 AM - 5:00 PM). Active evening session from 5:00 PM to 11:30 PM to align with US and European commodity trading.
* **NDX / NCDEX**: Full day closure.

#### 2. Settlement & Pay-in Dynamics
Since banking channels operate under holiday clearing protocols, Pay-in and Pay-out of securities and funds will shift by +1 settlement cycle. Any options expiring on Thursday will expire on Wednesday's closing bell.

#### 3. Portfolio Recommendation
* Review open weekend/holiday delta exposure.
* Ensure adequate collateral buffers on active overnight index spreads.
    `
  },
  {
    id: 'story-1',
    isLead: false,
    title: 'Nifty Vibe Check: Range-Bound Action Continues as 23,200 backing Holds the Line ⚡',
    titleExecutive: 'Nifty Index Analysis: 23,200 Support Level Defended Amid Range-Bound Consolidation',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: 'MAY 27, 2026 • 12:06 PM',
    timeAgo: '15m ago',
    summary: 'Nifty has been deadass playing in a tight range between 23,200 and 23,900. Geopolitical stress and FII index future short-covering keep bulls and bears locked in neutral territory.',
    bullets: [
      '23,200 Put base currently holds max open interest of 1.4 crore contracts.',
      'Bank Nifty outperforming on private banking institutional accumulation ($HDFCBANK, $ICICIBANK).',
      'FII net cash flow turned mildly positive (+₹480 Cr) after 6 straight sessions of outflows.'
    ],
    whyItMatters: 'Breakout above 23,850 triggers rapid short covering toward 24,200. Clean breakdown below 23,150 risks 400-point slide.',
    tickers: ['$NIFTY50', '$BANKNIFTY', '$HDFCBANK'],
    sentiment: 'bullish',
    noiseFiltered: 'Eliminated 12 generic technical indicator charts without trade context.',
    readTime: '1.5 min read',
    content: `Institutional positioning indicates strong floor defense at 23,200. Heavy Put writing confirms retail and proprietary desks expect no major systemic drop before the upcoming macro inflation readout.`
  },
  {
    id: 'story-2',
    isLead: false,
    title: 'Tata Motors Splitting stonk 1:10: Making stonks Accessible to the Retail Fam, Fr Fr 💀',
    titleExecutive: 'Tata Motors Announces 1:10 Stock Split to Enhance Retail Market Liquidity',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: 'MAY 27, 2026 • 09:06 AM',
    timeAgo: '42m ago',
    summary: 'Tata Motors board approved a 1:10 stock split to improve liquidity and invite smaller retail money gang. JLR margins continue to print cash while domestic EV market share stabilizes at 68%.',
    bullets: [
      'Split ratio: 1 equity share of face value ₹10 split into 10 equity shares of ₹1 face value.',
      'Record date expected within 60 days following AGM shareholder approval.',
      'EV division demerger roadmap remains on track for Q4 FY27.'
    ],
    whyItMatters: 'Lowers ticket size per lot from ₹9,850 to ~₹985, drastically increasing F&O option participation and retail liquidity.',
    tickers: ['$TATAMOTORS', '$AUTO'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered out promotional CEO quotes and generic auto industry history.',
    readTime: '2 min read',
    content: `Tata Motors follows global auto majors in splitting high-nominal share values. Balance sheet net automotive debt is down 92% YoY, leaving JLR and India Commercial Vehicles cleanly capitalized.`
  },
  {
    id: 'story-3',
    isLead: false,
    title: 'Zomato Bags All-Time High price tag flex: Food Delivery is Highkey the Primary space Compounder 🕶️',
    titleExecutive: 'Zomato Hits Record High: Blinkit Quick Commerce Hypergrowth Drives Valuation Expansion',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: 'MAY 27, 2026 • 06:06 AM',
    timeAgo: '1h ago',
    summary: 'Zomato stonk price pumped hard past previous all-time highs as Blinkit dark stores achieve EBITDA breakeven ahead of guidance. Average order value (AOV) expanded 14% YoY.',
    bullets: [
      'Blinkit dark store count scaled to 1,000+ stores with average store payback under 11 months.',
      'Platform fee increased by ₹1 to ₹7/order without any measurable churn.',
      'Going-out business integration showing early synergy with ticketing ecosystem.'
    ],
    whyItMatters: 'Quick commerce is shifting from discretionary novelty to consumer utility, structurally eating traditional mom-and-pop FMCG distribution share.',
    tickers: ['$ZOMATO', '$BLINKIT'],
    sentiment: 'bullish',
    noiseFiltered: 'Cut out social media influencer memes and food review digressions.',
    readTime: '2 min read',
    content: `Zomato has transformed from an unprofitable food aggregator to a high-margin consumer commerce platform. Multiple global brokerages upgraded price targets to ₹310-₹330.`
  },
  {
    id: 'story-4',
    isLead: false,
    title: 'NVIDIA B200 Ultra Rollout: Hyperscalers Lock in 18-Month Allocation Queues 💻',
    titleExecutive: 'NVIDIA Blackwell Architecture: Hyperscaler Backlogs Extend Through Next 6 Quarters',
    source: 'TECHCRUNCH',
    category: 'tech',
    categoryLabel: 'TECH SPECS 💻',
    timestamp: 'MAY 27, 2026 • 08:15 AM',
    timeAgo: '2h ago',
    summary: 'Demand for Blackwell GB200 NVL72 racks has pushed order books well into late 2027. Microsoft, Meta, and Google CAPEX announcements confirm zero AI infrastructure pause.',
    bullets: [
      'TSMC CoWoS packaging capacity expansion running at 110% utilization.',
      'Liquid cooling suppliers seeing 400% revenue guidance increases for server thermal management.',
      'Gross margins projected to hold firm at 74.5% despite node transitions.'
    ],
    whyItMatters: 'Semiconductor capital equipment (ASML, Applied Materials) and power grid infrastructure (Vertiv, Eaton) continue as prime secondary beneficiaries.',
    tickers: ['$NVDA', '$TSMC', '$MSFT', '$GOOGL'],
    sentiment: 'bullish',
    noiseFiltered: 'Removed speculative AI doomer essays and non-technical press releases.',
    readTime: '2.5 min read',
    content: `Enterprise AI inferencing workloads are expanding faster than training workloads. Hardware lock-in via CUDA software moat prevents quick hyperscaler migration to custom ASICs.`
  },
  {
    id: 'story-5',
    isLead: false,
    title: 'Grid Overload Alert: Data Centers Demand Dedicated Nuclear Small Modular Reactors ⚡',
    titleExecutive: 'Utility Grid Constraints: Tech Giants Sign Long-Term Nuclear Power Purchase Agreements',
    source: 'BLOOMBERG',
    category: 'energy',
    categoryLabel: 'ENERGY & GRID ⚡',
    timestamp: 'MAY 27, 2026 • 07:45 AM',
    timeAgo: '3h ago',
    summary: 'Baseload energy requirements for gigawatt AI clusters are driving direct private contracts with nuclear plant operators. Uranium spot prices touch 15-year resistance levels.',
    bullets: [
      'Constellation Energy and Talen Energy leading private PPA transactions with hyperscalers.',
      'US Department of Energy accelerates fast-track licensing for SMR commercial deployments.',
      'Transmission line construction backlogs now average 6.5 years across PJM and ERCOT grids.'
    ],
    whyItMatters: 'The biggest bottleneck for AI scale is no longer chips—it is electricity baseload and substation transformers.',
    tickers: ['$CEG', '$TLN', '$ETN', '$CCJ'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped 1,200 words of environmental lobbying debate to focus on balance sheet contracts.',
    readTime: '2 min read',
    content: `Energy transition capital is rotating straight from intermittent wind/solar farms toward always-on 24/7 clean baseload power sources.`
  },
  {
    id: 'story-6',
    isLead: false,
    title: 'Copper Squeeze Looming: Supply Deficit Projected at 4.2M Metric Tons by 2028 ✨',
    titleExecutive: 'Copper Structural Deficit: Smelter Cutbacks and EV Grid Demand Tighten Physical Markets',
    source: 'REUTERS',
    category: 'metal',
    categoryLabel: 'METAL SHINE ✨',
    timestamp: 'MAY 27, 2026 • 05:30 AM',
    timeAgo: '4h ago',
    summary: 'Chinese smelters agreed on processing fee reductions as raw copper concentrate shortages bite. EV harness requirements and electrification keep red metal demand inelastic.',
    bullets: [
      'LME warehouse inventories dropped 22% month-on-month.',
      'Mine permitting in Chile and Peru facing extended local regulatory timelines.',
      'Gold/Silver ratio compresses as silver industrial photovoltaic usage soars.'
    ],
    whyItMatters: 'Commodity miners (Freeport-McMoRan, BHP, Southern Copper) are paying record dividend yields while holding minimal debt.',
    tickers: ['$FCX', '$BHP', '$COPPER', '$GOLD'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered speculative commodity newsletter hype.',
    readTime: '1.5 min read',
    content: `Physical red metal stocks are hitting critically low days of consumption. Any sudden supply disruption at major Andean mines will trigger violent upside squeeze in futures contracts.`
  },
  {
    id: 'story-7',
    isLead: false,
    title: 'VCs Stop Chasing LLM Wrappers, Pivot $18B Into Physical AI & Defense Tech 🚀',
    titleExecutive: 'Venture Capital Capital Reallocation: Seed Funds Pivot Toward Robotics and Defense Tech',
    source: 'TECHCRUNCH',
    category: 'vc',
    categoryLabel: 'VC INFLOW 🚀',
    timestamp: 'MAY 27, 2026 • 04:10 AM',
    timeAgo: '5h ago',
    summary: 'Silicon Valley early-stage checks are drying up for API-wrapper SaaS startups. Founders with hardware, aerospace, autonomous defense, and lab robotics are raising oversubscribed seed rounds.',
    bullets: [
      'Defense tech series A median valuations reached $85M, up 40% YoY.',
      'Software-only startups facing down-rounds as enterprise seat-based pricing collapses.',
      'Dual-use technology funds granted streamlined NATO and Pentagon procurement tracks.'
    ],
    whyItMatters: 'Software multiples are normalizing toward historical medians while physical moat companies command defensible software-plus-hardware margins.',
    tickers: ['$ANDURIL', '$PLTR', '$LMT'],
    sentiment: 'neutral',
    noiseFiltered: 'Cut PR marketing pitch decks and vague founder visionary manifestos.',
    readTime: '2 min read',
    content: `The era of raising $20M for a ChatGPT prompt wrapper is officially over. Institutional allocators demand proprietary physical datasets and government-contracted revenue pipelines.`
  },
  {
    id: 'story-8',
    isLead: false,
    title: 'SEC Finalizes Quantum Computing Encryption Mandate for Wall Street Clearers ⚖️',
    titleExecutive: 'Regulatory Update: SEC Imposes Post-Quantum Cryptography Deadlines for Financial Institutions',
    source: 'FINANCIAL TIMES',
    category: 'regulation',
    categoryLabel: 'REGULATION PATROL ⚖️',
    timestamp: 'MAY 27, 2026 • 03:20 AM',
    timeAgo: '6h ago',
    summary: 'Clearinghouses, prime brokers, and payment rails have until Q1 2028 to replace legacy RSA-2048 encryption with NIST-approved lattice cryptography standards.',
    bullets: [
      'Compliance capital expenditure estimated at $4.2B across Tier-1 investment banks.',
      'Cybersecurity vendors with post-quantum certifications win multi-year enterprise contracts.',
      'Federal reserve stress tests will incorporate quantum key decryption failure scenarios.'
    ],
    whyItMatters: 'Forces mandatory IT infrastructure spending even in tight corporate budget cycles, directly benefiting enterprise security firms.',
    tickers: ['$CRWD', '$PANW', '$IBM'],
    sentiment: 'neutral',
    noiseFiltered: 'Filtered legal jargon and procedural filing notices.',
    readTime: '2 min read',
    content: `Post-quantum readiness has shifted from an academic theoretical discussion to a binding regulatory liability for all global financial market participants.`
  },
  {
    id: 'story-9',
    isLead: false,
    title: 'US 10-Yr Yield Glides at 4.60%: Term Premium Returns as Deficit Concerns Bite 💸',
    titleExecutive: 'Treasury Markets: 10-Year Yield Stabilizes Near 4.60% as Term Premium Rebounds',
    source: 'BLOOMBERG',
    category: 'yield',
    categoryLabel: 'YIELD FLOW 💸',
    timestamp: 'MAY 27, 2026 • 02:00 AM',
    timeAgo: '7h ago',
    summary: 'Bond traders are demanding higher term premium to hold long-duration sovereign paper as US fiscal deficit projections stay at 6.8% of GDP regardless of election outcomes.',
    bullets: [
      '2Y/10Y yield curve inversion has ended, transitioning to a healthy bull steepening regime.',
      'Foreign central banks stabilizing gold reserves while maintaining neutral Treasury allocations.',
      'High yield corporate spreads remain remarkably tight at 310 bps over benchmark.'
    ],
    whyItMatters: 'Higher baseline risk-free rates compress equity valuation multiples for long-dated unprofitable growth stories while boosting interest income for cash-rich companies.',
    tickers: ['$TLT', '$SHY', '$HYG', '$US10Y'],
    sentiment: 'neutral',
    noiseFiltered: 'Cut political campaign mudslinging to isolate pure debt auction metrics.',
    readTime: '2.5 min read',
    content: `Treasury auction bid-to-cover ratios show solid domestic institutional demand, but primary dealers are required to absorb higher tail yields on 30-year auctions.`
  },
  {
    id: 'story-10',
    isLead: false,
    title: 'The Art of Capital Allocation: Why Free Cash Flow Yield Crushes EBITDA Optics 🧠',
    titleExecutive: 'Executive Dossier: High-Signal Framework for Analyzing Free Cash Flow Conversion',
    source: 'THE BROADSHEET DOSSIER',
    category: 'smart',
    categoryLabel: 'SMART READS 🧠',
    timestamp: 'MAY 27, 2026 • 01:15 AM',
    timeAgo: '8h ago',
    summary: 'A deep-dive on why accounting EBITDA is used by promoters to hide capital expenditure intensity, and how calculating owner earnings separates genuine compounders from capital incinerators.',
    bullets: [
      'EBITDA ignores depreciation—which in real businesses is money already spent on assets dying.',
      'Stock-based compensation (SBC) is a real dilution cost that must be deducted from operating cash flow.',
      'Companies with ROIC > WACC reinvesting at high rates compound wealth monotonically.'
    ],
    whyItMatters: 'Applying this filter to your personal portfolio eliminates 70% of potential capital trap stocks before you take a position.',
    tickers: ['$BRK.A', '$GOOGL', '$AAPL'],
    sentiment: 'bullish',
    noiseFiltered: 'Extracted purely mathematical framework; stripped all promotional trading course pitches.',
    readTime: '4 min read',
    content: `As Charlie Munger famously noted, "Every time you hear EBITDA, substitute the phrase 'bullshit earnings'". Real investors evaluate after-tax cash available to be pulled out of the enterprise without impairing its competitive moat.`
  }
];

// Interactive Brain Gym Games Data
export const brainGymData = {
  sudoku: {
    puzzle: [
      [0, 8, 3, 0, 7, 0, 0, 6, 0],
      [9, 0, 1, 5, 0, 2, 7, 4, 8],
      [2, 0, 7, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 3, 0],
      [6, 5, 2, 8, 0, 0, 0, 7, 0],
      [0, 0, 4, 0, 0, 1, 5, 0, 0],
      [5, 0, 1, 0, 0, 6, 0, 9, 7],
      [8, 4, 0, 7, 0, 9, 3, 0, 0],
      [7, 2, 9, 0, 0, 0, 0, 0, 6]
    ],
    solution: [
      [4, 8, 3, 9, 7, 5, 1, 6, 2],
      [9, 6, 1, 5, 3, 2, 7, 4, 8],
      [2, 5, 7, 1, 6, 8, 9, 3, 4],
      [1, 9, 8, 6, 4, 7, 2, 3, 5],
      [6, 5, 2, 8, 9, 3, 4, 7, 1],
      [3, 7, 4, 2, 5, 1, 5, 8, 9],
      [5, 3, 1, 4, 8, 6, 2, 9, 7],
      [8, 4, 6, 7, 2, 9, 3, 1, 5],
      [7, 2, 9, 3, 1, 4, 8, 5, 6]
    ]
  },
  wordleWords: [
    { word: 'ASSET', clue: 'Something valuable owned by an entity or person' },
    { word: 'YIELD', clue: 'The annual earnings generated on an investment' },
    { word: 'BULLS', clue: 'Market participants expecting prices to rise' },
    { word: 'BEARS', clue: 'Market participants expecting prices to fall' },
    { word: 'BONDS', clue: 'Fixed income debt instruments issued by states or firms' },
    { word: 'FUNDS', clue: 'Pooled capital allocated for investments' },
    { word: 'SHARE', clue: 'One unit of ownership in a corporation' },
    { word: 'STONK', clue: 'Internet slang for an equity with meme momentum' },
    { word: 'DIVVY', clue: 'Informal term for dividend payout' },
    { word: 'TRADE', clue: 'Buying or selling a financial security' },
    { word: 'DELTA', clue: 'Ratio comparing change in derivative price to underlying' }
  ],
  triviaQuestions: [
    {
      question: "Which ratio is commonly known as the 'Acid-Test Ratio' in corporate balance sheets?",
      options: ["Debt-to-Equity Ratio", "Quick Ratio", "Price-to-Earnings Ratio", "Current Ratio"],
      answerIndex: 1,
      explanation: "The Quick Ratio measures short-term liquidity by excluding inventories from current assets."
    },
    {
      question: "What term describes the intentional demerger or division of one share into multiple shares?",
      options: ["Reverse Split", "Stock Split", "Rights Issue", "Bonus Debenture"],
      answerIndex: 1,
      explanation: "A stock split increases liquidity without changing the overall market capitalization or shareholder percentage ownership."
    },
    {
      question: "What does 'basis point' (bps) represent in finance?",
      options: ["1%", "0.1%", "0.01%", "0.001%"],
      answerIndex: 2,
      explanation: "1 basis point = 0.01% (or 1/100th of 1 percent). 100 bps = 1.00%."
    }
  ],
  higherOrLower: [
    { entityA: "Apple Inc. (Market Cap)", valA: 3450, entityB: "NVIDIA Corp. (Market Cap)", valB: 3380, metric: "Billion USD" },
    { entityA: "Reliance Industries", valA: 235, entityB: "Tata Consultancy Services (TCS)", valB: 180, metric: "Billion USD" },
    { entityA: "Bitcoin Market Cap", valA: 1320, entityB: "Physical Gold Market Cap", valB: 17200, metric: "Billion USD" }
  ]
};
