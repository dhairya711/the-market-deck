// Master Wealth Vehicles & Fund Intelligence Database
// Strictly calibrated with real historical facts, SEBI & RBI rules, and Indian Rupees (₹)
// Covers: Bank FDs, SIPs, Large Cap, Mid Cap, Small Cap, Flexi Cap, LIC Plans, PPF, SGB, Liquid Funds

export const wealthVehiclesCatalog = [
  {
    id: 'bank-fd',
    name: 'Bank Fixed Deposit (FD)',
    category: 'Guaranteed Debt',
    badge: 'GUARANTEED / ZERO RISK',
    badgeClass: 'badge-debt',
    icon: '',
    providerExample: 'SBI, HDFC Bank, ICICI, Post Office',
    historical1Y: '+7.1%',
    historical3Y: '+6.8% CAGR',
    historical5Y: '+6.5% CAGR',
    historical10Y: '+6.9% CAGR',
    realReturnPostInflation: '-0.2% to +0.9% (Often loses to inflation after 30% slab tax)',
    riskLevel: 'Ultra Low (DICGC insured up to ₹5 Lakh per bank)',
    volatilityDrawdown: 'Zero Volatility (0.0% Drawdown risk; principal guaranteed)',
    benchmarkIndex: '1-Year SBI Term Deposit Card Rate / Crisil Liquid Index',
    recommendedMinHorizon: '6 Months to 3 Years (Capital preservation buffer)',
    inflationProtectionRating: '⭐ Poor (Fails to beat 6% CPI after 20-30% slab income tax)',
    exitLoad: '0.50% - 1.00% penalty deduction on contracted interest for premature break',
    idealSuitability: 'Senior citizens seeking steady monthly interest, emergency cash, or capital required within 1-2 years.',
    lockIn: '7 days to 10 years (0.5% - 1% penalty on pre-closure)',
    liquidity: 'Within 24 hours (with interest deduction)',
    taxation: 'Interest added to income and taxed at slab rate (up to 30% + cess). TDS at 10% if >₹40,000/yr.',
    costDrag: 'Zero direct fee, but invisible inflation drag.',
    growthLumpSum5Y: '₹1,37,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹1,95,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹2,72,000 (from ₹1 Lakh)',
    growthSip5Y: '₹7,15,000 (on ₹6.0L invested)',
    growthSip10Y: '₹17,40,000 (on ₹12.0L invested)',
    growthSip15Y: '₹31,80,000 (on ₹18.0L invested)',
    description: 'A contractual fixed deposit with a scheduled commercial bank. Principal and fixed interest are guaranteed by the bank balance sheet, with sovereign insurance coverage of up to ₹5 Lakh from RBI DICGC.',
    pros: [
      '100% predictable returns with zero volatility',
      'Senior citizens get 0.50% higher interest',
      'Instant loan facility up to 90% of deposit value'
    ],
    cons: [
      'Fails to beat 6% inflation when taxed at 20% or 30% slab',
      'TDS deductions reduce compounding efficiency',
      'Premature withdrawal penalties apply'
    ],
    historicalNote: 'In 1995-1998, Indian bank FDs offered 12% to 14% interest when inflation was in double digits. As the RBI modernized monetary policy and targeted 4% inflation, baseline FD rates settled between 6.5% and 7.5%.'
  },

  {
    id: 'nifty-largecap',
    name: 'Large Cap / Nifty 50 Index Fund',
    category: 'Equity Mutual Fund',
    badge: 'BLUECHIP WEALTH ENGINE',
    badgeClass: 'badge-largecap',
    icon: '',
    providerExample: 'UTI Nifty 50, HDFC Top 100, ICICI Pru Bluechip',
    historical1Y: '+24.8%',
    historical3Y: '+15.2% CAGR',
    historical5Y: '+16.8% CAGR',
    historical10Y: '+13.6% CAGR',
    realReturnPostInflation: '+7.6% CAGR (Strong inflation-beating wealth creator)',
    riskLevel: 'Moderate Equity (Max historical correction ~20-25% in bear markets)',
    volatilityDrawdown: 'Moderate (-20% to -28% drawdowns during acute crises like 2008 & 2020)',
    benchmarkIndex: 'Nifty 50 TRI (Total Returns Index)',
    recommendedMinHorizon: '5+ Years (Allows economic business cycles to compound)',
    inflationProtectionRating: '⭐⭐⭐⭐ Strong (Generates 7-8% net real returns above CPI)',
    exitLoad: 'Nil after 7 to 30 days depending on fund house',
    idealSuitability: 'Core foundation of any long-term investor seeking stable equity ownership in India top corporate giants.',
    lockIn: 'Zero lock-in (Open-ended)',
    liquidity: 'T+2 working days payout into bank account',
    taxation: '12.5% LTCG on profits exceeding ₹1.25 Lakh per financial year; 20% STCG if sold within 1 year.',
    costDrag: '0.10% to 0.20% annual expense ratio in Direct plans.',
    growthLumpSum5Y: '₹2,17,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹3,58,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹6,85,000 (from ₹1 Lakh)',
    growthSip5Y: '₹9,12,000 (on ₹6.0L invested)',
    growthSip10Y: '₹25,80,000 (on ₹12.0L invested)',
    growthSip15Y: '₹58,40,000 (on ₹18.0L invested)',
    description: 'Invests in the top 100 market capitalization companies in India (Reliance, TCS, HDFC Bank, Infosys, Tata Motors, L&T). Represents the industrial backbone of the Indian economy.',
    pros: [
      'Historically doubles money every 5.5 to 6 years',
      'Low expense ratio (under 0.2% in index funds)',
      'High liquidity with zero exit load after 30-90 days'
    ],
    cons: [
      'Subject to equity market cyclical drawdowns',
      'Returns fluctuate year-to-year (-5% to +35%)'
    ],
    historicalNote: 'Since its inception in 1995 at 1,000 points, the Nifty 50 index has grown past 24,500+ points by 2026—a monumental 24x capital expansion driven by corporate India earnings compounding.'
  },

  {
    id: 'nifty-midcap',
    name: 'Mid Cap Mutual Fund (Nifty Midcap 150)',
    category: 'Equity Mutual Fund',
    badge: 'HIGH GROWTH RUNNERS',
    badgeClass: 'badge-midcap',
    icon: '',
    providerExample: 'Motilal Oswal Midcap, HDFC Midcap Opportunities, Nippon India Growth',
    historical1Y: '+36.4%',
    historical3Y: '+24.1% CAGR',
    historical5Y: '+25.2% CAGR',
    historical10Y: '+18.2% CAGR',
    realReturnPostInflation: '+12.2% CAGR (Exceptional capital compounding)',
    riskLevel: 'Moderate to High (Bear market drawdowns can hit 25-35%)',
    volatilityDrawdown: 'High (-28% to -36% during severe equity market corrections)',
    benchmarkIndex: 'Nifty Midcap 150 TRI',
    recommendedMinHorizon: '7+ Years (Mitigates cyclical mid-cap volatility)',
    inflationProtectionRating: '⭐⭐⭐⭐⭐ Outstanding (Beats CPI by 12%+ over 10-year holding)',
    exitLoad: '1.0% if redeemed within 1 year; Nil thereafter',
    idealSuitability: 'Wealth builders with high risk tolerance who want aggressive alpha by owning future market leaders.',
    lockIn: 'Zero lock-in (Open-ended)',
    liquidity: 'T+2 working days payout',
    taxation: '12.5% LTCG above ₹1.25L; 20% STCG',
    costDrag: '0.65% to 0.95% annual expense ratio (Direct plan).',
    growthLumpSum5Y: '₹3,07,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹5,32,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹11,40,000 (from ₹1 Lakh)',
    growthSip5Y: '₹11,20,000 (on ₹6.0L invested)',
    growthSip10Y: '₹34,80,000 (on ₹12.0L invested)',
    growthSip15Y: '₹89,20,000 (on ₹18.0L invested)',
    description: 'Invests in companies ranked 101 to 250 by market capitalization. These are established market leaders scaling rapidly into future large-caps across electronics, specialty chemicals, defense, and capital goods.',
    pros: [
      'Higher growth velocity than Large Caps',
      'Harnesses domestic manufacturing and capex cycles',
      'Top-tier wealth generator over 7-10+ year horizons'
    ],
    cons: [
      'Sharper corrections during global market panics',
      'Requires a minimum 5 to 7 year holding patience'
    ],
    historicalNote: 'The Nifty Midcap 150 has outperformed Large Caps in 7 out of the last 10 financial years, though it endured steep 28% pullbacks during the 2018 NBFC crisis.'
  },

  {
    id: 'nifty-smallcap',
    name: 'Small Cap Mutual Fund (Nifty Smallcap 250)',
    category: 'Equity Mutual Fund',
    badge: 'MULTI-BAGGER ACCELERATOR',
    badgeClass: 'badge-smallcap',
    icon: '',
    providerExample: 'Nippon India Small Cap, Quant Small Cap, SBI Small Cap',
    historical1Y: '+41.2%',
    historical3Y: '+27.4% CAGR',
    historical5Y: '+29.6% CAGR',
    historical10Y: '+20.5% CAGR',
    realReturnPostInflation: '+14.5% CAGR (Maximum historical alpha generation)',
    riskLevel: 'Very High (Severe drawdowns of 35% to 50% in bear phases)',
    volatilityDrawdown: 'Very High (-35% to -52% drawdowns in 2008, 2018, & 2020 bear routs)',
    benchmarkIndex: 'Nifty Smallcap 250 TRI',
    recommendedMinHorizon: '7 to 10+ Years (Crucial to ride out prolonged 2-3 year winter phases)',
    inflationProtectionRating: '⭐⭐⭐⭐⭐ Phenomenal (Top historical compounding in Indian financial history)',
    exitLoad: '1.0% if redeemed within 1 year; Nil thereafter',
    idealSuitability: 'Aggressive long-term accumulators with emotional stomach for 30%+ portfolio drawdowns.',
    lockIn: 'Zero lock-in (Open-ended)',
    liquidity: 'T+2 working days payout',
    taxation: '12.5% LTCG above ₹1.25L; 20% STCG',
    costDrag: '0.60% to 0.85% annual expense ratio (Direct plan).',
    growthLumpSum5Y: '₹3,65,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹6,45,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹14,80,000 (from ₹1 Lakh)',
    growthSip5Y: '₹12,40,000 (on ₹6.0L invested)',
    growthSip10Y: '₹41,60,000 (on ₹12.0L invested)',
    growthSip15Y: '₹1.18 Crore (on ₹18.0L invested)',
    description: 'Invests in agile emerging businesses ranked 251 and below. These companies can multiply revenues rapidly during economic upswings, but have lower liquidity during crashes.',
    pros: [
      'Unmatched multi-bagger return potential over long cycles',
      'Harnesses sunrise industries, EMS, green tech, and domestic consumption',
      'SIP turns severe corrections into aggressive accumulation'
    ],
    cons: [
      'Brutal bear market drawdowns (-45% during 2018-2019 and March 2020)',
      'Unsuitable for anyone needing funds within 5 years'
    ],
    historicalNote: 'During 2018-2019, small caps fell over 38%, followed by a historic 220%+ bull rally between 2020 and 2024. Demonstrates why small cap investing requires diamond-handed discipline.'
  },

  {
    id: 'ppf',
    name: 'Public Provident Fund (PPF)',
    category: 'Government Sovereign Savings',
    badge: '100% TAX-FREE EEE ANCHOR',
    badgeClass: 'badge-govt',
    icon: '',
    providerExample: 'Government of India (via Post Office, SBI, PNB, HDFC)',
    historical1Y: '+7.1%',
    historical3Y: '+7.1% CAGR',
    historical5Y: '+7.1% CAGR',
    historical10Y: '+7.6% CAGR',
    realReturnPostInflation: '+1.1% CAGR (Protected by sovereign guarantee and zero tax)',
    riskLevel: 'Zero Risk (Sovereign Guarantee backed by Government of India)',
    volatilityDrawdown: 'Zero Volatility (0.0% Drawdown risk; sovereign backed)',
    benchmarkIndex: 'Administered 10-Year Government of India Bond Benchmark',
    recommendedMinHorizon: '15 Years (Statutory scheme duration)',
    inflationProtectionRating: '⭐⭐ Moderate (Barely beats inflation, but zero tax shields real value)',
    exitLoad: 'No exit fee, but premature closure allowed only for medical/higher education after 5 years with 1% interest deduction',
    idealSuitability: 'Conservative individuals wanting guaranteed, zero-tax retirement accumulation without any stock market risk.',
    lockIn: '15 Years (Partial withdrawals allowed from Year 7; loan from Year 3)',
    liquidity: 'Strictly restricted until maturity',
    taxation: 'Exempt-Exempt-Exempt (EEE): Investment gets 80C rebate, interest is 100% tax-free, maturity is 100% tax-free.',
    costDrag: 'Zero management fee.',
    growthLumpSum5Y: '₹1,41,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹1,98,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹2,81,000 (from ₹1 Lakh)',
    growthSip5Y: '₹7,20,000 (on ₹6.0L invested)',
    growthSip10Y: '₹17,65,000 (on ₹12.0L invested)',
    growthSip15Y: '₹32,50,000 (on ₹18.0L invested - 100% Tax Free)',
    description: 'A 15-year statutory savings scheme backed by the Government of India. Maximum investment of ₹1.5 Lakh per year with guaranteed EEE tax-exempt compounding.',
    pros: [
      '100% tax-free interest and maturity under EEE status',
      'Cannot be attached by courts or creditors in insolvency',
      'Sovereign safety directly from Ministry of Finance'
    ],
    cons: [
      'Strict 15-year lock-in limits emergency access',
      'Annual deposit capped at ₹1,50,000 maximum',
      'Returns fixed by Finance Ministry quarterly'
    ],
    historicalNote: 'PPF gave 12.0% tax-free return in the late 1990s, revised gradually to 8.0% by 2018, and has remained rock-solid at 7.1% per annum since 2020.'
  },

  {
    id: 'lic-traditional',
    name: 'LIC / Traditional Endowment Insurance Plan',
    category: 'Insurance-Investment Hybrid',
    badge: 'ILLUSORY GUARANTEES',
    badgeClass: 'badge-lic',
    icon: '',
    providerExample: 'LIC Jeevan Labh, Jeevan Umang, Private Insurer Guaranteed Plans',
    historical1Y: '+5.0%',
    historical3Y: '+5.2% CAGR',
    historical5Y: '+5.1% CAGR',
    historical10Y: '+5.4% CAGR',
    realReturnPostInflation: '-0.8% CAGR (Real wealth destruction after 6% inflation)',
    riskLevel: 'Low Default Risk, but High Purchasing Power Erosion Risk',
    volatilityDrawdown: 'Zero Price Volatility on paper, but severe -50% to -70% real loss if surrendered early',
    benchmarkIndex: 'LIC Bonus Declaration / G-Sec 10Y Yield',
    recommendedMinHorizon: '16 to 25 Years (Strictly contractual)',
    inflationProtectionRating: '⭐ Negative / Destructive (Guarantees losing real purchasing power over 20 years)',
    exitLoad: 'Catastrophic: up to 70% of premium lost if lapsed within 3 years',
    idealSuitability: 'Not recommended for wealth building. Only suitable for forced-saving individuals who cannot manage money.',
    lockIn: '16 to 25 Years (Disastrous 50% - 70% capital loss if surrendered in first 3 years)',
    liquidity: 'Extremely poor; early surrender loses majority of invested premiums',
    taxation: 'Section 10(10D) tax exemption on maturity (if annual premium <₹5 Lakhs as per Finance Act 2023).',
    costDrag: 'Colossal agent distributor commissions (up to 25-35% of first-year premium).',
    growthLumpSum5Y: '₹1,28,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹1,69,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹2,21,000 (from ₹1 Lakh)',
    growthSip5Y: '₹6,80,000 (on ₹6.0L invested)',
    growthSip10Y: '₹15,80,000 (on ₹12.0L invested)',
    growthSip15Y: '₹27,90,000 (on ₹18.0L invested)',
    description: 'Combines a small life insurance cover with a conservative debt endowment investment. Premiums are locked into government bonds and PSU debt, returning simple bonuses.',
    pros: [
      'Forced savings discipline for undisciplined savers',
      'Includes modest life cover (10x of annual premium)',
      'Tax-free maturity under Section 10(10D)'
    ],
    cons: [
      'Very poor 4.5% to 5.5% real returns that fail to beat inflation',
      'Punitive surrender penalties if you stop paying premiums',
      'Inadequate life cover compared to pure Term Insurance'
    ],
    historicalNote: 'In 2024, regulator IRDAI introduced landmark enhanced surrender value guidelines to prevent insurers from wiping out policyholder funds if premiums lapse, pushing consumers toward separating pure Term Insurance from Mutual Fund SIPs.'
  },

  {
    id: 'term-plus-sip',
    name: 'Pure Term Insurance + Nifty Index SIP Combo',
    category: 'Optimal Financial Strategy',
    badge: 'GOLD STANDARD STRATEGY',
    badgeClass: 'badge-optimal',
    icon: '',
    providerExample: '₹1 Crore Term Plan (₹12k/yr) + Rest in Nifty 50 Index SIP',
    historical1Y: '+23.5%',
    historical3Y: '+14.8% CAGR',
    historical5Y: '+16.2% CAGR',
    historical10Y: '+13.2% CAGR',
    realReturnPostInflation: '+7.2% CAGR (Maximum protection + massive wealth)',
    riskLevel: 'Cover 100% Protected + Moderate Equity Compounding',
    volatilityDrawdown: 'Life cover is 100% non-volatile; Equity SIP has normal index drawdowns (-15% to -25%)',
    benchmarkIndex: 'Nifty 50 TRI + IRDAI Mortality Pricing Standards',
    recommendedMinHorizon: '10 to 30 Years (Term active till age 60; SIP compounds unhindered)',
    inflationProtectionRating: '⭐⭐⭐⭐ Superior (Gives massive ₹1 Crore safety net plus 7%+ net real wealth compounding)',
    exitLoad: 'Term policy can be cancelled anytime with zero penalty; SIP has zero exit load after 30 days',
    idealSuitability: 'Every earning individual with financial dependents who wants true peace of mind and maximum compounding.',
    lockIn: 'Term cover active; SIP 100% liquid anytime',
    liquidity: 'Instant access to SIP corpus; Zero surrender penalty',
    taxation: 'Term premium 80C exempt; SIP 12.5% LTCG above ₹1.25L',
    costDrag: 'Minimal: Direct Term cover + 0.15% Index expense ratio.',
    growthLumpSum5Y: '₹2,10,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹3,45,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹6,50,000 (from ₹1 Lakh)',
    growthSip5Y: '₹8,90,000 (on ₹6.0L invested, after ₹1 Cr insurance cover paid)',
    growthSip10Y: '₹24,90,000 (on ₹12.0L invested, with continuous ₹1 Cr cover)',
    growthSip15Y: '₹56,10,000 (on ₹18.0L invested, with continuous ₹1 Cr cover)',
    description: 'The golden rule of modern personal finance: Separate protection from investment. Buy a pure Term Life policy giving ₹1 Crore cover for just ₹1,000/month, and invest the remaining money in a Nifty 50 SIP.',
    pros: [
      '10x to 20x higher life cover than traditional LIC policies',
      '2x to 3x higher maturity wealth than endowment plans',
      'Zero surrender trap: if you stop investing, your money remains safe in your fund'
    ],
    cons: [
      'Requires basic personal financial discipline',
      'Term plan has zero survival payout (it is pure risk protection)'
    ],
    historicalNote: 'Over 20 years, investing ₹50,000/year in LIC gives ~₹18 Lakhs with ₹5 Lakh cover. But buying ₹1 Cr Term Plan for ₹10,000 and putting ₹40,000 in Index SIP gives ₹36+ Lakhs PLUS ₹1 Crore family protection.'
  },

  {
    id: 'sgb-gold',
    name: 'Sovereign Gold Bond (SGB) & Gold ETFs',
    category: 'Commodity Hedge',
    badge: 'INFLATION & CRISIS HEDGE',
    badgeClass: 'badge-gold',
    icon: '',
    providerExample: 'Reserve Bank of India (RBI SGB Tranches) / Nippon Gold ETF',
    historical1Y: '+31.2%',
    historical3Y: '+18.4% CAGR',
    historical5Y: '+15.2% CAGR',
    historical10Y: '+11.8% CAGR',
    realReturnPostInflation: '+5.8% CAGR (Excellent geopolitical hedge)',
    riskLevel: 'Moderate Commodity Risk (Backed by sovereign RBI guarantee)',
    volatilityDrawdown: 'Moderate (-12% to -20% when gold consolidates after wars or rate hikes)',
    benchmarkIndex: 'Domestic Spot Gold (IBJA 999 Purity) + 2.50% p.a. Cash Interest',
    recommendedMinHorizon: '5 to 8 Years (To qualify for 100% tax-free capital gains at maturity)',
    inflationProtectionRating: '⭐⭐⭐⭐ Very Good (Classic monetary hedge against currency depreciation)',
    exitLoad: 'Nil; exit through stock exchanges (NSE/BSE) or RBI buyback windows',
    idealSuitability: 'Investors looking to allocate 5-10% of overall net worth into physical gold equivalent without storage risks.',
    lockIn: '8 Years (Premature exit via RBI window from 5th year; tradable on NSE/BSE)',
    liquidity: 'Tradable on stock exchanges; official exit windows from Year 5',
    taxation: '100% Tax-Free capital gains at 8-year maturity! Semi-annual 2.5% interest taxed at slab rate.',
    costDrag: 'Zero making charges, zero storage charges, zero locker fees.',
    growthLumpSum5Y: '₹2,02,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹3,05,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹5,10,000 (from ₹1 Lakh)',
    growthSip5Y: '₹8,80,000 (on ₹6.0L invested)',
    growthSip10Y: '₹23,20,000 (on ₹12.0L invested)',
    growthSip15Y: '₹48,90,000 (on ₹18.0L invested)',
    description: 'Government securities denominated in grams of gold issued by the RBI. You get the exact price appreciation of 999 purity gold PLUS an extra 2.50% annual cash interest paid directly into your bank account.',
    pros: [
      '100% tax-free capital gains on redemption at maturity',
      'Extra 2.5% cash interest paid annually on nominal value',
      'Eliminates 15-20% making charge loss and impurity risks of jewelry'
    ],
    cons: [
      'Gold does not produce industrial earnings (unlike equities)',
      'Can experience multi-year stagnation phases during equity bull markets'
    ],
    historicalNote: 'Introduced by the Government of India in 2015 to reduce physical gold imports. Investors in early 2016 tranches purchased gold at ~₹2,600/gram and enjoyed 100% tax-free redemption above ₹7,000+/gram.'
  },

  {
    id: 'liquid-fund',
    name: 'Liquid Mutual Fund (Cash Management)',
    category: 'Debt Mutual Fund',
    badge: 'T-BILL SAFETY / INSTANT CASH',
    badgeClass: 'badge-debt',
    icon: '',
    providerExample: 'SBI Liquid Fund, HDFC Liquid, ICICI Prudential Liquid',
    historical1Y: '+7.2%',
    historical3Y: '+6.5% CAGR',
    historical5Y: '+5.8% CAGR',
    historical10Y: '+6.4% CAGR',
    realReturnPostInflation: '+0.5% CAGR (Protects purchasing power without market volatility)',
    riskLevel: 'Ultra Low (Invests in <=91-day Government T-Bills and AAA Commercial Paper)',
    volatilityDrawdown: 'Negligible (Daily linear NAV accrual; 0.0% drawdown risk)',
    benchmarkIndex: 'Crisil Liquid Debt Index / 91-Day Treasury Bill Rate',
    recommendedMinHorizon: '1 Day to 6 Months (Superior alternative to bank savings account)',
    inflationProtectionRating: '⭐ Low to Moderate (Maintains liquidity and matches prevailing short-term rates)',
    exitLoad: 'Graduated exit load only in the first 7 days (0.0070% Day 1 down to Nil on Day 7)',
    idealSuitability: 'Corporate treasuries, freelance emergency funds, or capital awaiting phased deployment into equities.',
    lockIn: 'Zero lock-in (Insta-redemption up to ₹50,000 within 15 minutes; T+1 for rest)',
    liquidity: 'Highest in mutual funds (T+1 working days or instant ATM card)',
    taxation: 'Gains taxed at investor income tax slab rate under debt fund tax rules.',
    costDrag: '0.15% to 0.25% expense ratio in Direct plans.',
    growthLumpSum5Y: '₹1,32,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹1,86,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹2,55,000 (from ₹1 Lakh)',
    growthSip5Y: '₹7,02,000 (on ₹6.0L invested)',
    growthSip10Y: '₹16,90,000 (on ₹12.0L invested)',
    growthSip15Y: '₹30,40,000 (on ₹18.0L invested)',
    description: 'Invests purely in ultra-short term money market instruments with maturity up to 91 days. Yields ~7% p.a. without locking funds, vastly superior to a lazy 2.7% bank savings account.',
    pros: [
      'Daily accrual of returns with almost zero capital volatility',
      'Instant redemption facility up to ₹50,000 / 90% of folio',
      'Ideal for parking emergency cash or STP into equity funds'
    ],
    cons: [
      'Taxed at regular slab rates (no indexation benefit post-2023 Finance Act)',
      'Cannot generate long-term wealth compounding above equity'
    ],
    historicalNote: 'Liquid funds proved resilient even during the 2008 crash and March 2020 turmoil, providing Indian corporate treasuries and retail investors with uninterrupted capital preservation.'
  },

  {
    id: 'flexi-cap',
    name: 'Flexi Cap Mutual Fund (All-Cap Dynamic)',
    category: 'Equity Mutual Fund',
    badge: 'DYNAMIC MULTI-CAP ALLOCATION',
    badgeClass: 'badge-flexi',
    icon: '',
    providerExample: 'Parag Parikh Flexi Cap, HDFC Flexi Cap, Kotak Flexi Cap',
    historical1Y: '+30.5%',
    historical3Y: '+19.8% CAGR',
    historical5Y: '+21.4% CAGR',
    historical10Y: '+16.5% CAGR',
    realReturnPostInflation: '+10.5% CAGR (Superb all-weather wealth vehicle)',
    riskLevel: 'Moderate to High Equity (Fund manager can shift across Large, Mid, Small caps)',
    volatilityDrawdown: 'Moderate to High (-18% to -26% drawdowns during cyclical market corrections)',
    benchmarkIndex: 'Nifty 500 TRI (Covers top 500 listed companies across India)',
    recommendedMinHorizon: '5 to 7+ Years (Enables fund manager to rotate capital between over/undervalued sectors)',
    inflationProtectionRating: '⭐⭐⭐⭐⭐ Excellent (Consistently beats CPI by 9-11% net of capital gains tax)',
    exitLoad: '2.0% within 365 days; 1.0% between 366-730 days; Nil after 2 years (varies slightly by AMC)',
    idealSuitability: 'Single-fund core equity portfolio for investors who want professional asset managers to handle large vs mid vs small cap balancing.',
    lockIn: 'Zero lock-in (Open-ended)',
    liquidity: 'T+2 working days payout into bank account',
    taxation: '12.5% LTCG above ₹1.25L per financial year; 20% STCG',
    costDrag: '0.60% to 0.85% annual expense ratio (Direct plan).',
    growthLumpSum5Y: '₹2,64,000 (from ₹1 Lakh)',
    growthLumpSum10Y: '₹4,60,000 (from ₹1 Lakh)',
    growthLumpSum15Y: '₹9,80,000 (from ₹1 Lakh)',
    growthSip5Y: '₹10,25,000 (on ₹6.0L invested)',
    growthSip10Y: '₹30,20,000 (on ₹12.0L invested)',
    growthSip15Y: '₹74,50,000 (on ₹18.0L invested)',
    description: 'Mandated by SEBI to invest at least 65% in Indian equities, with complete freedom to dynamically shift capital between Large Cap, Mid Cap, and Small Cap based on market valuations and global opportunities.',
    pros: [
      'Unconstrained mandate lets fund manager dodge overvalued sectors',
      'Provides high equity upside while controlling small-cap drawdowns',
      'Many flexi-caps hold international blue chips (Alphabet, Meta) as diversification'
    ],
    cons: [
      'Performance heavily depends on fund manager stock-picking skill',
      'Higher expense ratio than plain passive index funds'
    ],
    historicalNote: 'Created by SEBI in November 2020 after the Multi-Cap rebalancing circular. Quickly became India’s largest mutual fund category with over ₹4 Lakh Crore ($48 Billion) in retail assets.'
  }
];

// Historical Timelines & Past Scheme Archives
export const financialHistoryArchives = [
  {
    era: '1990 - 2000',
    title: 'High Interest & Physical Scrip Era',
    events: [
      'Bank FDs offered 12% to 14% interest rates as India faced double-digit inflation.',
      'PPF interest was fixed at 12.0% tax-free under Ministry of Finance rules.',
      'National Stock Exchange (NSE) founded in 1992; computerized electronic trading began in 1994, eliminating physical paper share certificates.',
      'Nifty 50 created in April 1996 with a base value of 1,000 points.'
    ]
  },
  {
    era: '2000 - 2010',
    title: 'The Great Indian Growth Decoupling',
    events: [
      'RBI repo rates normalized downward; FD rates fell from 11% to 7.5% - 8.5%.',
      'Mutual Fund monthly SIPs launched in India; initial participation was under ₹500 Crore per month.',
      'Commodity markets opened up; gold prices began rallying from ₹4,400/10g to ₹18,000/10g by 2010.',
      'The 2008 Global Financial Crisis saw Nifty fall 52% from 6,300 to 2,500, followed by a swift 100%+ recovery by 2010.'
    ]
  },
  {
    era: '2010 - 2020',
    title: 'Digital Demat & Systematic SIP Revolution',
    events: [
      'SEBI introduced mandatory Direct Plans for all mutual funds in January 2013, slashing intermediary commission loads.',
      'Government of India introduced Sovereign Gold Bonds (SGB) in 2015 offering 2.5% extra interest + tax exemption.',
      'SEBI Mutual Fund Categorization circular of 2017 created standardized definitions for Large Cap (1-100), Mid Cap (101-250), and Small Cap (251+).',
      'Indian monthly SIP inflows crossed ₹8,000 Crore/month as retail investors systematically accumulated domestic assets.'
    ]
  },
  {
    era: '2020 - 2026',
    title: 'Retail Financialization & High-Alpha Explosion',
    events: [
      'COVID-19 market flash-crash of March 2020 triggered massive retail demat account openings (crossing 16 Crore accounts by 2026).',
      'SEBI created Flexi Cap Mutual Fund category in November 2020, which rapidly surged to ₹4 Lakh Crore+ AUM.',
      'Indian monthly SIP inflows broke historical records, surpassing ₹25,000 Crore ($3 Billion) per month.',
      'Union Budget 2024 standardized equity taxation to 12.5% Long-Term Capital Gains (LTCG) above ₹1.25 Lakh threshold and 20% Short-Term Capital Gains (STCG).'
    ]
  }
];
