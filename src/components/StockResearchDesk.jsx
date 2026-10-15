import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Star,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Sparkles,
  Zap,
} from 'lucide-react';
import { generateStockDossier } from '../data/researchDatabase';
import { searchIndianStocks } from '../data/indianMarketDirectory';
import { fetchStockSpecificNews } from '../services/newsService';

export function StockResearchDesk({ onShareToast, onAddToWatchlist, watchlist = [] }) {
  const [searchQuery, setSearchQuery] = useState('TATAMOTORS');
  const [selectedStock, setSelectedStock] = useState(() =>
    generateStockDossier('TATAMOTORS')
  );
  const [stockNews, setStockNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const quickPicks = [
    { label: 'Tata Motors', query: 'TATAMOTORS' },
    { label: 'Zomato', query: 'ZOMATO' },
    { label: 'Suzlon', query: 'SUZLON' },
    { label: 'IREDA', query: 'IREDA' },
    { label: 'Reliance', query: 'RELIANCE' },
    { label: 'HDFC Bank', query: 'HDFCBANK' },
    { label: 'ITC', query: 'ITC' },
    { label: 'HAL', query: 'HAL' },
    { label: 'CDSL', query: 'CDSL' },
    { label: 'SBI', query: 'SBIN' },
  ];

  // Fetch stock-specific news whenever selected stock changes
  useEffect(() => {
    let active = true;
    if (selectedStock?.symbol) {
      setIsLoadingNews(true);
      fetchStockSpecificNews(selectedStock.name || selectedStock.symbol).then((articles) => {
        if (active) {
          setStockNews(articles);
          setIsLoadingNews(false);
        }
      });
    }
    return () => {
      active = false;
    };
  }, [selectedStock?.symbol]);

  // Listen for cross-component stock research triggers (e.g. from Sidebar Watchlist)
  useEffect(() => {
    const handleTrigger = (e) => {
      const sym = e.detail?.symbol;
      if (sym) {
        setSearchQuery(sym);
        const dossier = generateStockDossier(sym);
        setSelectedStock(dossier);
      }
    };
    window.addEventListener('tfg_open_stock_research', handleTrigger);
    return () => window.removeEventListener('tfg_open_stock_research', handleTrigger);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    const dossier = generateStockDossier(searchQuery);
    setSelectedStock(dossier);
    setSuggestions([]);
  };

  const handleInputChange = (val) => {
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      setSuggestions(searchIndianStocks(val).slice(0, 6));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (stock) => {
    setSearchQuery(stock.symbol);
    const dossier = generateStockDossier(stock.symbol);
    setSelectedStock(dossier);
    setSuggestions([]);
  };

  const handleQuickPick = (query) => {
    setSearchQuery(query);
    const dossier = generateStockDossier(query);
    setSelectedStock(dossier);
    setSuggestions([]);
  };

  const isAlreadyInWatchlist = watchlist.some(
    (w) => w.symbol === selectedStock?.symbol
  );

  const handleAddCurrentToWatchlist = () => {
    if (!selectedStock || !onAddToWatchlist) return;
    onAddToWatchlist({
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      price: selectedStock.currentPrice,
      change: '+1.50%',
      up: true,
      sector: selectedStock.sector,
      sentiment: 'Tracked',
    });
  };

  const handleCopyReport = () => {
    if (!selectedStock) return;
    const text = `
=== ${selectedStock.name} (NSE: ${selectedStock.symbol}) 1-2 Year Intelligence Dossier ===
Current Price: ${selectedStock.currentPrice} | 1Y Return: ${selectedStock.oneYearReturn} | 2Y Return: ${selectedStock.twoYearReturn}
Sector: ${selectedStock.sector} | P/E: ${selectedStock.peRatio} | ROE: ${selectedStock.roe} | 52W: ${selectedStock.fiftyTwoWeekRange}
Market Cap: ${selectedStock.marketCap} | Sentiment: ${selectedStock.vibe}

TIMELINE (WHAT HAPPENED OVER THE PAST 1 TO 2 YEARS):
${selectedStock.timeline.map((t) => `• ${t.period}: ${t.title}\n  ${t.detail}`).join('\n')}

WHAT IS HAPPENING RIGHT NOW:
${selectedStock.whatIsHappeningNow}

PERFORMANCE & FINANCIAL HEALTH:
${selectedStock.howItIsPerforming}

THE BULL CASE:
${selectedStock.bullCase}

KEY RISKS & BEAR CASE:
${selectedStock.bearCase}

NO-NONSENSE EDITORIAL VERDICT:
"${selectedStock.noNonsenseVerdict}"
    `.trim();

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (onShareToast) onShareToast(`Dossier for ${selectedStock.symbol} copied to clipboard!`);
    }
  };

  return (
    <section className="stock-research-section" id="stock-research-desk" style={{ marginTop: '36px', marginBottom: '40px' }}>
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
            DALAL STREET RESEARCH TERMINAL • NSE & BSE
          </div>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2.1rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            1-to-2 Year Stock Intelligence Dossier
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-secondary)', maxWidth: '750px', margin: '4px auto 0 auto' }}>
            Search any Indian stock or company name. The intelligence terminal analyzes the complete 1-to-2 year chronicle: what happened, what is happening right now, how it is performing, and live news wires.
          </p>
        </div>

        {/* Search Bar & Auto-Complete Suggestions */}
        <div style={{ maxWidth: '720px', margin: '0 auto 24px auto', position: 'relative' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--ink-muted)' }} />
              <input
                type="text"
                placeholder="Search Indian stock (e.g. Tata Motors, Zomato, Suzlon, IREDA, Reliance, ITC, HAL)..."
                value={searchQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  border: '2px solid var(--border-strong)',
                  borderRadius: '4px',
                  background: 'var(--bg-input)',
                  color: 'var(--ink-primary)',
                  fontWeight: 600,
                  outline: 'none',
                }}
              />

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '105%',
                    left: 0,
                    right: 0,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '4px',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 20,
                    maxHeight: '240px',
                    overflowY: 'auto',
                  }}
                >
                  {suggestions.map((s) => (
                    <div
                      key={s.symbol}
                      onClick={() => handleSelectSuggestion(s)}
                      style={{
                        padding: '8px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div>
                        <strong>{s.symbol}</strong> — {s.name}
                        <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginLeft: '8px' }}>({s.sector})</span>
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-green)' }}>
                        {s.price}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" className="btn-newspaper btn-primary-dark" style={{ padding: '0 22px', fontSize: '0.85rem' }}>
              <span>Analyze Stock</span>
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>Popular Stocks:</span>
            {quickPicks.map((p) => (
              <button
                key={p.query}
                type="button"
                className="ticker-badge"
                style={{ fontSize: '0.75rem', padding: '3px 9px', cursor: 'pointer' }}
                onClick={() => handleQuickPick(p.query)}
              >
                {p.query}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stock Report Card */}
        {selectedStock && (
          <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border-strong)', padding: '22px', borderRadius: '4px' }}>
            {/* Top Stat Ribbon */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: '1px solid var(--border-light)',
                paddingBottom: '18px',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="ticker-badge" style={{ fontSize: '0.88rem', background: 'var(--border-strong)', color: 'var(--bg-card)' }}>
                    {selectedStock.symbol}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                    {selectedStock.exchange} • {selectedStock.sector}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800 }}>
                  {selectedStock.name}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--accent-red)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {selectedStock.vibe}
                </div>
              </div>

              {/* Price & Multi-Year Returns */}
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>CURRENT PRICE</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.7rem', fontWeight: 900 }}>
                    {selectedStock.currentPrice}
                  </div>
                </div>

                <div style={{ textAlign: 'right', background: 'var(--bg-card)', padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>1-YEAR RETURN</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    {selectedStock.oneYearReturn}
                  </div>
                </div>

                <div style={{ textAlign: 'right', background: 'var(--bg-card)', padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: '4px' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>2-YEAR RETURN</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    {selectedStock.twoYearReturn}
                  </div>
                </div>

                {/* Add to Watchlist Button */}
                <button
                  type="button"
                  className="btn-newspaper"
                  onClick={handleAddCurrentToWatchlist}
                  disabled={isAlreadyInWatchlist}
                  style={{
                    background: isAlreadyInWatchlist ? 'var(--bg-muted)' : 'var(--bg-card)',
                    cursor: isAlreadyInWatchlist ? 'default' : 'pointer',
                  }}
                  title={isAlreadyInWatchlist ? 'Already in your watchlist' : 'Add to your personal broadsheet radar'}
                >
                  <Star size={14} color={isAlreadyInWatchlist ? 'var(--accent-green)' : 'currentColor'} fill={isAlreadyInWatchlist ? 'var(--accent-green)' : 'none'} />
                  <span>{isAlreadyInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                </button>

                {/* Export Button */}
                <button className="btn-newspaper" onClick={handleCopyReport} title="Copy executive summary">
                  {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Export Dossier'}</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar in Rupees (₹) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '10px',
                background: 'var(--bg-muted)',
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '24px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>MARKET CAP</span>
                <strong>{selectedStock.marketCap}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>P/E RATIO</span>
                <strong>{selectedStock.peRatio}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>RETURN ON EQUITY (ROE)</span>
                <strong>{selectedStock.roe}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>52-WEEK RANGE</span>
                <strong>{selectedStock.fiftyTwoWeekRange}</strong>
              </div>
            </div>

            {/* Section A: 1-to-2 Year Chronological Timeline */}
            <div style={{ marginBottom: '26px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  color: 'var(--accent-red)',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Calendar size={14} />
                <span>CHRONICLE: WHAT HAPPENED OVER THE PAST 1 TO 2 YEARS</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedStock.timeline.map((step, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      borderLeft: '4px solid var(--border-strong)',
                      padding: '12px 16px',
                      borderRadius: '0 4px 4px 0',
                    }}
                  >
                    <div style={{ minWidth: '170px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-red)' }}>
                      {step.period}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
                        {step.title}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section B: What is Happening Right Now & How It is Performing */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-green)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={14} />
                  <span>What Is Happening Right Now</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-primary)', lineHeight: 1.55 }}>
                  {selectedStock.whatIsHappeningNow}
                </p>
              </div>

              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} />
                  <span>How Is It Performing & Financial Health</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-primary)', lineHeight: 1.55 }}>
                  {selectedStock.howItIsPerforming}
                </p>
              </div>
            </div>

            {/* Section C: Bull Case vs Bear Case */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid var(--accent-green)', padding: '14px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                  <ShieldCheck size={14} />
                  <span>THE BULL CASE</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                  {selectedStock.bullCase}
                </p>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid var(--accent-red)', padding: '14px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontWeight: 800, fontSize: '0.78rem', fontFamily: 'var(--font-mono)', marginBottom: '6px' }}>
                  <AlertTriangle size={14} />
                  <span>KEY RISK FACTORS / BEAR CASE</span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                  {selectedStock.bearCase}
                </p>
              </div>
            </div>

            {/* Section D: LIVE BREAKING NEWS WIRES FOR THIS STOCK */}
            <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border-light)', padding: '18px', borderRadius: '4px', marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--accent-blue)', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} />
                  <span>LATEST WIRE DISPATCHES: {selectedStock.name.toUpperCase()}</span>
                </div>
                {isLoadingNews && (
                  <span style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <RefreshCw size={11} className="spin-icon" />
                    Fetching multi-source wires...
                  </span>
                )}
              </div>

              {stockNews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {stockNews.map((news, nIdx) => (
                    <div
                      key={nIdx}
                      style={{
                        background: 'var(--bg-card)',
                        padding: '10px 14px',
                        borderRadius: '4px',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.35 }}>
                          {news.title}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', marginTop: '3px', fontFamily: 'var(--font-mono)' }}>
                          Wire: <strong>{news.source}</strong> • {news.pubDate}
                        </div>
                      </div>
                      <span className="ticker-badge" style={{ fontSize: '0.68rem', whiteSpace: 'nowrap' }}>
                        {selectedStock.symbol}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', fontStyle: 'italic', padding: '6px 0' }}>
                  {isLoadingNews ? 'Aggregating latest exchange filings and news...' : `Live exchange wire active. No abnormal filings or circuit limit alerts triggered for ${selectedStock.symbol} today.`}
                </div>
              )}
            </div>

            {/* Section E: No-Nonsense Verdict */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '2px dashed var(--border-strong)',
                padding: '16px 20px',
                borderRadius: '4px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', color: 'var(--ink-muted)', marginBottom: '4px' }}>
                EDITORIAL VERDICT
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.08rem', fontWeight: 700, color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                "{selectedStock.noNonsenseVerdict}"
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
