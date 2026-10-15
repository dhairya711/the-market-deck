// Default curated high-signal intelligence stories with dynamic real-time dates
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

const getTodayDateStr = (offsetHours = 0) => {
  const d = new Date(Date.now() - offsetHours * 3600 * 1000);
  const datePart = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase();
  const timePart = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} • ${timePart}`;
};

export const initialNews = [
  {
    id: 'lead-today',
    isLead: true,
    title: 'Yes Bank AT-1 Bonds Nosedive 20%: Supreme Court Rules ₹8,415 Cr Write-Off Illegal, Reopening Balance Sheet Risk ⚡',
    titleExecutive: 'Supreme Court Verdict: Yes Bank ₹8,415 Crore AT-1 Bond Write-Down Declared Invalid',
    source: 'ECONOMIC TIMES',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(0.2),
    timeAgo: '12m ago',
    summary: 'Supreme Court delivered a landmark ruling declaring the March 2020 decision to write down ₹8,415 crore of Additional Tier-1 (AT-1) bonds illegal. Bank stock dropped sharply as investors weigh potential capitalization requirements and liability provisions.',
    bullets: [
      'Supreme Court upholds Bombay High Court judgment; AT-1 bondholders win 4-year legal battle.',
      'Yes Bank common equity tier-1 (CET-1) ratio could take a 160-200 bps hit if full liability is restored.',
      'RBI and SBI consortium reviewing legal avenues including a curative petition or phased capital relief.'
    ],
    whyItMatters: 'Direct impact on Indian banking sector risk pricing. Creates precedent for subordinated debt recovery and impacts bond yields across Tier-1 bank issuers.',
    tickers: ['$YESBANK', '$BANKNIFTY', '$SBI', '$NSE'],
    sentiment: 'bearish',
    noiseFiltered: 'Stripped 1,400 words of court hallway reactions and historical reconstruction to focus on balance sheet solvency.',
    readTime: '2 min read',
    content: `
### Key Tactical Analysis for Banking Investors

The Supreme Court of India dismissed appeals challenging the Bombay High Court ruling that struck down the write-off of ₹8,415 crore worth of Additional Tier-1 (AT-1) bonds of Yes Bank in March 2020.

#### 1. Balance Sheet Implications
* **Total AT-1 Exposure**: ₹8,415 Crore.
* **Potential Capital Erosion**: Estimated 160 to 200 basis points on CET-1 ratio.
* **Potential SBI Backstop**: State Bank of India currently holds a 24% stake following the 2020 reconstruction scheme and may be required to participate in recapitalization.

#### 2. Sector-Wide Contagion Assessment
* Private sector banks with outstanding AT-1 paper ($HDFCBANK, $ICICIBANK, $AXISBANK) trade on pristine standalone capital buffers (>16% CAR) and are insulated from direct legal read-across.
* Spreads on perpetual debt paper may widen 15-25 bps in the short term.
    `
  },
  {
    id: 'story-1',
    isLead: false,
    title: 'Nifty Vibe Check: Range-Bound Action as 23,000 Support Holds Firm Ahead of Earnings ⚡',
    titleExecutive: 'Nifty Index Analysis: Key 23,000 Psychological Support Defended Amid FII Rebalancing',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(0.5),
    timeAgo: '30m ago',
    summary: 'Nifty staged an intraday recovery after testing 22,950 intraday lows. Heavy Put writing at 23,000 strike and domestic DII net buying of ₹2,100 Cr shielded the index against global tech selloff pressure.',
    bullets: [
      '23,000 Put strike open interest stands at 1.82 crore contracts (solid floor defense).',
      'Reliance Industries and HDFC Bank contributed 65% of the afternoon rebound points.',
      'India VIX slipped 4.2% back to 13.45, confirming no panic among institutional desks.'
    ],
    whyItMatters: 'Holding 23,000 into the weekend preserves the intermediate bullish structure for a push toward 23,600.',
    tickers: ['$NIFTY50', '$BANKNIFTY', '$RELIANCE'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped repetitive morning commentary and recycled anchor interviews.',
    readTime: '1.5 min read',
    content: `Institutional positioning shows structural domestic liquidity acting as a permanent shock absorber against foreign macroeconomic outflows.`
  },
  {
    id: 'story-2',
    isLead: false,
    title: 'Tata Motors Splitting stonk 1:10: Making stonks Accessible to the Retail Fam, Fr Fr 💀',
    titleExecutive: 'Tata Motors 1:10 Stock Split Approved: Board Targets Enhanced Retail Participation',
    source: 'ECONOMIC TIMES',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(1.2),
    timeAgo: '1h ago',
    summary: 'Tata Motors confirmed execution timeline for its 1:10 equity share sub-division. JLR order backlog stands firm at 148,000 units while commercial vehicle EBITDA margins expanded to 11.2%.',
    bullets: [
      'Face value reduced from ₹10 to ₹1 per equity share.',
      'Target record date scheduled post shareholder AGM vote.',
      'Demerger of Commercial Vehicles and Passenger Vehicles businesses on track for FY26-27.'
    ],
    whyItMatters: 'Drastically reduces F&O lot margin requirements, boosting option trading volume and small retail investor participation.',
    tickers: ['$TATAMOTORS', '$NSE', '$AUTO'],
    sentiment: 'bullish',
    noiseFiltered: 'Cut out repetitive management quotes and promotional EV slides.',
    readTime: '2 min read',
    content: `Tata Motors balance sheet turnaround remains one of the cleanest in corporate India, with net auto debt reduced by over 90% in two years.`
  },
  {
    id: 'story-3',
    isLead: false,
    title: 'Zomato Bags All-Time High price tag flex: Food Delivery is Highkey the Primary space Compounder 🕶️',
    titleExecutive: 'Zomato Hits Record High: Blinkit Quick Commerce Hypergrowth Drives Valuation Expansion',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(2),
    timeAgo: '2h ago',
    summary: 'Zomato stonk printed fresh all-time highs as Blinkit dark store count crossed 1,000 with accelerated profitability. Average order value (AOV) expanded 14% YoY.',
    bullets: [
      'Blinkit dark store count scaled to 1,000+ stores with average store payback under 11 months.',
      'Platform fee increased to ₹7 per order without measurable consumer churn.',
      'Going-out events segment showing 35% quarter-on-quarter growth.'
    ],
    whyItMatters: 'Quick commerce is becoming an essential daily utility, structurally eating market share from traditional kirana and modern retail.',
    tickers: ['$ZOMATO', '$BLINKIT'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered social media memes and influencer reviews.',
    readTime: '2 min read',
    content: `Brokerage consensus has raised price targets to ₹310-₹330 on the back of faster-than-expected Blinkit margin expansion.`
  },
  {
    id: 'story-4',
    isLead: false,
    title: 'NVIDIA B200 Ultra Rollout: Hyperscalers Lock in 18-Month Allocation Queues 💻',
    titleExecutive: 'NVIDIA Blackwell Architecture: Hyperscaler Backlogs Extend Through Next 6 Quarters',
    source: 'TECHCRUNCH',
    category: 'tech',
    categoryLabel: 'TECH SPECS 💻',
    timestamp: getTodayDateStr(3),
    timeAgo: '3h ago',
    summary: 'Demand for Blackwell GB200 NVL72 racks has pushed order books into late 2027. Microsoft, Meta, and Google CAPEX announcements confirm zero AI infrastructure pause.',
    bullets: [
      'TSMC CoWoS packaging capacity running at 110% utilization.',
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
    title: 'Orient Electric Q2 Profit Jumps 2x to ₹27 Cr: Revenue Expands 25% on Lighting & Fans 💡',
    titleExecutive: 'Orient Electric Q2 Results: Net Profit Doubles to ₹27 Crore on Strong Festive Demand',
    source: 'ECONOMIC TIMES',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(3.5),
    timeAgo: '3.5h ago',
    summary: 'Consumer electrical major Orient Electric reported a two-fold jump in second-quarter net profit to ₹27 crore, driven by 25% revenue expansion in lighting and premium energy-efficient fans.',
    bullets: [
      'Revenue from operations grew 25% YoY to ₹720 crore.',
      'EBITDA margins expanded 180 bps on raw material cost stabilization.',
      'Rural distribution network additions drove 30% of total volume growth.'
    ],
    whyItMatters: 'Highlights robust Indian consumer discretionary spending into the Q3 festive season.',
    tickers: ['$ORIENTELEC', '$CONSUMER'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped legal disclaimer boilerplates.',
    readTime: '1.5 min read',
    content: `Premium product mix and cost efficiency programs under execution have restored double-digit operating leverage.`
  },
  {
    id: 'story-6',
    isLead: false,
    title: 'Copper Squeeze Looming: Physical LME Inventories Drop 22% as Smelters Cut Fees ✨',
    titleExecutive: 'Copper Structural Deficit: Smelter Cutbacks and EV Grid Demand Tighten Physical Markets',
    source: 'REUTERS',
    category: 'metal',
    categoryLabel: 'METAL SHINE ✨',
    timestamp: getTodayDateStr(4),
    timeAgo: '4h ago',
    summary: 'Smelter processing fees reached multi-year lows, forcing capacity curbs across Asian refineries. EV wiring harnesses and grid substation expansion keep red metal demand inelastic.',
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
    title: 'OpenAI Flags European AI Adoption Gap Despite 8-Fold Surge in Agent Use 💻',
    titleExecutive: 'European AI Adoption Trends: Enterprise Agentic Workflows Accelerate Amid Regulatory Headwinds',
    source: 'ECONOMIC TIMES',
    category: 'tech',
    categoryLabel: 'TECH SPECS 💻',
    timestamp: getTodayDateStr(5),
    timeAgo: '5h ago',
    summary: 'OpenAI reported an eight-fold increase in autonomous AI agent usage among small businesses, but warned of a growing productivity gap between US and European corporate adopters.',
    bullets: [
      'Over 65% of Fortune 500 companies have deployed specialized coding and legal agents.',
      'EU regulatory compliance costs cited as key hurdle for European startups.',
      'Compute efficiency per token has improved 4x over the last 12 months.'
    ],
    whyItMatters: 'Enterprise software spending is shifting permanently away from legacy SaaS seats into consumption-based autonomous agents.',
    tickers: ['$MSFT', '$GOOGL', '$ORCL'],
    sentiment: 'neutral',
    noiseFiltered: 'Stripped marketing soundbites and non-actionable policy rhetoric.',
    readTime: '2 min read',
    content: `Autonomous agent architectures are transforming standard software operations from passive dashboards into active code-writing and task-executing systems.`
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
