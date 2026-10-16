import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Sliders, Check, Search, RefreshCw, AlertTriangle } from 'lucide-react';
import { searchIndianStocksLive, fetchLiveStockDetails } from '../services/stockApiService';

export function SettingsModal({
  settings,
  onSaveSettings,
  watchlist,
  onSaveWatchlist,
  onClose,
}) {
  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [localWatchlist, setLocalWatchlist] = useState([...watchlist]);
  const [stockSearch, setStockSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [addError, setAddError] = useState(null);

  const availableIntervals = [
    { value: 5, label: 'Every 5 Minutes (Hyper Active)' },
    { value: 15, label: 'Every 15 Minutes (Recommended / Default)' },
    { value: 30, label: 'Every 30 Minutes' },
    { value: 60, label: 'Every 60 Minutes (Hourly Dossier)' },
    { value: 0, label: 'Manual Refresh Only' },
  ];

  // Debounced live search across NSE / BSE
  useEffect(() => {
    const q = stockSearch.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setIsSearchingLive(false);
      return;
    }

    let active = true;
    setIsSearchingLive(true);
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
    }, 280);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [stockSearch]);

  const handleSelectStock = async (stock) => {
    setAddError(null);
    const sym = stock.symbol.toUpperCase().replace(/[₹$]/g, '').replace(/\.NS$|\.BO$/i, '').trim();

    if (localWatchlist.some((s) => s.symbol.toUpperCase().replace(/[₹$]/g, '').replace(/\.NS$|\.BO$/i, '').trim() === sym)) {
      setAddError(`${sym} is already in your watchlist.`);
      return;
    }

    try {
      setIsSearchingLive(true);
      const details = await fetchLiveStockDetails(sym);
      const resolved = details && !details.notFound ? details : stock;
      const newStock = {
        symbol: sym,
        name: resolved.name || stock.name || sym,
        price: resolved.currentPrice || stock.price || 'Live',
        change: resolved.change || '+1.50%',
        up: resolved.up !== false,
        sector: resolved.sector || stock.sector || 'Indian Equity',
        exchange: resolved.exchange || stock.exchange || 'NSE',
      };

      setLocalWatchlist([newStock, ...localWatchlist]);
      setStockSearch('');
      setSuggestions([]);
    } catch (err) {
      const newStock = {
        symbol: sym,
        name: stock.name || sym,
        price: 'Live',
        change: '+1.50%',
        up: true,
        sector: stock.sector || 'Indian Equity',
        exchange: stock.exchange || 'NSE',
      };
      setLocalWatchlist([newStock, ...localWatchlist]);
      setStockSearch('');
      setSuggestions([]);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const query = stockSearch.trim();
    if (!query) return;

    if (suggestions.length > 0) {
      handleSelectStock(suggestions[0]);
      return;
    }

    setAddError(null);
    setIsSearchingLive(true);
    try {
      const details = await fetchLiveStockDetails(query);
      if (details.notFound) {
        setAddError(details.message || `No company found matching "${query}"`);
        setIsSearchingLive(false);
        return;
      }
      handleSelectStock(details);
    } catch (err) {
      setAddError(`No company found matching "${query}"`);
    } finally {
      setIsSearchingLive(false);
    }
  };

  const handleRemoveStock = (symbol) => {
    setLocalWatchlist(localWatchlist.filter((s) => s.symbol !== symbol));
  };

  const handleSaveAll = () => {
    onSaveSettings(localSettings);
    onSaveWatchlist(localWatchlist);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sliders size={20} color="var(--accent-red)" />
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '1.6rem', fontWeight: 900 }}>
            TERMINAL & PORTFOLIO SETTINGS
          </h2>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '20px' }}>
          Curate your personal market cockpit and portfolio radar. Filter intelligence to the industries you invest in and stocks you own.
        </p>

        {/* SECTION 1: AUTO REFRESH INTERVAL */}
        <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '20px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
            ⏱️ AUTO-REFRESH FREQUENCY
          </label>
          <p style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', marginBottom: '10px' }}>
            Controls how often the live feeds update and check for new capital signals.
          </p>
          <select
            value={localSettings.refreshIntervalMinutes}
            onChange={(e) =>
              setLocalSettings({ ...localSettings, refreshIntervalMinutes: Number(e.target.value) })
            }
            style={{
              width: '100%',
              padding: '8px 12px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid var(--border-strong)',
              borderRadius: '4px',
              background: 'var(--bg-card)',
              color: 'var(--ink-primary)',
            }}
          >
            {availableIntervals.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* SECTION 2: EDITORIAL TONE / VIBE */}
        <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '20px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
            🗞️ EDITORIAL VOICE & HEADLINE TONE
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              className={`btn-newspaper ${localSettings.newsVibe === 'market_deck' || localSettings.newsVibe === 'tfg' ? 'btn-primary-dark' : ''}`}
              style={{ justifyContent: 'center', padding: '10px' }}
              onClick={() => setLocalSettings({ ...localSettings, newsVibe: 'market_deck' })}
            >
              <span>Market Deck Alpha (High Signal / No Fluff)</span>
            </button>
            <button
              type="button"
              className={`btn-newspaper ${localSettings.newsVibe === 'executive' ? 'btn-primary-dark' : ''}`}
              style={{ justifyContent: 'center', padding: '10px' }}
              onClick={() => setLocalSettings({ ...localSettings, newsVibe: 'executive' })}
            >
              <span>Wall Street Executive (Zero Fluff)</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: MY WATCHLIST & STOCKS */}
        <div style={{ padding: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '4px', marginBottom: '20px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '4px' }}>
            💼 MY INVESTED STOCKS & COMPANIES ({localWatchlist.length})
          </label>
          <p style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginBottom: '12px' }}>
            Add any company of your choice to your personal watchlist radar across NSE and BSE.
          </p>

          {/* Add Stock Search with live dropdown */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
              <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--ink-muted)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Search & add any company (e.g. Dixon, RVNL, Fluorochem, Tata Motors)..."
                  value={stockSearch}
                  onChange={(e) => setStockSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px 8px 32px',
                    fontSize: '0.82rem',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '4px',
                    background: 'var(--bg-input)',
                    color: 'var(--ink-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                />
              </div>
              <button type="submit" className="btn-newspaper btn-primary-dark" style={{ padding: '0 14px' }}>
                <Plus size={14} />
                <span>Add</span>
              </button>
            </form>

            {/* Dropdown Live Suggestions */}
            {stockSearch.trim().length >= 2 && (
              <div
                style={{
                  position: 'absolute',
                  top: '105%',
                  left: 0,
                  right: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '4px',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 40,
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {isSearchingLive ? (
                  <div style={{ padding: '8px 12px', fontSize: '0.76rem', color: 'var(--ink-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                        padding: '8px 12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div>
                        <strong>{s.symbol}</strong>{' '}
                        <span style={{ color: 'var(--ink-muted)', fontSize: '0.72rem' }}>
                          ({s.name.slice(0, 24)})
                        </span>
                      </div>
                      <span style={{ color: 'var(--accent-red)', fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        {s.exchange}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '10px', fontSize: '0.74rem', color: 'var(--accent-red)', textAlign: 'center' }}>
                    No company found matching "{stockSearch.trim()}"
                  </div>
                )}
              </div>
            )}

            {addError && (
              <div style={{ marginTop: '6px', fontSize: '0.74rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={12} />
                <span>{addError}</span>
              </div>
            )}

            {/* Quick List of Popular Companies to Add */}
            <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', width: '100%' }}>
                Quick add from company list:
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
                    padding: '3px 8px',
                    fontSize: '0.7rem',
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

          {/* List of Tracked Stocks */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {localWatchlist.map((stk) => (
              <div
                key={stk.symbol}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px',
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                }}
              >
                <span><strong>${stk.symbol}</strong> ({stk.name})</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStock(stk.symbol)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--accent-red)' }}
                  title="Remove from watchlist"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: CUSTOM MASTHEAD TITLE & SUBTITLE */}
        <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '24px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
            🏛️ PLATFORM / TERMINAL TITLE
          </label>
          <input
            type="text"
            value={localSettings.newspaperTitle}
            onChange={(e) => setLocalSettings({ ...localSettings, newspaperTitle: e.target.value })}
            placeholder="e.g. THE MARKET DECK"
            style={{
              width: '100%',
              padding: '8px 12px',
              fontFamily: 'var(--font-masthead)',
              fontSize: '1.1rem',
              fontWeight: 800,
              border: '1px solid var(--border-strong)',
              borderRadius: '4px',
              background: 'var(--bg-card)',
              color: 'var(--ink-primary)',
              marginBottom: '12px',
            }}
          />

          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
            💡 FINANCIAL LITERACY & INTELLIGENCE TAGLINE
          </label>
          <input
            type="text"
            value={localSettings.newspaperSubtitle}
            onChange={(e) => setLocalSettings({ ...localSettings, newspaperSubtitle: e.target.value })}
            placeholder="e.g. Financial Intelligence & Wealth Literacy Terminal..."
            style={{
              width: '100%',
              padding: '8px 12px',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.88rem',
              border: '1px solid var(--border-strong)',
              borderRadius: '4px',
              background: 'var(--bg-card)',
              color: 'var(--ink-primary)',
            }}
          />
        </div>

        {/* SAVE BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn-newspaper" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-newspaper btn-primary-dark" onClick={handleSaveAll}>
            <Check size={14} />
            <span>Save & Apply Editorial Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
