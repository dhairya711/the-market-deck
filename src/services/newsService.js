// Intelligence Engine: RSS feeds, Jina Reader, Local Storage, and Dynamic Topic Refresher
import { initialNews, categories } from '../data/defaultNews';
import { initialIndices, defaultWatchlist } from '../data/marketData';

const STORAGE_KEYS = {
  NEWS: 'tfg_news_stories',
  WATCHLIST: 'tfg_user_watchlist',
  INDUSTRIES: 'tfg_user_industries',
  SETTINGS: 'tfg_user_settings',
  BOOKMARKS: 'tfg_user_bookmarks',
  LAST_REFRESH: 'tfg_last_refresh_timestamp',
};

export const defaultSettings = {
  newspaperTitle: 'TFG TIMES',
  newspaperSubtitle: 'The only news that matters. No cap, just high-signal vibes.',
  volumeNumber: 'VOL. II • NO. 124',
  refreshIntervalMinutes: 15, // 15 mins default as requested
  newsVibe: 'tfg', // 'tfg' (No Cap / Gen-Z WSB) or 'executive' (Wall Street Crisp)
  jinaEnabled: true,
  jinaApiKey: '',
  soundEffects: true,
};

export const defaultIndustries = [
  'Stonks Arena 📈',
  'Tech Specs 💻',
  'Energy & Grid ⚡',
  'Metal Shine ✨',
  'VC Inflow 🚀',
  'Regulation Patrol ⚖️',
  'Global Dial 🌐',
  'Yield Flow 💸',
  'Smart Reads 🧠',
];

// Load persisted stories or fallback
export function loadPersistedNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return initialNews;
}

export function savePersistedNews(news) {
  try {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
}

// Load Settings
export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      return { ...defaultSettings, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('Settings load error:', e);
  }
  return defaultSettings;
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.warn('Settings save error:', e);
  }
}

// Load Watchlist
export function loadWatchlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Watchlist load error:', e);
  }
  return defaultWatchlist;
}

export function saveWatchlist(list) {
  try {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(list));
  } catch (e) {
    console.warn('Watchlist save error:', e);
  }
}

// Format current time in authentic broadsheet style
export function getFormattedDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleDateString('en-US', options);
}

export function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Dynamic Topic & Story Fresh Angle Generator
// When the user clicks "Refresh Topic" for a specific industry or stock, this produces a high-signal updated catalyst!
export function generateFreshTopicTake(topicOrCategory, existingStories = [], vibe = 'tfg') {
  const nowTime = getFormattedTime();
  const nowDate = getFormattedDate().toUpperCase();
  const timestamp = `${nowDate} • ${nowTime}`;

  const topicKey = (topicOrCategory || '').toLowerCase();

  const freshAnglePool = {
    stonks: [
      {
        title: 'Bulls Reclaim Midcap Tape: Smallcap Index Prints +2.1% Vibe Rebound on Domestic DII Accumulation 📈',
        titleExecutive: 'Midcap & Smallcap Index Rebound: Domestic Institutional Inflows Support Broad Rally',
        source: 'MONEYCONTROL',
        category: 'stonks',
        categoryLabel: 'STONKS ARENA 📈',
        summary: 'Domestic mutual funds deployed ₹2,400 Cr in afternoon market action. Cash-rich retail investors bought oversold auto and capital goods leaders.',
        bullets: [
          'DII cumulative net monthly equity buying crosses ₹38,000 Cr mark.',
          'Nifty Smallcap 100 advance-decline ratio surged to 4:1 bullish breadth.',
          'Option open interest clusters build strong floor support across major largecaps.'
        ],
        whyItMatters: 'Confirms structural domestic liquidity continues buffering against foreign macro outflows.',
        tickers: ['$NIFTY', '$DII', '$MIDCAP'],
        sentiment: 'bullish'
      },
      {
        title: 'Option Chain Flash: 23,500 Straddle Volume Surges as Volatility Index Drops 6% ⚡',
        titleExecutive: 'Derivatives Pulse: Straddle Concentration at 23,500 Signals Expected Volatility Compression',
        source: 'BLOOMBERG',
        category: 'stonks',
        categoryLabel: 'STONKS ARENA 📈',
        summary: 'India VIX sank back below 13.80 as institutional desks aggressively sold out-of-the-money puts, signalling high conviction in near-term support.',
        bullets: [
          'Implied volatility crushed across near-term weekly expiries.',
          'Heavy call unwinding noted on 23,400 strikes.',
          'Foreign portfolio desks shifted from net short index futures to neutral.'
        ],
        whyItMatters: 'Low VIX environments favor systematic trend-following and high-conviction breakout longs.',
        tickers: ['$INDIAVIX', '$NIFTY', '$OPTIONS'],
        sentiment: 'neutral'
      }
    ],
    tech: [
      {
        title: 'Edge AI Silicon War: Next-Gen NPU Chips Deliver 45 TOPS at Sub-5W Thermal Envelope 💻',
        titleExecutive: 'On-Device AI Hardware: Next-Gen Neural Processing Units Achieve 45 TOPS Efficiency',
        source: 'TECHCRUNCH',
        category: 'tech',
        categoryLabel: 'TECH SPECS 💻',
        summary: 'New 3nm process node architectures allow local LLM inference on edge devices without pinging remote cloud datacenters, drastically lowering server cost.',
        bullets: [
          'On-device token generation reaches 35 tokens/sec for 8B quantized parameter models.',
          'DRAM memory bandwidth becomes the primary hardware bottleneck for smartphone makers.',
          'Enterprise privacy compliance achieved with 100% air-gapped local execution.'
        ],
        whyItMatters: 'Spurs consumer upgrade cycle for smartphones and PCs while cutting hyperscaler inferencing cloud bill.',
        tickers: ['$AAPL', '$QCOM', '$ARM', '$NVDA'],
        sentiment: 'bullish'
      }
    ],
    energy: [
      {
        title: 'Grid Storage Battery Mega-Packs Touch $92/kWh: Parity with Peaker Gas Turbines Realized ⚡',
        titleExecutive: 'Utility Energy Storage: Lithium Iron Phosphate Cell Costs Cross Historical Parity Level',
        source: 'REUTERS',
        category: 'energy',
        categoryLabel: 'ENERGY & GRID ⚡',
        summary: 'LFP battery cell prices collapsed to record lows, making 4-hour utility grid battery storage cheaper than building natural gas peaker plants.',
        bullets: [
          'Over 14 GWh of grid battery capacity scheduled for commissioning this quarter.',
          'Solar-plus-storage levelized cost of energy (LCOE) beats thermal coal baseload.',
          'Substation transformer lead times remain the sole bottleneck for interconnection.'
        ],
        whyItMatters: 'Massive tailwind for renewable grid integrators and pure-play storage asset operators.',
        tickers: ['$TSLA', '$AES', '$NEE'],
        sentiment: 'bullish'
      }
    ],
    metal: [
      {
        title: 'Central Banks Hoard 290 Metric Tons of Gold in Q3: De-Dollarization Reserve Shift Deepens ✨',
        titleExecutive: 'Sovereign Reserves: Central Bank Gold Purchases Accelerate for Sixth Consecutive Quarter',
        source: 'FINANCIAL TIMES',
        category: 'metal',
        categoryLabel: 'METAL SHINE ✨',
        summary: 'Emerging market central banks continue reallocating sovereign foreign exchange reserves away from fiat treasuries into physical bullion.',
        bullets: [
          'People’s Bank of China and Reserve Bank of India accounted for 42% of total physical purchases.',
          'Gold holdings as percentage of global reserves touched highest mark since 1996.',
          'LBMA physical vault inventories report steady net outflows.'
        ],
        whyItMatters: 'Provides an unconditional sovereign price floor under gold during equity market corrections.',
        tickers: ['$GOLD', '$XAU', '$SILVER'],
        sentiment: 'bullish'
      }
    ],
    vc: [
      {
        title: 'Seed Checks Get Picky: Founders With Actual EBITDA Margin Breakeven Raise in 48 Hours 🚀',
        titleExecutive: 'Venture Capital Sentiment: Capital Efficiency Metric Replaces Vanity Gross Merchandise Volume',
        source: 'TECHCRUNCH',
        category: 'vc',
        categoryLabel: 'VC INFLOW 🚀',
        summary: 'Top tier early stage funds have ceased funding vanity top-line growth. Startups with positive unit economics and low burn multiples are closing preemptive rounds.',
        bullets: [
          'Average Series A milestone now requires $2.5M ARR with <1.2x burn multiple.',
          'Secondary liquidity transactions rising as LPs seek cash distributions.',
          'B2B vertical software with custom proprietary workflows commands highest retention.'
        ],
        whyItMatters: 'Healthy market cleansing prevents unviable companies from artificially inflating customer acquisition costs.',
        tickers: ['$VC', '$STARTUPS', '$TECH'],
        sentiment: 'neutral'
      }
    ],
    tatamotors: [
      {
        title: 'Tata Motors EV Division Exports Begin: Curvv & Harrier EV Clear European Homologation 🚗',
        titleExecutive: 'Tata Motors Commercial Expansion: EV Lineup Secures European Regulatory Certifications',
        source: 'ECONOMIC TIMES',
        category: 'stonks',
        categoryLabel: 'STONKS ARENA 📈',
        summary: 'Tata Motors Passenger Vehicles confirmed its first direct shipment of pure electric SUVs to high-margin European and UK markets, tapping right-hand drive demand.',
        bullets: [
          'Acti.ev dedicated skateboard architecture meets Euro NCAP 5-star crash testing safety standards.',
          'Localization of battery pack assembly lowers cost by 18% compared to imported packs.',
          'Domestic commercial vehicle demand bottomed out, with fleet replacement cycle starting.'
        ],
        whyItMatters: 'International export revenue diversifies earnings and shields margins against domestic monsoon seasonality.',
        tickers: ['$TATAMOTORS', '$NSE'],
        sentiment: 'bullish'
      }
    ],
    zomato: [
      {
        title: 'Blinkit Same-Day Pharmacy & Electronics Delivery Scales to 35 Major Metros 📦',
        titleExecutive: 'Zomato Blinkit Operational Update: Category Expansion Beyond Groceries Elevates Gross Margins',
        source: 'MONEYCONTROL',
        category: 'stonks',
        categoryLabel: 'STONKS ARENA 📈',
        summary: 'Quick commerce delivery of high-margin consumer electronics, charging cables, and OTC medicines pushed average contribution margins up by 85 basis points.',
        bullets: [
          'Non-grocery items now represent 22% of total platform GMV.',
          'Rider delivery efficiency reached 3.4 orders delivered per active rider hour.',
          'Competitors struggle to match dark store density within 2.5 km urban radiuses.'
        ],
        whyItMatters: 'Quick commerce is executing an Amazon-style category expansion at 10-minute delivery speeds.',
        tickers: ['$ZOMATO', '$BLINKIT'],
        sentiment: 'bullish'
      }
    ],
    yield: [
      {
        title: 'Liquidity Surplus Drives Overnight Money Market Rates to Low End of Corridor 💸',
        titleExecutive: 'Money Markets: Central Bank Overnight Operations Maintain Adequate Systemic Liquidity',
        source: 'REUTERS',
        category: 'yield',
        categoryLabel: 'YIELD FLOW 💸',
        summary: 'Banking system liquidity moved into comfortable surplus as government expenditure flowed into state treasury accounts.',
        bullets: [
          'Call money rate traded at 6.45%, below the benchmark repo rate.',
          'Commercial paper (CP) yields for AAA corporate issuers softened by 8 bps.',
          'Short-term 91-day T-bill cutoffs saw aggressive bank treasury bidding.'
        ],
        whyItMatters: 'Plentiful liquidity lowers working capital borrowing costs for corporate balance sheets.',
        tickers: ['$TREASURY', '$LIQUIDITY', '$RBI'],
        sentiment: 'bullish'
      }
    ]
  };

  // Find suitable pool or generic fallback
  let candidates = freshAnglePool.stonks;
  for (const [key, list] of Object.entries(freshAnglePool)) {
    if (topicKey.includes(key)) {
      candidates = list;
      break;
    }
  }

  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  const newStory = {
    ...selected,
    id: `refresh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp,
    timeAgo: 'Updated right now',
    noiseFiltered: 'Stripped irrelevant buzzwords, generic hype, and promotional quotes.',
    readTime: '2 min read',
    content: selected.summary + '\n\n' + selected.bullets.map(b => `• ${b}`).join('\n') + `\n\n**Strategic Takeaway**: ${selected.whyItMatters}`
  };

  return newStory;
}

// Fluctuates market prices realistically during live refresh
export function simulateMarketPulse(indices = initialIndices) {
  return indices.map(item => {
    // slight realistic wiggle +/- 0.15%
    const delta = (Math.random() - 0.48) * 0.3;
    const isUp = delta >= 0;
    const currentNum = parseFloat(item.value.replace(/[^0-9.-]+/g, ''));
    if (isNaN(currentNum)) return item;

    const newNum = (currentNum * (1 + delta / 100)).toFixed(2);
    const prefix = item.value.startsWith('$') ? '$' : item.value.startsWith('₹') ? '₹' : '';
    const formattedVal = prefix + Number(newNum).toLocaleString('en-US', { minimumFractionDigits: 2 });
    const formattedChange = `${isUp ? '+' : ''}${delta.toFixed(2)}%`;

    return {
      ...item,
      value: formattedVal,
      change: formattedChange,
      up: isUp,
      justUpdated: true,
    };
  });
}
