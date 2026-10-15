import React from 'react';
import { RefreshCw, Bookmark, Share2, ArrowUpRight } from 'lucide-react';

export function DossierGrid({
  stories,
  vibe,
  onOpenArticle,
  onRefreshTopic,
  onToggleBookmark,
  bookmarkedIds,
  onShare,
}) {
  if (!stories || stories.length === 0) {
    return (
      <div style={{ padding: '30px', textAlign: 'center', color: 'var(--ink-muted)' }}>
        <p>No stories matching current filter.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="section-meta-label">GENERAL DOSSIER & INSIGHTS</div>

      <div className="dossier-grid">
        {stories.map((story) => {
          const isBookmarked = bookmarkedIds.includes(story.id);
          const displayTitle =
            vibe === 'executive' && story.titleExecutive ? story.titleExecutive : story.title;

          return (
            <article key={story.id} className="dossier-card">
              <div className="dossier-card-header">
                <div className="story-meta-tags" style={{ marginBottom: 0 }}>
                  <span className="source-badge">{story.source}</span>
                  <span>•</span>
                  <span>{story.categoryLabel || story.category}</span>
                </div>
                <button
                  className="btn-icon-subtle"
                  onClick={() => onRefreshTopic(story.category || 'stonks')}
                  title={`Refresh fresh takes for ${story.categoryLabel || story.category}`}
                >
                  <RefreshCw size={12} />
                </button>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--ink-muted)',
                  marginBottom: '8px',
                }}
              >
                {story.timestamp}
              </div>

              <h3 className="dossier-headline" onClick={() => onOpenArticle(story)}>
                {displayTitle}
              </h3>

              <p className="dossier-summary">{story.summary}</p>

              {story.tickers && (
                <div className="ticker-tags" style={{ marginBottom: '10px' }}>
                  {story.tickers.map((t) => (
                    <span
                      key={t}
                      className="ticker-badge"
                      onClick={() => onOpenArticle(story)}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="dossier-card-footer">
                <div className="card-actions-row">
                  <button
                    className="btn-icon-subtle"
                    onClick={() => onToggleBookmark(story.id)}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
                  >
                    <Bookmark size={13} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    className="btn-icon-subtle"
                    onClick={() => onShare(story)}
                    title="Share story"
                  >
                    <Share2 size={13} />
                  </button>
                </div>

                <a
                  className="read-more-link"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenArticle(story);
                  }}
                >
                  <span>READ</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
