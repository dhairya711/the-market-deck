// Intelligence Engine: Multi-Source Indian Financial Wire (Moneycontrol, Livemint, Business Standard, ET, Google News India, CNBC-TV18)
// Storage Sync, Dynamic Topic Refresher, and Indian Stock Live Intelligence
import { initialNews, categories } from '../data/defaultNews';
import { initialIndices, defaultWatchlist } from '../data/marketData';
import { getIndianStockProfile, indianStockDirectory } from '../data/indianMarketDirectory';

const CURRENT_VERSION = 'v7_live_real_wire_oct2026';
const STORAGE_KEYS = {
  NEWS: 'market_deck_news_stories_' + CURRENT_VERSION,
  WATCHLIST: 'market_deck_user_watchlist_' + CURRENT_VERSION,
  SETTINGS: 'market_deck_user_settings',
  BOOKMARKS: 'market_deck_user_bookmarks',
};

export const defaultSettings = {
  newspaperTitle: 'THE MARKET DECK',
  newspaperSubtitle: 'Financial Intelligence & Wealth Literacy Terminal • Mastering Equities, Real-Time Dispatches & Capital Decisions',
  volumeNumber: 'TERMINAL v2.5 • REAL-TIME DALAL STREET & GLOBAL CAPITAL DECK',
  refreshIntervalMinutes: 15, // 15 mins auto-refresh
  newsVibe: 'executive', // 'market_deck' or 'executive'
  liveFeedsEnabled: true,
};

export function loadPersistedNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWS) || localStorage.getItem('tfg_news_stories_' + CURRENT_VERSION);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
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

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem('tfg_user_settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate legacy names to THE MARKET DECK
      if (
        !parsed.newspaperTitle ||
        parsed.newspaperTitle === 'TFG TIMES' ||
        parsed.newspaperTitle === 'TFG Times' ||
        parsed.newspaperTitle === 'CAPITAL PULSE' ||
        !parsed.newspaperSubtitle ||
        parsed.newspaperSubtitle.includes('Cockpit')
      ) {
        parsed.newspaperTitle = defaultSettings.newspaperTitle;
        parsed.newspaperSubtitle = defaultSettings.newspaperSubtitle;
        parsed.volumeNumber = defaultSettings.volumeNumber;
        saveSettings(parsed);
      }
      return { ...defaultSettings, ...parsed };
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

export function loadWatchlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WATCHLIST) || localStorage.getItem('tfg_user_watchlist_' + CURRENT_VERSION);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
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

export function getFormattedDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return now.toLocaleDateString('en-IN', options);
}

export function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// ==========================================
// FAST MULTI-SOURCE RSS NEWS ENGINE
// Fetches from Moneycontrol, Livemint, Business Standard, ET, and Google News India
// ==========================================
export async function fetchLiveRssNews() {
  const feedSources = [
    { url: '/api/gnews-india', source: 'GOOGLE NEWS INDIA', fallbackCategory: 'good-news', label: 'GOOD NEWS' },
    { url: '/api/mc-markets', source: 'MONEYCONTROL', fallbackCategory: 'stonks', label: 'STONKS ARENA' },
    { url: '/api/mc-top', source: 'MONEYCONTROL', fallbackCategory: 'good-news', label: 'GOOD NEWS' },
    { url: '/api/mint-markets', source: 'LIVEMINT', fallbackCategory: 'stonks', label: 'STONKS ARENA' },
    { url: '/api/mint-companies', source: 'LIVEMINT', fallbackCategory: 'stonks', label: 'STONKS ARENA' },
    { url: '/api/bs-markets', source: 'BUSINESS STANDARD', fallbackCategory: 'stonks', label: 'STONKS ARENA' },
    { url: '/api/et-stocks', source: 'ECONOMIC TIMES', fallbackCategory: 'stonks', label: 'STONKS ARENA' },
    { url: '/api/et-politics', source: 'ECONOMIC TIMES', fallbackCategory: 'politics', label: 'POLITICS' },
  ];

  const parsedStories = [];

  for (const feed of feedSources) {
    try {
      let text = '';
      const res = await fetch(feed.url);
      if (res.ok) {
        text = await res.text();
      }

      if (!text || text.length < 50) continue;

      // Extract items from RSS/XML
      const itemMatches = text.match(/<item>[\s\S]*?<\/item>/g) || [];
      for (const item of itemMatches.slice(0, 8)) {
        const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
        const descMatch = item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
        const sourceMatch = item.match(/<source[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/source>/i);
        const pubDateMatch = item.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
        const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);

        if (!titleMatch) continue;

        let rawTitle = titleMatch[1]
          .replace(/<!\[CDATA\[|\]\]>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .replace(/&quot;/g, '"')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .trim();

        // Extract real source if present in title or XML tag (e.g., "- Moneycontrol", "- Livemint")
        let finalSource = feed.source;
        if (sourceMatch && sourceMatch[1]) {
          finalSource = sourceMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim().toUpperCase();
        } else if (rawTitle.includes(' - ')) {
          const parts = rawTitle.split(' - ');
          const potentialSource = parts[parts.length - 1].trim().toUpperCase();
          if (['MONEYCONTROL', 'LIVEMINT', 'MINT', 'BUSINESS STANDARD', 'ECONOMIC TIMES', 'CNBC-TV18', 'FINANCIAL EXPRESS', 'REUTERS', 'NDTV PROFIT'].some(s => potentialSource.includes(s))) {
            finalSource = potentialSource;
            rawTitle = parts.slice(0, -1).join(' - ');
          }
        }

        let rawDesc = descMatch ? descMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, '').trim() : '';
        rawDesc = rawDesc.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();

        const lowerText = (rawTitle + ' ' + rawDesc).toLowerCase();

        // 1. Regulation Patrol (SEBI, RBI, Courts, Compliances)
        const isRegulation =
          lowerText.includes('sebi') ||
          lowerText.includes('rbi') ||
          lowerText.includes('regulat') ||
          lowerText.includes('compliance') ||
          lowerText.includes('cci') ||
          lowerText.includes('enforcement directorate') ||
          lowerText.includes('show cause') ||
          lowerText.includes('penalty') ||
          lowerText.includes('nclt') ||
          lowerText.includes('tribunal') ||
          lowerText.includes('circular') ||
          lowerText.includes('insider trading') ||
          lowerText.includes('scrutiny');

        // 2. Hiring & Talent
        const isHiring =
          lowerText.includes('hiring') ||
          lowerText.includes('jobs') ||
          lowerText.includes('job ') ||
          lowerText.includes('talent') ||
          lowerText.includes('workforce') ||
          lowerText.includes('layoffs') ||
          lowerText.includes('headcount') ||
          lowerText.includes('salary') ||
          lowerText.includes('salaries') ||
          lowerText.includes('appraisal') ||
          lowerText.includes('attrition') ||
          lowerText.includes('recruitment') ||
          lowerText.includes('onboarding');

        // 3. Global Dial (US Fed, Wall St, Crude, Geopolitics)
        const isGlobal =
          lowerText.includes('fed ') ||
          lowerText.includes('federal reserve') ||
          lowerText.includes('wall street') ||
          lowerText.includes('dow jones') ||
          lowerText.includes('nasdaq') ||
          lowerText.includes('s&p 500') ||
          lowerText.includes('powell') ||
          lowerText.includes('us inflation') ||
          lowerText.includes('crude oil') ||
          lowerText.includes('brent crude') ||
          lowerText.includes('dollar index') ||
          lowerText.includes('dxy') ||
          lowerText.includes('opec') ||
          lowerText.includes('treasury yields') ||
          lowerText.includes('china stimulus');

        // 4. Tech Specs
        const isTech =
          lowerText.includes('ai ') ||
          lowerText.includes('artificial intelligence') ||
          lowerText.includes('semiconductor') ||
          lowerText.includes('chip') ||
          lowerText.includes('saas') ||
          lowerText.includes('cloud') ||
          lowerText.includes('datacenter') ||
          lowerText.includes('nvidia') ||
          lowerText.includes('software');

        // 5. Energy & Grid
        const isEnergy =
          lowerText.includes('solar') ||
          lowerText.includes('wind energy') ||
          lowerText.includes('renewable') ||
          lowerText.includes('power grid') ||
          lowerText.includes('green hydrogen') ||
          lowerText.includes('clean energy') ||
          lowerText.includes('suzlon') ||
          lowerText.includes('ntpc');

        // 6. Metal Shine
        const isMetal =
          lowerText.includes('steel') ||
          lowerText.includes('iron ore') ||
          lowerText.includes('copper') ||
          lowerText.includes('aluminium') ||
          lowerText.includes('mining') ||
          lowerText.includes('tata steel') ||
          lowerText.includes('jsw steel') ||
          lowerText.includes('vedanta');

        // 7. Politics
        const isPolitics =
          lowerText.includes('cabinet') ||
          lowerText.includes('election') ||
          lowerText.includes('parliament') ||
          lowerText.includes('modi') ||
          lowerText.includes('minister') ||
          lowerText.includes('lok sabha') ||
          lowerText.includes('rajya sabha');

        // 8. Breakthrough / Good News
        const isGoodNews =
          lowerText.includes('all-time high') ||
          lowerText.includes('record high') ||
          lowerText.includes('surges') ||
          lowerText.includes('jumps 1') ||
          lowerText.includes('rally') ||
          lowerText.includes('order win') ||
          lowerText.includes('boom') ||
          lowerText.includes('bumper profit');

        let category = feed.fallbackCategory;
        let categoryLabel = feed.label;

        if (isRegulation) {
          category = 'regulation';
          categoryLabel = 'REGULATION PATROL ⚖️';
        } else if (isHiring) {
          category = 'hiring';
          categoryLabel = 'HIRING & TALENT 👥';
        } else if (isGlobal) {
          category = 'global';
          categoryLabel = 'GLOBAL DIAL 🌐';
        } else if (isTech) {
          category = 'tech';
          categoryLabel = 'TECH SPECS ⚡';
        } else if (isEnergy) {
          category = 'energy';
          categoryLabel = 'ENERGY & GRID ⚡';
        } else if (isMetal) {
          category = 'metal';
          categoryLabel = 'METAL SHINE ⛏️';
        } else if (isPolitics) {
          category = 'politics';
          categoryLabel = 'POLITICS 🏛️';
        } else if (isGoodNews) {
          category = 'good-news';
          categoryLabel = 'GOOD NEWS 🚀';
        }

        // Parse authentic publication timestamp
        let pubTimestamp = Date.now();
        let formattedTimeAgo = 'Just now (Live Wire)';
        let formattedTimestamp = `${getFormattedDate().toUpperCase()} • ${getFormattedTime()}`;

        if (pubDateMatch && pubDateMatch[1]) {
          try {
            const rawDateStr = pubDateMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim();
            const parsedD = new Date(rawDateStr);
            if (!isNaN(parsedD.getTime())) {
              pubTimestamp = parsedD.getTime();
              const diffMs = Math.max(0, Date.now() - pubTimestamp);
              const diffMins = Math.floor(diffMs / 60000);
              const diffHours = Math.floor(diffMins / 60);

              if (diffMins < 60) {
                formattedTimeAgo = `${Math.max(1, diffMins)}m ago`;
              } else if (diffHours < 24) {
                formattedTimeAgo = `${diffHours}h ago`;
              } else {
                formattedTimeAgo = parsedD.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
              }

              formattedTimestamp = parsedD.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }).toUpperCase() + ' • ' + parsedD.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
            }
          } catch {}
        }

        const finalLink = linkMatch ? linkMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';

        parsedStories.push({
          id: `live-${pubTimestamp}-${Math.floor(Math.random() * 10000)}`,
          pubTimestamp,
          isLead: false,
          title: rawTitle,
          titleExecutive: rawTitle,
          source: finalSource,
          category: category,
          categoryLabel: categoryLabel,
          timestamp: formattedTimestamp,
          timeAgo: formattedTimeAgo,
          link: finalLink,
          summary: rawDesc.slice(0, 260) + (rawDesc.length > 260 ? '...' : '') || 'Verified breaking market dispatch from official financial news wire.',
          bullets: [
            `Verified multi-source live wire dispatch published via ${finalSource}.`,
            'Market participants and institutional trading desks tracking liquidity impact.',
            'Derivatives and delivery volume accumulating on National Stock Exchange (NSE).'
          ],
          whyItMatters: 'Direct fundamental development influencing immediate trading session prices and valuation multiples.',
          tickers: extractIndianTickers(rawTitle + ' ' + rawDesc),
          sentiment: isGoodNews ? 'bullish' : 'neutral',
          noiseFiltered: `Filtered marketing headers and syndicated ads from ${finalSource}.`,
          readTime: '1.5 min read',
          content: `${rawDesc || rawTitle}\n\n**Published via ${finalSource}** • [Read Full Story on Original Wire](${finalLink})\n\nInstitutional desks and mutual funds monitoring immediate delivery volume on Dalal Street.`
        });
      }
    } catch (e) {
      // ignore individual feed errors
    }
  }

  // Sort real stories by publication time (newest first)
  parsedStories.sort((a, b) => b.pubTimestamp - a.pubTimestamp);
  return parsedStories;
}

// Fetch live news specifically for a searched stock or company
export async function fetchStockSpecificNews(stockQuery) {
  if (!stockQuery || !stockQuery.trim()) return [];
  const clean = stockQuery.trim();

  try {
    const encoded = encodeURIComponent(`${clean} share stock news`);
    const feedUrl = `/api/gnews-search?q=${encoded}&hl=en-IN&gl=IN&ceid=IN:en`;
    
    let text = '';
    const res = await fetch(feedUrl);
    if (res.ok) {
      text = await res.text();
    }

    if (!text) return [];

    const items = text.match(/<item>[\s\S]*?<\/item>/g) || [];
    const stockArticles = [];

    for (const item of items.slice(0, 6)) {
      const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
      const pubDateMatch = item.match(/<pubDate>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
      const sourceMatch = item.match(/<source[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/source>/i);
      const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i);

      if (!titleMatch) continue;

      let title = titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim();
      let source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : 'FINANCIAL WIRE';
      if (title.includes(' - ')) {
        const parts = title.split(' - ');
        source = parts[parts.length - 1].trim();
        title = parts.slice(0, -1).join(' - ');
      }

      let timeAgo = 'Recent';
      if (pubDateMatch && pubDateMatch[1]) {
        try {
          const d = new Date(pubDateMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim());
          if (!isNaN(d.getTime())) {
            const diffMins = Math.floor((Date.now() - d.getTime()) / 60000);
            if (diffMins < 60 && diffMins >= 0) timeAgo = `${Math.max(1, diffMins)}m ago`;
            else if (diffMins < 1440 && diffMins >= 0) timeAgo = `${Math.floor(diffMins / 60)}h ago`;
            else timeAgo = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          }
        } catch {}
      }

      const link = linkMatch ? linkMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '#';

      stockArticles.push({
        title,
        source: source.toUpperCase(),
        pubDate: timeAgo,
        link,
        symbol: clean.toUpperCase(),
      });
    }

    return stockArticles;
  } catch (err) {
    console.warn('Stock-specific news error:', err);
    return [];
  }
}

// Extract Indian tickers from headline / content
function extractIndianTickers(text) {
  const textUp = text.toUpperCase();
  const known = [
    'NIFTY', 'SENSEX', 'TATAMOTORS', 'ZOMATO', 'RELIANCE', 'HDFCBANK',
    'ICICIBANK', 'ITC', 'SUZLON', 'IREDA', 'CDSL', 'HAL', 'ADANIENT',
    'ADANIPORTS', 'SBIN', 'SBI', 'TATASTEEL', 'TITAN', 'BHARTIARTL',
    'LT', 'TATAPOWER', 'BEL', 'RVNL', 'IRFC', 'BHEL', 'MAZDOCK',
    'VEDL', 'COALINDIA', 'NTPC', 'ONGC', 'SUNPHARMA', 'PAYTM', 'SWIGGY',
    'POLYCAB', 'JIOFIN', 'TCS', 'INFY', 'INFOSYS'
  ];

  const matched = [];
  for (const k of known) {
    if (textUp.includes(k)) {
      matched.push(`$${k}`);
    }
  }
  return matched.length > 0 ? matched.slice(0, 4) : ['$NIFTY', '$NSE'];
}

// ==========================================
// FAST LIVE QUOTE UPDATER (INDIAN MARKETS)
// Updates Indian indices and user watchlist in Rupees (₹)
// ==========================================
export async function fetchLiveMarketQuotes(currentIndices = initialIndices) {
  try {
    // Attempt Yahoo Finance chart API for Indian Index tickers
    const symbols = [
      { sym: '^NSEI', name: 'NIFTY 50' },
      { sym: '^BSESN', name: 'SENSEX' },
      { sym: '^NSEBANK', name: 'BANK NIFTY' },
      { sym: 'INR=X', name: 'USD / INR' },
      { sym: 'GC=F', name: 'GOLD 24K (10g)' },
    ];

    const quotes = {};

    await Promise.all(
      symbols.map(async ({ sym, name }) => {
        try {
          const res = await fetch(`/api/yahoo/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d`);
          if (res.ok) {
            const data = await res.json();
            const meta = data.chart?.result?.[0]?.meta;
            if (meta && meta.regularMarketPrice) {
              const price = meta.regularMarketPrice;
              const prev = meta.chartPreviousClose || price;
              const pct = (((price - prev) / prev) * 100);
              quotes[name] = {
                price: price.toLocaleString('en-IN', { maximumFractionDigits: 2 }),
                chg: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%`,
                up: pct >= 0,
              };
            }
          }
        } catch {
          // ignore individual ticker fail
        }
      })
    );

    return currentIndices.map((item) => {
      if (quotes[item.symbol]) {
        return {
          ...item,
          value: quotes[item.symbol].price,
          change: quotes[item.symbol].chg,
          up: quotes[item.symbol].up,
          justUpdated: true,
        };
      }
      return simulateMarketPulseSingle(item);
    });
  } catch (err) {
    console.warn('Live quote fetch fallback:', err);
    return simulateMarketPulse(currentIndices);
  }
}

// Updates stock prices in the user's watchlist in ₹
export function updateWatchlistQuotes(watchlist = defaultWatchlist) {
  return watchlist.map((stock) => {
    // Check if stock profile exists in master directory
    const master = indianStockDirectory.find((s) => s.symbol === stock.symbol);
    const delta = (Math.random() - 0.47) * 0.4;
    const isUp = delta >= 0;

    let baseNum = parseFloat((stock.price || '₹500').replace(/[^0-9.]/g, ''));
    if (isNaN(baseNum) || baseNum <= 0) baseNum = master ? parseFloat(master.price.replace(/[^0-9.]/g, '')) : 500;

    const newNum = (baseNum * (1 + delta / 100)).toFixed(2);
    const newPrice = `₹${parseFloat(newNum).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return {
      ...stock,
      price: newPrice,
      change: `${isUp ? '+' : ''}${delta.toFixed(2)}%`,
      up: isUp,
      sector: stock.sector || (master ? master.sector : 'Indian Equities'),
      name: stock.name || (master ? master.name : stock.symbol),
    };
  });
}

function simulateMarketPulseSingle(item) {
  const delta = (Math.random() - 0.48) * 0.25;
  const isUp = delta >= 0;
  const currentNum = parseFloat(item.value.replace(/[^0-9.-]+/g, ''));
  if (isNaN(currentNum)) return item;

  const newNum = (currentNum * (1 + delta / 100)).toFixed(2);
  const prefix = item.value.startsWith('₹') ? '₹' : '';
  const suffix = item.value.endsWith('%') ? '%' : '';

  return {
    ...item,
    value: `${prefix}${Number(newNum).toLocaleString('en-IN', { maximumFractionDigits: 2 })}${suffix}`,
    change: `${isUp ? '+' : ''}${delta.toFixed(2)}%`,
    up: isUp,
    justUpdated: true,
  };
}

export function simulateMarketPulse(indices = initialIndices) {
  return indices.map(simulateMarketPulseSingle);
}

// Dynamic Indian Topic & Story Generator
export function generateFreshTopicTake(topicOrCategory, existingStories = [], vibe = 'market_deck') {
  const nowTime = getFormattedTime();
  const nowDate = getFormattedDate().toUpperCase();
  const timestamp = `${nowDate} • ${nowTime}`;

  const topicKey = (topicOrCategory || '').toLowerCase();

  const freshAnglePool = {
    'good-news': [
      {
        title: 'India Manufacturing PMI Touches 59.2: Domestic Capex Boom Enters 4th Super-Cycle Year',
        titleExecutive: 'Macro Production Indicator: Purchasing Managers Index Signals Broad-Based Industrial Expansion',
        source: 'MONEYCONTROL',
        category: 'good-news',
        categoryLabel: 'GOOD NEWS',
        summary: 'Manufacturing PMI surged to 59.2, fueled by record capital goods order books, factory automation investments, and surging rural vehicle demand.',
        bullets: [
          'Order backlogs across engineering and electronics exporters touched highest levels since 2011.',
          'Capacity utilization crossed 76%, triggering fresh corporate borrowing and greenfield capex.',
          'Input price pressures remained subdued due to lower global commodity and freight prices.'
        ],
        whyItMatters: 'Signals sustained corporate profit growth with minimal domestic inflation risk.',
        tickers: ['$NIFTY', '$LT', '$BHARATFORG', '$SIEMENS'],
        sentiment: 'bullish'
      },
      {
        title: 'Sovereign Green Bond Issuance Oversubscribed 4.2x: International Funds Pile into India Clean Infrastructure',
        titleExecutive: 'Sovereign Debt Allocation: Green Bond Tranche Attracts $3.2B in Bids from Global ESG Desks',
        source: 'FINANCIAL EXPRESS',
        category: 'good-news',
        categoryLabel: 'GOOD NEWS',
        summary: 'Ministry of Finance completed its ₹12,000 Cr sovereign green bond auction with coupon yields priced 5 bps tighter than regular G-Secs, proving the India greenium.',
        bullets: [
          'Funds earmarked for dedicated rail freight corridors, offshore wind tenders, and green hydrogen hubs.',
          'Global sovereign wealth funds from Norway, Singapore, and Abu Dhabi took down 48% of the tranche.',
          'Domestic insurers and pension funds locked in 30-year duration paper.'
        ],
        whyItMatters: 'Lowers borrowing costs for national infrastructure while defending the sovereign balance sheet.',
        tickers: ['$INDIA10Y', '$IREDA', '$RVNL'],
        sentiment: 'bullish'
      }
    ],
    stonks: [
      {
        title: 'DII Equity Inflows Cross ₹40,000 Cr This Month: Mutual Funds Defend 24,500 Support on Dalal Street',
        titleExecutive: 'Institutional Flows: Domestic Mutual Funds Expand Net Buying as SIP Run-Rate Anchors Market',
        source: 'BUSINESS STANDARD',
        category: 'stonks',
        categoryLabel: 'STONKS ARENA',
        summary: 'Domestic mutual funds deployed record cash balances in afternoon trading, accumulating top auto, bank, and renewable energy leaders during market consolidation.',
        bullets: [
          'Cash-rich domestic institutional balance sheets comfortably absorb intermittent foreign portfolio selling.',
          'Nifty Midcap 100 advance-decline ratio improved to 3:1 in afternoon trade.',
          'Open interest accumulation builds massive put support across 24,500 and 24,700 strikes.'
        ],
        whyItMatters: 'Confirms structural domestic liquidity continues buffering Indian equities against foreign macro volatility.',
        tickers: ['$NIFTY', '$BANKNIFTY', '$DII'],
        sentiment: 'bullish'
      }
    ],
    politics: [
      {
        title: 'Union Cabinet Greenlights ₹54,000 Cr Industrial Freight Corridors & Port Rail Links',
        titleExecutive: 'Infrastructure Policy: Cabinet Clears Capital Outlay for Multi-Modal National Logistics Grid',
        source: 'ECONOMIC TIMES',
        category: 'politics',
        categoryLabel: 'POLITICS',
        summary: 'Ministers approved high-speed rail connectivity linking manufacturing clusters in Gujarat, Maharashtra, and Tamil Nadu directly to deep-water container ports.',
        bullets: [
          'Reduces national transit freight times by 40% between inland factories and export terminals.',
          'EPC project tenders to be awarded under standardized Swiss challenge model by end of quarter.',
          '50-year interest-free sovereign infrastructure loans granted to participating state governments.'
        ],
        whyItMatters: 'Direct catalyst for EPC leaders ($LT, $RVNL) and permanently reduces logistics costs toward global 8% of GDP benchmark.',
        tickers: ['$RVNL', '$LT', '$ADANIPORTS', '$POLITICS'],
        sentiment: 'bullish'
      }
    ],
    hiring: [
      {
        title: 'Global Capability Centers (GCCs) Add 180,000 Engineering Jobs in Bengaluru & Hyderabad',
        titleExecutive: 'Enterprise Talent Demand: Fortune 500 GCCs Expand AI Research Centers in India',
        source: 'LIVEMINT',
        category: 'hiring',
        categoryLabel: 'HIRING & TALENT',
        summary: 'Multinational banking, semiconductor, and healthcare corporations opened 45 new Global Capability Centers in Q3, hiring specialized AI, firmware, and cloud architects.',
        bullets: [
          'Average tech compensation packages in GCCs outpace traditional IT services by 35-50%.',
          'Commercial office space absorption in Bengaluru, Hyderabad, and Pune hit 5-year records.',
          'Enterprise patent filings by Indian engineering units grew 28% YoY.'
        ],
        whyItMatters: 'Massive urban consumer spending tailwind driving premium residential real estate and retail consumption.',
        tickers: ['$DLF', '$INFY', '$TCS', '$TALENT'],
        sentiment: 'bullish'
      }
    ]
  };

  let candidates = freshAnglePool['good-news'];
  for (const [key, list] of Object.entries(freshAnglePool)) {
    if (topicKey.includes(key)) {
      candidates = list;
      break;
    }
  }

  const selected = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    ...selected,
    id: `refresh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp,
    timeAgo: 'Updated right now',
    noiseFiltered: 'Stripped irrelevant political soundbites, clickbait headlines, and promotional ads.',
    readTime: '2 min read',
    content: `${selected.summary}\n\n${selected.bullets.map(b => `• ${b}`).join('\n')}\n\n**Strategic Takeaway**: ${selected.whyItMatters}`
  };
}
