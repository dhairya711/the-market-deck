import React, { useState } from 'react';
import { X, Plus, Trash2, Sliders, Check, Sparkles, RefreshCw } from 'lucide-react';
import { getIndianStockProfile } from '../data/indianMarketDirectory';

export function SettingsModal({
  settings,
  onSaveSettings,
  watchlist,
  onSaveWatchlist,
  onClose,
}) {
  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [localWatchlist, setLocalWatchlist] = useState([...watchlist]);
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockSector, setNewStockSector] = useState('');

  const availableIntervals = [
    { value: 5, label: 'Every 5 Minutes (Hyper Active)' },
    { value: 15, label: 'Every 15 Minutes (Recommended / Default)' },
    { value: 30, label: 'Every 30 Minutes' },
    { value: 60, label: 'Every 60 Minutes (Hourly Dossier)' },
    { value: 0, label: 'Manual Refresh Only' },
  ];

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newStockSymbol.trim()) return;

    const sym = newStockSymbol.trim().toUpperCase().replace(/[₹$]/g, '');
    const exists = localWatchlist.some((s) => s.symbol === sym);
    if (exists) {
      alert(`Ticker ${sym} is already in your watchlist.`);
      return;
    }

    const resolved = getIndianStockProfile(sym);
    const newStock = {
      symbol: sym,
      name: newStockName.trim() || resolved.name,
      price: resolved.price,
      change: resolved.change || '+1.50%',
      up: resolved.up !== false,
      sector: newStockSector.trim() || resolved.sector,
      sentiment: resolved.sentiment || 'Bullish',
    };

    setLocalWatchlist([...localWatchlist, newStock]);
    setNewStockSymbol('');
    setNewStockName('');
    setNewStockSector('');
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
            EDITORIAL & PORTFOLIO SETTINGS
          </h2>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', marginBottom: '20px' }}>
          Curate your personal no-nonsense broadsheet. Only see news about the industries you have invested in and stocks you own.
        </p>

        {/* SECTION 1: AUTO REFRESH INTERVAL */}
        <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '20px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
            ⏱️ AUTO-REFRESH FREQUENCY
          </label>
          <p style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', marginBottom: '10px' }}>
            Controls how often your newspaper automatically updates its dossier and checks for new signals.
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
              className={`btn-newspaper ${localSettings.newsVibe === 'tfg' ? 'btn-primary-dark' : ''}`}
              style={{ justifyContent: 'center', padding: '10px' }}
              onClick={() => setLocalSettings({ ...localSettings, newsVibe: 'tfg' })}
            >
              <span>TFG Vibe (No Cap / High Signal)</span>
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
            Only stories relevant to these tickers or their supply chains will be prioritized in your general dossier.
          </p>

          {/* Add Stock Form */}
          <form onSubmit={handleAddStock} style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Ticker (e.g. TSLA, NVDA, RELIANCE)"
              value={newStockSymbol}
              onChange={(e) => setNewStockSymbol(e.target.value)}
              style={{
                flex: '1 1 120px',
                padding: '6px 10px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-strong)',
                borderRadius: '4px',
                background: 'var(--bg-input)',
                color: 'var(--ink-primary)',
              }}
            />
            <input
              type="text"
              placeholder="Company Name (e.g. Tesla)"
              value={newStockName}
              onChange={(e) => setNewStockName(e.target.value)}
              style={{
                flex: '1 1 140px',
                padding: '6px 10px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-strong)',
                borderRadius: '4px',
                background: 'var(--bg-input)',
                color: 'var(--ink-primary)',
              }}
            />
            <button type="submit" className="btn-newspaper btn-primary-dark">
              <Plus size={14} />
              <span>Add Ticker</span>
            </button>
          </form>

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

        {/* SECTION 4: CUSTOM MASTHEAD TITLE */}
        <div style={{ padding: '16px', background: 'var(--bg-muted)', borderRadius: '4px', marginBottom: '24px' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, marginBottom: '6px' }}>
            📰 NEWSPAPER MASTHEAD TITLE
          </label>
          <input
            type="text"
            value={localSettings.newspaperTitle}
            onChange={(e) => setLocalSettings({ ...localSettings, newspaperTitle: e.target.value })}
            placeholder="e.g. TFG TIMES"
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
