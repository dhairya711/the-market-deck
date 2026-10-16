import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { CategoryNav } from './components/CategoryNav';
import { LeadStory } from './components/LeadStory';
import { DossierGrid } from './components/DossierGrid';
import { Sidebar } from './components/Sidebar';
import { BrainGym } from './components/BrainGym';
import { StockResearchDesk } from './components/StockResearchDesk';
import { FinanceZeroToHero } from './components/FinanceZeroToHero';
import { AssetComparisonArena } from './components/AssetComparisonArena';
import { ArticleModal } from './components/ArticleModal';
import { SettingsModal } from './components/SettingsModal';
import { CatchMeUpModal } from './components/CatchMeUpModal';
import { Toast } from './components/Toast';

import { initialIndices } from './data/marketData';
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
  const [activeCategory, setActiveCategory] = useState('all');
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

  const handleOpenResearchForStock = (symbol) => {
    const el = document.getElementById('stock-research-desk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    // Dispatch custom event to notify StockResearchDesk
    window.dispatchEvent(
      new CustomEvent('market_deck_open_stock_research', { detail: { symbol } })
    );
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
        // Designate the freshest real story as the Lead Story!
        liveRssStories[0].isLead = true;
        for (let i = 1; i < liveRssStories.length; i++) {
          liveRssStories[i].isLead = false;
        }

        setStories((prev) => {
          // Remove any legacy fake lead stories (such as hardcoded 'lead-today')
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
        addToast(`Dossier refreshed with ${liveRssStories.length} live stories from Moneycontrol, Mint, BS & ET at ${nowStr}`, 'refresh');
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
      return; // manual only
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

  // Refresh an individual topic or stock on-demand
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

  // Filter Stories by Category, Search Query, and Watchlist Only
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // 1. Watchlist Only Filter
      if (isWatchlistOnly) {
        const storyTickers = (story.tickers || []).map((t) =>
          t.replace('$', '').toUpperCase()
        );
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

      // 2. Category match
      let matchCat = true;
      if (activeCategory !== 'all' && activeCategory !== 'brain-gym' && activeCategory !== 'stock-research') {
        matchCat = story.category === activeCategory;
      }

      // 3. Search match
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
  }, [stories, activeCategory, searchQuery, isWatchlistOnly, watchlist]);

  // Separate Lead story from General dossier
  const leadStory = useMemo(() => {
    if (filteredStories.length === 0) return null;
    const foundLead = filteredStories.find((s) => s.isLead);
    return foundLead || filteredStories[0];
  }, [filteredStories]);

  const generalStories = useMemo(() => {
    if (!leadStory) return [];
    return filteredStories.filter((s) => s.id !== leadStory.id);
  }, [filteredStories, leadStory]);

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
      />

      {/* 2. Live Market Ticker Tape */}
      <TickerTape indices={indices} watchlist={watchlist} />

      {/* 3. Category Navigation & Search */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          if (catId === 'compare-arena') {
            const el = document.getElementById('compare-arena');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (catId === 'finance-game') {
            const el = document.getElementById('finance-game');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (catId === 'stock-research') {
            const el = document.getElementById('stock-research-desk');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (catId === 'brain-gym') {
            const el = document.getElementById('brain-gym');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 4. Main Broadsheet Layout */}
      {activeCategory !== 'brain-gym' &&
      activeCategory !== 'stock-research' &&
      activeCategory !== 'compare-arena' &&
      activeCategory !== 'finance-game' ? (
        <div className="broadsheet-main-grid">
          {/* Main Column: Lead Story + Dossier Grid */}
          <main>
            {isWatchlistOnly && (
              <div
                style={{
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--accent-red)',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  marginBottom: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                }}
              >
                <span>⭐ FILTERED TO YOUR WATCHLIST ({watchlist.length} STOCKS)</span>
                <button
                  type="button"
                  onClick={() => setIsWatchlistOnly(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--accent-red)',
                    fontWeight: 700,
                  }}
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
      ) : null}

      {/* 5. Head-to-Head Asset & Stock Comparison Engine (Compare 2 or 3 things) */}
      <AssetComparisonArena />

      {/* 6. Finance Zero-to-Hero Academy & Higher Return Duels */}
      <FinanceZeroToHero />

      {/* 7. Stock Research Terminal: 1-to-2 Year Intelligence Dossier */}
      <StockResearchDesk
        onShareToast={addToast}
        onAddToWatchlist={handleAddStockToWatchlist}
        watchlist={watchlist}
      />

      {/* 8. Brain Gym Section (Sudoku, Maze, Wordle, Trivia, Higher/Lower) */}
      <BrainGym />

      {/* MODALS */}
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

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
