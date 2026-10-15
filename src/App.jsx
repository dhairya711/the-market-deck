import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TickerTape } from './components/TickerTape';
import { CategoryNav } from './components/CategoryNav';
import { LeadStory } from './components/LeadStory';
import { DossierGrid } from './components/DossierGrid';
import { Sidebar } from './components/Sidebar';
import { BrainGym } from './components/BrainGym';
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
} from './services/newsService';

export function App() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tfg_theme') || 'light';
  });

  // Settings & Watchlist
  const [settings, setSettings] = useState(loadSettings);
  const [watchlist, setWatchlist] = useState(loadWatchlist);
  const [indices, setIndices] = useState(initialIndices);

  // Stories
  const [stories, setStories] = useState(loadPersistedNews);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tfg_bookmarks') || '[]');
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
    localStorage.setItem('tfg_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    addToast(theme === 'light' ? 'Switched to Lock-In Dark Mode' : 'Switched to Vintage Broadsheet Paper');
  };

  // Save stories & bookmarks whenever updated
  useEffect(() => {
    savePersistedNews(stories);
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('tfg_bookmarks', JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  // Master Refresh Function
  const triggerRefresh = (isAuto = false) => {
    setIsRefreshing(true);

    setTimeout(() => {
      // 1. Update Market pulse wiggles
      setIndices((prev) => simulateMarketPulse(prev));

      // 2. Generate a fresh high-signal take for one of the user's tracked topics
      const randomCategory = ['stonks', 'tech', 'energy', 'metal', 'yield'][
        Math.floor(Math.random() * 5)
      ];
      const freshTake = generateFreshTopicTake(randomCategory, stories, settings.newsVibe);

      setStories((prev) => {
        // Prepend fresh take without duplicating
        const filtered = prev.filter((s) => s.id !== freshTake.id);
        return [freshTake, ...filtered];
      });

      // 3. Reset timestamps & timer
      const nowStr = getFormattedTime();
      setLastUpdated(nowStr);
      setCountdownSeconds((settings.refreshIntervalMinutes || 15) * 60);
      setIsRefreshing(false);

      if (isAuto) {
        addToast(`[15-Min Auto-Refresh] Feed updated at ${nowStr}`, 'refresh');
      } else {
        addToast(`Dossier refreshed with latest market data at ${nowStr}`, 'refresh');
      }
    }, 600);
  };

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

  // Filter Stories by Category and Search Query
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      // Category match
      let matchCat = true;
      if (activeCategory !== 'all' && activeCategory !== 'brain-gym') {
        matchCat = story.category === activeCategory;
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
  }, [stories, activeCategory, searchQuery]);

  // Separate Lead story from General dossier
  const leadStory = useMemo(() => {
    // If user filtered by search or category, pick the top result
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
          if (catId === 'brain-gym') {
            const el = document.getElementById('brain-gym');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 4. Main Broadsheet Layout */}
      {activeCategory !== 'brain-gym' ? (
        <div className="broadsheet-main-grid">
          {/* Main Column: Lead Story + Dossier Grid */}
          <main>
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
          />
        </div>
      ) : null}

      {/* 5. Brain Gym Section (Sudoku, Maze, Wordle, Trivia, Higher/Lower) */}
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
