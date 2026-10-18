import React from 'react';
import { Clock } from 'lucide-react';
import { getFormattedDate } from '../services/newsService';

export function Header({
  settings,
  lastUpdated,
  countdownSeconds,
  activePage,
  activeFinancialTab,
  onSelectPage,
}) {
  const currentDate = getFormattedDate();

  const formatCountdown = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  return (
    <header className="newspaper-header">
      {/* 1. Top Folio Bar: ESTD on left, Date in center, Last Updated in corner */}
      <div className="masthead-top-bar">
        <div className="top-bar-left">
          ESTD. 2026 • WEALTH STRATEGY COCKPIT
        </div>

        <div className="top-bar-center">
          <span className="live-dot"></span>
          <span>{currentDate} • NEW DELHI / MUMBAI</span>
        </div>

        <div className="top-bar-right">
          <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
          <span>Last Updated: <strong>{lastUpdated}</strong></span>
          <span className="countdown-pill" title="Auto-refreshes every 15 minutes">
            Next: {formatCountdown(countdownSeconds)}
          </span>
        </div>
      </div>

      {/* 2. Main Masthead Title & Quick Navigation */}
      <div className="masthead-center">
        <h1 className="masthead-title">
          {(settings?.newspaperTitle || 'THE MARKET DECK').replace(/\.+$/, '')}
          <span className="title-dot">.</span>
        </h1>

        <p className="masthead-subtitle">
          {settings?.newspaperSubtitle || 'Financial Intelligence & Wealth Literacy Terminal • Mastering Equities, Real-Time Dispatches & Capital Decisions'}
        </p>

        {/* Compact Pillar Quick Links */}
        <div className="masthead-pillars">
          <button
            type="button"
            className={`pillar-link-btn ${activePage === 'all-news' ? 'active' : ''}`}
            onClick={() => onSelectPage && onSelectPage('all-news')}
            title="Read Daily Broadsheet News Wire"
          >
            Live News Wire
          </button>
          <span className="pillar-dot">•</span>
          <button
            type="button"
            className={`pillar-link-btn ${activePage === 'financial-hub' && activeFinancialTab === 'compare-arena' ? 'active' : ''}`}
            onClick={() => onSelectPage && onSelectPage('financial-hub', 'compare-arena')}
            title="Open Asset Comparison Arena"
          >
            Asset Comparator
          </button>
          <span className="pillar-dot">•</span>
          <button
            type="button"
            className={`pillar-link-btn ${activePage === 'financial-hub' && activeFinancialTab === 'funds-comparator' ? 'active' : ''}`}
            onClick={() => onSelectPage && onSelectPage('financial-hub', 'funds-comparator')}
            title="Open All Funds & Wealth Schemes Comparator"
          >
            All Funds & Schemes
          </button>
          <span className="pillar-dot">•</span>
          <button
            type="button"
            className={`pillar-link-btn ${activePage === 'financial-hub' && activeFinancialTab === 'stock-research' ? 'active' : ''}`}
            onClick={() => onSelectPage && onSelectPage('financial-hub', 'stock-research')}
            title="Open 1-2 Year Stock Dossiers"
          >
            Stock Dossiers
          </button>
          <span className="pillar-dot">•</span>
          <button
            type="button"
            className={`pillar-link-btn ${activePage === 'financial-hub' && activeFinancialTab === 'finance-game' ? 'active' : ''}`}
            onClick={() => onSelectPage && onSelectPage('financial-hub', 'finance-game')}
            title="Open Zero-to-Hero Academy"
          >
            Zero-to-Hero Academy
          </button>
          <span className="pillar-dot">•</span>
          <button
            type="button"
            className={`pillar-link-btn ${activePage === 'brain-games' ? 'active' : ''}`}
            onClick={() => onSelectPage && onSelectPage('brain-games')}
            title="Open Investor Brain Gym"
          >
            Brain Gym
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
