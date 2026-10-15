// Comprehensive Finance Zero-to-Hero Knowledge Engine
// Covers: Liquid Funds, SIP, FD, PPF, Nifty Index, P/E Ratio, Market Cap, Risk-Return Duels

export const financeGlossary = {
  liquidFund: {
    title: 'Liquid Mutual Fund',
    category: 'Cash Management & Ultra-Short Term',
    oneLiner: 'The smarter, higher-yielding alternative to a lazy bank savings account.',
    expectedReturn: '6.8% - 7.3% p.a.',
    riskLevel: 'Ultra Low (Sovereign & AAA Paper)',
    lockIn: 'None (Instant redemption up to ₹50,000 / T+1 payout)',
    taxation: 'Taxed at investor’s income tax slab rate',
    explanation: `A Liquid Mutual Fund invests solely in very short-term money market instruments with maturities of up to 91 days—such as Government Treasury Bills (T-Bills), Certificates of Deposit (CDs), and Commercial Paper issued by top-rated blue-chip corporations. Because the instruments mature so quickly, interest rate fluctuations have almost zero impact on the fund value, providing steady, daily accrual of returns with virtually zero capital volatility.`,
    whyBetterThanSavings: 'A standard bank savings account yields 2.7% to 3.5%, which loses purchasing power to 5% inflation every year. Liquid funds yield around 7% with near-instant liquidity, making them the gold standard for parking emergency funds and business working capital.',
    bestFor: 'Emergency funds (3-6 months expenses), money needed within 1 to 90 days, or parking lump-sum cash before deploying via STP into equities.'
  },

  fixedDeposit: {
    title: 'Bank Fixed Deposit (FD)',
    category: 'Guaranteed Fixed Income',
    oneLiner: 'Guaranteed, rigid interest for conservative savers who cannot tolerate market movements.',
    expectedReturn: '6.5% - 7.5% p.a. (Senior citizens +0.5%)',
    riskLevel: 'Virtually Zero (DICGC insured up to ₹5 Lakh per bank)',
    lockIn: '7 days to 10 years (Premature withdrawal carries 0.5% - 1% penalty)',
    taxation: 'Interest added to income and taxed at slab rate; TDS deducted at 10% if interest > ₹40,000/yr',
    explanation: `A Fixed Deposit is a financial agreement where you deposit a lump sum with a bank or NBFC for a fixed tenure at an agreed interest rate. The principal and returns are completely guaranteed by the bank balance sheet, with sovereign insurance coverage of up to ₹5,00,000 provided by the RBI's Deposit Insurance and Credit Guarantee Corporation (DICGC).`,
    whyBetterThanSavings: 'Locks in a fixed guaranteed interest rate regardless of future RBI repo rate cuts.',
    drawbacks: 'Interest is fully taxable at your peak tax slab. After inflation (5%) and 30% income tax, real post-tax returns on an FD often drop to just 4.5% to 5.0%, resulting in zero real wealth creation.',
    bestFor: 'Retirees needing predictable monthly interest, capital preservation goals within 1 to 3 years.'
  },

  sip: {
    title: 'Systematic Investment Plan (SIP)',
    category: 'Equity Wealth Compounding',
    oneLiner: 'The greatest wealth-compounding machine for Indian retail investors.',
    expectedReturn: '12% - 15% CAGR (Long-term Nifty 50 historical average)',
    riskLevel: 'Moderate to High in short term; Low risk over 7+ years',
    lockIn: 'None for open-ended funds (3 years for ELSS Tax-Saver funds)',
    taxation: 'Long-Term Capital Gains (LTCG) taxed at 12.5% for gains above ₹1.25 Lakh per financial year',
    explanation: `An SIP is not an asset class—it is an automated investment strategy where you invest a fixed sum (e.g. ₹500, ₹5,000, or ₹25,000) every month into an equity mutual fund on a designated date. It harnesses Rupee Cost Averaging: when market crashes, your fixed money automatically buys more mutual fund units at cheap valuations; when markets rally, it buys fewer units at high prices, completely eliminating the need to time the market.`,
    mathExample: 'Investing ₹10,000/month in a 13% CAGR Index Fund over 20 years: Total invested = ₹24 Lakhs. Final portfolio value = ₹1.15 Crore! The ₹91 Lakh gain is the pure power of compound interest.',
    bestFor: 'Salaried individuals, long-term wealth creation (5 to 20 years), retirement planning, children’s education.'
  },

  indexFund: {
    title: 'Nifty 50 / Sensex Index Fund',
    category: 'Passive Low-Cost Equities',
    oneLiner: 'Owning the top 50 corporate engines of India with zero fund-manager fees.',
    expectedReturn: '12% - 14% CAGR (Historical 20-year rolling average)',
    riskLevel: 'Moderate (Reflects national equity market)',
    lockIn: 'None',
    taxation: '12.5% LTCG above ₹1.25 Lakh',
    explanation: `An Index Fund replicates the exact portfolio of a benchmark index like the NIFTY 50 or SENSEX. Instead of paying an active fund manager a high 1.5% - 2.0% annual expense ratio to pick stocks, an index fund charges a microscopic 0.1% to 0.2% fee to mechanically hold Reliance, Tata Motors, HDFC Bank, Infosys, and TCS in their exact market cap weights. Warren Buffett famously advises that 90% of retail investors will beat active hedge funds simply by holding low-cost index funds.`,
    bestFor: 'Every investor seeking simple, stress-free equity compounding without stock picking.'
  },

  peRatio: {
    title: 'P/E Ratio (Price-to-Earnings)',
    category: 'Valuation Metric',
    oneLiner: 'How many Rupees you are paying to buy ₹1 of a company’s annual net profit.',
    expectedReturn: 'N/A (Valuation Tool)',
    riskLevel: 'Analytical Indicator',
    lockIn: 'None',
    taxation: 'N/A',
    explanation: `The Price-to-Earnings (P/E) ratio is calculated as: Current Stock Price ÷ Earnings Per Share (EPS). For example, if Tata Motors trades at ₹1,000 and earns ₹50 profit per share, its P/E is 20x. A high P/E (e.g. Zomato at 75x) means investors expect explosive future profit growth; a low P/E (e.g. Coal India or SBI at 8-11x) indicates value or mature dividend yield. Comparing a stock’s P/E to its historical 5-year average and industry peers tells you whether an equity is cheap or overhyped.`,
    bestFor: 'Screening stocks before investing: Never buy on ticker hype alone.'
  },

  marketCap: {
    title: 'Market Capitalization (Large vs Mid vs Small Cap)',
    category: 'Company Classification',
    oneLiner: 'The total market value of a company’s outstanding shares (Share Price × Total Shares).',
    expectedReturn: 'Large Cap: 11-13% CAGR | Mid Cap: 14-17% CAGR | Small Cap: 16-22% CAGR (Higher risk)',
    riskLevel: 'Large Cap: Low-Moderate | Mid Cap: Moderate-High | Small Cap: High/Volatile',
    lockIn: 'None',
    taxation: 'Equity standard',
    explanation: `SEBI categorizes Indian listed stocks into three distinct tiers:
• Large-Cap (Top 1-100 companies, >₹20,000 Cr market cap): Blue-chip stability (Reliance, TCS, HDFC Bank). Resistant to deep market crashes.
• Mid-Cap (Rank 101-250, ₹5,000 - ₹20,000 Cr): High-growth contenders scaling their business models.
• Small-Cap (Rank 251+, <₹5,000 Cr): Agile potential multi-baggers that can double in a bull run or crash 50% during liquidity crunches.`,
    bestFor: 'Portfolio allocation: The classic balanced rule is 60% Large-Cap + 25% Mid-Cap + 15% Small-Cap.'
  }
};

// Zero-to-Hero Level Progression Quiz (12 Interactive Challenges)
export const financeQuizLevels = [
  {
    level: 1,
    levelName: 'Novice Saver: Cash & Foundations',
    badge: '🛡️ Cash Guardian',
    question: 'You have ₹1,00,000 idle cash set aside for an emergency you might need in 3 weeks. Where should you park it?',
    options: [
      { text: 'A Small-Cap Equity Stock to quickly double it', isCorrect: false, feedback: 'Dangerous! Equities can drop 10-15% in 3 weeks. Emergency money must never be gambled in high-beta stocks.' },
      { text: 'A Liquid Mutual Fund or Sweep-in Bank Account', isCorrect: true, feedback: 'Correct! Liquid funds offer ~7% yield with near-instant (T+1) withdrawal and zero capital risk.' },
      { text: 'A 5-Year Tax Saver Fixed Deposit', isCorrect: false, feedback: 'Incorrect. Tax-saver FDs have an unconditional 5-year lock-in; you cannot withdraw in an emergency.' },
      { text: 'Physical Gold Jewellery from a local showroom', isCorrect: false, feedback: 'Incorrect. Jewellery carries 15-25% making charges and huge bid-ask discounts when selling.' }
    ],
    axiom: 'Rule #1: Return OF capital is far more important than return ON capital for emergency reserves.'
  },
  {
    level: 2,
    levelName: 'Compounder: The SIP Mechanics',
    badge: '📈 SIP Master',
    question: 'If the Nifty 50 crashes by 15% this month, what happens to your ongoing monthly SIP investment?',
    options: [
      { text: 'Your SIP automatically cancels to protect you from loss', isCorrect: false, feedback: 'Incorrect. SIPs continue uninterrupted unless you explicitly pause them.' },
      { text: 'Your fixed monthly investment buys MORE mutual fund units at discounted prices', isCorrect: true, feedback: 'Spot on! This is Rupee Cost Averaging. You accumulate more units cheaply, generating massive future gains when markets recover.' },
      { text: 'The fund manager penalizes you with extra expense ratio', isCorrect: false, feedback: 'Incorrect. Expense ratios are constant and do not increase during market corrections.' },
      { text: 'You should immediately stop the SIP and sell everything', isCorrect: false, feedback: 'The classic amateur mistake! Stopping your SIP at market bottoms locks in paper losses.' }
    ],
    axiom: 'Market crashes are retail sales events: SIPs turn market volatility into your greatest advantage.'
  },
  {
    level: 3,
    levelName: 'Tactician: Fixed Income vs Inflation',
    badge: '⚡ Inflation Slayer',
    question: 'A 1-year Bank FD gives 7.0% interest. Inflation is 5.2% and you are in the 30% tax bracket. What is your real wealth growth?',
    options: [
      { text: 'Positive +7.0% gain', isCorrect: false, feedback: 'Incorrect. You forgot both taxes and inflation.' },
      { text: 'Positive +1.8% gain', isCorrect: false, feedback: 'Incorrect. You subtracted inflation but forgot income tax.' },
      { text: 'Negative -0.3% real loss of purchasing power', isCorrect: true, feedback: 'Brilliant financial math! After 30% tax, your 7% FD gives only 4.90% net. With inflation at 5.2%, you literally lose 0.3% purchasing power each year!' },
      { text: 'Zero return', isCorrect: false, feedback: 'Close, but strictly negative once purchasing power is eroded.' }
    ],
    axiom: 'Always calculate POST-TAX, POST-INFLATION returns before locking capital into debt products.'
  },
  {
    level: 4,
    levelName: 'Dalal Street: Equity Valuation',
    badge: '🔎 Value Hunter',
    question: 'Company A has a P/E of 14x and generates 25% ROE with zero debt. Company B has a P/E of 95x and makes zero profit. Which is fundamentally safer?',
    options: [
      { text: 'Company B because high P/E means the stock price always goes up', isCorrect: false, feedback: 'Dangerous fallacy. High P/E companies crash 60-80% when quarterly revenue growth slows by even 2%.' },
      { text: 'Company A because it has strong profit earnings, high capital return, and a conservative valuation multiple', isCorrect: true, feedback: 'Exactly. Company A (like Tata Motors or SBI) trades at a margin of safety with proven balance sheet cash flows.' },
      { text: 'P/E ratio has no relevance in modern stock markets', isCorrect: false, feedback: 'Incorrect. Valuation is the ultimate anchor of long-term investment returns.' }
    ],
    axiom: 'Price is what you pay. Value is what you get.'
  },
  {
    level: 5,
    levelName: 'Portfolio Strategist: Direct vs Regular Funds',
    badge: '👑 Dalal Street Hero',
    question: 'Why should an informed retail investor always choose DIRECT plans of Mutual Funds instead of REGULAR plans?',
    options: [
      { text: 'Direct plans invest in completely different secret stocks', isCorrect: false, feedback: 'Incorrect. Both direct and regular plans hold the exact same stocks and fund manager.' },
      { text: 'Direct plans eliminate middleman distributor commissions, giving 1.0% to 1.5% extra compounded return every year', isCorrect: true, feedback: 'Legendary! Over a 25-year investment horizon, that 1.2% saved commission difference compounds into over ₹35 Lakhs of extra money in your pocket!' },
      { text: 'Direct plans are exempt from all Government capital gains taxes', isCorrect: false, feedback: 'Incorrect. Tax treatment is identical for both plans.' }
    ],
    axiom: 'Small percentage fees compound into colossal wealth deductions over decades. Cut unnecessary friction.'
  }
];

// Interactive "Higher Return Duel" Scenarios (What gives higher return?)
export const higherReturnDuels = [
  {
    id: 'duel-fd-vs-nifty',
    title: '10-Year Wealth Race: Bank FD (7%) vs Nifty 50 Index SIP (13.5% CAGR)',
    assetA: { name: 'Bank Fixed Deposit (FD)', annualReturn: '7.0% p.a.', risk: 'Guaranteed / Zero Volatility' },
    assetB: { name: 'Nifty 50 Index Fund SIP', annualReturn: '13.5% CAGR (Hist. 20Y)', risk: 'Market Volatility (High in short term)' },
    question: 'If you invest ₹10,000 every month for 10 years, which instrument yields higher wealth and by how much?',
    winner: 'B',
    outcomeA: 'Total Invested: ₹12.0 Lakhs | Final Value: ₹17.4 Lakhs (Gain: ₹5.4 Lakhs)',
    outcomeB: 'Total Invested: ₹12.0 Lakhs | Final Value: ₹25.2 Lakhs (Gain: ₹13.2 Lakhs)',
    difference: 'Nifty 50 SIP delivers ₹7.8 Lakhs MORE wealth (+144% higher profit gain) over 10 years.',
    takeaway: 'For time horizons beyond 7 years, equity index compounding historically crushes fixed deposits because businesses grow revenues with national GDP.'
  },
  {
    id: 'duel-liquid-vs-savings',
    title: '1-Year Idle Cash: Liquid Mutual Fund vs Standard Savings Account',
    assetA: { name: 'Regular Savings Bank Account', annualReturn: '3.0% p.a.', risk: 'Zero' },
    assetB: { name: 'Liquid Mutual Fund (T-Bills)', annualReturn: '7.1% p.a.', risk: 'Virtually Zero (91-day sovereign paper)' },
    question: 'You park ₹5,00,000 for 1 year while planning a home renovation. Which gives higher returns?',
    winner: 'B',
    outcomeA: 'Savings A/C Interest: ₹15,000',
    outcomeB: 'Liquid Fund Yield: ₹35,500',
    difference: 'Liquid Fund generates ₹20,500 extra cash with identical next-day liquidity.',
    takeaway: 'Never leave large lump sums idle in savings accounts. Liquid funds provide more than double the cash yield with next-day redemption.'
  },
  {
    id: 'duel-smallcap-vs-largecap',
    title: '5-Year Growth Sprint: Nifty Smallcap 250 vs Nifty 50 Largecap',
    assetA: { name: 'Nifty 50 Largecap Bluechip Index', annualReturn: '13.2% CAGR', risk: 'Moderate (Drawdown max ~15-20%)' },
    assetB: { name: 'Nifty Smallcap 250 Index', annualReturn: '19.4% CAGR', risk: 'Very High (Drawdown max ~35-45%)' },
    question: 'Which gave higher absolute returns over the last 5 years?',
    winner: 'B',
    outcomeA: '₹1 Lakh became ₹1.85 Lakhs (+85% gain)',
    outcomeB: '₹1 Lakh became ₹2.42 Lakhs (+142% gain)',
    difference: 'Smallcaps yielded 57% higher total returns, but required enduring severe interim 30% corrections.',
    takeaway: 'Smallcaps deliver higher returns during economic expansion cycles, but you must stomach heart-stopping volatility. Never put money into smallcaps if you need it within 3 years.'
  },
  {
    id: 'duel-sgb-vs-physical-gold',
    title: 'Gold Investment Duel: Sovereign Gold Bond (SGB) vs Physical Jewellery',
    assetA: { name: 'Physical Gold Jewellery (Showroom)', annualReturn: 'Gold Spot - 18% Making Charges', risk: 'Theft / Storage / Impurities' },
    assetB: { name: 'Sovereign Gold Bond (RBI SGB)', annualReturn: 'Gold Spot + 2.5% Annual Interest + Zero Tax at Maturity', risk: 'Sovereign Backed' },
    question: 'Which gold investment yields dramatically higher returns over an 8-year holding period?',
    winner: 'B',
    outcomeA: 'Loss of 15-20% upfront to making charges + locker rent + 20% capital gains tax on sale.',
    outcomeB: 'Full gold appreciation + ₹2,500 interest paid every year per ₹1 Lakh + 100% EXEMPT from capital gains tax at maturity!',
    difference: 'SGB delivers 40% to 55% higher net cash in hand than physical gold jewellery.',
    takeaway: 'If buying gold purely as an investment, physical jewellery is a wealth destructor. Sovereign Gold Bonds or Gold ETFs offer clean compounding.'
  }
];
