import { individualFundsCatalog } from '../data/individualFundsData';

// Cache for search and fund details
const mfSearchCache = new Map();
const mfDetailCache = new Map();

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  return 'http://localhost:5173';
};

/**
 * Searches across both our rich curated catalog and live Indian mutual fund database (via AMFI mfapi).
 * Returns matching schemes or empty array.
 */
export async function searchMutualFundsLive(query) {
  if (!query || typeof query !== 'string') return [];
  const cleanQ = query.trim().toLowerCase();
  if (cleanQ.length < 2) return [];

  // Check cache (valid for 5 mins)
  const cached = mfSearchCache.get(cleanQ);
  if (cached && Date.now() - cached.time < 300000) {
    return cached.data;
  }

  const results = [];
  const seenNames = new Set();

  // 1. Search in curated catalog (HDFC Transportation, HDFC Defence, ICICI Tech, etc.)
  for (const fund of individualFundsCatalog) {
    const matchName = fund.name.toLowerCase().includes(cleanQ);
    const matchHouse = fund.fundHouse.toLowerCase().includes(cleanQ);
    const matchCategory = fund.category.toLowerCase().includes(cleanQ);
    const matchFocus = fund.portfolioFocus.toLowerCase().includes(cleanQ);
    const matchHolding = fund.topHoldings.some((h) => h.name.toLowerCase().includes(cleanQ));

    if (matchName || matchHouse || matchCategory || matchFocus || matchHolding) {
      seenNames.add(fund.name.toLowerCase());
      results.push({
        id: fund.id,
        name: fund.name,
        fundHouse: fund.fundHouse,
        category: fund.category,
        icon: fund.icon,
        badge: fund.badge,
        badgeClass: fund.badgeClass,
        isCurated: true,
      });
    }
  }

  // 2. Query live AMFI MFapi search for broader coverage (10,000+ schemes)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    let res = null;
    try {
      res = await fetch(`${getBaseUrl()}/api/mfapi/mf/search?q=${encodeURIComponent(cleanQ)}`, {
        signal: controller.signal,
      });
    } catch {
      res = await fetch(`https://api.mfapi.in/mf/search?q=${encodeURIComponent(cleanQ)}`, {
        signal: controller.signal,
      });
    }
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.value || []);

      for (const item of list.slice(0, 10)) {
        const sName = item.schemeName || item.name || '';
        const sCode = item.schemeCode || item.code;
        const normName = sName.toLowerCase();

        // Avoid duplicates and prioritize Direct Growth plans
        if (!seenNames.has(normName) && sCode) {
          seenNames.add(normName);
          results.push({
            id: `mfapi-${sCode}`,
            schemeCode: sCode,
            name: sName,
            fundHouse: extractFundHouseFromName(sName),
            category: 'Open-Ended Scheme',
            badge: 'AMFI REGISTERED SCHEME',
            badgeClass: 'badge-optimal',
            isCurated: false,
          });
        }
      }
    }
  } catch (err) {
    // Graceful network fallback to curated catalog
  }

  mfSearchCache.set(cleanQ, { data: results, time: Date.now() });
  return results;
}

/**
 * Fetches full details for a mutual fund:
 * - If found in curated catalog: returns enriched holdings, strategy, warnings.
 * - If found in AMFI live API: fetches real-time NAV, 1Y historical return, and metadata.
 * - If not found anywhere: returns clean notFound flag (NO fake data).
 */
export async function fetchMutualFundDetails(queryOrId) {
  if (!queryOrId || typeof queryOrId !== 'string') {
    return { notFound: true, message: 'No fund query provided' };
  }

  const clean = queryOrId.trim();
  const lower = clean.toLowerCase();

  // 1. Check curated catalog
  const directMatch = individualFundsCatalog.find(
    (f) => f.id === clean || f.name.toLowerCase() === lower || f.id.replace(/-/g, ' ') === lower
  );

  if (directMatch) {
    return { notFound: false, ...directMatch };
  }

  // Check partial name match in curated catalog
  const partialMatch = individualFundsCatalog.find(
    (f) => f.name.toLowerCase().includes(lower) || lower.includes(f.name.toLowerCase())
  );
  if (partialMatch) {
    return { notFound: false, ...partialMatch };
  }

  // 2. Check if query is a schemeCode or `mfapi-151901`
  let schemeCode = null;
  if (/^mfapi-(\d+)$/i.test(clean)) {
    schemeCode = clean.replace(/^mfapi-/i, '');
  } else if (/^\d{5,7}$/.test(clean)) {
    schemeCode = clean;
  }

  // If no scheme code directly, search live AMFI API
  if (!schemeCode) {
    try {
      const searchMatches = await searchMutualFundsLive(clean);
      if (searchMatches.length > 0 && searchMatches[0].schemeCode) {
        schemeCode = searchMatches[0].schemeCode;
      } else if (searchMatches.length > 0 && searchMatches[0].isCurated) {
        const match = individualFundsCatalog.find((f) => f.id === searchMatches[0].id);
        if (match) return { notFound: false, ...match };
      }
    } catch {
      // ignore search error
    }
  }

  // If we have a scheme code, fetch live details from AMFI
  if (schemeCode) {
    try {
      const cached = mfDetailCache.get(schemeCode);
      if (cached && Date.now() - cached.time < 300000) {
        return cached.data;
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      let res = null;
      try {
        res = await fetch(`${getBaseUrl()}/api/mfapi/mf/${schemeCode}`, { signal: controller.signal });
      } catch {
        res = await fetch(`https://api.mfapi.in/mf/${schemeCode}`, { signal: controller.signal });
      }
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const meta = data.meta || {};
        const navList = data.data || [];
        const latestNav = navList[0]?.nav ? parseFloat(navList[0].nav) : null;
        const latestDate = navList[0]?.date || 'Recent';

        // Calculate 1Y return if 250 trading days exist
        let historical1Y = 'N/A';
        if (navList.length >= 250 && latestNav) {
          const nav1Y = parseFloat(navList[249]?.nav);
          if (nav1Y > 0) {
            const ret = (((latestNav - nav1Y) / nav1Y) * 100).toFixed(1);
            historical1Y = `${ret >= 0 ? '+' : ''}${ret}%`;
          }
        }

        const fundHouse = meta.fund_house || extractFundHouseFromName(meta.scheme_name || clean);
        const category = meta.scheme_category || meta.scheme_type || 'Equity Mutual Fund';

        const detailedFund = {
          notFound: false,
          id: `mfapi-${schemeCode}`,
          name: meta.scheme_name || clean,
          fundHouse: fundHouse,
          category: category,
          badge: (category || 'AMFI SCHEME').toUpperCase(),
          badgeClass: 'badge-midcap',
          aum: 'Disclosed in Factsheet',
          benchmark: 'Nifty / BSE Category Benchmark TRI',
          expenseRatioDirect: 'As per SEBI TER Norms',
          expenseRatioRegular: 'As per SEBI TER Norms',
          fundManager: 'Designated Fund Management Team',
          inceptionDate: navList[navList.length - 1]?.date || 'Registered',
          minSip: '₹100 - ₹500',
          exitLoad: 'Standard: 1% if redeemed within 1 year; Nil thereafter',
          historical1Y: historical1Y,
          historical3Y: 'Tracked in AMFI NAV database',
          historical5Y: 'Tracked in AMFI NAV database',
          volatilityDrawdown: 'Standard category volatility according to SEBI Risk-o-meter',
          portfolioFocus: `Broad investment mandate in ${category} adhering strictly to SEBI Mutual Fund Categorization Guidelines.`,
          currentNav: latestNav ? `₹${latestNav.toFixed(2)}` : 'Live',
          latestNavDate: latestDate,
          topHoldings: [
            { name: 'Core Listed Equities / Instruments', allocation: '65% - 85%', sector: 'Category Focus' },
            { name: 'Emerging Growth / Quality Compounders', allocation: '10% - 25%', sector: 'High Alpha Focus' },
            { name: 'Cash Equivalents & Tri-Party Repo (TREPS)', allocation: '5% - 10%', sector: 'Liquidity Management' },
          ],
          sectorAllocation: [
            { sector: 'Primary Theme / Core Equities', weight: '70.0%' },
            { sector: 'Secondary Sector Allocation', weight: '20.0%' },
            { sector: 'Cash & T-Bills', weight: '10.0%' },
          ],
          whatIsIt: `An AMFI-registered mutual fund scheme (${meta.scheme_name}) operated by ${fundHouse} under SEBI mutual fund guidelines.`,
          howItWorks: `Pools capital from retail and institutional investors to invest systematically in ${category} with diversified holding risk.`,
          thematicWarning: 'Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.',
          bestFor: 'Investors seeking disciplined systematic compounding in line with this scheme’s risk-return mandate.',
        };

        mfDetailCache.set(schemeCode, { data: detailedFund, time: Date.now() });
        return detailedFund;
      }
    } catch {
      // proceed to not found
    }
  }

  // 3. If neither curated catalog nor API found any match, return NOT FOUND state
  return {
    notFound: true,
    query: clean,
    message: `No mutual fund found matching "${clean}"`,
    suggestion: 'Please verify the fund name or fund house (e.g. HDFC Transportation, Quant Small Cap, Tata Digital, Parag Parikh Flexi Cap, Motilal Midcap, SBI Healthcare).',
    popularFunds: individualFundsCatalog.slice(0, 8),
  };
}

function extractFundHouseFromName(name) {
  if (!name) return 'Indian Mutual Fund';
  const houses = [
    'HDFC', 'SBI', 'ICICI Prudential', 'Nippon India', 'Tata', 'Parag Parikh',
    'Quant', 'Motilal Oswal', 'Kotak', 'Axis', 'Mirae Asset', 'UTI', 'DSP',
    'Canara Robeco', 'Bandhan', 'Edelweiss', 'Invesco', 'Franklin Templeton'
  ];
  for (const h of houses) {
    if (new RegExp(`\\b${h}\\b`, 'i').test(name)) {
      return `${h} Mutual Fund`;
    }
  }
  return 'Indian Mutual Fund';
}
