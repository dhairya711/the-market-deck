import React from 'react';
import { ArrowUpRight, RefreshCw, Bookmark, Share2 } from 'lucide-react';

export function LeadStory({
  story,
  vibe,
  onOpenArticle,
  onRefreshTopic,
  onToggleBookmark,
  isBookmarked,
  onShare,
}) {
  if (!story) return null;

  const displayTitle = vibe === 'executive' && story.titleExecutive ? story.titleExecutive : story.title;

  return (
    <article className="lead-story-card">
      <div className="section-meta-label">LEAD EDITORIAL STORY</div>

      <div className="story-meta-tags">
        <span className="source-badge">{story.source}</span>
        <span>•</span>
        <span>{story.categoryLabel}</span>
        <span>•</span>
        <span>{story.timestamp}</span>
        <span>•</span>
        <span>{story.readTime || '2 min read'}</span>
      </div>

      <h2 className="lead-headline" onClick={() => onOpenArticle(story)}>
        {displayTitle}
      </h2>

      <p className="lead-summary-lead">
        {story.summary}
      </p>

      {story.bullets && story.bullets.length > 0 && (
        <div className="high-signal-bullets">
          <div className="bullet-title">⚡ Zero-Fluff Intelligence Dossier</div>
          {story.bullets.map((b, i) => (
            <div key={i} className="bullet-item">{b}</div>
          ))}
        </div>
      )}

      <div className="lead-footer-bar">
        <div className="ticker-tags">
          {story.tickers?.map((t) => (
            <span key={t} className="ticker-badge" onClick={() => onOpenArticle(story)}>
              {t}
            </span>
          ))}
        </div>

        <div className="card-actions-row">
          <button
            className="btn-newspaper btn-icon-subtle"
            onClick={() => onRefreshTopic(story.category || 'stonks')}
            title="Refresh this exact topic with fresh market angles"
          >
            <RefreshCw size={13} />
            <span style={{ fontSize: '0.74rem' }}>Refresh Angle</span>
          </button>

          <button
            className="btn-newspaper btn-icon-subtle"
            onClick={() => onToggleBookmark(story.id)}
            title={isBookmarked ? 'Remove from saved' : 'Save story'}
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          <button
            className="btn-newspaper btn-icon-subtle"
            onClick={() => onShare(story)}
            title="Share story"
          >
            <Share2 size={14} />
          </button>

          <a
            className="read-more-link"
            onClick={(e) => {
              e.preventDefault();
              onOpenArticle(story);
            }}
          >
            <span>READ MORE</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </article>
  );
}
