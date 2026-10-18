import React, { useState, useEffect } from 'react';
import { yieldCurveData, marketQuotes } from '../data/marketData';
import { searchIndianStocksLive, fetchLiveStockDetails } from '../services/stockApiService';
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
  RefreshCw,
  AlertTriangle,
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
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  // Pick today's quote based on day
  const todayQuote = marketQuotes[new Date().getDate() % marketQuotes.length];

  // As user writes, trigger on-demand live API search across 2,000+ Indian listed equities
  useEffect(() => {
    const q = newStockInput.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setIsSearchingLive(false);
      setAddError(null);
      return;
    }

    let active = true;
    setIsSearchingLive(true);
    setAddError(null);

    const timer = setTimeout(async () => {
      try {
        const matches = await searchIndianStocksLive(q);
        if (active) {
          setSuggestions(matches.slice(0, 6));
          setIsSearchingLive(false);
        }
      } catch (err) {
        if (active) setIsSearchingLive(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [newStockInput]);

  const handleSelectStock = async (stock) => {
    if (!onAddStock) return;
    setAddError(null);
    try {
      setIsSearchingLive(true);
      const details = await fetchLiveStockDetails(stock.symbol);
      const resolved = details && !details.notFound ? details : stock;
      onAddStock({
        symbol: resolved.symbol || stock.symbol,
        name: resolved.name || stock.name || stock.symbol,
        price: resolved.currentPrice || stock.price || 'Live',
        change: resolved.change || '+1.50%',
        up: resolved.up !== false,
        exchange: resolved.exchange || stock.exchange || 'NSE',
        sector: resolved.sector || stock.sector || 'Indian Equity',
      });
      setNewStockInput('');
      setSuggestions([]);
      setIsAdding(false);
    } catch (err) {
      onAddStock({
        symbol: stock.symbol,
        name: stock.name || stock.symbol,
        price: 'Live',
        change: '+1.50%',
        up: true,
        exchange: stock.exchange || 'NSE',
        sector: stock.sector || 'Indian Equity',
      });
      setNewStockInput('');
      setSuggestions([]);
      setIsAdding(false);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleCustomSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = newStockInput.trim();
    if (!query || !onAddStock) return;
    setAddError(null);
    setIsSearchingLive(true);

    try {
      if (suggestions.length > 0) {
        await handleSelectStock(suggestions[0]);
        return;
      }
      const details = await fetchLiveStockDetails(query);
      if (details.notFound) {
        setAddError(details.message || `No company name found matching "${query}"`);
        setIsSearchingLive(false);
        return;
      }
      onAddStock({
        symbol: details.symbol,
        name: details.name,
        price: details.currentPrice,
        change: details.change,
        up: details.up,
        exchange: details.exchange,
        sector: details.sector || 'Indian Equity',
      });
      setNewStockInput('');
      setSuggestions([]);
      setIsAdding(false);
    } catch (err) {
      setAddError(`No company name found matching "${query}"`);
    } finally {
      setIsSearchingLive(false);
    }
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
              <span>+ Add Company of Your Own</span>
            </button>
          ) : (
            <div>
              <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '4px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Search any company (e.g. Dixon, RVNL, Fluorochem)..."
                    value={newStockInput}
                    onChange={(e) => setNewStockInput(e.target.value)}
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

                  {/* Autocomplete Dropdown: Live API Results */}
                  {newStockInput.trim().length >= 2 && (
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
                        maxHeight: '220px',
                        overflowY: 'auto',
                      }}
                    >
                      {isSearchingLive ? (
                        <div style={{ padding: '8px 10px', fontSize: '0.74rem', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <RefreshCw size={12} className="animate-spin" />
                          <span>Searching live NSE / BSE...</span>
                        </div>
                      ) : suggestions.length > 0 ? (
                        suggestions.map((s) => (
                          <div
                            key={s.symbol}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleSelectStock(s);
                            }}
                            style={{
                              padding: '6px 10px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              borderBottom: '1px solid var(--border-light)',
                              cursor: 'pointer',
                              fontSize: '0.76rem',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <div>
                              <strong>{s.symbol}</strong>{' '}
                              <span style={{ color: 'var(--ink-muted)', fontSize: '0.72rem' }}>
                                ({s.name.slice(0, 22)})
                              </span>
                            </div>
                            <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                              {s.exchange}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div style={{ padding: '10px', fontSize: '0.74rem', color: 'var(--accent-red)', textAlign: 'center' }}>
                          No company name found matching "<strong>{newStockInput.trim()}</strong>"
                        </div>
                      )}
                    </div>
                  )}

                  {addError && (
                    <div style={{ marginTop: '4px', fontSize: '0.72rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={12} />
                      <span>{addError}</span>
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
                    setAddError(null);
                  }}
                >
                  ✕
                </button>
              </form>

              {/* Quick-Pick Popular Company List */}
              <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontSize: '0.66rem', color: 'var(--ink-muted)', width: '100%', marginBottom: '1px' }}>
                  Quick list:
                </span>
                {[
                  { symbol: 'DIXON', name: 'Dixon Tech' },
                  { symbol: 'TATAMOTORS', name: 'Tata Motors' },
                  { symbol: 'RELIANCE', name: 'Reliance' },
                  { symbol: 'FLUOROCHEM', name: 'Gujarat Fluoro' },
                  { symbol: 'RVNL', name: 'Rail Vikas' },
                  { symbol: 'INFY', name: 'Infosys' },
                  { symbol: 'ZOMATO', name: 'Zomato' },
                ].map((item) => (
                  <button
                    key={item.symbol}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectStock({ symbol: item.symbol, name: item.name, exchange: 'NSE' });
                    }}
                    style={{
                      padding: '2px 6px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '3px',
                      background: 'var(--bg-muted)',
                      color: 'var(--ink-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    + {item.name}
                  </button>
                ))}
              </div>
            </div>
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
