// Market Tickers, Yield Curve Data, and Default Watchlist
// Calibrated strictly for Indian Financial Markets (NSE / BSE / RBI) in Indian Rupees (₹)
import { indianIndices, indianYieldCurve, indianStockDirectory } from './indianMarketDirectory';

export const initialIndices = indianIndices;
export const yieldCurveData = indianYieldCurve;

// Default starter portfolio for Indian equity investors
export const defaultWatchlist = [
  indianStockDirectory[0], // TATAMOTORS
  indianStockDirectory[1], // ZOMATO
  indianStockDirectory[2], // RELIANCE
  indianStockDirectory[3], // SUZLON
  indianStockDirectory[4], // HDFCBANK
  indianStockDirectory[6], // ITC
  indianStockDirectory[7], // INFY
  indianStockDirectory[9], // IREDA
  indianStockDirectory[10], // CDSL
  indianStockDirectory[11], // HAL
];

export const marketQuotes = [
  { quote: "Never bet against the compounding power of the Indian entrepreneur and consumer.", author: "Rakesh Jhunjhunwala" },
  { quote: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
  { quote: "The big money is not in the buying and selling, but in the waiting.", author: "Charlie Munger" },
  { quote: "In investing, what is comfortable is rarely profitable.", author: "Robert Arnott" },
  { quote: "Know what you own, and know why you own it.", author: "Peter Lynch" },
  { quote: "You can't predict. You can prepare.", author: "Howard Marks" },
];
