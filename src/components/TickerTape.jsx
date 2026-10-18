import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Star,
  Sparkles,
  X,
  Check,
  ArrowUpRight,
  RefreshCw,
  Zap,
  Sliders,
  Sun,
  Moon,
  Clock,
  Compass,
} from 'lucide-react';
import { searchIndianStocksLive, fetchLiveStockDetails } from '../services/stockApiService';

export function TickerTape({
  indices = [],
  watchlist = [],
  onAddStock,
  onOpenResearch,
  onManualRefresh,
  isRefreshing,
  onOpenSettings,
  onOpenCatchMeUp,
  onOpenTour,
  theme,
  onToggleTheme,
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [addedSymbols, setAddedSymbols] = useState([]);

  // Extract Nifty 50 and Sensex to keep them steady above the rotating line
  const nifty50 = indices.find((item) => item.symbol.toUpperCase().includes('NIFTY 50')) || {
    symbol: 'NIFTY 50',
    value: '24,774.30',
    change: '+0.65%',
    up: true,
  };

  const sensex = indices.find((item) => item.symbol.toUpperCase().includes('SENSEX')) || {
    symbol: 'SENSEX',
    value: '81,420.50',
    change: '+0.72%',
    up: true,
  };

  // Helper to reliably detect whether an item is positive (+ green), negative (- red), or flat
  const getDirection = (item) => {
    if (!item) return 'flat';
    const chg = String(item.change || '').trim();
    if (chg.startsWith('-')) return 'down';
    if (chg.startsWith('+')) return 'up';
    if (item.up === true) return 'up';
    if (item.up === false) return 'down';
    return 'flat';
  };

  // Debounced search for Add to Ticker
  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    let active = true;
    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const matches = await searchIndianStocksLive(q);
        if (active) {
          setSuggestions(matches.slice(0, 6));
          setIsSearching(false);
        }
      } catch {
        if (active) setIsSearching(false);
      }
    }, 240);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleQuickAdd = async (stock) => {
    if (!onAddStock) return;
    const sym = (stock.symbol || '').toUpperCase().replace(/[₹$]/g, '').replace(/\.NS$|\.BO$/i, '').trim();

    try {
      const details = await fetchLiveStockDetails(sym);
      const resolved = details && !details.notFound ? details : stock;
      onAddStock({
        symbol: sym,
        name: resolved.name || stock.name || sym,
        price: resolved.currentPrice || stock.price || 'Live',
        change: resolved.change || '+1.50%',
        up: resolved.up !== false,
        exchange: resolved.exchange || stock.exchange || 'NSE',
        sector: resolved.sector || stock.sector || 'Indian Equity',
      });
    } catch {
      onAddStock({
        symbol: sym,
        name: stock.name || sym,
        price: 'Live',
        change: '+1.50%',
        up: true,
        exchange: 'NSE',
        sector: 'Indian Equity',
      });
    }

    setAddedSymbols((prev) => [...prev, sym]);
    setSearchQuery('');
    setSuggestions([]);
  };

  // Filter out Nifty and Sensex from the rotating line so only the other assets scroll
  const scrollingIndices = indices.filter(
    (item) => !item.symbol.toUpperCase().includes('NIFTY 50') && !item.symbol.toUpperCase().includes('SENSEX')
  );

  // Combine remaining macro assets with user's portfolio stocks
  const combinedItems = [
    ...scrollingIndices,
    ...watchlist.map((w) => ({
      symbol: w.symbol,
      value: w.price,
      change: w.change,
      up: w.up,
      isStock: true,
    })),
  ];

  // Duplicate for seamless endless looping animation
  const fullTrack = [...combinedItems, ...combinedItems];

  const niftyDir = getDirection(nifty50);
  const sensexDir = getDirection(sensex);

  return (
    <div className="ticker-section-wrapper" aria-label="Market Pulse and Live Ticker">
      {/* =========================================================================
          ROW 1: STEADY MARKET PULSE & CONTROLS (ABOVE THE ROTATING LINE)
          Holds Nifty 50 and Sensex steady with smaller, crisp typography
          plus Watchlist and Action Buttons
          ========================================================================= */}
      <div className="ticker-steady-bar">
        {/* Left Side: Market Pulse + Steady Nifty 50 + Steady Sensex */}
        <div className="steady-benchmarks-group" id="tour-benchmarks">
          <div className="steady-pulse-tag">
            <span className="live-pulse-dot"></span>
            <span className="steady-pulse-text">MARKET PULSE</span>
          </div>

          {/* Steady Nifty 50 */}
          <div
            className={`steady-benchmark-pill ${niftyDir === 'up' ? 'pill-up' : niftyDir === 'down' ? 'pill-down' : ''}`}
            onClick={() => onOpenResearch && onOpenResearch('NIFTY 50')}
            title="Click to view deep-dive analytics for Nifty 50"
          >
            <span className="steady-badge-exch">NSE</span>
            <span className="steady-badge-name">NIFTY 50</span>
            <span className="steady-badge-val">{nifty50.value}</span>
            <span className={`steady-chg-indicator ${niftyDir}`}>
              {niftyDir === 'up' ? '▲' : niftyDir === 'down' ? '▼' : ''} {nifty50.change}
            </span>
          </div>

          {/* Steady Sensex */}
          <div
            className={`steady-benchmark-pill ${sensexDir === 'up' ? 'pill-up' : sensexDir === 'down' ? 'pill-down' : ''}`}
            onClick={() => onOpenResearch && onOpenResearch('SENSEX')}
            title="Click to view deep-dive analytics for Sensex"
          >
            <span className="steady-badge-exch">BSE</span>
            <span className="steady-badge-name">SENSEX</span>
            <span className="steady-badge-val">{sensex.value}</span>
            <span className={`steady-chg-indicator ${sensexDir}`}>
              {sensexDir === 'up' ? '▲' : sensexDir === 'down' ? '▼' : ''} {sensex.change}
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action Controls */}
        <div className="steady-actions-group">
          <button
            type="button"
            id="tour-btn-add-stock"
            className="btn-newspaper btn-quick-action"
            onClick={() => setIsAddOpen(true)}
            title="Search and track any Indian stock or index on live ticker"
          >
            <Plus size={13} />
            <span>Add Stock</span>
          </button>

          {onOpenCatchMeUp && (
            <button
              type="button"
              className="btn-newspaper btn-catch-up btn-quick-action"
              onClick={onOpenCatchMeUp}
              title="Listen to 60-second executive audio briefing"
            >
              <Zap size={13} />
              <span>Catch Me Up</span>
            </button>
          )}

          {onManualRefresh && (
            <button
              type="button"
              className="btn-newspaper btn-quick-action"
              onClick={onManualRefresh}
              disabled={isRefreshing}
              title="Refresh live quotes and news"
            >
              <RefreshCw size={13} className={isRefreshing ? 'spin-anim' : ''} />
              <span>{isRefreshing ? 'Refreshing' : 'Refresh'}</span>
            </button>
          )}

          {onOpenSettings && (
            <button
              type="button"
              className="btn-newspaper btn-quick-action"
              onClick={onOpenSettings}
              title="Manage watchlist and topics"
            >
              <Sliders size={13} />
              <span>Watchlist ({watchlist.length})</span>
            </button>
          )}

          {onOpenTour && (
            <button
              type="button"
              className="btn-newspaper btn-quick-action"
              onClick={onOpenTour}
              title="Open interactive 7-slide guided tour to explore all features"
              style={{ borderColor: 'var(--accent-red)', color: 'var(--ink-primary)' }}
            >
              <Compass size={13} style={{ color: 'var(--accent-red)' }} />
              <span>Tour</span>
            </button>
          )}

          {onToggleTheme && (
            <button
              type="button"
              className="btn-newspaper btn-quick-action"
              onClick={onToggleTheme}
              title="Switch light/dark mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun size={13} style={{ color: '#fbbf24' }} />
                  <span>Paper</span>
                </>
              ) : (
                <>
                  <Moon size={13} />
                  <span>Dark</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          ROW 2: FULL-WIDTH ROTATING TICKER LINE (BELOW THE STEADY LINE)
          Now has 100% of horizontal width: plenty of space to comfortably read
          ========================================================================= */}
      <div className="ticker-fullwidth-marquee-row">
        <div className="ticker-track-viewport">
          <div className="ticker-track">
            {fullTrack.map((item, idx) => {
              const dir = getDirection(item);

              return (
                <div
                  key={`${item.symbol}-${idx}`}
                  className={`ticker-item ticker-status-${dir}`}
                  onClick={() => onOpenResearch && onOpenResearch(item.symbol)}
                  title={`Click to open ${item.symbol} intelligence dossier`}
                >
                  <span className="ticker-name">{item.symbol}</span>
                  <span className="ticker-val">{item.value}</span>
                  <span className={`ticker-pct ${dir}`}>
                    {dir === 'up' ? '▲ ' : dir === 'down' ? '▼ ' : ''}
                    {item.change}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: ADD STOCK TO RADAR WITH LIVE AUTOCOMPLETE
          ========================================================================= */}
      {isAddOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div className="modal-content ticker-add-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--accent-red)' }} />
                <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.25rem' }}>
                  Track Stock on Live Market Radar
                </h3>
              </div>
              <button
                type="button"
                className="btn-icon-subtle"
                onClick={() => setIsAddOpen(false)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', margin: '0 0 14px 0' }}>
                Search any Indian listed equity on NSE / BSE to track its real-time prices and returns across your terminal.
              </p>

              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <Search
                  size={15}
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--ink-muted)',
                  }}
                />
                <input
                  type="text"
                  placeholder="Enter symbol or company (e.g. Dixon, Mazagon, Trent, Tata Motors)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    background: 'var(--bg-card)',
                    color: 'var(--ink-primary)',
                    border: '1.5px solid var(--border-strong)',
                    borderRadius: '4px',
                    outline: 'none',
                  }}
                />
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div style={{ border: '1px solid var(--border-light)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
                  {suggestions.map((stk, idx) => {
                    const isAdded = addedSymbols.includes(stk.symbol);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 14px',
                          borderBottom: idx < suggestions.length - 1 ? '1px solid var(--border-light)' : 'none',
                          background: 'var(--bg-card)',
                        }}
                      >
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.85rem' }}>
                            {stk.symbol}
                            <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', marginLeft: '6px' }}>
                              [{stk.exchange || 'NSE'}]
                            </span>
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--ink-secondary)' }}>
                            {stk.name}
                          </div>
                        </div>

                        <button
                          type="button"
                          className="btn-newspaper"
                          style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                          onClick={() => handleQuickAdd(stk)}
                          disabled={isAdded}
                        >
                          {isAdded ? (
                            <>
                              <Check size={12} style={{ color: 'var(--accent-green)' }} />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus size={12} />
                              <span>Add to Radar</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Popular Shortcuts */}
              <div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', display: 'block', marginBottom: '8px' }}>
                  QUICK POPULAR SUGGESTIONS:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {[
                    { symbol: 'DIXON', name: 'Dixon Tech' },
                    { symbol: 'TRENT', name: 'Trent Ltd' },
                    { symbol: 'MAZDOCK', name: 'Mazagon Dock' },
                    { symbol: 'SUZLON', name: 'Suzlon Energy' },
                    { symbol: 'HAL', name: 'Hindustan Aeronautics' },
                    { symbol: 'BEL', name: 'Bharat Electronics' },
                    { symbol: 'ZOMATO', name: 'Zomato Ltd' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ticker-badge"
                      style={{ fontSize: '0.74rem', padding: '4px 9px', cursor: 'pointer' }}
                      onClick={() => handleQuickAdd(item)}
                    >
                      + {item.symbol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TickerTape;
