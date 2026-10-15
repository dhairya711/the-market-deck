import React from 'react';
import { yieldCurveData, marketQuotes } from '../data/marketData';
import { TrendingUp, TrendingDown, Filter, Quote } from 'lucide-react';

export function Sidebar({ watchlist, onFilterByTicker }) {
  // Pick today's quote based on day
  const todayQuote = marketQuotes[new Date().getDate() % marketQuotes.length];

  return (
    <aside className="sidebar-column">
      {/* 1. Yield Curve Update (from Screenshot 1 & 2) */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <span>YIELD CURVE UPDATE</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>LIVE BENCHMARKS</span>
        </div>

        <table className="yield-table">
          <tbody>
            {yieldCurveData.map((row, idx) => {
              const isUp = row.status === 'up';
              const isDown = row.status === 'down';
              const chgClass = isUp ? 'ticker-pct up' : isDown ? 'ticker-pct down' : 'ticker-pct flat';

              return (
                <tr key={idx}>
                  <td className="yield-name">{row.name}</td>
                  <td className="yield-val">{row.yield}</td>
                  <td className={`yield-chg ${chgClass}`}>{row.change}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 2. Personal Portfolio Radar */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <span>PORTFOLIO RADAR</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>YOUR STOCKS</span>
        </div>

        <div className="portfolio-radar-list">
          {watchlist.map((stk) => (
            <div
              key={stk.symbol}
              className="portfolio-item"
              onClick={() => onFilterByTicker(stk.symbol)}
              style={{ cursor: 'pointer' }}
              title={`Click to filter stories for ${stk.name}`}
            >
              <div>
                <strong style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                  ${stk.symbol}
                </strong>
                <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                  {stk.sector}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: '700' }}>
                  {stk.price}
                </div>
                <div
                  className={`ticker-pct ${stk.up ? 'up' : 'down'}`}
                  style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}
                >
                  {stk.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Signal vs Noise Meter */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <span>SIGNAL VS NOISE</span>
          <Filter size={13} />
        </div>

        <div className="noise-meter-box">
          <div className="noise-metric-num">88.4%</div>
          <div className="noise-metric-label">
            Irrelevant noise, ragebait, and promotional clickbait filtered out today.
          </div>
          <div
            style={{
              height: '4px',
              background: 'var(--border-light)',
              borderRadius: '2px',
              marginTop: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '88.4%',
                height: '100%',
                background: 'var(--accent-green)',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4. Daily Wisdom / Axiom */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <span>MARKET AXIOM</span>
          <Quote size={13} />
        </div>

        <p className="quote-text">"{todayQuote.quote}"</p>
        <p className="quote-author">— {todayQuote.author}</p>
      </div>
    </aside>
  );
}
