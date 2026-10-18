import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Scale,
  Clock,
  CheckCircle2,
  Layers,
  Info,
  Calendar,
  Landmark,
  Calculator,
  Search,
  Briefcase,
  AlertOctagon,
  Award,
  Filter,
  Loader2,
  X,
} from 'lucide-react';
import {
  wealthVehiclesCatalog,
  financialHistoryArchives,
} from '../data/wealthFundsData';
import { individualFundsCatalog } from '../data/individualFundsData';
import { searchMutualFundsLive, fetchMutualFundDetails } from '../services/mutualFundService';

export function WealthFundsComparator() {
  // Active view: 'dossiers' (Detailed first!) | 'matrix' | 'calculator' | 'history'
  const [activeTab, setActiveTab] = useState('dossiers');

  // Inside Dossiers: 'individual' (Specific schemes like HDFC Transportation) vs 'broad' (FD, SIP, LIC, PPF)
  const [dossierSubView, setDossierSubView] = useState('individual');

  // Filter & Search for individual funds (Curated + Live AMFI)
  const [individualCategoryFilter, setIndividualCategoryFilter] = useState('all');
  const [individualSearchQuery, setIndividualSearchQuery] = useState('');
  const [selectedIndividualFundId, setSelectedIndividualFundId] = useState('hdfc-transportation');
  const [activeIndividualFund, setActiveIndividualFund] = useState(individualFundsCatalog[0]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [liveFundSuggestions, setLiveFundSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Selected vehicles for active comparison matrix (default: 5 diverse vehicles)
  const [selectedIds, setSelectedIds] = useState([
    'bank-fd',
    'nifty-largecap',
    'nifty-midcap',
    'nifty-smallcap',
    'lic-traditional',
  ]);

  // Calculator state
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipYears, setSipYears] = useState(10);

  // Toggle selection for comparison matrix
  const handleToggleVehicle = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 1) return; // Keep at least one
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Preset Filters for matrix
  const handleSelectPreset = (type) => {
    if (type === 'all') {
      setSelectedIds(wealthVehiclesCatalog.map((v) => v.id));
    } else if (type === 'classic-trio') {
      setSelectedIds(['bank-fd', 'nifty-largecap', 'lic-traditional']);
    } else if (type === 'equity-spectrum') {
      setSelectedIds(['nifty-largecap', 'nifty-midcap', 'nifty-smallcap', 'flexi-cap']);
    } else if (type === 'debt-safety') {
      setSelectedIds(['bank-fd', 'ppf', 'liquid-fund']);
    } else if (type === 'gold-vs-market') {
      setSelectedIds(['nifty-largecap', 'sgb-gold', 'bank-fd']);
    } else if (type === 'insurance-reality') {
      setSelectedIds(['lic-traditional', 'term-plus-sip', 'nifty-largecap']);
    }
  };

  const selectedVehicles = useMemo(() => {
    return wealthVehiclesCatalog.filter((v) => selectedIds.includes(v.id));
  }, [selectedIds]);

  // Filtered individual funds (Curated 27 schemes)
  const filteredIndividualFunds = useMemo(() => {
    return individualFundsCatalog.filter((f) => {
      const cat = f.category.toLowerCase();
      const matchCat =
        individualCategoryFilter === 'all' ||
        (individualCategoryFilter === 'thematic' && cat.includes('thematic')) ||
        (individualCategoryFilter === 'flexi' && (cat.includes('flexi') || cat.includes('multi'))) ||
        (individualCategoryFilter === 'small-mid' && (cat.includes('small') || cat.includes('mid'))) ||
        (individualCategoryFilter === 'large-index' && (cat.includes('large') || cat.includes('index'))) ||
        (individualCategoryFilter === 'hybrid-tax' && (cat.includes('hybrid') || cat.includes('elss')));

      const q = individualSearchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.fundHouse.toLowerCase().includes(q) ||
        f.portfolioFocus.toLowerCase().includes(q) ||
        f.topHoldings.some((h) => h.name.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  }, [individualCategoryFilter, individualSearchQuery]);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live autocomplete search effect (debounced 220ms)
  useEffect(() => {
    const query = individualSearchQuery.trim();
    if (query.length < 2) {
      setLiveFundSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchMutualFundsLive(query);
        setLiveFundSuggestions(results);
        setIsDropdownOpen(results.length > 0);
      } catch (err) {
        setLiveFundSuggestions([]);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [individualSearchQuery]);

  // Quick switch from curated catalog chips
  const handleSelectFromCatalog = (fundId) => {
    setSelectedIndividualFundId(fundId);
    const fund = individualFundsCatalog.find((f) => f.id === fundId);
    if (fund) {
      setActiveIndividualFund(fund);
    }
  };

  // Select fund from search dropdown, chip, or popular list
  const handleSelectFund = async (fundOrId) => {
    setIsDropdownOpen(false);
    setIsSearchingLive(true);
    try {
      const target = typeof fundOrId === 'string' ? fundOrId : (fundOrId.id || fundOrId.name);
      const details = await fetchMutualFundDetails(target);
      setActiveIndividualFund(details);
      if (!details.notFound && details.id) {
        setSelectedIndividualFundId(details.id);
      }
    } catch {
      setActiveIndividualFund({
        notFound: true,
        query: typeof fundOrId === 'string' ? fundOrId : fundOrId?.name || '',
        message: 'Unable to retrieve fund details due to a network error.',
        suggestion: 'Please try again or select one of the verified funds below.',
        popularFunds: individualFundsCatalog.slice(0, 8),
      });
    } finally {
      setIsSearchingLive(false);
    }
  };

  // Submit search query (keyboard Enter or Search button)
  const handleSearchFundSubmit = async (e) => {
    if (e) e.preventDefault();
    const query = individualSearchQuery.trim();
    if (!query) return;

    setIsDropdownOpen(false);
    setIsSearchingLive(true);
    try {
      const details = await fetchMutualFundDetails(query);
      setActiveIndividualFund(details);
      if (!details.notFound && details.id) {
        setSelectedIndividualFundId(details.id);
      }
    } catch {
      setActiveIndividualFund({
        notFound: true,
        query: query,
        message: `No mutual fund found matching "${query}"`,
        suggestion: 'Please verify the fund name or fund house (e.g. HDFC Transportation, Quant Small Cap, Tata Digital, Parag Parikh Flexi Cap, Motilal Midcap, SBI Healthcare).',
        popularFunds: individualFundsCatalog.slice(0, 8),
      });
    } finally {
      setIsSearchingLive(false);
    }
  };

  // Helper for return styling (Red for minus, Green for plus, neutral for text)
  const renderValueBadge = (val) => {
    if (!val || val === 'N/A' || val === '-') {
      return <span style={{ color: 'var(--ink-muted)' }}>{val || 'N/A'}</span>;
    }
    const str = String(val).trim();
    const isNegative = str.startsWith('-') || /-\s*\d/.test(str);
    const isPositive = str.startsWith('+');

    if (isNegative) {
      return (
        <span style={{ color: 'var(--accent-red)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
          {str.startsWith('-') ? str : `-${str}`}
        </span>
      );
    }
    if (isPositive) {
      return (
        <span style={{ color: 'var(--accent-green)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
          {str}
        </span>
      );
    }
    return (
      <span style={{ color: 'var(--ink-primary)', fontWeight: 600 }}>
        {str}
      </span>
    );
  };

  // Compounding math helper
  const calculateCompoundSip = (monthlyAmt, ratePercent, years) => {
    const months = years * 12;
    const r = ratePercent / 100 / 12;
    const futureValue = monthlyAmt * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const invested = monthlyAmt * months;
    return {
      invested: Math.round(invested),
      futureValue: Math.round(futureValue),
      gain: Math.round(futureValue - invested),
    };
  };

  const formatRupees = (num) => {
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} Lakh`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  return (
    <section className="wealth-funds-comparator-section" id="funds-comparator" style={{ marginTop: '28px', marginBottom: '40px' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border-strong)',
          padding: '24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Header Banner */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border-strong)', paddingBottom: '18px', marginBottom: '22px' }}>
          <div className="section-meta-label" style={{ justifyContent: 'center', marginBottom: '6px' }}>
            STATUTORY DATA & HISTORICAL INTELLIGENCE • ALL-FUNDS COMPARATOR & SCHEME DOSSIERS
          </div>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2.15rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Comprehensive Funds & Wealth Vehicles Comparator
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.96rem', color: 'var(--ink-secondary)', maxWidth: '850px', margin: '4px auto 0 auto' }}>
            In-depth dossiers for individual real-world mutual funds (like HDFC Transportation & Logistics, HDFC Defence, Parag Parikh Flexi Cap), alongside historical statutory comparisons across Bank FDs, SIPs, Small/Mid/Large Caps, PPF, LIC, and Gold.
          </p>

          {/* Educational Disclaimer Notice */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-strong)',
              padding: '6px 14px',
              borderRadius: '3px',
              marginTop: '12px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-secondary)',
            }}
          >
            <Info size={14} style={{ color: 'var(--accent-blue)' }} />
            <span>STRICT HISTORICAL EVIDENCE: Zero buy/sell recommendations • Zero future prediction • Pure financial literacy & factual holdings.</span>
          </div>

          {/* Re-ordered View Switcher Tabs: Detailed Dossiers First, Then Compare Section! */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'dossiers' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('dossiers')}
              style={{ fontWeight: activeTab === 'dossiers' ? 900 : 600 }}
            >
              <Layers size={14} />
              <span>1. Detailed Scheme Dossiers & Individual Funds (First)</span>
            </button>
            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'matrix' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('matrix')}
              style={{ fontWeight: activeTab === 'matrix' ? 900 : 600 }}
            >
              <Scale size={14} />
              <span>2. Side-by-Side Comparison Matrix</span>
            </button>
            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'calculator' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('calculator')}
              style={{ fontWeight: activeTab === 'calculator' ? 900 : 600 }}
            >
              <Calculator size={14} />
              <span>3. Historical Compounding Simulator</span>
            </button>
            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'history' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('history')}
              style={{ fontWeight: activeTab === 'history' ? 900 : 600 }}
            >
              <Calendar size={14} />
              <span>4. Historical Schemes & News Archives (1990 - 2026)</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: DETAILED SCHEME DOSSIERS (DETAILED SECTION FIRST AS REQUESTED)
            Includes: Individual Mutual Fund Schemes (e.g. HDFC Transportation) + Broad Asset Dossiers
            ========================================================================= */}
        {activeTab === 'dossiers' && (
          <div>
            {/* Sub-View Switcher Inside Dossiers */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-muted)',
                padding: '12px 18px',
                borderRadius: '4px',
                border: '1px solid var(--border-strong)',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-primary)' }}>
                  SELECT DOSSIER PERSPECTIVE:
                </span>
                <button
                  type="button"
                  className={`btn-newspaper ${dossierSubView === 'individual' ? 'btn-primary-dark' : ''}`}
                  onClick={() => setDossierSubView('individual')}
                  style={{ fontSize: '0.76rem', padding: '5px 12px' }}
                >
                  <Briefcase size={13} />
                  <span>Individual Real-World Funds (e.g. HDFC Transportation)</span>
                </button>
                <button
                  type="button"
                  className={`btn-newspaper ${dossierSubView === 'broad' ? 'btn-primary-dark' : ''}`}
                  onClick={() => setDossierSubView('broad')}
                  style={{ fontSize: '0.76rem', padding: '5px 12px' }}
                >
                  <Landmark size={13} />
                  <span>Broad Asset Classes (FD, Nifty, LIC, PPF, Gold)</span>
                </button>
              </div>

              {dossierSubView === 'individual' && (
                <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-secondary)' }}>
                  Showing factual portfolios, SEBI mandates, and sector distributions
                </div>
              )}
            </div>

            {/* -------------------------------------------------------------------
                SUB-VIEW A: INDIVIDUAL REAL-WORLD MUTUAL FUND SCHEMES
                ------------------------------------------------------------------- */}
            {dossierSubView === 'individual' && (
              <div>
                {/* Search & Category Filter Bar */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                    padding: '12px 16px',
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                  }}
                >
                  {/* Category Filter Pills */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Filter size={13} style={{ color: 'var(--ink-muted)', marginRight: '2px' }} />
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-muted)' }}>
                      SCHEME TYPE:
                    </span>
                    {[
                      { id: 'all', label: 'All Schemes (27)' },
                      { id: 'thematic', label: 'Thematic / Sectoral' },
                      { id: 'flexi', label: 'Flexi & Multi Cap' },
                      { id: 'small-mid', label: 'Small & Mid Cap' },
                      { id: 'large-index', label: 'Large Cap & Index' },
                      { id: 'hybrid-tax', label: 'Hybrid & Tax Saver' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        type="button"
                        className="ticker-badge"
                        style={{
                          fontSize: '0.72rem',
                          padding: '4px 9px',
                          cursor: 'pointer',
                          background: individualCategoryFilter === btn.id ? 'var(--accent-red)' : 'transparent',
                          color: individualCategoryFilter === btn.id ? '#ffffff' : 'var(--ink-primary)',
                          border: individualCategoryFilter === btn.id ? '1px solid var(--accent-red)' : '1px solid var(--border-strong)',
                        }}
                        onClick={() => setIndividualCategoryFilter(btn.id)}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Form with Live AMFI API & Autocomplete */}
                  <form
                    onSubmit={handleSearchFundSubmit}
                    ref={searchContainerRef}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      flex: '1 1 340px',
                      maxWidth: '560px',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%' }}>
                      {isSearchingLive ? (
                        <Loader2
                          size={14}
                          style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--accent-red)',
                            animation: 'spin 1s linear infinite',
                          }}
                        />
                      ) : (
                        <Search
                          size={14}
                          style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--ink-muted)',
                          }}
                        />
                      )}
                      <input
                        type="text"
                        placeholder="Search any fund, AMC or theme (e.g. Tata Digital, Quant Small Cap, Parag Parikh)..."
                        value={individualSearchQuery}
                        onChange={(e) => setIndividualSearchQuery(e.target.value)}
                        onFocus={() => {
                          if (liveFundSuggestions.length > 0) setIsDropdownOpen(true);
                        }}
                        style={{
                          padding: '7px 30px 7px 32px',
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          border: '1px solid var(--border-strong)',
                          borderRadius: '3px',
                          background: 'var(--bg-card)',
                          color: 'var(--ink-primary)',
                          width: '100%',
                          boxSizing: 'border-box',
                        }}
                      />
                      {individualSearchQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setIndividualSearchQuery('');
                            setLiveFundSuggestions([]);
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--ink-muted)',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          title="Clear search"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-newspaper btn-primary-dark"
                      style={{
                        padding: '7px 14px',
                        fontSize: '0.76rem',
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                      }}
                      disabled={isSearchingLive}
                    >
                      {isSearchingLive ? 'SEARCHING...' : 'SEARCH FUND'}
                    </button>

                    {/* Live Autocomplete Dropdown */}
                    {isDropdownOpen && liveFundSuggestions.length > 0 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          right: 0,
                          background: 'var(--bg-page)',
                          border: '2px solid var(--border-strong)',
                          borderRadius: '4px',
                          boxShadow: 'var(--shadow-lg)',
                          zIndex: 100,
                          maxHeight: '340px',
                          overflowY: 'auto',
                        }}
                      >
                        <div
                          style={{
                            padding: '6px 12px',
                            background: 'var(--bg-muted)',
                            borderBottom: '1px solid var(--border-light)',
                            fontSize: '0.68rem',
                            fontFamily: 'var(--font-mono)',
                            fontWeight: 800,
                            color: 'var(--ink-muted)',
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>MATCHING SCHEMES ({liveFundSuggestions.length})</span>
                          <span>PRESS ENTER OR CLICK TO VIEW</span>
                        </div>
                        {liveFundSuggestions.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            onClick={() => handleSelectFund(item)}
                            style={{
                              padding: '9px 12px',
                              borderBottom: '1px solid var(--border-light)',
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              fontSize: '0.78rem',
                              fontFamily: 'var(--font-mono)',
                              transition: 'background 0.15s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-muted)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Briefcase size={14} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
                              <div>
                                <div style={{ fontWeight: 800, color: 'var(--ink-primary)' }}>{item.name}</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
                                  {item.fundHouse} • {item.category}
                                </div>
                              </div>
                            </div>
                            <span
                              className="ticker-badge"
                              style={{
                                fontSize: '0.65rem',
                                padding: '2px 6px',
                                background: item.isCurated ? 'rgba(34, 197, 94, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                                color: item.isCurated ? 'var(--accent-green)' : 'var(--accent-blue)',
                                border: item.isCurated ? '1px solid var(--accent-green)' : '1px solid var(--accent-blue)',
                              }}
                            >
                              {item.isCurated ? 'CURATED DOSSIER' : 'AMFI LIVE'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </form>
                </div>

                {/* Scheme Quick Switcher Chips */}
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '22px' }}>
                  {filteredIndividualFunds.map((fund) => {
                    const isSelected = fund.id === selectedIndividualFundId;
                    return (
                      <button
                        key={fund.id}
                        type="button"
                        onClick={() => handleSelectFromCatalog(fund.id)}
                        style={{
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '20px',
                          border: isSelected ? '2px solid var(--accent-red)' : '1px solid var(--border-strong)',
                          background: isSelected ? 'var(--bg-muted)' : 'var(--bg-page)',
                          color: isSelected ? 'var(--ink-primary)' : 'var(--ink-muted)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: isSelected ? 800 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          boxShadow: isSelected ? 'var(--shadow-sm)' : 'none',
                        }}
                      >
                        <span>{fund.name}</span>
                        {isSelected && <CheckCircle2 size={13} style={{ color: 'var(--accent-red)' }} />}
                      </button>
                    );
                  })}
                </div>

                {/* ACTIVE INDIVIDUAL FUND DEEP-DIVE DOSSIER CARD OR NO FUND FOUND NOTIFICATION */}
                {activeIndividualFund?.notFound ? (
                  <div
                    style={{
                      background: 'var(--bg-page)',
                      border: '2px solid var(--accent-red)',
                      borderRadius: '6px',
                      padding: '40px 24px',
                      boxShadow: 'var(--shadow-md)',
                      marginBottom: '28px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        background: 'rgba(239, 68, 68, 0.12)',
                        color: 'var(--accent-red)',
                        fontWeight: 900,
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        marginBottom: '16px',
                        border: '1px solid var(--accent-red)',
                      }}
                    >
                      <AlertOctagon size={16} />
                      <span>NO MUTUAL FUND FOUND</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.85rem',
                        fontWeight: 900,
                        margin: '0 0 10px 0',
                        color: 'var(--ink-primary)',
                      }}
                    >
                      No Matching Scheme for &ldquo;{activeIndividualFund.query || individualSearchQuery || 'Search'}&rdquo;
                    </h3>

                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: 'var(--ink-secondary)',
                        maxWidth: '680px',
                        margin: '0 auto 24px auto',
                        lineHeight: '1.6',
                      }}
                    >
                      We queried our comprehensive 27 verified Indian funds catalog and scanned the real-time AMFI (Association of Mutual Funds in India) database. No registered scheme matched this query.
                    </p>

                    {/* Suggestions Box */}
                    <div
                      style={{
                        maxWidth: '620px',
                        margin: '0 auto 28px auto',
                        background: 'var(--bg-muted)',
                        border: '1px solid var(--border-light)',
                        borderRadius: '4px',
                        padding: '16px 20px',
                        textAlign: 'left',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--ink-secondary)',
                      }}
                    >
                      <div style={{ fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <HelpCircle size={15} style={{ color: 'var(--accent-blue)' }} />
                        <span>SEARCH GUIDELINES & SUGGESTIONS:</span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
                        <li>Check the spelling of the fund or asset management company (AMC).</li>
                        <li>Search by fund house name: <strong>HDFC, SBI, ICICI Prudential, Nippon, Quant, Tata, Kotak, Parag Parikh, Motilal Oswal</strong>.</li>
                        <li>Search by category or keyword: <em>Defence</em>, <em>Transportation</em>, <em>Digital</em>, <em>Small Cap</em>, <em>Mid Cap</em>, <em>Nifty 50</em>.</li>
                      </ul>
                    </div>

                    {/* Popular Funds Recovery Buttons */}
                    <div>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          color: 'var(--ink-muted)',
                          marginBottom: '12px',
                        }}
                      >
                        EXPLORE POPULAR VERIFIED INDIAN FUNDS (ONE-CLICK LOAD):
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          maxWidth: '900px',
                          margin: '0 auto',
                        }}
                      >
                        {(activeIndividualFund.popularFunds || individualFundsCatalog.slice(0, 8)).map((pf) => (
                          <button
                            key={pf.id}
                            type="button"
                            className="btn-newspaper"
                            onClick={() => handleSelectFund(pf.id)}
                            style={{
                              fontSize: '0.76rem',
                              padding: '7px 13px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontFamily: 'var(--font-mono)',
                              cursor: 'pointer',
                            }}
                          >
                            <span>{pf.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : activeIndividualFund ? (
                  <div
                    style={{
                      background: 'var(--bg-page)',
                      border: '2px solid var(--border-strong)',
                      borderRadius: '4px',
                      padding: '24px',
                      boxShadow: 'var(--shadow-md)',
                      marginBottom: '28px',
                    }}
                  >
                    {/* Fund Banner */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderBottom: '2px solid var(--border-strong)',
                        paddingBottom: '16px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                          <span className={`ticker-badge ${activeIndividualFund.badgeClass}`} style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                            {activeIndividualFund.badge}
                          </span>
                          <span style={{ fontSize: '0.76rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                            • {activeIndividualFund.fundHouse}
                          </span>
                        </div>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 900, margin: '0 0 4px 0', letterSpacing: '-0.01em' }}>
                          {activeIndividualFund.name}
                        </h3>
                        <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-secondary)' }}>
                          Benchmark Index: <strong>{activeIndividualFund.benchmark}</strong> | Inception: {activeIndividualFund.inceptionDate} | Manager: {activeIndividualFund.fundManager}
                        </div>
                      </div>

                      {/* Quick Snapshot Metrics */}
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', textAlign: 'right' }}>
                        {activeIndividualFund.currentNav && (
                          <div style={{ background: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '3px', border: '1px solid var(--border-light)' }}>
                            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>LIVE AMFI NAV</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)' }}>
                              {activeIndividualFund.currentNav}
                            </div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--ink-muted)' }}>{activeIndividualFund.latestNavDate || 'AMFI Live'}</div>
                          </div>
                        )}
                        <div style={{ background: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '3px', border: '1px solid var(--border-light)' }}>
                          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>FUND AUM</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--ink-primary)' }}>
                            {activeIndividualFund.aum}
                          </div>
                        </div>
                        <div style={{ background: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '3px', border: '1px solid var(--border-light)' }}>
                          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>DIRECT EXPENSE RATIO</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
                            {activeIndividualFund.expenseRatioDirect}
                          </div>
                          <div style={{ fontSize: '0.62rem', color: 'var(--ink-muted)' }}>Regular: {activeIndividualFund.expenseRatioRegular}</div>
                        </div>
                        <div style={{ background: 'var(--bg-muted)', padding: '8px 12px', borderRadius: '3px', border: '1px solid var(--border-light)' }}>
                          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>1Y RETURN</div>
                          <div style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                            {renderValueBadge(activeIndividualFund.historical1Y)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TWO EXPLANATORY SECTIONS: WHAT IS IT & HOW IT WORKS */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', marginBottom: '22px' }}>
                      {/* What is it? */}
                      <div
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-strong)',
                          borderLeft: '4px solid var(--accent-red)',
                          padding: '16px',
                          borderRadius: '3px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <HelpCircle size={15} style={{ color: 'var(--accent-red)' }} />
                          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>
                            What Exactly Is This Fund?
                          </h4>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: '1.6', margin: 0 }}>
                          {activeIndividualFund.whatIsIt}
                        </p>
                      </div>

                      {/* How does it work? */}
                      <div
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-strong)',
                          borderLeft: '4px solid var(--accent-blue)',
                          padding: '16px',
                          borderRadius: '3px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                          <TrendingUp size={15} style={{ color: 'var(--accent-blue)' }} />
                          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>
                            How Does It Work & Why Do People Invest?
                          </h4>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', lineHeight: '1.6', margin: 0 }}>
                          {activeIndividualFund.howItWorks}
                        </p>
                      </div>
                    </div>

                    {/* HOLDINGS & SECTOR ALLOCATION BREAKDOWN */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '22px' }}>
                      {/* Top Stock Holdings */}
                      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-primary)' }}>
                            TOP PORTFOLIO HOLDINGS (UNDERLYING ASSETS):
                          </div>
                          <span style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                            PORTFOLIO WEIGHT
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {activeIndividualFund.topHoldings.map((h, hIdx) => (
                            <div
                              key={hIdx}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 10px',
                                background: 'var(--bg-page)',
                                border: '1px solid var(--border-light)',
                                borderRadius: '3px',
                                fontSize: '0.78rem',
                                fontFamily: 'var(--font-mono)',
                              }}
                            >
                              <div>
                                <span style={{ fontWeight: 800, color: 'var(--ink-primary)' }}>{h.name}</span>
                                <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--ink-muted)' }}>{h.sector}</span>
                              </div>
                              <span style={{ fontWeight: 900, color: 'var(--accent-red)', fontSize: '0.86rem' }}>
                                {h.allocation}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sector Allocations & Operational Mandates */}
                      <div>
                        {/* Sector Breakdown */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '16px', borderRadius: '4px', marginBottom: '14px' }}>
                          <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '12px' }}>
                            SECTOR ALLOCATION DYNAMICS:
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {activeIndividualFund.sectorAllocation.map((s, sIdx) => (
                              <div key={sIdx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', marginBottom: '3px' }}>
                                  <span>{s.sector}</span>
                                  <strong>{s.weight}</strong>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: 'var(--bg-muted)', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div
                                    style={{
                                      width: s.weight,
                                      height: '100%',
                                      background: sIdx === 0 ? 'var(--accent-red)' : sIdx === 1 ? 'var(--accent-blue)' : 'var(--ink-muted)',
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Operational Rules (Exit Load, Volatility, SIP) */}
                        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <div>
                              <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.66rem' }}>MINIMUM SIP:</span>
                              <strong>{activeIndividualFund.minSip}</strong>
                            </div>
                            <div>
                              <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.66rem' }}>EXIT LOAD RULE:</span>
                              <strong>{activeIndividualFund.exitLoad}</strong>
                            </div>
                            <div style={{ gridColumn: 'span 2', borderTop: '1px dashed var(--border-light)', paddingTop: '6px' }}>
                              <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.66rem' }}>VOLATILITY & DRAWDOWN RISK:</span>
                              <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>{activeIndividualFund.volatilityDrawdown}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STATUTORY RISK WARNING & WHO IT IS FOR */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                      <div
                        style={{
                          background: 'rgba(239, 68, 68, 0.08)',
                          border: '1px solid var(--accent-red)',
                          padding: '12px 16px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-red)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                          <AlertOctagon size={15} />
                          <span>STATUTORY THEMATIC & CONCENTRATION RISK WARNING:</span>
                        </div>
                        <span style={{ color: 'var(--ink-secondary)' }}>{activeIndividualFund.thematicWarning}</span>
                      </div>

                      <div
                        style={{
                          background: 'rgba(34, 197, 94, 0.08)',
                          border: '1px solid var(--accent-green)',
                          padding: '12px 16px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          lineHeight: '1.5',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 800, fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                          <Award size={15} />
                          <span>INVESTOR SUITABILITY (WHO IS THIS BEST FOR?):</span>
                        </div>
                        <span style={{ color: 'var(--ink-secondary)' }}>{activeIndividualFund.bestFor}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* -------------------------------------------------------------------
                SUB-VIEW B: BROAD ASSET CLASS DOSSIERS (FD, Nifty, PPF, LIC, Gold)
                ------------------------------------------------------------------- */}
            {dossierSubView === 'broad' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                {wealthVehiclesCatalog.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      background: 'var(--bg-page)',
                      border: '1px solid var(--border-strong)',
                      borderRadius: '4px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                          {v.badge}
                        </span>
                        <span style={{ fontSize: '1.4rem' }}>{v.icon}</span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                        {v.name}
                      </h3>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginBottom: '14px', fontFamily: 'var(--font-mono)' }}>
                        Providers: {v.providerExample}
                      </div>

                      <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {v.description}
                      </p>

                      {/* Key Metrics Grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '8px',
                          background: 'var(--bg-card)',
                          padding: '12px',
                          borderRadius: '4px',
                          marginBottom: '16px',
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <div>
                          <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>5Y HISTORICAL CAGR</span>
                          <strong>{renderValueBadge(v.historical5Y)}</strong>
                        </div>
                        <div>
                          <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>10Y HISTORICAL CAGR</span>
                          <strong>{renderValueBadge(v.historical10Y)}</strong>
                        </div>
                        <div style={{ gridColumn: 'span 2', borderTop: '1px dashed var(--border-light)', paddingTop: '6px' }}>
                          <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>REAL POST-INFLATION</span>
                          <span style={{ color: 'var(--accent-blue)', fontWeight: 700 }}>{v.realReturnPostInflation}</span>
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div style={{ marginBottom: '14px' }}>
                        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '4px' }}>
                          HISTORICAL STRENGTHS:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>
                          {v.pros.map((p, idx) => (
                            <li key={idx} style={{ marginBottom: '3px' }}>{p}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '4px' }}>
                          VULNERABILITIES & GOTCHAS:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>
                          {v.cons.map((c, idx) => (
                            <li key={idx} style={{ marginBottom: '3px' }}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Historical Lesson Note */}
                    <div
                      style={{
                        background: 'var(--bg-muted)',
                        borderLeft: '3px solid var(--accent-red)',
                        padding: '8px 12px',
                        fontSize: '0.75rem',
                        color: 'var(--ink-secondary)',
                        fontStyle: 'italic',
                      }}
                    >
                      <strong>Past Reality: </strong>{v.historicalNote}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 2: SIDE-BY-SIDE HISTORICAL COMPARISON MATRIX (EXPANDED COMPARISON)
            Includes 21 deep attributes: Volatility, Drawdowns, Benchmark, Lock-in,
            15Y Compounding, Taxation, Inflation hedge rating, Suitability
            ========================================================================= */}
        {activeTab === 'matrix' && (
          <div>
            {/* Vehicle Selector Pills & Presets */}
            <div style={{ background: 'var(--bg-muted)', padding: '16px', borderRadius: '4px', marginBottom: '22px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-primary)' }}>
                  SELECT VEHICLES TO COMPARE ({selectedVehicles.length} of {wealthVehiclesCatalog.length} ACTIVE):
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="ticker-badge"
                    style={{ fontSize: '0.7rem', padding: '3px 8px', cursor: 'pointer' }}
                    onClick={() => handleSelectPreset('all')}
                  >
                    All 10 Vehicles
                  </button>
                  <button
                    type="button"
                    className="ticker-badge"
                    style={{ fontSize: '0.7rem', padding: '3px 8px', cursor: 'pointer' }}
                    onClick={() => handleSelectPreset('classic-trio')}
                  >
                    FD vs Nifty vs LIC
                  </button>
                  <button
                    type="button"
                    className="ticker-badge"
                    style={{ fontSize: '0.7rem', padding: '3px 8px', cursor: 'pointer' }}
                    onClick={() => handleSelectPreset('equity-spectrum')}
                  >
                    Large vs Mid vs Small vs Flexi
                  </button>
                  <button
                    type="button"
                    className="ticker-badge"
                    style={{ fontSize: '0.7rem', padding: '3px 8px', cursor: 'pointer' }}
                    onClick={() => handleSelectPreset('debt-safety')}
                  >
                    Guaranteed: FD vs PPF vs Liquid
                  </button>
                  <button
                    type="button"
                    className="ticker-badge"
                    style={{ fontSize: '0.7rem', padding: '3px 8px', cursor: 'pointer' }}
                    onClick={() => handleSelectPreset('insurance-reality')}
                  >
                    LIC vs Term+SIP
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {wealthVehiclesCatalog.map((v) => {
                  const isSelected = selectedIds.includes(v.id);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleToggleVehicle(v.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: isSelected ? '2px solid var(--accent-red)' : '1px solid var(--border-strong)',
                        background: isSelected ? 'var(--bg-page)' : 'transparent',
                        color: isSelected ? 'var(--ink-primary)' : 'var(--ink-muted)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: isSelected ? 800 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{v.icon}</span>
                      <span>{v.name}</span>
                      {isSelected && <CheckCircle2 size={13} style={{ color: 'var(--accent-red)' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Matrix Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-muted)', borderBottom: '2px solid var(--border-strong)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 14px', width: '220px', position: 'sticky', left: 0, background: 'var(--bg-muted)', zIndex: 2 }}>
                      WEALTH ATTRIBUTE / HORIZON
                    </th>
                    {selectedVehicles.map((v) => (
                      <th key={v.id} style={{ textAlign: 'left', padding: '12px 14px', minWidth: '190px', borderLeft: '1px solid var(--border-light)' }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--accent-red)', fontWeight: 800 }}>
                          {v.category.toUpperCase()}
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 900, fontFamily: 'var(--font-serif)', marginTop: '2px' }}>
                          {v.icon} {v.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* 1. Risk Level */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Risk Profile & Capital Safety
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.76rem' }}>
                        {v.riskLevel}
                      </td>
                    ))}
                  </tr>

                  {/* 2. Past 1 Year Return */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Past 1 Year Return
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.88rem' }}>
                        {renderValueBadge(v.historical1Y)}
                      </td>
                    ))}
                  </tr>

                  {/* 3. Past 3 Years CAGR */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Past 3 Years (CAGR)
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.88rem' }}>
                        {renderValueBadge(v.historical3Y)}
                      </td>
                    ))}
                  </tr>

                  {/* 4. Past 5 Years CAGR */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Past 5 Years (CAGR)
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.88rem' }}>
                        {renderValueBadge(v.historical5Y)}
                      </td>
                    ))}
                  </tr>

                  {/* 5. Past 10 Years CAGR */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Past 10 Years (CAGR)
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.88rem' }}>
                        {renderValueBadge(v.historical10Y)}
                      </td>
                    ))}
                  </tr>

                  {/* 6. Real Return Post-Inflation */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-muted)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-muted)', color: 'var(--accent-red)' }}>
                      Real Post-Inflation & Post-Tax Drag
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.76rem', fontWeight: 700 }}>
                        {v.realReturnPostInflation}
                      </td>
                    ))}
                  </tr>

                  {/* 7. NEW: Volatility & Max Historical Drawdown */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Volatility & Max Drawdown History
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.74rem' }}>
                        {v.volatilityDrawdown || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* 8. NEW: Regulatory Benchmark Index */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Standard Regulatory Benchmark
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.74rem' }}>
                        {v.benchmarkIndex || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* 9. NEW: Minimum Recommended Holding Horizon */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-muted)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-muted)', color: 'var(--ink-primary)' }}>
                      Min Recommended Horizon
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.76rem', fontWeight: 800 }}>
                        {v.recommendedMinHorizon || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* 10. NEW: Inflation Protection Rating */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Inflation Protection Rating
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.75rem' }}>
                        {v.inflationProtectionRating || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* 11. Growth of ₹1 Lakh Lump Sum in 5 Years */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      ₹1 Lakh Lump Sum → 5 Years
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontWeight: 800 }}>
                        {v.growthLumpSum5Y}
                      </td>
                    ))}
                  </tr>

                  {/* 12. Growth of ₹1 Lakh Lump Sum in 10 Years */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      ₹1 Lakh Lump Sum → 10 Years
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontWeight: 800 }}>
                        {v.growthLumpSum10Y}
                      </td>
                    ))}
                  </tr>

                  {/* 13. NEW: Growth of ₹1 Lakh Lump Sum in 15 Years */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      ₹1 Lakh Lump Sum → 15 Years
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontWeight: 800, color: 'var(--accent-green)' }}>
                        {v.growthLumpSum15Y || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* 14. Growth of ₹10,000/mo SIP in 10 Years */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-muted)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-muted)', color: 'var(--accent-blue)' }}>
                      ₹10k/mo SIP → 10Y (₹12L Put In)
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontWeight: 900, color: 'var(--accent-blue)' }}>
                        {v.growthSip10Y}
                      </td>
                    ))}
                  </tr>

                  {/* 15. NEW: Growth of ₹10,000/mo SIP in 15 Years */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-muted)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-muted)', color: 'var(--accent-red)' }}>
                      ₹10k/mo SIP → 15Y (₹18L Put In)
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontWeight: 900, color: 'var(--accent-red)' }}>
                        {v.growthSip15Y || 'N/A'}
                      </td>
                    ))}
                  </tr>

                  {/* 16. Lock-in Period */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Lock-In Period & Pre-Closure Rules
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.76rem' }}>
                        {v.lockIn}
                      </td>
                    ))}
                  </tr>

                  {/* 17. NEW: Exit Load & Redemption Penalties */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Exit Load & Redemption Penalties
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.75rem' }}>
                        {v.exitLoad || 'Nil'}
                      </td>
                    ))}
                  </tr>

                  {/* 18. Liquidity */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Liquidity / Payout Speed
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.76rem' }}>
                        {v.liquidity}
                      </td>
                    ))}
                  </tr>

                  {/* 19. Taxation */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Statutory Taxation (Budget 2024)
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.75rem', lineHeight: '1.4' }}>
                        {v.taxation}
                      </td>
                    ))}
                  </tr>

                  {/* 20. Expense Ratio / Cost Drag */}
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-card)' }}>
                      Expense Ratio / Fee Drag
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.75rem' }}>
                        {v.costDrag}
                      </td>
                    ))}
                  </tr>

                  {/* 21. NEW: Ideal Investor Profile & Suitability */}
                  <tr style={{ borderBottom: '1px solid var(--border-strong)', background: 'var(--bg-muted)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 800, position: 'sticky', left: 0, background: 'var(--bg-muted)', color: 'var(--ink-primary)' }}>
                      Ideal Investor Profile & Purpose
                    </td>
                    {selectedVehicles.map((v) => (
                      <td key={v.id} style={{ padding: '10px 14px', borderLeft: '1px solid var(--border-light)', fontSize: '0.74rem', lineHeight: '1.45' }}>
                        {v.idealSuitability || v.description}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: HISTORICAL COMPOUNDING SIMULATOR (MATHEMATICAL REALITY)
            ========================================================================= */}
        {activeTab === 'calculator' && (
          <div>
            <div style={{ maxWidth: '800px', margin: '0 auto 28px auto', background: 'var(--bg-page)', padding: '20px', borderRadius: '4px', border: '1px solid var(--border-strong)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Calculator size={18} style={{ color: 'var(--accent-red)' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                  Past Compounding Simulator (No Speculation • Pure Math)
                </h3>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', marginBottom: '20px' }}>
                Calculate how ₹10,000 invested monthly would have mathematically grown across Bank FD (6.8%), PPF (7.1%), Nifty 50 Largecap (13.6%), Nifty Midcap (18.2%), and Traditional LIC (5.2%) based on verified 10-year historical CAGRs.
              </p>

              {/* Sliders */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '6px' }}>
                    <span>Monthly Investment:</span>
                    <strong style={{ color: 'var(--accent-red)' }}>₹{sipMonthly.toLocaleString('en-IN')}/mo</strong>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '6px' }}>
                    <span>Investment Horizon:</span>
                    <strong style={{ color: 'var(--accent-red)' }}>{sipYears} Years ({sipYears * 12} Installments)</strong>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>3 Years</span>
                    <span>15 Years</span>
                    <span>25 Years</span>
                  </div>
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', background: 'var(--bg-muted)', padding: '10px 14px', borderRadius: '4px', textAlign: 'center' }}>
                Total Capital Invested from Your Pocket: <strong>{formatRupees(sipMonthly * sipYears * 12)}</strong>
              </div>
            </div>

            {/* Results Grid across 6 Instruments */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { name: 'Traditional LIC / Endowment', rate: 5.2, type: 'Insurance-Investment Hybrid', note: 'Loses to inflation post-tax' },
                { name: 'Bank Fixed Deposit (FD)', rate: 6.8, type: 'Guaranteed Bank Debt', note: 'Fully taxable at income slab' },
                { name: 'Public Provident Fund (PPF)', rate: 7.1, type: '100% Tax-Free Sovereign', note: 'EEE status (zero tax)' },
                { name: 'Sovereign Gold Bond (SGB)', rate: 11.8, type: 'Commodity Appreciation', note: 'Gold + 2.5% p.a. interest' },
                { name: 'Nifty 50 Large Cap Index', rate: 13.6, type: 'Passive Equity Bluechip', note: '12.5% LTCG above ₹1.25L' },
                { name: 'Nifty Midcap 150 Fund', rate: 18.2, type: 'High Alpha Growth', note: 'Requires enduring 25% drawdowns' },
              ].map((item, idx) => {
                const res = calculateCompoundSip(sipMonthly, item.rate, sipYears);
                const isTop = item.rate >= 13;

                return (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-card)',
                      border: isTop ? '2px solid var(--accent-red)' : '1px solid var(--border-light)',
                      borderRadius: '4px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="ticker-badge" style={{ fontSize: '0.66rem', padding: '2px 6px' }}>
                        {item.type}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                        {item.rate}% CAGR BASELINE
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 2px 0' }}>
                      {item.name}
                    </h4>
                    <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginBottom: '12px' }}>
                      {item.type}
                    </div>

                    <div style={{ background: 'var(--bg-page)', padding: '10px', borderRadius: '4px', marginBottom: '10px', fontFamily: 'var(--font-mono)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>FINAL ACCUMULATED CORPUS:</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: isTop ? 'var(--accent-green)' : 'var(--ink-primary)' }}>
                        {formatRupees(res.futureValue)}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--ink-secondary)', marginTop: '2px' }}>
                        Wealth Generated: <strong style={{ color: 'var(--accent-green)' }}>+{formatRupees(res.gain)}</strong>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)', fontStyle: 'italic' }}>
                      Note: {item.note}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: HISTORICAL SCHEMES & NEWS ARCHIVES (1990 - 2026)
            ========================================================================= */}
        {activeTab === 'history' && (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 24px auto' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>
                Chronicles of Indian Savings & Regulatory Evolution
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
                How interest rates, banking schemes, SEBI regulations, and insurance policies evolved across four key decades in modern India.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              {financialHistoryArchives.map((era, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border-strong)',
                    borderTop: '3px solid var(--accent-red)',
                    padding: '18px',
                    borderRadius: '4px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                      ERA: {era.era}
                    </span>
                    <Clock size={14} style={{ color: 'var(--ink-muted)' }} />
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 800, margin: '0 0 12px 0' }}>
                    {era.title}
                  </h4>

                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--ink-secondary)', lineHeight: '1.55' }}>
                    {era.events.map((ev, evIdx) => (
                      <li key={evIdx} style={{ marginBottom: '8px' }}>
                        {ev}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default WealthFundsComparator;
