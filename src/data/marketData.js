// Live Market Tickers, Yield Curve Data, and Default Watchlist with accurate baseline prices
export const initialIndices = [
  { symbol: 'NIFTY 50', value: '22,997.35', change: '+1.66%', up: true, region: 'IN' },
  { symbol: 'SENSEX', value: '74,315.61', change: '+2.11%', up: true, region: 'IN' },
  { symbol: 'S&P 500', value: '5,864.67', change: '+0.82%', up: true, region: 'US' },
  { symbol: 'NASDAQ', value: '18,367.19', change: '+1.10%', up: true, region: 'US' },
  { symbol: 'EM (EEM)', value: '44.80', change: '+0.42%', up: true, region: 'GLOBAL' },
  { symbol: 'WORLD (URTH)', value: '164.20', change: '+0.35%', up: true, region: 'GLOBAL' },
  { symbol: 'DOLLAR (UUP)', value: '28.17', change: '+0.11%', up: true, region: 'FX' },
  { symbol: 'US 10Y', value: '4.08%', change: '-0.03%', up: false, region: 'BONDS' },
  { symbol: 'INDIA 10Y', value: '6.78%', change: '0.00%', up: null, region: 'BONDS' },
  { symbol: 'BRENT CRUDE', value: '$74.15', change: '-1.25%', up: false, region: 'COMMODITY' },
  { symbol: 'GOLD (1oz)', value: '$2,658.40', change: '+0.48%', up: true, region: 'COMMODITY' },
  { symbol: 'BITCOIN', value: '$67,420', change: '+2.85%', up: true, region: 'CRYPTO' },
];

export const yieldCurveData = [
  { name: 'US 10-Yr Treasury', yield: '4.08%', change: '-0.03%', status: 'down' },
  { name: 'India 10-Yr G-Sec', yield: '6.78%', change: '0.00%', status: 'flat' },
  { name: 'US 2-Yr Treasury', yield: '3.94%', change: '-0.02%', status: 'down' },
  { name: 'India 5-Yr G-Sec', yield: '6.72%', change: '-0.01%', status: 'down' },
  { name: 'US 30-Yr Long Bond', yield: '4.38%', change: '+0.01%', status: 'up' },
  { name: 'Germany 10-Yr Bund', yield: '2.18%', change: '+0.02%', status: 'up' },
  { name: 'UK 10-Yr Gilt', yield: '4.15%', change: '+0.05%', status: 'up' },
  { name: 'Japan 10-Yr JGB', yield: '0.96%', change: '+0.01%', status: 'up' },
  { name: 'Spread (10Y - 2Y)', yield: '+0.14%', change: '-0.01%', status: 'down', note: 'Normal Steepening' },
];

export const defaultWatchlist = [
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: '₹968.40', change: '+2.45%', up: true, sector: 'Auto & EV', sentiment: 'High Bullish' },
  { symbol: 'ZOMATO', name: 'Zomato Ltd', price: '₹268.50', change: '+4.10%', up: true, sector: 'Consumer Tech', sentiment: 'Breakout' },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: '₹1,215.00', change: '+3.44%', up: true, sector: 'Energy & Telecom', sentiment: 'Positive' },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: '$138.25', change: '+2.60%', up: true, sector: 'Semiconductors', sentiment: 'Dominant' },
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
