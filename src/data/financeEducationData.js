// Comprehensive Finance Zero-to-Hero Knowledge Engine
// Covers: SIP, Bank FDs, Mutual Funds (Small/Mid/Large/Flexi Cap), Stocks & Valuation, LIC vs Term, PPF, Gold, Liquid Funds
// Includes 26 randomized questions and educational masterclass modules

export const financeGlossary = {
  sip: {
    id: 'sip',
    title: 'Systematic Investment Plan (SIP)',
    category: 'Equity Compounding Engine',
    badge: 'RETAIL WEALTH ENGINE',
    oneLiner: 'The ultimate discipline-based wealth-compounding vehicle for retail investors.',
    expectedReturn: '12% - 15% CAGR (Long-term Nifty 50 historical average)',
    riskLevel: 'Moderate to High in short term; Low risk over 7+ years',
    lockIn: 'None for open-ended funds (3 years for ELSS Tax-Saver funds)',
    taxation: '12.5% Long-Term Capital Gains (LTCG) above ₹1.25 Lakh per financial year (Budget 2024)',
    explanation: `An SIP is not a product—it is an automated, disciplined investment technique where you invest a fixed sum (e.g., ₹1,000, ₹10,000, or ₹50,000) into a mutual fund every month on a set date. It removes emotional biases like greed and panic. When the market drops, your fixed installment automatically purchases MORE fund units at discounted prices; when the market peaks, you purchase fewer units. This mathematical phenomenon is called Rupee Cost Averaging.`,
    howItWorks: [
      'Automatic auto-debit on chosen day of each month via NACH/e-mandate.',
      'Rupee Cost Averaging lowers your average acquisition price over long market cycles.',
      'Power of Compounding: Gains generate further gains in an exponential curve after Year 7.',
      'Step-Up SIP: Increasing your SIP by just 10% each year can nearly double your 20-year corpus.'
    ],
    theMath: 'Investing ₹10,000/month at 13.5% CAGR for 20 years: Total invested = ₹24 Lakhs. Final portfolio value = ₹1.22 Crore! Over ₹98 Lakhs is pure compounding profit created by corporate India.',
    commonTraps: 'Stopping your SIP when market corrections happen! Bear markets are when SIP units are on massive sale. Stopping your SIP at bottoms is the #1 wealth-destroying mistake.',
    bestFor: 'Retirement planning, child higher education, long-term wealth creation (7 to 25 years).'
  },

  fixedDeposit: {
    id: 'fixedDeposit',
    title: 'Bank Fixed Deposit (FD)',
    category: 'Guaranteed Debt & Capital Safety',
    badge: 'GUARANTEED / ZERO RISK',
    oneLiner: 'Contractual, rigid interest for conservative capital preservation without volatility.',
    expectedReturn: '6.5% - 7.5% p.a. (Senior citizens +0.5%)',
    riskLevel: 'Virtually Zero (DICGC sovereign insured up to ₹5 Lakh per bank)',
    lockIn: '7 days to 10 years (Premature withdrawal carries 0.5% - 1% interest penalty)',
    taxation: 'Interest added to income and taxed at your peak tax slab (up to 30% + cess). TDS at 10% if >₹40,000/yr.',
    explanation: `A Fixed Deposit is an agreement where you deposit a lump sum with a scheduled commercial bank for a fixed tenure at an agreed interest rate. The principal and returns are backed by the bank balance sheet, with sovereign insurance coverage of up to ₹5,00,000 per depositor provided by the RBI’s Deposit Insurance and Credit Guarantee Corporation (DICGC).`,
    howItWorks: [
      'Lump-sum capital is locked at a fixed contracted interest rate.',
      'Interest can be paid out quarterly, monthly, or compounded until maturity (Cumulative FD).',
      'Senior citizens (age 60+) receive an additional 0.50% interest bonus across most public and private banks.',
      'Premature closure is allowed, but incurs an interest haircut penalty (usually 0.5% to 1.0%).'
    ],
    theMath: 'At 7.0% interest in the 30% tax slab: Post-tax return = 4.90%. With inflation running at 5.5%, your real purchasing power shrinks by -0.6% every single year! FDs preserve nominal rupees, but lose purchasing power.',
    commonTraps: 'Treating FDs as long-term retirement wealth creators. FDs are for capital preservation and short-term liquidity, not for beating inflation.',
    bestFor: 'Retirees needing monthly income, emergency cash, or capital required within 1 to 3 years.'
  },

  largeCap: {
    id: 'largeCap',
    title: 'Large Cap / Nifty 50 Index Funds',
    category: 'Bluechip Equity Backbone',
    badge: 'BLUECHIP FOUNDATION',
    oneLiner: 'Owning the top 100 corporate giants of India that power the national economy.',
    expectedReturn: '12% - 14% CAGR (20-year rolling average)',
    riskLevel: 'Moderate Equity (Max historical bear market drawdown ~15-25%)',
    lockIn: 'Zero lock-in (Open-ended)',
    taxation: '12.5% LTCG above ₹1.25L; 20% STCG',
    explanation: `Under SEBI classification, Large Cap funds must invest at least 80% of their assets in the Top 100 companies by market capitalization in India. These include household titans like Reliance Industries, Tata Consultancy Services, HDFC Bank, Infosys, ICICI Bank, and Larsen & Toubro. They have fortress balance sheets, durable competitive moats, and survive severe recessions with ease.`,
    howItWorks: [
      'Passive Index Funds mechanically mirror the Nifty 50 or Sensex at microscopic expense ratios (0.10% - 0.20%).',
      'Underperforming companies are automatically booted out of the index semi-annually and replaced with fast-growing champions.',
      'Provides steady dividends plus capital appreciation matching Indian corporate GDP growth.'
    ],
    theMath: 'Nifty 50 grew from 1,000 points in 1995 to over 24,500+ points by 2026—a monumental 24x capital expansion multiplying wealth every 5.5 years on average.',
    commonTraps: 'Paying high 1.5% expense ratios to active large-cap fund managers when 85%+ of them fail to beat the plain Nifty 50 Index over 5-year periods.',
    bestFor: 'Core portfolio foundation for every long-term investor seeking bluechip compounding.'
  },

  midCap: {
    id: 'midCap',
    title: 'Mid Cap Mutual Funds (Nifty Midcap 150)',
    category: 'High-Velocity Equity',
    badge: 'EXPANSION ACCELERATOR',
    oneLiner: 'Mid-sized established corporate challengers scaling into future large-caps.',
    expectedReturn: '15% - 18% CAGR (High alpha long-term)',
    riskLevel: 'Moderate to High (Bear market drawdowns can reach 25-35%)',
    lockIn: 'Zero lock-in',
    taxation: '12.5% LTCG above ₹1.25L; 20% STCG',
    explanation: `SEBI defines Mid Cap companies as those ranked 101st to 250th in market capitalization. These companies have already proven their business models, possess established brand presence, and are scaling up rapidly in sectors like specialty chemicals, electronics manufacturing, defense, and capital goods.`,
    howItWorks: [
      'Invests in mid-sized businesses with market capitalizations between ₹7,000 Cr and ₹25,000 Cr.',
      'Benefits from higher earnings growth rates than mature large-caps during economic expansion cycles.',
      'Subject to wider swings in stock price during market downturns.'
    ],
    theMath: '₹1 Lakh invested in Nifty Midcap 150 over 10 years grew into ~₹5.32 Lakhs (18.2% CAGR) vs ~₹3.58 Lakhs in Large Cap (13.6% CAGR).',
    commonTraps: 'Panicking during interim 20% corrections. Mid caps require a minimum 5 to 7 year holding patience.',
    bestFor: 'Investors with at least 5-7 year horizon seeking higher returns than plain index funds.'
  },

  smallCap: {
    id: 'smallCap',
    title: 'Small Cap Mutual Funds (Nifty Smallcap 250)',
    category: 'High Alpha / Multi-Bagger Hunt',
    badge: 'MULTI-BAGGER RISK/REWARD',
    oneLiner: 'Agile sunrise companies that can 5x in bull runs but crash 40% in liquidity crunches.',
    expectedReturn: '16% - 22% CAGR (Very high volatility)',
    riskLevel: 'Very High (Severe corrections of 35% to 50% during bear markets)',
    lockIn: 'Zero lock-in',
    taxation: '12.5% LTCG above ₹1.25L; 20% STCG',
    explanation: `Small Cap companies are ranked 251st and below by market cap (under ₹7,000 Crore). They are emerging enterprises in sunrise sectors like green energy, electric mobility components, software niches, and engineering goods. While they offer the highest multi-bagger potential, they suffer from lower liquidity and higher vulnerability to economic shocks.`,
    howItWorks: [
      'Fund managers analyze hundreds of under-researched companies to discover hidden champions.',
      'During bull runs, institutional liquidity inflows cause small-cap valuations to multiply explosively.',
      'During bear cycles (e.g. 2018-2019), small caps can decline 35-45% and remain stagnant for 18 months.'
    ],
    theMath: 'Small caps plummeted -38% in 2018, but skyrocketed +220% between 2020 and 2024. SIP in small caps turns painful crashes into golden buying opportunities.',
    commonTraps: 'Investing money you might need in the next 3 years into small caps. Never invest emergency or short-term funds here!',
    bestFor: 'Investors with high risk appetite, 7-10+ year horizon, and diamond-handed emotional discipline.'
  },

  licVsTerm: {
    id: 'licVsTerm',
    title: 'LIC Traditional Endowment vs Pure Term + Index SIP',
    category: 'Insurance vs Wealth Strategy',
    badge: 'CRITICAL LITERACY LESSON',
    oneLiner: 'Why mixing insurance with investment is the costliest personal finance mistake in India.',
    expectedReturn: 'Traditional LIC: 4.8% - 5.5% | Term + SIP Combo: 13.5% CAGR + 10x Higher Cover',
    riskLevel: 'LIC: Severe inflation loss risk | Term+SIP: Protected life + Equity alpha',
    lockIn: 'LIC: 15-25 years with brutal early surrender penalties | Term: Annual cover; SIP 100% liquid',
    taxation: 'LIC: 10(10D) tax exempt | Term+SIP: 80C on Term + 12.5% LTCG on SIP',
    explanation: `Traditional LIC policies (Jeevan Labh, Jeevan Anand, Money-back) combine a small life cover with conservative government debt investments. Because of hefty agent commissions (up to 30% of year-1 premium) and conservative asset allocation, their internal rate of return (IRR) is only 4.5% to 5.5%—which fails to beat 6% inflation! The golden rule of personal finance is: NEVER mix insurance and investment. Buy a Pure Term Insurance plan for cheap life protection, and invest the remaining savings in a Nifty 50 Index SIP.`,
    howItWorks: [
      'Scenario A (Traditional Policy): Pay ₹50,000/year for 20 years. Life cover: ₹5 Lakh. Maturity payout: ~₹19 Lakhs.',
      'Scenario B (Term + SIP Combo): Pay ₹10,000/year for ₹1 Crore Term Cover. Invest remaining ₹40,000/year in Index SIP. Life cover: ₹1.0 Crore (20x higher!). Maturity wealth: ~₹38 Lakhs (2x higher!).',
      'If you stop paying an LIC policy in years 1-3, you forfeit 50-70% of your paid premiums. In an SIP, your money remains 100% yours.'
    ],
    theMath: 'By separating Term Insurance and SIP, you get 20x higher family protection and double the final wealth corpus with zero surrender trap.',
    commonTraps: 'Buying policies from relatives or agents solely for 80C tax rebates without calculating the 5% poor return.',
    bestFor: 'Every earning individual supporting financial dependents.'
  },

  stocksValuation: {
    id: 'stocksValuation',
    title: 'Stock Investing & Valuation Fundamentals (P/E, ROE)',
    category: 'Equity Valuation Desk',
    badge: 'DALAL STREET FOUNDATIONS',
    oneLiner: 'How shares represent real business ownership, and how to value companies properly.',
    expectedReturn: 'Varies by company performance and fundamentals',
    riskLevel: 'Company-specific business and market risk',
    lockIn: 'Zero (instant liquidity on NSE/BSE)',
    taxation: '12.5% LTCG (>₹1.25L); 20% STCG',
    explanation: `A share is not a lottery ticket—it is legal fractional ownership of a real operating company. When you own shares in Tata Motors, you own a piece of every car, factory, and profit they generate. Stock valuation tools like P/E (Price-to-Earnings), ROE (Return on Equity), and ROCE (Return on Capital Employed) measure whether you are buying a business cheaply or paying an exorbitant hype premium.`,
    howItWorks: [
      'P/E Ratio = Stock Price ÷ Earnings Per Share (EPS). Tells you how many Rupees you pay for ₹1 of annual profit.',
      'ROE (Return on Equity): Measures how efficiently management generates profits from shareholder capital. Strong companies maintain ROE > 18%.',
      'Debt-to-Equity: Companies with high debt (>1.5x) risk bankruptcy during economic downturns; companies with zero or low debt survive crises easily.',
      'Promoter Holding & Pledging: High promoter holding (>50%) shows founder skin-in-the-game; high promoter share pledging is a critical red flag.'
    ],
    theMath: 'If Company X earns ₹50/share and trades at ₹1,000, its P/E is 20x. If profits grow 20% annually for 5 years, EPS becomes ₹124. At the same 20x P/E, share price rises to ₹2,480—a 148% capital gain driven strictly by earnings growth.',
    commonTraps: 'Buying stocks on Telegram tips, WhatsApp groups, or YouTube influencer hype without checking financial statements.',
    bestFor: 'Informed investors willing to study annual reports, balance sheets, and competitive moats.'
  },

  ppf: {
    id: 'ppf',
    title: 'Public Provident Fund (PPF)',
    category: 'Sovereign Tax-Free Savings',
    badge: '100% TAX-FREE EEE ANCHOR',
    oneLiner: 'The gold standard of safe, guaranteed, 100% tax-exempt wealth accumulation in India.',
    expectedReturn: '7.1% p.a. (Set quarterly by Ministry of Finance)',
    riskLevel: 'Zero Risk (Direct sovereign guarantee by Government of India)',
    lockIn: '15 Years (Partial withdrawals allowed from Year 7)',
    taxation: 'Exempt-Exempt-Exempt (EEE): Deposit is 80C exempt, interest is tax-free, maturity is 100% tax-free.',
    explanation: `PPF is a 15-year statutory savings scheme instituted by the central government. It carries the highest possible safety rating in the country because it is backed by the sovereign balance sheet of India. Its greatest superpower is EEE status: you get Section 80C deduction when investing, pay zero tax on annual interest, and pay zero tax on final maturity payouts.`,
    howItWorks: [
      'Deposit between ₹500 minimum and ₹1,50,000 maximum per financial year.',
      'Interest is compounded annually on March 31 based on minimum balance between 5th and end of each month.',
      'Cannot be attached by courts, creditors, or tax authorities under the PPF Act, 1968.',
      'Can be extended in 5-year blocks indefinitely after 15-year maturity with or without fresh contributions.'
    ],
    theMath: 'Investing ₹1.5 Lakh/year for 15 years at 7.1%: Total invested = ₹22.5 Lakhs. Final maturity = ~₹40.68 Lakhs—100% tax-free! In a 30% tax bracket, an FD would need to offer 10.15% interest to match this post-tax return.',
    commonTraps: 'Depositing after the 5th of the month. To earn full interest for that month, always deposit between the 1st and 5th of each month!',
    bestFor: 'Debt allocation of long-term portfolios, children’s higher education, and risk-free retirement corpus.'
  },

  sgbGold: {
    id: 'sgbGold',
    title: 'Sovereign Gold Bonds (SGB) & Gold ETFs',
    category: 'Sovereign Commodity Paper',
    badge: 'GOLD APPRECIATION + 2.5% CASH',
    oneLiner: 'The most tax-efficient and profitable way to hold gold without physical security risks.',
    expectedReturn: 'Gold spot price appreciation + 2.50% annual cash interest payout',
    riskLevel: 'Moderate Commodity Risk (Backed by RBI sovereign guarantee)',
    lockIn: '8 Years (Official RBI early redemption windows from Year 5; tradable on stock exchange)',
    taxation: '100% Tax-Free capital gains if held until 8-year maturity! Semi-annual 2.5% interest taxed at slab rate.',
    explanation: `Sovereign Gold Bonds are government securities denominated in grams of gold issued by the Reserve Bank of India. They track the exact market price of 999 purity gold, but unlike physical jewelry, they carry zero making charges (saving 15-20%), zero storage/locker fees, and zero risk of theft. To sweeten the deal, the Government pays you an extra 2.50% annual cash interest directly into your bank account!`,
    howItWorks: [
      'Issued in tranches by RBI at 999 purity bullion prices with a ₹50/gram discount for online applications.',
      '2.5% interest credited to your bank account semi-annually (1.25% every 6 months).',
      'On maturity after 8 years, the RBI redeems the bonds at the prevailing gold price, and the entire capital gain is 100% EXEMPT from income tax.'
    ],
    theMath: 'Over 8 years, gold price went from ₹2,684/g to ~₹7,500/g (+179% gain) PLUS ₹536 in cumulative cash interest paid—all 100% tax-free in hand.',
    commonTraps: 'Buying heavy gold jewellery thinking it is an investment. Jewellery incurs 15-25% making charge loss and GST.',
    bestFor: 'Gold allocation in investment portfolios (5% - 10% of total wealth).'
  },

  liquidFunds: {
    id: 'liquidFunds',
    title: 'Liquid Mutual Funds (T-Bills & Money Market)',
    category: 'Cash Management & Ultra-Short Term',
    badge: 'T-BILL SAFETY / INSTANT CASH',
    oneLiner: 'The smarter, higher-yielding alternative to a lazy bank savings account.',
    expectedReturn: '6.8% - 7.3% p.a.',
    riskLevel: 'Ultra Low (Sovereign T-Bills and AAA Commercial Paper)',
    lockIn: 'None (Instant redemption up to ₹50,000 within 15 minutes; T+1 payout for rest)',
    taxation: 'Taxed at investor’s income tax slab rate',
    explanation: `A Liquid Mutual Fund invests solely in very short-term money market instruments with maturities of up to 91 days—such as Government Treasury Bills (T-Bills), Certificates of Deposit (CDs), and Commercial Paper issued by top-rated corporations. Because the instruments mature so quickly, interest rate fluctuations have almost zero impact on the fund value, providing steady, daily accrual of returns with virtually zero capital volatility.`,
    howItWorks: [
      'Invests in government and AAA-rated debt securities maturing in 91 days or less.',
      'Daily NAV compounding with zero equity market exposure.',
      'Instant redemption facility allows up to ₹50,000 or 90% of folio value to be credited to your bank account in 15 minutes.',
      'Exit load is minimal (drops to 0% after just 7 days of holding).'
    ],
    theMath: '₹5,00,000 idle cash in savings account (3%): Earns ₹15,000/yr. In Liquid Fund (7.1%): Earns ₹35,500/yr. That is an extra ₹20,500 pure cash for the same next-day liquidity.',
    commonTraps: 'Leaving lakhs of rupees idle in zero-yielding bank savings accounts.',
    bestFor: 'Emergency funds (3-6 months expenses), business working capital, or parking lump sums before starting an STP into equity funds.'
  }
};

// Master Question Bank: 26 Comprehensive Questions across all finance domains
export const masterQuizQuestionBank = [
  {
    id: 'q1',
    topic: 'Liquid Funds & Cash',
    level: 1,
    badge: '️ Cash Guardian',
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
    id: 'q2',
    topic: 'SIP & Compounding',
    level: 2,
    badge: ' SIP Master',
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
    id: 'q3',
    topic: 'FD & Inflation Reality',
    level: 3,
    badge: ' Inflation Slayer',
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
    id: 'q4',
    topic: 'Stock Valuation (P/E)',
    level: 4,
    badge: ' Value Hunter',
    question: 'Company A has a P/E of 14x and generates 25% ROE with zero debt. Company B has a P/E of 95x and makes zero profit. Which is fundamentally safer?',
    options: [
      { text: 'Company B because high P/E means the stock price always goes up', isCorrect: false, feedback: 'Dangerous fallacy. High P/E companies crash 60-80% when quarterly revenue growth slows by even 2%.' },
      { text: 'Company A because it has strong profit earnings, high capital return, and a conservative valuation multiple', isCorrect: true, feedback: 'Exactly. Company A (like Tata Motors or SBI) trades at a margin of safety with proven balance sheet cash flows.' },
      { text: 'P/E ratio has no relevance in modern stock markets', isCorrect: false, feedback: 'Incorrect. Valuation is the ultimate anchor of long-term investment returns.' }
    ],
    axiom: 'Price is what you pay. Value is what you get.'
  },
  {
    id: 'q5',
    topic: 'Direct vs Regular Plans',
    level: 5,
    badge: ' Dalal Street Hero',
    question: 'Why should an informed retail investor always choose DIRECT plans of Mutual Funds instead of REGULAR plans?',
    options: [
      { text: 'Direct plans invest in completely different secret stocks', isCorrect: false, feedback: 'Incorrect. Both direct and regular plans hold the exact same stocks and fund manager.' },
      { text: 'Direct plans eliminate middleman distributor commissions, giving 1.0% to 1.5% extra compounded return every year', isCorrect: true, feedback: 'Legendary! Over a 25-year investment horizon, that 1.2% saved commission difference compounds into over ₹35 Lakhs of extra money in your pocket!' },
      { text: 'Direct plans are exempt from all Government capital gains taxes', isCorrect: false, feedback: 'Incorrect. Tax treatment is identical for both plans.' }
    ],
    axiom: 'Small percentage fees compound into colossal wealth deductions over decades. Cut unnecessary friction.'
  },
  {
    id: 'q6',
    topic: 'Insurance vs Investment',
    level: 6,
    badge: '️ Insurance Decoder',
    question: 'An insurance agent offers you an endowment plan: pay ₹50,000/year for 20 years to get ₹5 Lakh life cover and ₹18 Lakhs maturity. What is the smarter alternative?',
    options: [
      { text: 'Accept it immediately because insurance is always risk-free', isCorrect: false, feedback: 'Incorrect. That policy gives an internal return of only 5%, which loses to inflation!' },
      { text: 'Buy a Pure Term Plan for ₹1 Crore cover (₹10,000/yr) and invest the remaining ₹40,000/yr in a Nifty 50 Index SIP', isCorrect: true, feedback: 'Masterclass move! You get 20x higher family life cover (₹1 Crore) AND your SIP can grow to over ₹38 Lakhs at 13.5% CAGR!' },
      { text: 'Put all ₹50,000 in a savings account', isCorrect: false, feedback: 'Savings accounts yield only 3% and provide zero life protection.' }
    ],
    axiom: 'Never mix insurance with investment. Buy pure term life for risk, and equity SIP for wealth.'
  },
  {
    id: 'q7',
    topic: 'Small Cap Volatility',
    level: 7,
    badge: ' Risk Master',
    question: 'You invested ₹2,00,000 in a Small Cap Mutual Fund. During a market crash, its NAV drops by 30% in 4 months. What is the mathematically sound action?',
    options: [
      { text: 'Panic, sell everything, and vow never to invest in equities again', isCorrect: false, feedback: 'Selling at the bottom turns temporary paper declines into permanent capital destruction.' },
      { text: 'Continue your SIP and consider allocating extra lump-sum if your investment horizon is 7+ years', isCorrect: true, feedback: 'Correct! Small caps historically suffer 30-40% drawdowns, followed by explosive multi-bagger rallies in recovery phases.' },
      { text: 'Borrow personal loans at 18% interest to double your bet', isCorrect: false, feedback: 'Never use leverage or expensive debt to average down in volatile equities.' }
    ],
    axiom: 'Volatility is not risk; permanent loss of capital is. Small caps require emotional stamina.'
  },
  {
    id: 'q8',
    topic: 'Sovereign Gold Bonds',
    level: 8,
    badge: ' Gold Sovereign',
    question: 'Why are Sovereign Gold Bonds (SGB) mathematically superior to buying physical gold jewellery for investment?',
    options: [
      { text: 'SGBs give gold appreciation + 2.5% annual interest + 100% tax exemption on maturity with zero making charge loss', isCorrect: true, feedback: 'Spot on! Jewellery loses 15-20% to making charges and pays zero interest. SGB gives cash yield and zero tax.' },
      { text: 'SGBs are physical coins delivered to your home every month', isCorrect: false, feedback: 'Incorrect. SGBs are held digitally in Demat or RBI ledger.' },
      { text: 'SGBs can be converted into bank shares at will', isCorrect: false, feedback: 'Incorrect. SGBs are linked purely to gold prices.' }
    ],
    axiom: 'Gold jewellery is consumer expenditure; Sovereign Gold Bonds are investment assets.'
  },
  {
    id: 'q9',
    topic: 'PPF Rules & EEE',
    level: 9,
    badge: '️ Sovereign Anchor',
    question: 'What does "EEE" tax status mean for the Public Provident Fund (PPF)?',
    options: [
      { text: 'Early Exit Everywhere', isCorrect: false, feedback: 'Incorrect.' },
      { text: 'Exempt-Exempt-Exempt: Deposit is 80C exempt, annual interest is tax-free, and maturity payout is 100% tax-free', isCorrect: true, feedback: 'Correct! EEE is the highest tax-advantaged status under Indian Income Tax law.' },
      { text: 'Only eligible for employees of Central Government', isCorrect: false, feedback: 'Incorrect. PPF is open to all Indian citizens.' }
    ],
    axiom: 'Triple tax exemption (EEE) turns 7.1% guaranteed returns into the equivalent of a 10%+ taxable bank FD.'
  },
  {
    id: 'q10',
    topic: 'Large Cap Definition',
    level: 10,
    badge: ' Bluechip Sentinel',
    question: 'Under SEBI mutual fund categorization, what defines a "Large Cap" company?',
    options: [
      { text: 'Any company that has been operating for more than 50 years', isCorrect: false, feedback: 'Incorrect. Longevity is not a SEBI classification criterion.' },
      { text: 'The Top 100 companies ranked by full market capitalization on Indian exchanges', isCorrect: true, feedback: 'Exactly. Ranks 1 to 100 are Large Cap; 101 to 250 are Mid Cap; 251 and below are Small Cap.' },
      { text: 'Companies with annual revenue exceeding ₹1,00,000 Crore', isCorrect: false, feedback: 'Incorrect. Classification is based strictly on market capitalization ranks.' }
    ],
    axiom: 'SEBI classification standardizes risk: Large caps represent institutional stability.'
  },
  {
    id: 'q11',
    topic: 'Budget 2024 Capital Gains',
    level: 11,
    badge: ' Tax Tactician',
    question: 'As per Union Budget 2024 reforms, what is the Long-Term Capital Gains (LTCG) tax rate on listed equity shares and mutual funds?',
    options: [
      { text: '0% (completely tax free)', isCorrect: false, feedback: 'Incorrect. Equity LTCG is taxable above the statutory threshold.' },
      { text: '12.5% on profits exceeding ₹1.25 Lakh per financial year', isCorrect: true, feedback: 'Correct! Budget 2024 revised equity LTCG from 10% to 12.5% and increased the annual exemption limit from ₹1 Lakh to ₹1.25 Lakh.' },
      { text: '30% slab rate', isCorrect: false, feedback: 'Incorrect. 30% applies to unindexed debt funds and speculative F&O gains, not equity LTCG.' }
    ],
    axiom: 'Tax awareness is an investor’s duty: always harvest up to ₹1.25 Lakh in tax-free equity profits annually.'
  },
  {
    id: 'q12',
    topic: 'Market Timing Myth',
    level: 12,
    badge: '⏱️ Time in Market',
    question: 'Studies of Dalal Street show that missing just the 10 best market days over a 20-year period cuts your final returns by how much?',
    options: [
      { text: 'Less than 2%', isCorrect: false, feedback: 'Incorrect. Market returns are concentrated in sudden, violent recovery bursts.' },
      { text: 'Nearly 40% to 50% of total wealth accumulation!', isCorrect: true, feedback: 'Shocking but true! The best market days often occur right in the middle of terrifying panics. Trying to time the market causes investors to miss these golden days.' },
      { text: 'Zero difference', isCorrect: false, feedback: 'Incorrect.' }
    ],
    axiom: 'Time IN the market always beats timing the market.'
  },
  {
    id: 'q13',
    topic: 'Emergency Fund Sizing',
    level: 13,
    badge: '️ Safety Net',
    question: 'How large should your liquid emergency fund be before you start investing heavily in equity markets?',
    options: [
      { text: '₹10,000 is always enough', isCorrect: false, feedback: 'Too small to cover job loss, medical emergencies, or major household repairs.' },
      { text: '3 to 6 months of mandatory living expenses parked in Liquid Funds or High-yield FDs', isCorrect: true, feedback: 'Crucial financial hygiene! An emergency fund prevents you from panic-selling your equity portfolio during market downturns.' },
      { text: '100% of your net worth', isCorrect: false, feedback: 'Keeping everything in cash guarantees losing wealth to inflation over time.' }
    ],
    axiom: 'Build an emergency fortress first; deploy into equity alpha second.'
  },
  {
    id: 'q14',
    topic: 'P/E vs Growth (PEG)',
    level: 14,
    badge: ' Growth Evaluator',
    question: 'If Company X has a P/E of 30x and is growing net profits at 30% annually, its PEG (Price/Earnings-to-Growth) ratio is 1.0. Is this generally considered fair value?',
    options: [
      { text: 'Yes, a PEG of ~1.0 generally signifies that valuation is fairly priced relative to earnings expansion', isCorrect: true, feedback: 'Spot on! PEG ratio divides P/E by annual growth rate. PEG <= 1.0 indicates a company is reasonably priced for its growth.' },
      { text: 'No, any P/E above 15 is automatically a scam', isCorrect: false, feedback: 'Incorrect. Fast-growing companies command higher P/E ratios justified by profit growth.' },
      { text: 'PEG ratio only applies to American technology stocks', isCorrect: false, feedback: 'Incorrect. It is a universal valuation metric created by Peter Lynch.' }
    ],
    axiom: 'Never evaluate P/E in isolation; always compare valuation to earnings growth rate.'
  },
  {
    id: 'q15',
    topic: 'Promoter Pledging Danger',
    level: 15,
    badge: '️ Corporate Forensic',
    question: 'You notice that the promoters of a fast-rising stock have pledged 75% of their shareholdings to borrow corporate loans. What does this indicate?',
    options: [
      { text: 'A massive bullish sign that promoters are confident', isCorrect: false, feedback: 'Dangerous misconception! High pledging is one of Dalal Street’s biggest disaster indicators.' },
      { text: 'A major red flag: if share price falls, lenders will dump pledged shares into the market, triggering a catastrophic margin-call crash', isCorrect: true, feedback: 'Exactly. Highly pledged companies have repeatedly wiped out retail investors (e.g. Zee, Suzlon past history).' },
      { text: 'Promoters are donating their shares to charity', isCorrect: false, feedback: 'Pledging means mortgaging shares as collateral for loans.' }
    ],
    axiom: 'Always inspect promoter pledging before buying any mid-cap or small-cap stock.'
  },
  {
    id: 'q16',
    topic: 'Step-Up SIP Magic',
    level: 16,
    badge: ' Compounding Turbo',
    question: 'What is the impact of a 10% annual "Step-Up" on a ₹10,000/month SIP over 20 years at 12% CAGR?',
    options: [
      { text: 'Adds only a tiny ₹2-3 Lakhs extra at the end', isCorrect: false, feedback: 'Underestimates the power of incremental compounding.' },
      { text: 'Increases the final maturity corpus from ~₹1.0 Crore to a staggering ~₹1.85 Crore!', isCorrect: true, feedback: 'Incredible math! Increasing your SIP in tandem with your annual salary raises nearly doubles your retirement wealth without financial strain.' },
      { text: 'Reduces your returns because of higher tax slabs', isCorrect: false, feedback: 'Incorrect.' }
    ],
    axiom: 'Step-up SIP: Let your investment discipline grow with your career income.'
  },
  {
    id: 'q17',
    topic: 'Bank DICGC Insurance',
    level: 17,
    badge: ' Banking Shield',
    question: 'If a scheduled commercial bank collapses in India, what is the maximum insurance payout guaranteed by RBI’s DICGC per depositor?',
    options: [
      { text: '₹1 Lakh total', isCorrect: false, feedback: 'This was the old limit prior to the 2020 regulatory enhancement.' },
      { text: '₹5,00,000 including principal and accrued interest', isCorrect: true, feedback: 'Correct. DICGC insures up to ₹5 Lakh across all accounts (savings, current, FD) per depositor per bank.' },
      { text: 'Unlimited sovereign protection for any amount', isCorrect: false, feedback: 'Only deposits up to ₹5 Lakh are legally insured by statute.' }
    ],
    axiom: 'For cash deposits exceeding ₹20-30 Lakhs, diversify across 2 or 3 distinct scheduled commercial banks.'
  },
  {
    id: 'q18',
    topic: 'ELSS Tax Saver Lock-in',
    level: 18,
    badge: '⏳ Lock-In Strategist',
    question: 'Among all tax-saving instruments under Section 80C, which one has the shortest mandatory lock-in period?',
    options: [
      { text: 'PPF (Public Provident Fund)', isCorrect: false, feedback: 'PPF has a 15-year lock-in period.' },
      { text: 'Tax-Saver Bank FD', isCorrect: false, feedback: 'Tax-Saver FDs have a strict 5-year lock-in.' },
      { text: 'ELSS (Equity Linked Savings Scheme) Mutual Funds with a 3-year lock-in', isCorrect: true, feedback: 'Spot on! ELSS has the shortest lock-in (just 3 years) AND delivers equity compounding returns.' },
      { text: 'National Savings Certificate (NSC)', isCorrect: false, feedback: 'NSC has a 5-year lock-in.' }
    ],
    axiom: 'ELSS combines the shortest 80C lock-in (3 years) with the highest wealth-creation engine (equities).'
  },
  {
    id: 'q19',
    topic: 'Dividend vs Growth Option',
    level: 19,
    badge: ' Wealth Accumulator',
    question: 'Why should a young wealth accumulator choose the GROWTH option over the IDCW (Dividend) option in mutual funds?',
    options: [
      { text: 'Growth option keeps all dividends inside the fund to compound tax-free, whereas dividends are taxed at slab rates annually', isCorrect: true, feedback: 'Masterclass understanding! Dividends taken out break compounding and trigger immediate tax deductions each year.' },
      { text: 'Growth funds have zero government regulations', isCorrect: false, feedback: 'Incorrect.' },
      { text: 'IDCW funds are banned by SEBI', isCorrect: false, feedback: 'IDCW exists, but is suited only for retirees needing cash flows.' }
    ],
    axiom: 'Do not interrupt compounding: choose the Growth option during your wealth accumulation years.'
  },
  {
    id: 'q20',
    topic: 'Rule of 72',
    level: 20,
    badge: ' Mental Math Wizard',
    question: 'According to the financial "Rule of 72", if an equity mutual fund delivers 12% CAGR, how many years does it take to double your money?',
    options: [
      { text: '12 years', isCorrect: false, feedback: 'Divide 72 by the annual return rate: 72 ÷ 12 = 6 years!' },
      { text: '6 years (72 ÷ 12 = 6)', isCorrect: true, feedback: 'Bingo! Rule of 72 is the quickest mental math rule: at 12%, money doubles in 6 years; at 6% (FD), it takes 12 long years.' },
      { text: '10 years', isCorrect: false, feedback: 'Incorrect.' }
    ],
    axiom: 'Rule of 72: Divide 72 by your return rate to instantly know your doubling horizon.'
  },
  {
    id: 'q21',
    topic: 'Debt Fund Taxation',
    level: 21,
    badge: ' Debt Intelligence',
    question: 'Under current tax laws post-Finance Act 2023, how are capital gains from pure Debt Mutual Funds taxed?',
    options: [
      { text: 'With 20% indexation benefit after 3 years', isCorrect: false, feedback: 'Indexation benefit was eliminated for debt funds purchased after April 1, 2023.' },
      { text: 'At the investor’s personal income tax slab rate regardless of holding period', isCorrect: true, feedback: 'Correct! Pure debt fund gains are added to taxable income and taxed at slab rates.' },
      { text: '100% tax free', isCorrect: false, feedback: 'Incorrect.' }
    ],
    axiom: 'Know your tax reforms: post-2023, debt funds are taxed identical to bank FDs at slab rates.'
  },
  {
    id: 'q22',
    topic: 'Passive Indexing vs Active Funds',
    level: 22,
    badge: '️ Index Champion',
    question: 'What is the primary advantage of a passive Nifty 50 Index Fund over an active Large-Cap fund?',
    options: [
      { text: 'It eliminates fund-manager human error and charges 80-90% lower annual expense fees (0.15% vs 1.2%)', isCorrect: true, feedback: 'Spot on! Over 80% of active large-cap managers fail to beat the index net of their high fees over 7-10 years.' },
      { text: 'It guarantees that stocks will never drop in price', isCorrect: false, feedback: 'Index funds reflect market movements and do experience interim corrections.' },
      { text: 'It gives free shares to every investor', isCorrect: false, feedback: 'Incorrect.' }
    ],
    axiom: 'In large caps, low-cost passive index funds beat expensive human stock pickers over long cycles.'
  },
  {
    id: 'q23',
    topic: 'Free Cash Flow (FCF)',
    level: 23,
    badge: ' Cash Flow Forensic',
    question: 'A company reports ₹500 Crore accounting net profit, but its Free Cash Flow (FCF) from operations is negative -₹100 Crore. What does this reveal?',
    options: [
      { text: 'The company is highly profitable and safe to buy', isCorrect: false, feedback: 'Never trust accounting profits if real cash isn’t entering the bank account.' },
      { text: 'Profits are trapped in unpaid customer credit (receivables) or heavy capex; the business is not generating real cash', isCorrect: true, feedback: 'Brilliant corporate forensic analysis! Accounting profits can be manipulated; Free Cash Flow never lies.' },
      { text: 'FCF is an outdated metric from the 19th century', isCorrect: false, feedback: 'FCF is the primary metric used by legendary investors like Warren Buffett.' }
    ],
    axiom: 'Revenue is vanity. Profit is sanity. Cash flow is reality.'
  },
  {
    id: 'q24',
    topic: 'Flexi Cap Fund Flexibility',
    level: 24,
    badge: ' Dynamic Allocator',
    question: 'What makes a Flexi Cap Mutual Fund distinct from a Large Cap or Mid Cap fund under SEBI guidelines?',
    options: [
      { text: 'It is forced to hold exactly 33% in each market cap tier', isCorrect: false, feedback: 'That is a Multi-Cap fund (25% Large, 25% Mid, 25% Small). Flexi-cap has zero rigid cap restrictions.' },
      { text: 'The fund manager has complete freedom to dynamically shift capital between Large, Mid, and Small caps based on valuations', isCorrect: true, feedback: 'Correct! Flexi caps can hold 75% Large Caps during frothy markets and pivot to Small Caps during recoveries.' },
      { text: 'It invests solely in cryptocurrency and commodities', isCorrect: false, feedback: 'Incorrect. Flexi caps invest primarily in listed Indian equities.' }
    ],
    axiom: 'Flexi caps provide dynamic asset allocation without triggering capital gains tax on rebalancing.'
  },
  {
    id: 'q25',
    topic: 'IRDAI Surrender Value Reforms',
    level: 25,
    badge: '️ Regulatory Guardian',
    question: 'Why did insurance regulator IRDAI reform surrender value norms for traditional policies in 2024?',
    options: [
      { text: 'To stop insurers from wiping out 70-100% of customer money when policyholders are forced to exit policies early', isCorrect: true, feedback: 'Spot on! Millions of innocent savers used to lose their entire hard-earned savings when lapsing traditional policies.' },
      { text: 'To ban term insurance completely', isCorrect: false, feedback: 'Term insurance was not banned; it is the recommended pure protection model.' },
      { text: 'To increase agent commissions by 50%', isCorrect: false, feedback: 'Reforms aimed to protect consumers, not agents.' }
    ],
    axiom: 'Regulatory reforms protect retail capital: Avoid traditional endowment surrender traps.'
  },
  {
    id: 'q26',
    topic: 'Behavioral Bias (FOMO)',
    level: 26,
    badge: ' Dalal Street Zen Master',
    question: 'A stock has rallied 300% in 6 months. Your social media feed is full of screenshots boasting huge profits. What is the rational response?',
    options: [
      { text: 'Take all your savings and buy immediately so you do not miss out (FOMO)', isCorrect: false, feedback: 'Buying at the peak of euphoric hype is the textbook way retail investors become "bag holders".' },
      { text: 'Step back, evaluate business fundamentals and valuation multiples, and remember that late buyers usually fund early exiters’ profits', isCorrect: true, feedback: 'Zen mastery! When the herd is bragging about easy money, the risk-reward ratio is at its most hazardous.' },
      { text: 'Short sell the stock with 10x intraday leverage', isCorrect: false, feedback: 'Never short sell irrational bull runs; markets can remain irrational longer than you can remain solvent.' }
    ],
    axiom: 'Be fearful when others are greedy, and greedy only when others are fearful.'
  }
];

// Utility to get a fresh randomized set of quiz questions
export function getRandomizedQuiz(count = 10) {
  const shuffled = [...masterQuizQuestionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((q, idx) => ({
    ...q,
    sessionLevel: idx + 1,
    options: [...q.options].sort(() => 0.5 - Math.random()) // also shuffle option positions!
  }));
}

// Interactive "Higher Return Duel" Scenarios (What gave higher returns?)
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
    id: 'duel-lic-vs-term-sip',
    title: 'Insurance Dilemma: Traditional LIC Endowment vs Term Plan + Index SIP',
    assetA: { name: 'LIC Traditional Endowment Plan', annualReturn: '5.2% IRR', risk: 'Low default, but huge inflation erosion' },
    assetB: { name: '₹1 Cr Term Plan + Nifty 50 SIP', annualReturn: '13.5% CAGR', risk: 'Protected family + Equity compounding' },
    question: 'Investing ₹50,000/year for 20 years: which strategy gives more family protection AND higher final cash corpus?',
    winner: 'B',
    outcomeA: 'Life Cover: ₹5 Lakhs | Final Wealth: ~₹19.2 Lakhs',
    outcomeB: 'Life Cover: ₹1,00,00,000 (₹1 Cr) | Final Wealth: ~₹38.5 Lakhs in your own mutual fund!',
    difference: 'Term + SIP Combo gives 20x HIGHER insurance cover AND an extra ₹19.3 Lakhs in pure wealth.',
    takeaway: 'Never mix insurance with investment. Term insurance protects your family; low-cost mutual fund SIPs build your wealth.'
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
  },
  {
    id: 'duel-ppf-vs-fd',
    title: '15-Year Safe Debt: Public Provident Fund (PPF) vs 5-Year Bank FD (Renewed)',
    assetA: { name: 'Bank Fixed Deposit (7.0% taxable at 30% slab)', annualReturn: '4.9% post-tax', risk: 'Bank guaranteed' },
    assetB: { name: 'PPF (7.1% Tax-Free EEE)', annualReturn: '7.1% 100% tax-free', risk: 'Central Government Sovereign' },
    question: 'Depositing ₹1,50,000 every year for 15 years in a 30% tax bracket: which leaves you richer?',
    winner: 'B',
    outcomeA: 'Taxable FD Maturity (Post 30% Tax): ~₹33.5 Lakhs',
    outcomeB: 'PPF Maturity (100% Tax-Free): ~₹40.7 Lakhs',
    difference: 'PPF delivers ₹7.2 Lakhs MORE in your hand thanks to EEE zero-tax status.',
    takeaway: 'Taxes destroy compounding. EEE instruments like PPF protect long-term debt wealth from government tax drag.'
  }
];
