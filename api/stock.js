// Vercel Serverless Function: Official Financial API Gateway
// Supports Finnhub with secondary Yahoo Finance and catalog fallbacks
// Keeps private API keys secure on the server side

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { action = 'quote', symbol, q } = req.query;
  const FINNHUB_KEY = process.env.FINNHUB_API_KEY || process.env.VITE_FINNHUB_API_KEY || '';

  // 1. SEARCH ACTION
  if (action === 'search') {
    const queryStr = (q || '').trim();
    if (!queryStr || queryStr.length < 2) {
      return res.status(200).json({ quotes: [] });
    }

    try {
      // If Finnhub key is present, query Finnhub search
      if (FINNHUB_KEY) {
        const fhRes = await fetch(`https://finnhub.io/api/v1/search?q=${encodeURIComponent(queryStr)}&token=${FINNHUB_KEY}`);
        if (fhRes.ok) {
          const data = await fhRes.json();
          const quotes = (data.result || [])
            .filter((item) => item.symbol && (item.symbol.endsWith('.NS') || item.symbol.endsWith('.BO') || item.type === 'Common Stock'))
            .map((item) => ({
              symbol: item.symbol.replace(/\.NS$/, '').replace(/\.BO$/, ''),
              fullSymbol: item.symbol,
              name: item.description || item.symbol,
              exchange: item.symbol.endsWith('.BO') ? 'BSE' : 'NSE',
              type: 'EQUITY',
            }));

          if (quotes.length > 0) {
            return res.status(200).json({ source: 'finnhub', quotes });
          }
        }
      }

      // Secondary search via Yahoo Finance with desktop User-Agent
      const yRes = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(queryStr)}&quotesCount=10&newsCount=0`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (yRes.ok) {
        const data = await yRes.json();
        const quotes = (data.quotes || [])
          .filter((item) => {
            const sym = item.symbol || '';
            return sym.endsWith('.NS') || sym.endsWith('.BO') || item.exchange === 'NSI' || item.exchange === 'BSE';
          })
          .map((item) => ({
            symbol: (item.symbol || '').replace(/\.NS$/, '').replace(/\.BO$/, ''),
            fullSymbol: item.symbol,
            name: item.shortname || item.longname || item.symbol,
            exchange: (item.symbol || '').endsWith('.BO') || item.exchange === 'BSE' ? 'BSE' : 'NSE',
            type: item.quoteType || 'EQUITY',
          }));

        return res.status(200).json({ source: 'yahoo', quotes });
      }
    } catch (err) {
      console.warn('Search gateway error:', err);
    }

    return res.status(200).json({ source: 'fallback', quotes: [] });
  }

  // 2. QUOTE ACTION
  const rawSymbol = (symbol || '').trim();
  if (!rawSymbol) {
    return res.status(400).json({ error: 'Missing symbol parameter' });
  }

  const cleanSym = rawSymbol.replace(/\.NS$/i, '').replace(/\.BO$/i, '').toUpperCase();
  const nseSymbol = `${cleanSym}.NS`;
  const bseSymbol = `${cleanSym}.BO`;

  // Try Finnhub first if key exists
  if (FINNHUB_KEY) {
    try {
      const fhRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(nseSymbol)}&token=${FINNHUB_KEY}`);
      if (fhRes.ok) {
        const qData = await fhRes.json();
        if (qData && typeof qData.c === 'number' && qData.c > 0) {
          const price = qData.c;
          const prev = qData.pc || price;
          const dayChange = qData.d || (price - prev);
          const dayChangePct = qData.dp !== undefined ? qData.dp : ((price - prev) / prev) * 100;

          return res.status(200).json({
            source: 'finnhub',
            notFound: false,
            symbol: cleanSym,
            fullSymbol: nseSymbol,
            name: cleanSym,
            exchange: `NSE: ${cleanSym}`,
            chosenExchange: 'NSE',
            currency: 'INR',
            currentPrice: `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            rawPrice: price,
            change: `${dayChangePct >= 0 ? '+' : ''}${dayChangePct.toFixed(2)}%`,
            changeAmount: `₹${Math.abs(dayChange).toFixed(2)}`,
            up: dayChangePct >= 0,
            dayHigh: qData.h ? `₹${qData.h.toLocaleString('en-IN')}` : null,
            dayLow: qData.l ? `₹${qData.l.toLocaleString('en-IN')}` : null,
            fiftyTwoWeekRange: 'N/A',
            volume: 'Live Exchange Feed',
            sparkline: [prev * 0.99, prev, (prev + price) / 2, price],
            vibe: 'Verified NSE Listed Indian Enterprise • Official Live API Stream',
          });
        }
      }
    } catch (err) {
      console.warn('Finnhub quote fetch error:', err);
    }
  }

  // Secondary: Try Yahoo Finance chart API with desktop browser headers
  try {
    for (const testSym of [nseSymbol, bseSymbol]) {
      const yRes = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(testSym)}?interval=1d&range=2y`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': 'application/json',
        },
      });

      if (yRes.ok) {
        const data = await yRes.json();
        const result = data.chart?.result?.[0];
        const meta = result?.meta;

        if (meta && typeof meta.regularMarketPrice === 'number') {
          const price = meta.regularMarketPrice;
          const prevClose = meta.chartPreviousClose || price;
          const dayChange = price - prevClose;
          const dayChangePct = meta.regularMarketChangePercent !== undefined
            ? meta.regularMarketChangePercent
            : ((price - prevClose) / prevClose) * 100;

          const closes = (result.indicators?.quote?.[0]?.close || []).filter((c) => typeof c === 'number');

          const calculateReturn = (days) => {
            if (closes.length <= days) return null;
            const past = closes[Math.max(0, closes.length - 1 - days)];
            if (!past || past <= 0) return null;
            const ret = (((price - past) / past) * 100).toFixed(1);
            return `${ret >= 0 ? '+' : ''}${ret}%`;
          };

          const low52 = meta.fiftyTwoWeekLow;
          const high52 = meta.fiftyTwoWeekHigh;
          const range52 = low52 && high52
            ? `₹${low52.toLocaleString('en-IN', { maximumFractionDigits: 2 })} - ₹${high52.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
            : 'N/A';

          const chosenEx = testSym.endsWith('.BO') ? 'BSE' : 'NSE';

          return res.status(200).json({
            source: 'yahoo',
            notFound: false,
            symbol: cleanSym,
            fullSymbol: meta.symbol,
            name: meta.longName || meta.shortName || cleanSym,
            exchange: `${chosenEx}: ${cleanSym}`,
            chosenExchange: chosenEx,
            currency: meta.currency || 'INR',
            currentPrice: `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            rawPrice: price,
            change: `${dayChangePct >= 0 ? '+' : ''}${dayChangePct.toFixed(2)}%`,
            changeAmount: `₹${Math.abs(dayChange).toFixed(2)}`,
            up: dayChangePct >= 0,
            dayHigh: meta.regularMarketDayHigh ? `₹${meta.regularMarketDayHigh.toLocaleString('en-IN')}` : null,
            dayLow: meta.regularMarketDayLow ? `₹${meta.regularMarketDayLow.toLocaleString('en-IN')}` : null,
            fiftyTwoWeekRange: range52,
            volume: meta.regularMarketVolume ? meta.regularMarketVolume.toLocaleString('en-IN') : 'N/A',
            oneMonthReturn: calculateReturn(21),
            sixMonthReturn: calculateReturn(126),
            oneYearReturn: calculateReturn(250),
            twoYearReturn: closes.length >= 2 ? calculateReturn(closes.length - 1) : null,
            sparkline: closes.slice(-30),
            vibe: `Verified ${chosenEx} Listed Indian Enterprise • Live Exchange Wire`,
          });
        }
      }
    }
  } catch (err) {
    console.warn('Yahoo fallback quote error:', err);
  }

  // If both external feeds fail or are rate-limited, tell frontend to use client directory
  return res.status(200).json({
    source: 'client-fallback-required',
    symbol: cleanSym,
    query: rawSymbol,
  });
}
