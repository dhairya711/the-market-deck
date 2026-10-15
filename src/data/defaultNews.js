// Default curated high-signal intelligence stories with multi-source coverage (Bloomberg, Reuters, FT, Moneycontrol, Mint, CNBC, TechCrunch, Business Standard)
export const categories = [
  { id: 'all', label: 'All News', icon: '📰' },
  { id: 'good-news', label: 'Good News 🌟', icon: '🌟' },
  { id: 'stock-research', label: 'Stock Deep-Dive 🔎', icon: '🔎', isSpecial: true },
  { id: 'stonks', label: 'Stonks Arena 📈', icon: '📈' },
  { id: 'politics', label: 'Politics 🏛️', icon: '🏛️' },
  { id: 'hiring', label: 'Hiring & Talent 💼', icon: '💼' },
  { id: 'tech', label: 'Tech Specs 💻', icon: '💻' },
  { id: 'energy', label: 'Energy & Grid ⚡', icon: '⚡' },
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
  /* ========================================================
     LEAD EDITORIAL STORY
     ======================================================== */
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
    summary: 'Supreme Court delivered a landmark ruling declaring the March 2020 decision to write down ₹8,415 crore of Additional Tier-1 (AT-1) bonds illegal. Bank stock dropped sharply as investors weigh potential recapitalization requirements and liability provisions.',
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

  /* ========================================================
     BREAKTHROUGH & "GOOD NEWS" (Multi-Bagger Catalysts)
     ======================================================== */
  {
    id: 'good-news-1',
    isLead: false,
    title: 'India Electronics Exports Surge 48% YoY to Record $38B: Foxconn & Tata Expand 6th Mega-Campus 🇮🇳',
    titleExecutive: 'Manufacturing Milestone: Electronics Exports Reach Record $38 Billion Driven by Smartphone Assembly',
    source: 'BUSINESS STANDARD',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(0.3),
    timeAgo: '18m ago',
    summary: 'India’s electronics exports surged 48% year-on-year to touch an all-time record of $38 Billion. Apple now produces 1 in every 7 iPhones in India, while Tata Electronics scales semiconductor assembly in Hosur and Dholera.',
    bullets: [
      'Smartphones accounted for 54% of total outbound shipments, surpassing petroleum product growth rate.',
      'Domestic value addition expanded from 12% to 24% as local display modules and battery packs went live.',
      'Over 220,000 direct formal manufacturing jobs created across Tamil Nadu and Karnataka corridors.'
    ],
    whyItMatters: 'Massive macroeconomic structural win: permanently reduces India’s current account deficit and elevates industrial GDP.',
    tickers: ['$DIXON', '$KAYNES', '$TATAMOTORS', '$MAKEININDIA'],
    sentiment: 'bullish',
    noiseFiltered: 'Cut political campaign speech soundbites and boilerplate press handouts.',
    readTime: '2 min read',
    content: `The Production Linked Incentive (PLI) scheme has catalyzed unprecedented manufacturing momentum. Dixon Technologies and Kaynes Technology continue trading at premium multiples on multi-year earnings backlogs.`
  },
  {
    id: 'good-news-gdp-boost',
    isLead: false,
    title: 'India Real GDP Accelerates 7.8% YoY: Manufacturing Output & Capital Expenditure Crush Global Forecasts 🚀',
    titleExecutive: 'Macro Economic Momentum: India Records 7.8% GDP Expansion Led by Gross Fixed Capital Formation',
    source: 'MONEYCONTROL',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(0.4),
    timeAgo: '22m ago',
    summary: 'India consolidated its standing as the fastest-growing major global economy with Q2 GDP printing at 7.8%. Gross Fixed Capital Formation (GFCF) expanded to 34.2% of GDP, indicating massive domestic private sector factory and infrastructure buildout.',
    bullets: [
      'Industrial manufacturing growth clocked 9.4% YoY, outpacing services for the second consecutive quarter.',
      'Capacity utilization across Indian factories touched 76.5%, triggering multi-billion dollar private capex cycles.',
      'Rural consumer spending rebounded sharply on bumper kharif harvest realizations and lower fertilizer costs.'
    ],
    whyItMatters: 'Unprecedented economic resilience buffers Indian corporate earnings against global geopolitical headwinds and US interest rate volatility.',
    tickers: ['$NIFTY', '$SENSEX', '$LT', '$INDIA'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped partisan political commentary to focus strictly on central statistical office data and industrial indices.',
    readTime: '2.5 min read',
    content: `International rating agencies (S&P and Fitch) signaled positive outlooks on India’s sovereign debt rating, citing structural tax buoyancy and public capex productivity.`
  },
  {
    id: 'good-news-sip-power',
    isLead: false,
    title: 'Domestic Mutual Fund SIP Inflows Surge to ₹26,500 Cr/Month: Retail Wall Neutralizes Foreign Macro Selling 📈',
    titleExecutive: 'Capital Market Financialization: Monthly SIP Inflows Set Record High as Retail Equity Culture Deepens',
    source: 'CNBC-TV18',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(0.5),
    timeAgo: '28m ago',
    summary: 'The financialization of Indian household savings reached an astonishing high as monthly Systematic Investment Plan (SIP) inflows crossed ₹26,500 Crore. Total active demat accounts on CDSL and NSDL crossed 14 Crore, up 28% YoY.',
    bullets: [
      'Over 9.2 crore active monthly SIP accounts now systematically channel domestic capital into Indian equities every single month.',
      'Domestic institutional investors (DIIs) soaked up over ₹45,000 Cr of foreign portfolio outflows with zero market crash.',
      'Small towns (B-30 cities) accounted for 54% of all new mutual fund registrations, democratizing wealth creation.'
    ],
    whyItMatters: 'Indian equities are no longer hostage to foreign hot-money outflows. Domestic SIP inflows provide a structural floor under Nifty.',
    tickers: ['$CDSL', '$HDFCAMC', '$NAMINDIA', '$NIFTY'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped mutual fund marketing slogans to focus purely on AMFI registry metrics.',
    readTime: '2 min read',
    content: `The structural shift from physical real estate and unproductive gold into compounding equities marks the greatest capital market transformation in emerging market history.`
  },
  {
    id: 'good-news-2',
    isLead: false,
    title: 'Suzlon Energy Wins 1,166 MW NTPC Mega Wind Order: Order Book Soars to Record 5.4 GW with Zero Net Debt ⚡',
    titleExecutive: 'Clean Energy Revival: Suzlon Energy Secures Landmark 1,166 MW Wind Power Order from NTPC',
    source: 'LIVEMINT',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(0.6),
    timeAgo: '35m ago',
    summary: 'Suzlon Energy bagged the single largest domestic wind energy project contract in Indian history from NTPC Green Energy. The company will install 370 units of its 3.15 MW hybrid lattice tubular turbines in Gujarat.',
    bullets: [
      'Firm manufacturing order book crossed 5.4 GW, guaranteeing top-line revenue visibility through 2028.',
      'Balance sheet remains completely net debt-free with over ₹1,200 Cr in surplus cash reserves.',
      'High-margin Operations & Maintenance (O&M) service contracts will generate lifetime recurring cash flow.'
    ],
    whyItMatters: 'Confirms Suzlon’s turnaround from bankrupt distressed asset to dominant clean energy manufacturing monopoly (+640% 2-year run).',
    tickers: ['$SUZLON', '$NTPC', '$RENEWABLE'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped 10-year historical debt restructuring recount to focus on present cash conversion.',
    readTime: '2 min read',
    content: `Suzlon now commands a 32% domestic market share. With government mandates requiring 500 GW of clean energy by 2030, wind-solar hybrid projects have become essential for round-the-clock grid stability.`
  },
  {
    id: 'good-news-upi-global',
    isLead: false,
    title: 'UPI Reaches Record 18.2 Billion Monthly Volume: France, UAE & Singapore Complete Zero-Fee Cross-Border Rail 💳',
    titleExecutive: 'Digital Infrastructure Export: UPI Cross-Border Settlements Surpass Global Rails in Transaction Velocity',
    source: 'FINANCIAL EXPRESS',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(0.8),
    timeAgo: '45m ago',
    summary: 'National Payments Corporation of India (NPCI) reported monthly transactions exceeding 18.2 billion worth ₹24 Lakh Crore. Meanwhile, Indian travelers and diaspora can now pay directly in Rupees via local QR codes across Paris, Dubai, and Singapore.',
    bullets: [
      'Cross-border remittance costs slashed from 6.5% traditional wire fees down to sub-0.5% via real-time UPI-PayNow linkage.',
      'Credit card transactions on UPI via RuPay crossed ₹28,000 Cr monthly run-rate, challenging Visa and Mastercard duopoly.',
      'Over 350 million active Indian users now execute micro-transactions with 99.98% system uptime.'
    ],
    whyItMatters: 'Massive moat for India’s digital public goods stack. Lowers national currency conversion friction and solidifies the Rupee internationalization roadmap.',
    tickers: ['$PAYTM', '$SBIN', '$HDFCBANK', '$FINTECH'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped press release pleasantries to highlight unit economics and cross-border settlement volumes.',
    readTime: '2 min read',
    content: `NPCI International is currently in advanced bilateral negotiations with Japan, UK, and Thailand to interconnect sovereign instant settlement engines.`
  },
  {
    id: 'good-news-defense-export',
    isLead: false,
    title: 'India Defense Exports Smash All-Time High at ₹24,000 Cr: 92 Countries Buy Made-in-India Weapons & Radars 🛡️',
    titleExecutive: 'Defense Indigenization: Outbound Defense Equipment Shipments Grow 32x Over Last Decade',
    source: 'REUTERS INDIA',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(1.1),
    timeAgo: '1h ago',
    summary: 'Ministry of Defense data revealed Indian defense exports touched a record ₹24,000 Crore, a 32-fold surge over the last 10 years. Key exports include BrahMos supersonic cruise missiles, ATAGS 155mm howitzers, and multi-mission 3D coastal radars.',
    bullets: [
      'Philippines, Armenia, Vietnam, and UAE emerged as the largest importers of Indian combat electronics and artillery.',
      'Private defense manufacturers (Solar Industries, Bharat Forge, Tata Advanced Systems) contributed 62% of total export value.',
      'Public sector giants (HAL, BEL, Mazagon Dock) retain record domestic order books of over ₹3.5 Lakh Crore.'
    ],
    whyItMatters: 'Converts India from the world’s largest arms importer into a self-reliant net exporter with high export margins for listed defense equities.',
    tickers: ['$HAL', '$BEL', '$MAZDOCK', '$BHARATFORG'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered parade rhetoric to focus on signed export letters of credit and delivered ordnance.',
    readTime: '2.5 min read',
    content: `The combination of competitive unit pricing and battle-tested performance in rugged terrain has positioned Indian defense contractors as premier non-aligned suppliers globally.`
  },
  {
    id: 'good-news-tata-ev-cash',
    isLead: false,
    title: 'Tata Motors JLR Free Cash Flow Crosses £2.8 Billion: Electric Range Rover Bookings Touch 48,000 Units 🚗',
    titleExecutive: 'Automotive Earnings: Jaguar Land Rover Cash Generation Fully Self-Funds EV Transition Plan',
    source: 'MONEYCONTROL',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(1.3),
    timeAgo: '1.2h ago',
    summary: 'Jaguar Land Rover generated £2.8 Billion in net free cash flow, setting a corporate record. The Range Rover Electric waitlist crossed 48,000 paid pre-orders ahead of commercial deliveries, while domestic passenger EV sales gained 28% market share.',
    bullets: [
      'Commercial vehicle division reported 11.2% operating margin, the highest in 14 quarters.',
      'Standalone debt remains zero; the upcoming demerger into separate PV and CV entities slated for seamless listing.',
      'Battery cell gigafactory construction in Somerset, UK and Gujarat progressing on schedule without debt guarantees.'
    ],
    whyItMatters: 'Validates Tata Motors’ long-term capital allocation strategy. Trades at an undemanding 14x forward earnings with expanding return ratios.',
    tickers: ['$TATAMOTORS', '$NSE', '$AUTO'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered car enthusiast interior aesthetic commentary to focus on EBIT margins and cash conversion.',
    readTime: '2 min read',
    content: `JLR’s order bank remains filled with high-margin Range Rover SV models ($150,000+), insulating the brand from mid-market European price discounting.`
  },
  {
    id: 'good-news-3',
    isLead: false,
    title: 'India Crosses 100 GW Solar Capacity Milestone: Levelized Solar Cost Drops to Record Low ₹2.12/kWh ☀️',
    titleExecutive: 'Renewable Power Milestone: Installed Solar Generation Surpasses 100 Gigawatts Ahead of Schedule',
    source: 'LIVEMINT',
    category: 'good-news',
    categoryLabel: 'GOOD NEWS 🌟',
    timestamp: getTodayDateStr(1.5),
    timeAgo: '1.5h ago',
    summary: 'India officially crossed 100 Gigawatts of installed utility-scale and rooftop solar capacity, cementing its rank as the world’s 3rd largest solar producer. Electricity generation costs dropped below ₹2.12 per unit.',
    bullets: [
      'Rooftop solar PM Surya Ghar scheme registrations crossed 1.3 crore households in record time.',
      'Domestic wafer and ingot manufacturing capacity expanded 4x to curb dependence on imported Chinese cells.',
      'Coal power share in the national generation mix slipped below 48% during peak afternoon hours.'
    ],
    whyItMatters: 'Cheaper domestic industrial power significantly improves gross margins for heavy manufacturing and steel producers.',
    tickers: ['$TATAPOWER', '$ADANIGREEN', '$SOLAR'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered bureaucratic department congratulations and promotional slides.',
    readTime: '2 min read',
    content: `The solar transition is no longer an environmental subsidized experiment—it has become the cheapest source of bulk electricity in human history.`
  },

  /* ========================================================
     HIRING & TECH TALENT WAR (The Spicy Talent Updates)
     ======================================================== */
  {
    id: 'hiring-1',
    isLead: false,
    title: 'AI Researcher Poaching War: Meta Offers $3.5M Guaranteed Comp RSU Grants to Snatch OpenAI Reasoning Talent 💼',
    titleExecutive: 'Silicon Valley AI Talent War: Meta Offers Multi-Million Guaranteed Equity Packages to Frontier Researchers',
    source: 'THE INFORMATION',
    category: 'hiring',
    categoryLabel: 'HIRING & TALENT 💼',
    timestamp: getTodayDateStr(0.4),
    timeAgo: '24m ago',
    summary: 'Mark Zuckerberg is personally sending direct emails to top AI researchers at OpenAI, Anthropic, and Google DeepMind, offering signing bonuses exceeding $3M with immediate compute cluster priority.',
    bullets: [
      'Top 2% AI research scientists with post-training and reasoning experience commanding $2M-$5M annualized packages.',
      'Compute access (clusters of 24k+ H100/B200 GPUs) cited as a bigger retention factor than base salaries.',
      'Non-compete clauses face federal court nullification, opening unprecedented talent mobility across frontier labs.'
    ],
    whyItMatters: 'R&D expenses for mega-cap tech will remain elevated through 2027. Companies that fail to retain core reasoning talent risk platform obsolescence.',
    tickers: ['$META', '$MSFT', '$GOOGL', '$NVDA'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped corporate PR denials and speculative gossip blogs.',
    readTime: '2.5 min read',
    content: `Silicon Valley is experiencing the sharpest talent compensation divergence in its history. While standard junior frontend engineering salaries have normalized, PhD-level reasoning and post-training engineers are receiving compensation on par with NFL quarterbacks.`
  },
  {
    id: 'hiring-2',
    isLead: false,
    title: 'Bangalore GCC Boom: 45 Global Fortune 500 Desks Set Up Tech Hubs, Offering 40% Salary Hikes for Systems Engineers 🚀',
    titleExecutive: 'Global Capability Centers Expansion: 45 Multinationals Launch Engineering Hubs Across Bengaluru and Hyderabad',
    source: 'ECONOMIC TIMES',
    category: 'hiring',
    categoryLabel: 'HIRING & TALENT 💼',
    timestamp: getTodayDateStr(1.1),
    timeAgo: '1.1h ago',
    summary: 'Global Capability Centers (GCCs) leased a record 14M sq ft of prime commercial office space across Outer Ring Road and Whitefield. Multinationals are replacing $250K US software seats with ₹45L-₹70L senior Indian engineering teams.',
    bullets: [
      'GCC count in India officially crossed 1,600, employing over 1.9M skilled professionals.',
      'Direct hiring for Kubernetes, distributed databases, and fintech risk modeling is up 42% YoY.',
      'Traditional IT services firms facing senior talent churn to direct corporate captives offering higher RSUs.'
    ],
    whyItMatters: 'Powers commercial real estate REITs ($EMBASSY, $MINDSPACE) and drives strong domestic discretionary consumption in Tier-1 metros.',
    tickers: ['$EMBASSY.RR', '$MINDSPACE.RR', '$INFY', '$TCS'],
    sentiment: 'bullish',
    noiseFiltered: 'Cut out generic state government speeches and PR press conference filler.',
    readTime: '2 min read',
    content: `Multinationals are no longer treating India as a cheap back-office cost center. Strategic algorithmic architecture, proprietary chip design, and global cybersecurity ops are being directly run out of Bengaluru and Hyderabad.`
  },
  {
    id: 'hiring-3',
    isLead: false,
    title: 'Tier-1 Quant Desks Offer $600K Signing Packages for High-Frequency C++ Architects in Mumbai & Singapore 💼',
    titleExecutive: 'Proprietary Trading Compensation: Sub-Microsecond Kernel Developers Command Record Packages',
    source: 'FINANCIAL TIMES',
    category: 'hiring',
    categoryLabel: 'HIRING & TALENT 💼',
    timestamp: getTodayDateStr(1.6),
    timeAgo: '1.6h ago',
    summary: 'Market makers and algorithmic proprietary trading firms (Citadel Securities, Jane Street, Tower Research, Graviton) in Mumbai and Singapore are engaged in high-stakes bidding wars for kernel network stack engineers.',
    bullets: [
      'First-year compensation including guaranteed sign-on bonus crosses ₹4 Cr in Mumbai.',
      'FPGA hardware engineers in highest demand due to direct exchange co-location mandates.',
      'Strict 12-month non-compete gardens leaves enforced by prime brokers.'
    ],
    whyItMatters: 'Direct indicator of expanding algorithmic market volume and explosive derivative liquidity on Indian exchanges.',
    tickers: ['$NSE', '$BSE', '$MCX'],
    sentiment: 'bullish',
    noiseFiltered: 'Filtered speculative recruitment gossip to focus on verified offer letters.',
    readTime: '2 min read',
    content: `High-frequency trading firms are generating extraordinary trading profits from retail option volatility on NSE and BSE, allowing them to outbid Silicon Valley tech giants for mathematical Olympiad and IIT medalists.`
  },
  {
    id: 'hiring-4',
    isLead: false,
    title: 'Layoff Watch: Legacy IT Middle Management Facing 18% Restructuring as Copilots Automate Code Reviews ⚡',
    titleExecutive: 'IT Services Workforce Realignment: Automation Tools Prompt Reallocation of Middle Management Resources',
    source: 'BLOOMBERG',
    category: 'hiring',
    categoryLabel: 'HIRING & TALENT 💼',
    timestamp: getTodayDateStr(2.3),
    timeAgo: '2.3h ago',
    summary: 'Indian IT services bellwethers are trimming non-coding project managers and quality assurance teams as autonomous code scanners and GenAI assistants double developer throughput.',
    bullets: [
      'Fresher hiring shifting 100% toward full-stack and Python AI integration skillsets.',
      'Employee utilization rates pushed to an 8-year peak of 86.4%.',
      'Attrition among tier-1 service providers dropped to historical low of 11.8% as job hopping slows.'
    ],
    whyItMatters: 'Significantly improves operating EBIT margins for large-cap IT exporters while lowering overhead sales and administrative expenses.',
    tickers: ['$TCS', '$INFY', '$WIPRO', '$HCLTECH'],
    sentiment: 'neutral',
    noiseFiltered: 'Stripped union statement rhetoric and alarmist clickbait headlines.',
    readTime: '2 min read',
    content: `The traditional pyramid workforce model of Indian IT—thousands of freshers managed by heavy layers of delivery managers—is being permanently flattened into nimble autonomous software cells.`
  },

  /* ========================================================
     POLITICS & POWER BROKERS (Policy, Cabinet & Regulations)
     ======================================================== */
  {
    id: 'politics-1',
    isLead: false,
    title: 'Cabinet Clears ₹76,000 Cr Semiconductor Fab Subsidies: Tata & Micron Score 50% Fiscal Backstop 🏛️',
    titleExecutive: 'Cabinet Approves Semiconductor Mission Expansion: Fiscal Support Sanctioned for Semiconductor Foundries',
    source: 'BUSINESS STANDARD',
    category: 'politics',
    categoryLabel: 'POLITICS 🏛️',
    timestamp: getTodayDateStr(0.8),
    timeAgo: '48m ago',
    summary: 'The Union Cabinet approved the next phase of the India Semiconductor Mission (ISM 2.0). Fiscal support covers 50% of project capex for commercial fabrication plants and advanced packaging facilities in Gujarat and Assam.',
    bullets: [
      'Tata Electronics Dholera mega-fab project timeline fast-tracked for commercial wafers by Q2 2027.',
      'State government power and clean water infrastructure guarantees finalized with zero tariff hikes for 10 years.',
      'Equipment imports granted express customs clearance under national strategic priority status.'
    ],
    whyItMatters: 'Locks in long-term domestic component self-reliance while driving massive multi-year orders for EPC contractors and industrial gas suppliers.',
    tickers: ['$TATAMOTORS', '$L&T', '$LINDEINDIA', '$POLITICS'],
    sentiment: 'bullish',
    noiseFiltered: 'Stripped political speeches, party election slogans, and podium optics.',
    readTime: '2 min read',
    content: `India’s semiconductor policy represents one of the largest capital expenditure subsidies in Asian industrial history, intended to hedge geopolitical supply disruptions in the Taiwan Strait.`
  },
  {
    id: 'politics-2',
    isLead: false,
    title: 'SEBI Cracks Down on Finfluencer Pump & Dump Telegram Cartels: ₹140 Cr Frozen in Mumbai & Dubai Raids ⚖️',
    titleExecutive: 'Securities Regulator Enforcement: SEBI Freezes ₹140 Crore in Coordinated Unregistered Advisory Sweep',
    source: 'MINT',
    category: 'politics',
    categoryLabel: 'POLITICS 🏛️',
    timestamp: getTodayDateStr(1.5),
    timeAgo: '1.5h ago',
    summary: 'SEBI enforcement division carried out simultaneous search and seizure operations across 42 locations. Syndicates were caught using paid social media influencers to run illicit microcap pump-and-dump operations.',
    bullets: [
      'Penalties include 5-year capital market bans and 100% disgorgement of ill-gotten advisory fees.',
      'Stock exchanges mandated to implement automated AI trading halt algorithms for sudden social-volume spikes.',
      'Licensed registered investment advisors (RIAs) granted streamlined compliance fee relief.'
    ],
    whyItMatters: 'Protects retail capital from catastrophic illiquid microcap traps and restores institutional trust in midcap price discovery.',
    tickers: ['$SEBI', '$BSE', '$NSE', '$REGULATION'],
    sentiment: 'bullish',
    noiseFiltered: 'Removed sensationalist police blotter gossip and blurred suspect photos.',
    readTime: '2 min read',
    content: `SEBI’s surveillance wing has demonstrated algorithmic tracking of cross-border payment flows between Dubai-based cryptocurrency accounts and Indian domestic trading terminals.`
  },
  {
    id: 'politics-3',
    isLead: false,
    title: 'US-China Rare Earth Export War Escalates: Gallium & Antimony Quotas Slashed by 60% 🌐',
    titleExecutive: 'Geopolitical Trade Tensions: Beijing Imposes Tightened Strategic Minerals Export Restrictions',
    source: 'REUTERS',
    category: 'politics',
    categoryLabel: 'POLITICS 🏛️',
    timestamp: getTodayDateStr(2.2),
    timeAgo: '2.2h ago',
    summary: 'Beijing enacted strict export licensing on critical military and semiconductor metals including gallium, germanium, and antimony. Western defense primes and chip foundries forced to dip into emergency stockpiles.',
    bullets: [
      'Spot market antimony prices surged 14% intraday to fresh record highs.',
      'Pentagon invokes Title III of the Defense Production Act to finance domestic North American smelters.',
      'Australian and Indian rare earth miners receive express fast-track sovereign extraction permits.'
    ],
    whyItMatters: 'Massive catalyst for non-Chinese rare earth exploration and processing equities ($MP, $LYNAS, $IREL).',
    tickers: ['$MP', '$LYNAS', '$DEFENSE', '$METALS'],
    sentiment: 'neutral',
    noiseFiltered: 'Cut out repetitive diplomatic state press releases.',
    readTime: '2.5 min read',
    content: `Critical minerals have become the premier geopolitical economic weapon of the 21st century. Refining and smelting bottlenecks outside Asia remain the single greatest supply chain vulnerability for NATO defense systems.`
  },

  /* ========================================================
     STONKS ARENA (High Signal, Spicy WSB / TFG Vibe)
     ======================================================== */
  {
    id: 'story-1',
    isLead: false,
    title: 'Nifty Vibe Check: Range-Bound Action Continues as 24,500 backing Holds the Line ⚡',
    titleExecutive: 'Nifty Index Analysis: Key 24,500 Support Level Defended Amid Range-Bound Consolidation',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(0.6),
    timeAgo: '36m ago',
    summary: 'Nifty has been deadass playing in a tight range between 24,500 and 24,900. Geopolitical stress and FII index future short-covering keep bulls and bears locked in neutral territory.',
    bullets: [
      '24,500 Put strike holds massive open interest of 1.42 crore contracts.',
      'Bank Nifty outperforming on private banking institutional accumulation ($HDFCBANK, $ICICIBANK).',
      'FII net cash flow turned mildly positive (+₹480 Cr) after 6 straight sessions of outflows.'
    ],
    whyItMatters: 'Breakout above 24,850 triggers rapid short covering toward 25,200. Clean breakdown below 24,400 risks 400-point slide.',
    tickers: ['$NIFTY50', '$BANKNIFTY', '$HDFCBANK'],
    sentiment: 'bullish',
    noiseFiltered: 'Eliminated 12 generic technical indicator charts without trade context.',
    readTime: '1.5 min read',
    content: `Institutional positioning indicates strong floor defense at 24,500. Heavy Put writing confirms retail and proprietary desks expect no major systemic drop before the upcoming macro inflation readout.`
  },
  {
    id: 'story-2',
    isLead: false,
    title: 'Tata Motors Splitting stonk 1:10: Making stonks Accessible to the Retail Fam, Fr Fr 💀',
    titleExecutive: 'Tata Motors Announces 1:10 Stock Split to Enhance Retail Market Liquidity',
    source: 'MONEYCONTROL',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(1.4),
    timeAgo: '1.4h ago',
    summary: 'Tata Motors board approved a 1:10 stock split to improve liquidity and invite smaller retail money gang. JLR margins continue to print cash while domestic EV market share stabilizes at 68%.',
    bullets: [
      'Split ratio: 1 equity share of face value ₹10 split into 10 equity shares of ₹1 face value.',
      'Record date expected within 60 days following AGM shareholder approval.',
      'EV division demerger roadmap remains on track for Q4 FY27.'
    ],
    whyItMatters: 'Lowers ticket size per lot from ₹9,850 to ~₹985, drastically increasing F&O option participation and retail liquidity.',
    tickers: ['$TATAMOTORS', '$AUTO', '$NSE'],
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
    timestamp: getTodayDateStr(2.1),
    timeAgo: '2.1h ago',
    summary: 'Zomato stonk price pumped hard past previous all-time highs as Blinkit dark stores achieve EBITDA breakeven ahead of guidance. Average order value (AOV) expanded 14% YoY.',
    bullets: [
      'Blinkit dark store count scaled to 1,000+ stores with average store payback under 11 months.',
      'Platform fee increased by ₹1 to ₹7/order without any measurable churn.',
      'Going-out business integration showing early synergy with ticketing ecosystem.'
    ],
    whyItMatters: 'Quick commerce is shifting from discretionary novelty to consumer utility, structurally eating traditional FMCG distribution share.',
    tickers: ['$ZOMATO', '$BLINKIT'],
    sentiment: 'bullish',
    noiseFiltered: 'Cut out social media influencer memes and food review digressions.',
    readTime: '2 min read',
    content: `Zomato has transformed from an unprofitable food aggregator to a high-margin consumer commerce platform. Multiple global brokerages upgraded price targets to ₹310-₹330.`
  },
  {
    id: 'story-4',
    isLead: false,
    title: 'Reliance Jio Prepares ₹1.2 Lakh Crore Mega-IPO: 5G Network Crosses 140M Active Standalone Users 📱',
    titleExecutive: 'Telecom Valuation: Reliance Jio Finalizes Listing Roadmap with 140 Million Active 5G Subscribers',
    source: 'CNBC',
    category: 'stonks',
    categoryLabel: 'STONKS ARENA 📈',
    timestamp: getTodayDateStr(2.7),
    timeAgo: '2.7h ago',
    summary: 'Mukesh Ambani’s telecom behemoth is in advanced discussions with global investment banks for what will be the largest initial public offering in Indian history, slated to list by Q4 FY27.',
    bullets: [
      'Average Revenue Per User (ARPU) expanded to ₹198 per month following recent tariff rationalization.',
      'Enterprise cloud and home broadband JioFiber subscribers doubled to 16M households.',
      'Listing valuation pegged at $110B-$130B USD, unlocking massive value for parent Reliance Industries.'
    ],
    whyItMatters: 'Direct catalyst for parent $RELIANCE stock; clears the path for retail investors to own pure-play digital cash machines.',
    tickers: ['$RELIANCE', '$JIO', '$TELECOM'],
    sentiment: 'bullish',
    noiseFiltered: 'Removed PR executive puffery and celebrity guest attendee lists.',
    readTime: '2.5 min read',
    content: `Jio has transitioned from a free-data disruptive land grab into a cash-gushing digital monopoly with over 480 million paying telecom subscribers.`
  },

  /* ========================================================
     TECH SPECS & HARDWARE INFRASTRUCTURE
     ======================================================== */
  {
    id: 'tech-1',
    isLead: false,
    title: 'NVIDIA B200 Ultra Rollout: Hyperscalers Lock in 18-Month Allocation Queues 💻',
    titleExecutive: 'NVIDIA Blackwell Architecture: Hyperscaler Backlogs Extend Through Next 6 Quarters',
    source: 'TECHCRUNCH',
    category: 'tech',
    categoryLabel: 'TECH SPECS 💻',
    timestamp: getTodayDateStr(3.1),
    timeAgo: '3h ago',
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
    id: 'tech-2',
    isLead: false,
    title: 'Grid Overload Alert: Data Centers Demand Dedicated Nuclear Small Modular Reactors ⚡',
    titleExecutive: 'Utility Grid Constraints: Tech Giants Sign Long-Term Nuclear Power Purchase Agreements',
    source: 'BLOOMBERG',
    category: 'energy',
    categoryLabel: 'ENERGY & GRID ⚡',
    timestamp: getTodayDateStr(4),
    timeAgo: '4h ago',
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
    id: 'tech-3',
    isLead: false,
    title: 'Copper Squeeze Looming: Supply Deficit Projected at 4.2M Metric Tons by 2028 ✨',
    titleExecutive: 'Copper Structural Deficit: Smelter Cutbacks and EV Grid Demand Tighten Physical Markets',
    source: 'REUTERS',
    category: 'metal',
    categoryLabel: 'METAL SHINE ✨',
    timestamp: getTodayDateStr(4.8),
    timeAgo: '4.8h ago',
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
    id: 'tech-4',
    isLead: false,
    title: 'VCs Stop Chasing LLM Wrappers, Pivot $18B Into Physical AI & Defense Tech 🚀',
    titleExecutive: 'Venture Capital Capital Reallocation: Seed Funds Pivot Toward Robotics and Defense Tech',
    source: 'TECHCRUNCH',
    category: 'vc',
    categoryLabel: 'VC INFLOW 🚀',
    timestamp: getTodayDateStr(5.5),
    timeAgo: '5.5h ago',
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
    id: 'tech-5',
    isLead: false,
    title: 'US 10-Yr Yield Glides at 4.60%: Term Premium Returns as Deficit Concerns Bite 💸',
    titleExecutive: 'Treasury Markets: 10-Year Yield Stabilizes Near 4.60% as Term Premium Rebounds',
    source: 'BLOOMBERG',
    category: 'yield',
    categoryLabel: 'YIELD FLOW 💸',
    timestamp: getTodayDateStr(6.2),
    timeAgo: '6h ago',
    summary: 'Bond traders are demanding higher term premium to hold long-duration sovereign paper as US fiscal deficit projections stay at 6.8% of GDP regardless of political outcomes.',
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
    id: 'tech-6',
    isLead: false,
    title: 'The Art of Capital Allocation: Why Free Cash Flow Yield Crushes EBITDA Optics 🧠',
    titleExecutive: 'Executive Dossier: High-Signal Framework for Analyzing Free Cash Flow Conversion',
    source: 'THE BROADSHEET DOSSIER',
    category: 'smart',
    categoryLabel: 'SMART READS 🧠',
    timestamp: getTodayDateStr(7),
    timeAgo: '7h ago',
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
