import React, { useState, useEffect, useRef } from 'react';
import {
  Scale,
  TrendingUp,
  Building2,
  PieChart,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  Search,
  Check,
  Zap,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import {
  compareFinancialAssets,
  compareFinancialAssetsLive,
  comparisonAssetCatalog,
} from '../data/assetComparisonDatabase';
import { searchIndianStocksLive } from '../services/stockApiService';

export function AssetComparisonArena() {
  const [inputA, setInputA] = useState('ZOMATO');
  const [inputB, setInputB] = useState('SWIGGY');
  const [inputC, setInputC] = useState('');
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonError, setComparisonError] = useState(null);

  // Autocomplete suggestion states
  const [suggestionsA, setSuggestionsA] = useState([]);
  const [suggestionsB, setSuggestionsB] = useState([]);
  const [suggestionsC, setSuggestionsC] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'A', 'B', 'C', or null

  // Active comparison state
  const [comparisonResult, setComparisonResult] = useState(() =>
    compareFinancialAssets('ZOMATO', 'SWIGGY')
  );

  const arenaRef = useRef(null);

  // Close suggestion popups on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (arenaRef.current && !arenaRef.current.contains(event.target)) {
        setActiveInput(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for Input A
  useEffect(() => {
    const q = inputA.trim();
    if (q.length < 2 || activeInput !== 'A') {
      setSuggestionsA([]);
      return;
    }
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const matches = await searchIndianStocksLive(q);
        if (active) setSuggestionsA(matches.slice(0, 5));
      } catch (err) {}
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputA, activeInput]);

  // Debounced search for Input B
  useEffect(() => {
    const q = inputB.trim();
    if (q.length < 2 || activeInput !== 'B') {
      setSuggestionsB([]);
      return;
    }
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const matches = await searchIndianStocksLive(q);
        if (active) setSuggestionsB(matches.slice(0, 5));
      } catch (err) {}
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputB, activeInput]);

  // Debounced search for Input C
  useEffect(() => {
    const q = inputC.trim();
    if (q.length < 2 || activeInput !== 'C') {
      setSuggestionsC([]);
      return;
    }
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const matches = await searchIndianStocksLive(q);
        if (active) setSuggestionsC(matches.slice(0, 5));
      } catch (err) {}
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [inputC, activeInput]);

  const presets = [
    { label: 'Zomato vs Swiggy', a: 'ZOMATO', b: 'SWIGGY' },
    { label: 'Tata Motors vs Maruti', a: 'TATAMOTORS', b: 'MARUTI' },
    { label: 'Nifty 50 vs Bank FD', a: 'NIFTY50', b: 'BANKFD' },
    { label: 'Suzlon vs IREDA', a: 'SUZLON', b: 'IREDA' },
    { label: 'Liquid Fund vs Savings A/C', a: 'LIQUIDFUND', b: 'BANKFD' },
    { label: 'Gold (24K) vs Nifty 50', a: 'GOLD', b: 'NIFTY50' },
  ];

  const handleRunComparison = async (e) => {
    if (e) e.preventDefault();
    if (!inputA.trim() || !inputB.trim()) return;

    setActiveInput(null);
    setIsComparing(true);
    setComparisonError(null);

    try {
      const res = await compareFinancialAssetsLive(
        inputA,
        inputB,
        showThirdInput && inputC.trim() ? inputC : null
      );

      if (res.notFound) {
        setComparisonError(
          res.message || `No company name found matching "${res.notFoundItem || 'your query'}"`
        );
        setComparisonResult({ notFound: true, items: [], verdict: null });
      } else {
        setComparisonResult(res);
        setComparisonError(null);
      }
    } catch (err) {
      console.warn('Comparison error:', err);
      setComparisonError('Unable to complete comparison. Please check ticker spelling.');
    } finally {
      setIsComparing(false);
    }
  };

  const handleApplyPreset = async (p) => {
    setInputA(p.a);
    setInputB(p.b);
    setInputC('');
    setShowThirdInput(false);
    setActiveInput(null);
    setIsComparing(true);
    setComparisonError(null);

    try {
      const res = await compareFinancialAssetsLive(p.a, p.b);
      setComparisonResult(res);
    } catch (err) {
      setComparisonResult(compareFinancialAssets(p.a, p.b));
    } finally {
      setIsComparing(false);
    }
  };

  const items = comparisonResult.items || [];
  const verdict = comparisonResult.verdict;

  return (
    <section className="asset-comparison-section" id="compare-arena" style={{ marginTop: '36px', marginBottom: '40px' }} ref={arenaRef}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border-strong)',
          padding: '24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border-strong)', paddingBottom: '16px', marginBottom: '22px' }}>
          <div className="section-meta-label" style={{ justifyContent: 'center', marginBottom: '6px' }}>
            HEAD-TO-HEAD INTELLIGENCE • ASSET & STOCK COMPARATOR
          </div>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2.1rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Compare Any 2 to 3 Things in Finance
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-secondary)', maxWidth: '750px', margin: '4px auto 0 auto' }}>
            Enter any 2 or 3 Indian listed companies, funds, or assets. Connects directly to live NSE/BSE exchange records for real prices, returns, and institutional cross-analysis.
          </p>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '14px' }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>Popular Comparisons:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="ticker-badge"
                style={{ fontSize: '0.75rem', padding: '3px 9px', cursor: 'pointer' }}
                onClick={() => handleApplyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Input Bar with Live Autocomplete */}
        <div style={{ maxWidth: '820px', margin: '0 auto 26px auto' }}>
          <form onSubmit={handleRunComparison}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px' }}>
              {/* Input A */}
              <div style={{ flex: '1 1 200px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Asset #1 (e.g. Zomato, Dixon, TCS)"
                  value={inputA}
                  onFocus={() => setActiveInput('A')}
                  onChange={(e) => {
                    setInputA(e.target.value);
                    setActiveInput('A');
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    border: '2px solid var(--border-strong)',
                    borderRadius: '4px',
                    background: 'var(--bg-input)',
                    color: 'var(--ink-primary)',
                  }}
                />
                {activeInput === 'A' && suggestionsA.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '105%',
                      left: 0,
                      right: 0,
                      background: 'var(--bg-card)',
                      border: '2px solid var(--border-strong)',
                      borderRadius: '4px',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: 40,
                    }}
                  >
                    {suggestionsA.map((s) => (
                      <div
                        key={s.symbol}
                        onClick={() => {
                          setInputA(s.symbol);
                          setActiveInput(null);
                        }}
                        style={{
                          padding: '7px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid var(--border-light)',
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span><strong>{s.symbol}</strong> ({s.name})</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>{s.exchange}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <span style={{ fontFamily: 'var(--font-masthead)', fontWeight: 900, color: 'var(--accent-red)' }}>VS</span>

              {/* Input B */}
              <div style={{ flex: '1 1 200px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Asset #2 (e.g. Swiggy, Bank FD, Maruti)"
                  value={inputB}
                  onFocus={() => setActiveInput('B')}
                  onChange={(e) => {
                    setInputB(e.target.value);
                    setActiveInput('B');
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    border: '2px solid var(--border-strong)',
                    borderRadius: '4px',
                    background: 'var(--bg-input)',
                    color: 'var(--ink-primary)',
                  }}
                />
                {activeInput === 'B' && suggestionsB.length > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '105%',
                      left: 0,
                      right: 0,
                      background: 'var(--bg-card)',
                      border: '2px solid var(--border-strong)',
                      borderRadius: '4px',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: 40,
                    }}
                  >
                    {suggestionsB.map((s) => (
                      <div
                        key={s.symbol}
                        onClick={() => {
                          setInputB(s.symbol);
                          setActiveInput(null);
                        }}
                        style={{
                          padding: '7px 10px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid var(--border-light)',
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <span><strong>{s.symbol}</strong> ({s.name})</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>{s.exchange}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input C (Optional 3rd) */}
              {showThirdInput && (
                <>
                  <span style={{ fontFamily: 'var(--font-masthead)', fontWeight: 900, color: 'var(--accent-red)' }}>VS</span>
                  <div style={{ flex: '1 1 200px', position: 'relative' }}>
                    <input
                      type="text"
                      placeholder="Asset #3 (e.g. Gold, Liquid Fund, RVNL)"
                      value={inputC}
                      onFocus={() => setActiveInput('C')}
                      onChange={(e) => {
                        setInputC(e.target.value);
                        setActiveInput('C');
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        border: '2px solid var(--border-strong)',
                        borderRadius: '4px',
                        background: 'var(--bg-input)',
                        color: 'var(--ink-primary)',
                      }}
                    />
                    {activeInput === 'C' && suggestionsC.length > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '105%',
                          left: 0,
                          right: 0,
                          background: 'var(--bg-card)',
                          border: '2px solid var(--border-strong)',
                          borderRadius: '4px',
                          boxShadow: 'var(--shadow-md)',
                          zIndex: 40,
                        }}
                      >
                        {suggestionsC.map((s) => (
                          <div
                            key={s.symbol}
                            onClick={() => {
                              setInputC(s.symbol);
                              setActiveInput(null);
                            }}
                            style={{
                              padding: '7px 10px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              borderBottom: '1px solid var(--border-light)',
                              cursor: 'pointer',
                              fontSize: '0.78rem',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <span><strong>{s.symbol}</strong> ({s.name})</span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>{s.exchange}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn-newspaper btn-primary-dark"
                disabled={isComparing}
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                {isComparing ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Querying Live Markets...</span>
                  </>
                ) : (
                  <>
                    <Scale size={14} />
                    <span>Compare Head-to-Head</span>
                  </>
                )}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '0.74rem' }}>
              <button
                type="button"
                onClick={() => setShowThirdInput(!showThirdInput)}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
              >
                {showThirdInput ? '– Remove 3rd Item' : '+ Add 3rd Item to Compare (3-Way Battle)'}
              </button>
            </div>
          </form>
        </div>

        {/* NOT FOUND ERROR ALERT (Zero Fake Generation) */}
        {comparisonError && (
          <div
            style={{
              background: 'var(--bg-muted)',
              border: '2px solid var(--accent-red)',
              padding: '18px 20px',
              borderRadius: '4px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.94rem', marginBottom: '6px' }}>
              <AlertTriangle size={18} />
              <span>COMPANY NOT FOUND ON NSE / BSE</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', maxWidth: '640px', margin: '0 auto' }}>
              {comparisonError}. Strictly genuine market data is enforced: please enter a valid Indian listed company (e.g. Dixon, Fluorochem, Suzlon, Tata Motors, Reliance) or financial instrument (e.g. Bank FD, Gold, Liquid Fund).
            </p>
          </div>
        )}

        {/* =========================================================================
            COMPARISON REPORT RESULTS
            ========================================================================= */}
        {!comparisonError && items.length >= 2 && (
          <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border-strong)', padding: '22px', borderRadius: '4px' }}>
            {/* 1. Side-by-Side Contenders Overview */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${items.length}, 1fr)`,
                gap: '16px',
                borderBottom: '2px solid var(--border-strong)',
                paddingBottom: '20px',
                marginBottom: '24px',
              }}
            >
              {items.map((item, idx) => (
                <div key={idx} style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    OPTION {String.fromCharCode(65 + idx)} • {item.type}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 800, margin: '4px 0 8px 0' }}>
                    {item.name}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 900, color: 'var(--ink-primary)' }}>
                    {item.currentPrice}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--ink-muted)', marginTop: '2px' }}>
                    Risk: <strong>{item.riskProfile}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Side-by-Side Historical Returns Comparison Matrix */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--accent-blue)',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <TrendingUp size={15} />
                <span>HISTORICAL RETURNS COMPARISON MATRIX</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-muted)', borderBottom: '2px solid var(--border-strong)' }}>
                      <th style={{ textAlign: 'left', padding: '10px 14px' }}>TIME HORIZON</th>
                      {items.map((item, idx) => (
                        <th key={idx} style={{ textAlign: 'right', padding: '10px 14px' }}>
                          {item.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Past 6 Months Return</td>
                      {items.map((item, idx) => (
                        <td key={idx} style={{ textAlign: 'right', padding: '10px 14px', fontWeight: 800, color: 'var(--accent-green)' }}>
                          {item.returns.sixMonths}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Past 1 Year Return</td>
                      {items.map((item, idx) => (
                        <td key={idx} style={{ textAlign: 'right', padding: '10px 14px', fontWeight: 800, color: 'var(--accent-green)' }}>
                          {item.returns.oneYear}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Past 3 Years (CAGR)</td>
                      {items.map((item, idx) => (
                        <td key={idx} style={{ textAlign: 'right', padding: '10px 14px', fontWeight: 800, color: 'var(--accent-green)' }}>
                          {item.returns.threeYears}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '10px 14px', fontWeight: 700 }}>Past 5 Years (CAGR)</td>
                      {items.map((item, idx) => (
                        <td key={idx} style={{ textAlign: 'right', padding: '10px 14px', fontWeight: 800, color: 'var(--accent-green)' }}>
                          {item.returns.fiveYears}
                        </td>
                      ))}
                    </tr>
                    <tr style={{ background: 'rgba(16, 185, 129, 0.05)', fontWeight: 900 }}>
                      <td style={{ padding: '12px 14px' }}>Growth of ₹1,00,000 in 5 Years</td>
                      {items.map((item, idx) => (
                        <td key={idx} style={{ textAlign: 'right', padding: '12px 14px', fontSize: '0.92rem', color: 'var(--accent-green)' }}>
                          {item.returns.fiveYearGrowthOf1Lakh}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. CORPORATE CROSS-HOLDINGS: WHO INVESTED IN WHO ("Who has invested in this, and who this is investing in") */}
            <div style={{ marginBottom: '28px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--accent-red)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Building2 size={15} />
                <span>CROSS-HOLDINGS & STRATEGIC INVESTMENTS: WHO OWNS WHO</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '16px' }}>
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      borderTop: '3px solid var(--accent-red)',
                      padding: '16px',
                      borderRadius: '4px',
                    }}
                  >
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '12px' }}>
                      {item.name}
                    </h4>

                    {/* Section 1: Who Invested in This Company */}
                    <div style={{ marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-blue)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                        📥 Who Has Invested In This ({item.name.split(' ')[0]}):
                      </span>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                        {item.whoInvestedInThis.map((inv, iIdx) => (
                          <li key={iIdx} style={{ marginBottom: '4px' }}>
                            {inv}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Section 2: Who This Company Is Investing In */}
                    <div>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>
                        📤 Who This Company Is Investing In:
                      </span>
                      <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                        {item.whoThisIsInvestingIn.map((inv, iIdx) => (
                          <li key={iIdx} style={{ marginBottom: '4px' }}>
                            {inv}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Specifications & Rules Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '16px', marginBottom: '24px' }}>
              {items.map((item, idx) => (
                <div key={idx} style={{ background: 'var(--bg-muted)', padding: '14px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>LIQUIDITY / LOCK-IN: </span>
                    <strong>{item.liquidity}</strong>
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>TAX RULES: </span>
                    <strong>{item.taxation}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--ink-muted)' }}>DIVIDEND / YIELD: </span>
                    <strong>{item.dividendYield}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* 5. AI COMPARISON MODEL VERDICT ("This is better than this when...") */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '2px dashed var(--border-strong)',
                padding: '20px',
                borderRadius: '4px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                <Sparkles size={16} />
                <span>AI COMPARISON MODEL VERDICT • WHICH IS BETTER AND WHEN?</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div style={{ background: 'var(--bg-muted)', padding: '10px 14px', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.7rem' }}>WEALTH COMPOUNDING WINNER</span>
                  <strong style={{ color: 'var(--accent-green)', fontSize: '0.95rem' }}>{verdict.wealthCreationLeader}</strong>
                </div>

                <div style={{ background: 'var(--bg-muted)', padding: '10px 14px', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.7rem' }}>CAPITAL SAFETY WINNER</span>
                  <strong style={{ color: 'var(--accent-blue)', fontSize: '0.95rem' }}>{verdict.capitalPreservationLeader}</strong>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem', color: 'var(--ink-primary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {verdict.nuancedTake}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
