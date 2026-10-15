import React from 'react';
import { RefreshCw, Zap, Moon, Sun, Sliders, Volume2, Clock } from 'lucide-react';
import { getFormattedDate } from '../services/newsService';

export function Header({
  settings,
  lastUpdated,
  countdownSeconds,
  isRefreshing,
  theme,
  onToggleTheme,
  onManualRefresh,
  onOpenSettings,
  onOpenCatchMeUp,
}) {
  const currentDate = getFormattedDate();

  const formatCountdown = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  return (
    <header className="newspaper-header">
      {/* Top vintage folio bar */}
      <div className="masthead-top-bar">
        <div>{settings.volumeNumber || 'VOL. II • NO. 124'}</div>
        <div className="live-vibe-monitor">
          <span className="live-dot"></span>
          <span>LIVE VIBE MONITOR</span>
        </div>
        <div>PRICE: PURE ATTENTION</div>
      </div>

      {/* Main Masthead Title */}
      <div className="masthead-center">
        <h1 className="masthead-title">
          {(settings.newspaperTitle || 'TFG TIMES').replace(/\.+$/, '')}
          <span className="title-dot">.</span>
        </h1>
        <p className="masthead-subtitle">
          {settings.newspaperSubtitle || 'The only news that matters. No cap, just high-signal vibes.'}
        </p>
      </div>

      {/* Dossier info strip */}
      <div className="masthead-dossier-bar">
        <span>ESTD. 2026 • DAILY DOSSIER</span>
        <span>{currentDate}</span>
        <span>NEWSPAPER BY ANTIGRAVITY</span>
      </div>

      {/* Control bar: Refresh timer, actions, theme toggle */}
      <div className="control-toolbar">
        <div className="toolbar-left">
          <span>🕒 Last Updated: <strong>{lastUpdated}</strong></span>
          <span className="countdown-badge" title="Auto-refreshes every 15 minutes">
            <Clock size={13} />
            Next in: <strong>{formatCountdown(countdownSeconds)}</strong>
          </span>
        </div>

        <div className="toolbar-right">
          <button
            className="btn-newspaper btn-catch-up"
            onClick={onOpenCatchMeUp}
            title="Listen to 60-second executive audio briefing"
          >
            <Zap size={14} />
            <span>CATCH ME UP</span>
          </button>

          <button
            className="btn-newspaper"
            onClick={onManualRefresh}
            disabled={isRefreshing}
            title="Refresh feed with latest market intelligence"
          >
            <RefreshCw size={14} className={isRefreshing ? 'spin-anim' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
          </button>

          <button
            className="btn-newspaper"
            onClick={onOpenSettings}
            title="Customize your portfolio stocks, industries, and vibes"
          >
            <Sliders size={14} />
            <span>Watchlist & Topics</span>
          </button>

          <button
            className="btn-newspaper btn-pill-mode"
            onClick={onToggleTheme}
            title="Switch between Vintage Broadsheet Paper and Dark Lock-In Mode"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={13} style={{ color: '#fbbf24' }} />
                <span>PAPER MODE</span>
              </>
            ) : (
              <>
                <Moon size={13} />
                <span>DARK MODE (LOCK IN)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
