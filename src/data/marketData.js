// Market Tickers, Yield Curve Data, and Default Watchlist
export const initialIndices = [
  { symbol: 'NIFTY 50', value: '24,774.30', change: '+1.60%', up: true, region: 'IN' },
  { symbol: 'SENSEX', value: '78,639.10', change: '+0.70%', up: true, region: 'IN' },
  { symbol: 'S&P 500', value: '5,864.67', change: '+0.82%', up: true, region: 'US' },
  { symbol: 'NASDAQ', value: '18,367.19', change: '+1.10%', up: true, region: 'US' },
  { symbol: 'EM (EEM)', value: '64.09', change: '+0.79%', up: true, region: 'GLOBAL' },
  { symbol: 'WORLD (URTH)', value: '203.37', change: '+0.19%', up: true, region: 'GLOBAL' },
  { symbol: 'DOLLAR (UUP)', value: '28.17', change: '+0.11%', up: true, region: 'FX' },
  { symbol: 'US 10Y', value: '4.60%', change: '+0.04%', up: true, region: 'BONDS' },
  { symbol: 'INDIA 10Y', value: '6.95%', change: '0.00%', up: null, region: 'BONDS' },
  { symbol: 'BRENT CRUDE', value: '$74.15', change: '-1.25%', up: false, region: 'COMMODITY' },
  { symbol: 'GOLD (1oz)', value: '$2,658.40', change: '+0.48%', up: true, region: 'COMMODITY' },
  { symbol: 'BITCOIN', value: '$67,420', change: '+2.85%', up: true, region: 'CRYPTO' },
];

export const yieldCurveData = [
  { name: 'US 10-Yr Treasury', yield: '4.60%', change: '+0.04%', status: 'up' },
  { name: 'India 10-Yr G-Sec', yield: '6.95%', change: '0.00%', status: 'flat' },
  { name: 'US 2-Yr Treasury', yield: '3.98%', change: '-0.02%', status: 'down' },
  { name: 'India 5-Yr G-Sec', yield: '6.88%', change: '-0.01%', status: 'down' },
  { name: 'US 30-Yr Long Bond', yield: '4.82%', change: '+0.03%', status: 'up' },
  { name: 'Germany 10-Yr Bund', yield: '2.18%', change: '+0.02%', status: 'up' },
  { name: 'UK 10-Yr Gilt', yield: '4.15%', change: '+0.05%', status: 'up' },
  { name: 'Japan 10-Yr JGB', yield: '0.96%', change: '+0.01%', status: 'up' },
  { name: 'Spread (10Y - 2Y)', yield: '+0.62%', change: '+0.06%', status: 'up', note: 'Curve Steepening' },
];

export const defaultWatchlist = [
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: '₹985.40', change: '+3.45%', up: true, sector: 'Auto & EV', sentiment: 'High Bullish' },
  { symbol: 'ZOMATO', name: 'Zomato Ltd', price: '₹274.80', change: '+4.80%', up: true, sector: 'Consumer Tech', sentiment: 'Breakout' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$138.25', change: '+2.60%', up: true, sector: 'Semiconductors', sentiment: 'Dominant' },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: '₹2,745.00', change: '+0.45%', up: true, sector: 'Energy & Telecom', sentiment: 'Stable' },
  { symbol: 'AAPL', name: 'Apple Inc', price: '$232.10', change: '+0.90%', up: true, sector: 'Tech Specs', sentiment: 'Positive' },
  { symbol: 'TSLA', name: 'Tesla Inc', price: '$218.80', change: '-1.15%', up: false, sector: 'Auto & Clean Tech', sentiment: 'Neutral' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,682.00', change: '+0.30%', up: true, sector: 'Banking', sentiment: 'Consolidation' },
  { symbol: 'TSMC', name: 'TSMC ADR', price: '$192.50', change: '+3.10%', up: true, sector: 'Semiconductors', sentiment: 'Bullish' }
];

export const marketQuotes = [
  { quote: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
  { quote: "The big money is not in the buying and selling, but in the waiting.", author: "Charlie Munger" },
  { quote: "Know what you own, and know why you own it.", author: "Peter Lynch" },
  { quote: "You can't predict. You can prepare.", author: "Howard Marks" },
  { quote: "Risk comes from not knowing what you are doing.", author: "Benjamin Graham" },
];
