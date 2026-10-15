import React, { useState } from 'react';
import { yieldCurveData, marketQuotes } from '../data/marketData';
import { searchIndianStocks, getIndianStockProfile } from '../data/indianMarketDirectory';
import {
  TrendingUp,
  TrendingDown,
  Filter,
  Quote,
  Plus,
  Trash2,
  Search,
  ExternalLink,
  Star,
  CheckCircle,
} from 'lucide-react';

export function Sidebar({
  watchlist = [],
  onFilterByTicker,
  onAddStock,
  onRemoveStock,
  onOpenResearch,
  isWatchlistOnly = false,
  onToggleWatchlistOnly,
}) {
  const [newStockInput, setNewStockInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Pick today's quote based on day
  const todayQuote = marketQuotes[new Date().getDate() % marketQuotes.length];

  const handleInputChange = (val) => {
    setNewStockInput(val);
    if (val.trim().length >= 2) {
      setSuggestions(searchIndianStocks(val).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectStock = (stock) => {
    if (!onAddStock) return;
    onAddStock(stock);
    setNewStockInput('');
    setSuggestions([]);
    setIsAdding(false);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!newStockInput.trim() || !onAddStock) return;
    const profile = getIndianStockProfile(newStockInput);
    onAddStock(profile);
    setNewStockInput('');
    setSuggestions([]);
    setIsAdding(false);
  };

  return (
    <aside className="sidebar-column">
      {/* 1. Personal Portfolio & Watchlist Radar */}
      <div className="sidebar-widget" style={{ borderTop: '3px solid var(--accent-red)' }}>
        <div className="sidebar-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={13} color="var(--accent-red)" fill="var(--accent-red)" />
            <span>MY WATCHLIST & RADAR</span>
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
            {watchlist.length} STOCKS
          </span>
        </div>

        {/* Watchlist Only Filter Toggle */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <button
            type="button"
            className={`btn-newspaper ${!isWatchlistOnly ? 'btn-primary-dark' : ''}`}
            style={{ flex: 1, padding: '5px 8px', fontSize: '0.72rem', justifyContent: 'center' }}
            onClick={() => onToggleWatchlistOnly && onToggleWatchlistOnly(false)}
          >
            All Market Stories
          </button>
          <button
            type="button"
            className={`btn-newspaper ${isWatchlistOnly ? 'btn-primary-dark' : ''}`}
            style={{ flex: 1, padding: '5px 8px', fontSize: '0.72rem', justifyContent: 'center' }}
            onClick={() => onToggleWatchlistOnly && onToggleWatchlistOnly(true)}
            title="Filter the entire newspaper to only stocks in your watchlist"
          >
            ⭐ My Watchlist Only
          </button>
        </div>

        {/* Quick Add Stock Box */}
        <div style={{ marginBottom: '14px', position: 'relative' }}>
          {!isAdding ? (
            <button
              type="button"
              className="btn-newspaper"
              style={{ width: '100%', justifyContent: 'center', padding: '6px 10px', fontSize: '0.75rem' }}
              onClick={() => setIsAdding(true)}
            >
              <Plus size={13} />
              <span>+ Add Indian Stock to Radar</span>
            </button>
          ) : (
            <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '4px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  placeholder="Type symbol (e.g. RVNL, IRFC, HAL, ITC)..."
                  value={newStockInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '3px',
                    background: 'var(--bg-card)',
                    color: 'var(--ink-primary)',
                  }}
                />

                {/* Autocomplete Dropdown */}
                {suggestions.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '105%',
                      left: 0,
                      right: 0,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-strong)',
                      borderRadius: '3px',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: 30,
                    }}
                  >
                    {suggestions.map((s) => (
                      <div
                        key={s.symbol}
                        onClick={() => handleSelectStock(s)}
                        style={{
                          padding: '6px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid var(--border-light)',
                          cursor: 'pointer',
                          fontSize: '0.76rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span><strong>{s.symbol}</strong> ({s.name})</span>
                        <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{s.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="btn-newspaper btn-primary-dark" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                Add
              </button>
              <button
                type="button"
                className="btn-newspaper"
                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                onClick={() => {
                  setIsAdding(false);
                  setNewStockInput('');
                  setSuggestions([]);
                }}
              >
                ✕
              </button>
            </form>
          )}
        </div>

        {/* Watchlist Stock List */}
        <div className="portfolio-radar-list" style={{ maxHeight: '340px', overflowY: 'auto' }}>
          {watchlist.map((stk) => (
            <div
              key={stk.symbol}
              className="portfolio-item"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              <div
                style={{ cursor: 'pointer', flex: 1 }}
                onClick={() => onFilterByTicker && onFilterByTicker(stk.symbol)}
                title={`Filter news stories for ${stk.name || stk.symbol}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <strong style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                    {stk.symbol}
                  </strong>
                  <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
                    {stk.sector}
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)' }}>
                  {stk.name || stk.symbol}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700 }}>
                    {stk.price}
                  </div>
                  <div
                    className={`ticker-pct ${stk.up !== false ? 'up' : 'down'}`}
                    style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}
                  >
                    {stk.change || '+1.50%'}
                  </div>
                </div>

                {/* Research Button */}
                <button
                  type="button"
                  onClick={() => onOpenResearch && onOpenResearch(stk.symbol)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-light)',
                    borderRadius: '3px',
                    padding: '3px 6px',
                    cursor: 'pointer',
                    color: 'var(--accent-blue)',
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                  title={`Open 1-2 Year Research Dossier for ${stk.symbol}`}
                >
                  Dossier
                </button>

                {/* Delete Stock */}
                <button
                  type="button"
                  onClick={() => onRemoveStock && onRemoveStock(stk.symbol)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--accent-red)',
                    padding: '2px 4px',
                    opacity: 0.7,
                  }}
                  title={`Remove ${stk.symbol} from radar`}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Indian Yield Curve & Sovereign Benchmarks */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <span>YIELD CURVE & G-SEC</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>RBI & SOVEREIGN</span>
        </div>

        <table className="yield-table">
          <tbody>
            {yieldCurveData.map((row, idx) => {
              const isUp = row.status === 'up';
              const isDown = row.status === 'down';
              const chgClass = isUp ? 'ticker-pct up' : isDown ? 'ticker-pct down' : 'ticker-pct flat';

              return (
                <tr key={idx}>
                  <td className="yield-name" title={row.note || ''}>
                    {row.name}
                  </td>
                  <td className="yield-val">{row.yield}</td>
                  <td className={`yield-chg ${chgClass}`}>{row.change}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 3. Signal vs Noise Meter */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <span>SIGNAL VS NOISE</span>
          <Filter size={13} />
        </div>

        <div className="noise-meter-box">
          <div className="noise-metric-num">89.6%</div>
          <div className="noise-metric-label">
            Promotional clickbait, ragebait, and speculative rumor posts filtered out today.
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
                width: '89.6%',
                height: '100%',
                background: 'var(--accent-green)',
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4. Daily Market Wisdom */}
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
