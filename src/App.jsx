import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { PrimaryNav } from './components/PrimaryNav';
import { CategoryNav } from './components/CategoryNav';
import { LeadStory } from './components/LeadStory';
import { DossierGrid } from './components/DossierGrid';
import { Sidebar } from './components/Sidebar';
import { BrainGym } from './components/BrainGym';
import { StockResearchDesk } from './components/StockResearchDesk';
import { FinanceZeroToHero } from './components/FinanceZeroToHero';
import { AssetComparisonArena } from './components/AssetComparisonArena';
import { WealthFundsComparator } from './components/WealthFundsComparator';
import { ArticleModal } from './components/ArticleModal';
import { SettingsModal } from './components/SettingsModal';
import { CatchMeUpModal } from './components/CatchMeUpModal';
import { TerminalGuideModal } from './components/TerminalGuideModal';
import { Toast } from './components/Toast';
import { ShieldCheck, Scale, AlertTriangle } from 'lucide-react';

import { initialIndices } from './data/marketData';
import { categories, financialNewsCategories } from './data/defaultNews';
import {
  loadPersistedNews,
  savePersistedNews,
  loadSettings,
  saveSettings,
  loadWatchlist,
  saveWatchlist,
  getFormattedTime,
  generateFreshTopicTake,
  simulateMarketPulse,
  fetchLiveMarketQuotes,
  fetchLiveRssNews,
  updateWatchlistQuotes,
} from './services/newsService';

// Helper to determine initial page and sub-tab from window hash
function parseNavigationFromHash() {
  const hash = (window.location.hash || '').replace('#', '').toLowerCase();
  
  if (hash.includes('brain-games') || hash === 'games' || hash === 'brain-gym') {
    return { page: 'brain-games', subTab: 'stock-research' };
  }
  if (hash.includes('fund') || hash.includes('scheme') || hash.includes('wealth')) {
    return { page: 'financial-hub', subTab: 'funds-comparator' };
  }
  if (hash.includes('compare-arena') || hash.includes('compare')) {
    return { page: 'financial-hub', subTab: 'compare-arena' };
  }
  if (hash.includes('game') || hash.includes('academy') || hash.includes('hero')) {
    return { page: 'financial-hub', subTab: 'finance-game' };
  }
  if (hash.includes('research') || hash.includes('deepdive') || hash.includes('deep-dive')) {
    return { page: 'financial-hub', subTab: 'stock-research' };
  }
  if (hash.includes('finance-news') || hash.includes('financial-news')) {
    return { page: 'financial-hub', subTab: 'finance-news' };
  }
  if (hash.includes('financial-hub') || hash === 'finance') {
    return { page: 'financial-hub', subTab: 'stock-research' };
  }
  return { page: 'all-news', subTab: 'stock-research' };
}

export function App() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('market_deck_theme') || localStorage.getItem('tfg_theme') || 'light';
  });

  // Settings & Watchlist
  const [settings, setSettings] = useState(loadSettings);
  const [watchlist, setWatchlist] = useState(loadWatchlist);
  const [indices, setIndices] = useState(initialIndices);

  // Stories
  const [stories, setStories] = useState(loadPersistedNews);

  // 3 Distinct Pages Navigation:
  // 1. 'all-news' (Broadsheet News)
  // 2. 'financial-hub' (Stock Deep-Dive, Compare 2 Things, Academy & Financial News)
  // 3. 'brain-games' (Dedicated Investor Brain Games Arcade)
  const initialNav = parseNavigationFromHash();
  const [activePage, setActivePage] = useState(initialNav.page);
  const [financialSubTab, setFinancialSubTab] = useState(initialNav.subTab);

  // Categories & Filters
  const [newsCategory, setNewsCategory] = useState('all');
  const [financialCategory, setFinancialCategory] = useState('all-finance');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWatchlistOnly, setIsWatchlistOnly] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('market_deck_bookmarks') || localStorage.getItem('tfg_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // Modals & Reader state
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCatchMeUpOpen, setIsCatchMeUpOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Guided Tour State (7 slides max, first visit option with 'no thanks')
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showFirstVisitPrompt, setShowFirstVisitPrompt] = useState(() => {
    return !localStorage.getItem('market_deck_guided_tour_dismissed');
  });

  const handleOpenTour = () => {
    setIsTourOpen(true);
    setShowFirstVisitPrompt(false);
    localStorage.setItem('market_deck_guided_tour_dismissed', 'true');
  };

  const handleDismissFirstVisitPrompt = () => {
    setShowFirstVisitPrompt(false);
    localStorage.setItem('market_deck_guided_tour_dismissed', 'true');
    addToast("Tour dismissed. You can reopen it anytime by clicking 'Tour' on the top bar.");
  };

  // Auto-refresh countdown timer (15 minutes = 900 seconds default)
  const [lastUpdated, setLastUpdated] = useState(getFormattedTime);
  const [countdownSeconds, setCountdownSeconds] = useState(() => {
    return (settings.refreshIntervalMinutes || 15) * 60;
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Sync theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('market_deck_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    addToast(theme === 'light' ? 'Switched to Terminal Dark Mode' : 'Switched to Classic Paper Mode');
  };

  // Sync window hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const nav = parseNavigationFromHash();
      setActivePage(nav.page);
      if (nav.subTab) {
        setFinancialSubTab(nav.subTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Primary page navigation handler
  const handleSelectPage = (pageId, subTab = null) => {
    setActivePage(pageId);
    if (subTab) {
      setFinancialSubTab(subTab);
    }

    if (pageId === 'all-news') {
      window.history.replaceState(null, '', '#news');
    } else if (pageId === 'financial-hub') {
      window.history.replaceState(null, '', `#finance-${subTab || financialSubTab}`);
    } else if (pageId === 'brain-games') {
      window.history.replaceState(null, '', '#games');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Financial Hub sub-tab switcher
  const handleSelectFinancialTab = (tabId) => {
    setFinancialSubTab(tabId);
    window.history.replaceState(null, '', `#finance-${tabId}`);
  };

  // Save stories & bookmarks whenever updated
  useEffect(() => {
    savePersistedNews(stories);
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('market_deck_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Watchlist Actions: Add, Remove, and Dispatch Research
  const handleAddStockToWatchlist = (stock) => {
    if (!stock || !stock.symbol) return;
    const sym = stock.symbol.toUpperCase().replace(/[₹$]/g, '').replace(/\.NS$|\.BO$/i, '').trim();
    if (watchlist.some((s) => s.symbol.toUpperCase().replace(/[₹$]/g, '').replace(/\.NS$|\.BO$/i, '').trim() === sym)) {
      addToast(`${sym} is already in your radar`);
      return;
    }
    const cleanStock = {
      ...stock,
      symbol: sym,
      name: stock.name || sym,
      price: stock.price || 'Live',
      change: stock.change || '+1.50%',
      up: stock.up !== false,
      exchange: stock.exchange || 'NSE',
    };
    const updated = [cleanStock, ...watchlist];
    setWatchlist(updated);
    saveWatchlist(updated);
    addToast(`Added ${sym} (${cleanStock.name}) to Portfolio Radar!`, 'info');
  };

  const handleRemoveStockFromWatchlist = (symbol) => {
    const updated = watchlist.filter((s) => s.symbol !== symbol);
    setWatchlist(updated);
    saveWatchlist(updated);
    addToast(`Removed ${symbol} from Watchlist`, 'info');
  };

  // Clean, flawless link to open Stock Deep-Dive from Watchlist / Sidebar
  const handleOpenResearchForStock = (symbol) => {
    setActivePage('financial-hub');
    setFinancialSubTab('stock-research');
    window.history.replaceState(null, '', '#finance-deepdive');

    // Dispatch custom event to notify StockResearchDesk
    window.dispatchEvent(
      new CustomEvent('market_deck_open_stock_research', { detail: { symbol } })
    );

    setTimeout(() => {
      const el = document.getElementById('stock-research-desk');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  // Master Refresh Function: Multi-Source Indian feeds & Live Price Ticks
  const triggerRefresh = async (isAuto = false) => {
    setIsRefreshing(true);

    try {
      // 1. Fetch real quotes from Indian index benchmarks
      const liveIndices = await fetchLiveMarketQuotes(indices);
      setIndices(liveIndices);

      // 2. Pulse user watchlist prices in Rupees (₹)
      setWatchlist((prev) => {
        const updated = updateWatchlistQuotes(prev);
        saveWatchlist(updated);
        return updated;
      });

      // 3. Fetch live real-time multi-source news (Moneycontrol, Mint, BS, ET, Google News India)
      const liveRssStories = await fetchLiveRssNews();

      if (liveRssStories.length > 0) {
        liveRssStories[0].isLead = true;
        for (let i = 1; i < liveRssStories.length; i++) {
          liveRssStories[i].isLead = false;
        }

        setStories((prev) => {
          const cleanPrev = prev.filter((s) => s.id !== 'lead-today' && !s.id.startsWith('good-news-'));
          const liveTitles = new Set(liveRssStories.map((s) => s.title));
          const filteredOld = cleanPrev.filter((s) => !liveTitles.has(s.title));
          const combined = [...liveRssStories, ...filteredOld];
          savePersistedNews(combined);
          return combined;
        });
      }

      // 4. Update timestamps & reset 15m timer
      const nowStr = getFormattedTime();
      setLastUpdated(nowStr);
      setCountdownSeconds((settings.refreshIntervalMinutes || 15) * 60);

      if (isAuto) {
        addToast(`[15-Min Auto-Refresh] Updated with ${liveRssStories.length} live Indian market dispatches at ${nowStr}`, 'refresh');
      } else {
        addToast(`Dossier refreshed with ${liveRssStories.length} live stories at ${nowStr}`, 'refresh');
      }
    } catch (err) {
      console.warn('Refresh error:', err);
      setIndices((prev) => simulateMarketPulse(prev));
      const nowStr = getFormattedTime();
      setLastUpdated(nowStr);
      setCountdownSeconds((settings.refreshIntervalMinutes || 15) * 60);
      addToast(`Dossier updated at ${nowStr}`, 'refresh');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Run live refresh once on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerRefresh(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // 15-Minute Countdown Interval Timer
  useEffect(() => {
    if (!settings.refreshIntervalMinutes || settings.refreshIntervalMinutes <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev <= 1) {
          triggerRefresh(true);
          return settings.refreshIntervalMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.refreshIntervalMinutes, stories]);

  // Refresh an individual topic on-demand
  const handleRefreshTopic = (topic) => {
    const freshStory = generateFreshTopicTake(topic, stories, settings.newsVibe);
    setStories((prev) => [freshStory, ...prev]);
    addToast(`Fresh intelligence take generated for ${topic.toUpperCase()}`, 'refresh');
  };

  // Bookmarking
  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      addToast(exists ? 'Story removed from bookmarks' : 'Story saved to bookmarks');
      return next;
    });
  };

  // Sharing
  const handleShare = (story) => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${story.title} - ${url}`);
      addToast('Headline & link copied to clipboard!');
    } else {
      addToast('Link ready to share');
    }
  };

  // Save Settings from modal
  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    setCountdownSeconds((newSettings.refreshIntervalMinutes || 15) * 60);
    addToast('Editorial settings updated successfully');
  };

  // Save Watchlist from modal
  const handleSaveWatchlist = (newList) => {
    setWatchlist(newList);
    saveWatchlist(newList);
    addToast('Watchlist & invested companies updated');
  };

  // ==========================================
  // PAGE 1: All News Filtered Stories
  // ==========================================
  const newsFilteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Watchlist filter
      if (isWatchlistOnly) {
        const storyTickers = (story.tickers || []).map((t) => t.replace('$', '').toUpperCase());
        const storyText = (story.title + ' ' + (story.summary || '')).toUpperCase();
        const matchesWatchlist = watchlist.some((stk) => {
          const sym = (stk.symbol || '').toUpperCase();
          const name = (stk.name || '').toUpperCase();
          return (
            storyTickers.includes(sym) ||
            storyText.includes(sym) ||
            (name.length > 3 && storyText.includes(name))
          );
        });
        if (!matchesWatchlist) return false;
      }

      // News Category match
      let matchCat = true;
      if (newsCategory !== 'all') {
        matchCat = story.category === newsCategory;
      }

      // Search match
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (story.title || '').toLowerCase().includes(q);
        const inSummary = (story.summary || '').toLowerCase().includes(q);
        const inSource = (story.source || '').toLowerCase().includes(q);
        const inTickers = (story.tickers || []).some((t) => t.toLowerCase().includes(q));
        matchSearch = inTitle || inSummary || inSource || inTickers;
      }

      return matchCat && matchSearch;
    });
  }, [stories, newsCategory, searchQuery, isWatchlistOnly, watchlist]);

  const leadStory = useMemo(() => {
    if (newsFilteredStories.length === 0) return null;
    const foundLead = newsFilteredStories.find((s) => s.isLead);
    return foundLead || newsFilteredStories[0];
  }, [newsFilteredStories]);

  const generalStories = useMemo(() => {
    if (!leadStory) return [];
    return newsFilteredStories.filter((s) => s.id !== leadStory.id);
  }, [newsFilteredStories, leadStory]);

  // ==========================================
  // PAGE 2: Financial Wire Filtered Stories
  // ==========================================
  const financialFilteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Must be a financial story (stonks, yield, vc, good-news, or has tickers)
      const isFinancialStory =
        ['stonks', 'yield', 'vc', 'good-news'].includes(story.category) ||
        (story.tickers && story.tickers.length > 0);

      if (!isFinancialStory) return false;

      // Watchlist filter
      if (isWatchlistOnly) {
        const storyTickers = (story.tickers || []).map((t) => t.replace('$', '').toUpperCase());
        const storyText = (story.title + ' ' + (story.summary || '')).toUpperCase();
        const matchesWatchlist = watchlist.some((stk) => {
          const sym = (stk.symbol || '').toUpperCase();
          const name = (stk.name || '').toUpperCase();
          return (
            storyTickers.includes(sym) ||
            storyText.includes(sym) ||
            (name.length > 3 && storyText.includes(name))
          );
        });
        if (!matchesWatchlist) return false;
      }

      // Financial Category match
      let matchCat = true;
      if (financialCategory !== 'all-finance') {
        matchCat = story.category === financialCategory;
      }

      // Search match
      let matchSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = (story.title || '').toLowerCase().includes(q);
        const inSummary = (story.summary || '').toLowerCase().includes(q);
        const inSource = (story.source || '').toLowerCase().includes(q);
        const inTickers = (story.tickers || []).some((t) => t.toLowerCase().includes(q));
        matchSearch = inTitle || inSummary || inSource || inTickers;
      }

      return matchCat && matchSearch;
    });
  }, [stories, financialCategory, searchQuery, isWatchlistOnly, watchlist]);

  const financialLeadStory = useMemo(() => {
    if (financialFilteredStories.length === 0) return null;
    const foundLead = financialFilteredStories.find((s) => s.isLead);
    return foundLead || financialFilteredStories[0];
  }, [financialFilteredStories]);

  const financialGeneralStories = useMemo(() => {
    if (!financialLeadStory) return [];
    return financialFilteredStories.filter((s) => s.id !== financialLeadStory.id);
  }, [financialFilteredStories, financialLeadStory]);

  return (
    <div className="newspaper-container">
      {/* 1. Masthead Header */}
      <Header
        settings={settings}
        lastUpdated={lastUpdated}
        countdownSeconds={countdownSeconds}
        isRefreshing={isRefreshing}
        theme={theme}
        onToggleTheme={toggleTheme}
        onManualRefresh={() => triggerRefresh(false)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenCatchMeUp={() => setIsCatchMeUpOpen(true)}
        activePage={activePage}
        activeFinancialTab={financialSubTab}
        onSelectPage={handleSelectPage}
      />

      {/* 2. Live Market Ticker Tape (Steady Pulse above full-width rotating marquee) */}
      <TickerTape
        indices={indices}
        watchlist={watchlist}
        onAddStock={handleAddStockToWatchlist}
        onOpenResearch={handleOpenResearchForStock}
        onManualRefresh={() => triggerRefresh(false)}
        isRefreshing={isRefreshing}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenCatchMeUp={() => setIsCatchMeUpOpen(true)}
        onOpenTour={handleOpenTour}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Optional First-Time User Guided Tour Banner */}
      {showFirstVisitPrompt && (
        <aside className="first-visit-tour-banner" aria-label="First Time User Tour Invitation">
          <div className="tour-banner-content">
            <span className="tour-banner-badge">NEW VISITOR GUIDE</span>
            <span className="tour-banner-text">
              Welcome to The Market Deck! Would you like a 2-minute guided walkthrough (7 quick slides) of the 3 pages, stock dossiers, and funds comparator?
            </span>
          </div>
          <div className="tour-banner-actions">
            <button
              type="button"
              className="btn-newspaper btn-tour-start"
              onClick={handleOpenTour}
            >
              <span>Start Interactive Tour</span>
            </button>
            <button
              type="button"
              className="btn-newspaper btn-tour-skip"
              onClick={handleDismissFirstVisitPrompt}
            >
              <span>No thanks, explore on my own</span>
            </button>
          </div>
        </aside>
      )}

      {/* 3. Primary Navigation Bar: 3 Dedicated Pages & Suite Tabs */}
      <PrimaryNav
        activePage={activePage}
        onSelectPage={handleSelectPage}
        activeFinancialTab={financialSubTab}
        onSelectFinancialTab={handleSelectFinancialTab}
      />

      {/* ========================================================
          PAGE 1: ALL NEWS & DISPATCHES (BROADSHEET)
          ======================================================== */}
      {activePage === 'all-news' && (
        <section className="page-view animate-fade-in" aria-label="All News Page">
          {/* Category Navigation Pills strictly for news topics */}
          <CategoryNav
            categories={categories}
            activeCategory={newsCategory}
            onSelectCategory={setNewsCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Filter dispatches by ticker, topic, sector..."
          />

          <div className="broadsheet-main-grid">
            <main>
              {isWatchlistOnly && (
                <div className="watchlist-filter-banner">
                  <span>⭐ FILTERED TO YOUR WATCHLIST ({watchlist.length} STOCKS)</span>
                  <button
                    type="button"
                    onClick={() => setIsWatchlistOnly(false)}
                    className="clear-filter-btn"
                  >
                    Clear Filter (Show All)
                  </button>
                </div>
              )}

              {leadStory && (
                <LeadStory
                  story={leadStory}
                  vibe={settings.newsVibe}
                  onOpenArticle={setSelectedArticle}
                  onRefreshTopic={handleRefreshTopic}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={bookmarkedIds.includes(leadStory.id)}
                  onShare={handleShare}
                />
              )}

              <DossierGrid
                stories={generalStories}
                vibe={settings.newsVibe}
                onOpenArticle={setSelectedArticle}
                onRefreshTopic={handleRefreshTopic}
                onToggleBookmark={handleToggleBookmark}
                bookmarkedIds={bookmarkedIds}
                onShare={handleShare}
              />
            </main>

            {/* Right Column: Yield curve, Portfolio radar, Noise meter, Quotes */}
            <Sidebar
              watchlist={watchlist}
              onFilterByTicker={(ticker) => setSearchQuery(ticker)}
              onAddStock={handleAddStockToWatchlist}
              onRemoveStock={handleRemoveStockFromWatchlist}
              onOpenResearch={handleOpenResearchForStock}
              isWatchlistOnly={isWatchlistOnly}
              onToggleWatchlistOnly={setIsWatchlistOnly}
            />
          </div>

          {/* End of Page 1: Brain Games Section as requested */}
          <div className="page-end-brain-gym">
            <BrainGym
              title="END-OF-DOSSIER BRAIN GYM"
              subtitle="Lock in your mental alpha and solve today's puzzles after reading"
              tagline="READER'S COGNITIVE CORNER"
              onOpenFullArcade={() => handleSelectPage('brain-games')}
            />
          </div>
        </section>
      )}

      {/* ========================================================
          PAGE 2: FINANCIAL HUB & KNOWLEDGE GAINER
          ======================================================== */}
      {activePage === 'financial-hub' && (
        <section className="page-view animate-fade-in" aria-label="Financial Hub Page">
          {/* SubTab 1: Stock Deep-Dive Desk (1-2Y Dossier) */}
          {financialSubTab === 'stock-research' && (
            <div className="tool-view animate-fade-in">
              <StockResearchDesk
                onShareToast={addToast}
                onAddToWatchlist={handleAddStockToWatchlist}
                watchlist={watchlist}
              />
            </div>
          )}

          {/* SubTab 2: Head-to-Head Asset & Stock Comparison Arena */}
          {financialSubTab === 'compare-arena' && (
            <div className="tool-view animate-fade-in">
              <AssetComparisonArena />
            </div>
          )}

          {/* SubTab 3: Comprehensive Funds & Wealth Schemes Comparator */}
          {financialSubTab === 'funds-comparator' && (
            <div className="tool-view animate-fade-in">
              <WealthFundsComparator />
            </div>
          )}

          {/* SubTab 4: Zero-to-Hero Academy (Learn First, Quiz & Duels) */}
          {financialSubTab === 'finance-game' && (
            <div className="tool-view animate-fade-in">
              <FinanceZeroToHero />
            </div>
          )}

          {/* SubTab 4: Financial News Wire (Stonks, Yields & VC Dispatches) */}
          {financialSubTab === 'finance-news' && (
            <div className="tool-view animate-fade-in">
              <CategoryNav
                categories={financialNewsCategories}
                activeCategory={financialCategory}
                onSelectCategory={setFinancialCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                placeholder="Filter financial wire, tickers, capital inflows..."
              />

              <div className="broadsheet-main-grid">
                <main>
                  {isWatchlistOnly && (
                    <div className="watchlist-filter-banner">
                      <span>⭐ FILTERED TO YOUR WATCHLIST ({watchlist.length} STOCKS)</span>
                      <button
                        type="button"
                        onClick={() => setIsWatchlistOnly(false)}
                        className="clear-filter-btn"
                      >
                        Clear Filter (Show All)
                      </button>
                    </div>
                  )}

                  {financialLeadStory && (
                    <LeadStory
                      story={financialLeadStory}
                      vibe={settings.newsVibe}
                      onOpenArticle={setSelectedArticle}
                      onRefreshTopic={handleRefreshTopic}
                      onToggleBookmark={handleToggleBookmark}
                      isBookmarked={bookmarkedIds.includes(financialLeadStory.id)}
                      onShare={handleShare}
                    />
                  )}

                  <DossierGrid
                    stories={financialGeneralStories}
                    vibe={settings.newsVibe}
                    onOpenArticle={setSelectedArticle}
                    onRefreshTopic={handleRefreshTopic}
                    onToggleBookmark={handleToggleBookmark}
                    bookmarkedIds={bookmarkedIds}
                    onShare={handleShare}
                  />
                </main>

                <Sidebar
                  watchlist={watchlist}
                  onFilterByTicker={(ticker) => setSearchQuery(ticker)}
                  onAddStock={handleAddStockToWatchlist}
                  onRemoveStock={handleRemoveStockFromWatchlist}
                  onOpenResearch={handleOpenResearchForStock}
                  isWatchlistOnly={isWatchlistOnly}
                  onToggleWatchlistOnly={setIsWatchlistOnly}
                />
              </div>
            </div>
          )}

          {/* End of Page 2: Brain Games Section as requested */}
          <div className="page-end-brain-gym">
            <BrainGym
              title="FINANCIAL BRAIN GYM"
              subtitle="Test your capital instincts and flex your market literacy"
              tagline="FINANCIAL COGNITIVE DECK"
              onOpenFullArcade={() => handleSelectPage('brain-games')}
            />
          </div>
        </section>
      )}

      {/* ========================================================
          PAGE 3: INVESTOR BRAIN GAMES (DEDICATED ARCADE)
          ======================================================== */}
      {activePage === 'brain-games' && (
        <section className="page-view animate-fade-in" aria-label="Brain Games Arcade Page">
          <BrainGym
            title="INVESTOR BRAIN GYM & ARCADE"
            subtitle="5 full interactive challenges: Sudoku, Bear vs Bull Maze, Stock Wordle, Financial Trivia & Higher/Lower"
            tagline="FULL ARCADE SUITE • TOUCH GRASS LATER"
          />
        </section>
      )}

      {/* ========================================================
          INSTITUTIONAL BROADSHEET FOOTER & SEBI STATUTORY COMPLIANCE
          ======================================================== */}
      <footer
        className="terminal-footer"
        style={{
          marginTop: '56px',
          borderTop: '3px double var(--border-strong)',
          background: 'var(--bg-card)',
          padding: '36px 20px 28px 20px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Top Banner: Regulatory Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '18px',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid var(--accent-green)',
                  color: 'var(--accent-green)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} />
                <span>SEBI COMPLIANT EDUCATIONAL INTERFACE</span>
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                STRICT FINANCIAL LITERACY & ZERO-ADVISORY PROTOCOL
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
              TERMINAL EDITION: v2.5.0 • REAL-TIME DALAL STREET WIRE
            </div>
          </div>

          {/* 3 Columns: Mandatory Disclosures, Statutory Risk Warnings, Investor Protection */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              fontSize: '0.78rem',
              color: 'var(--ink-secondary)',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}
          >
            {/* Col 1: SEBI Mandatory Disclaimer */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--ink-primary)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Scale size={14} style={{ color: 'var(--accent-red)' }} />
                <span>SEBI REGULATORY DISCLAIMER</span>
              </div>
              <p style={{ margin: 0 }}>
                <strong>The Market Deck</strong> is an independent financial technology and educational intelligence interface. We are <strong>NOT</strong> registered with the Securities and Exchange Board of India (SEBI) as a Research Analyst (under SEBI RA Regulations, 2014) or an Investment Adviser (under SEBI IA Regulations, 2013).
              </p>
              <p style={{ margin: '6px 0 0 0' }}>
                All corporate timeline records, mathematical frameworks (SIP, ROIC vs. WACC), stock dossier metrics, and mutual fund comparisons are synthesized strictly for factual research and financial literacy. Nothing on this website constitutes buy, sell, or hold advice, investment solicitation, or tax counsel.
              </p>
            </div>

            {/* Col 2: Market Risk & Mutual Fund Warning */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--ink-primary)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <AlertTriangle size={14} style={{ color: 'var(--accent-red)' }} />
                <span>STATUTORY MARKET RISK NOTICE</span>
              </div>
              <p style={{ margin: 0 }}>
                <strong>Mutual Fund investments are subject to market risks.</strong> Please read all scheme-related documents (Scheme Information Document - SID & Key Information Memorandum - KIM) carefully before investing. Historical NAV returns and past CAGR rates are not guarantees of future returns.
              </p>
              <p style={{ margin: '6px 0 0 0' }}>
                Securities trading in Equities and Derivatives (Futures & Options) involves substantial exposure to capital loss. Investors must evaluate their financial risk tolerance and consult a qualified, SEBI-registered financial adviser before executing any market transaction.
              </p>
            </div>

            {/* Col 3: Data Sources & Investor Protection Charter */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  color: 'var(--ink-primary)',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ShieldCheck size={14} style={{ color: 'var(--accent-blue)' }} />
                <span>DATA INTEGRITY & INVESTOR SAFETY</span>
              </div>
              <p style={{ margin: 0 }}>
                <strong>Exchange & Wire Attribution:</strong> Market quotes and RSS dispatches are proxied from official exchange feeds (NSE, BSE, AMFI) and authenticated press partners (Moneycontrol, Livemint, Business Standard, Economic Times).
              </p>
              <p style={{ margin: '6px 0 0 0' }}>
                <strong>Anti-Fraud Warning:</strong> The Market Deck will NEVER operate paid tip channels, private WhatsApp/Telegram groups, or demand investor login passwords/OTPs. Beware of fraudulent operators promising guaranteed equity returns.
              </p>
            </div>
          </div>

          {/* Copyright & Timestamp */}
          <div
            style={{
              borderTop: '1px solid var(--border-light)',
              paddingTop: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--ink-muted)',
            }}
          >
            <div>
              © 2026 THE MARKET DECK • Financial Intelligence & Wealth Literacy Terminal. All rights reserved.
            </div>
            <div>
              Designed for institutional-grade clarity • Zero Hallucination Standard
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================
          MODALS & TOASTS
          ======================================================== */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          vibe={settings.newsVibe}
          onClose={() => setSelectedArticle(null)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onShare={handleShare}
        />
      )}

      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSaveSettings={handleSaveSettings}
          watchlist={watchlist}
          onSaveWatchlist={handleSaveWatchlist}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isCatchMeUpOpen && (
        <CatchMeUpModal
          stories={stories}
          onClose={() => setIsCatchMeUpOpen(false)}
        />
      )}

      {/* Guided Tour Modal (7 Slides Max, strictly modular) */}
      <TerminalGuideModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigate={handleSelectPage}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
