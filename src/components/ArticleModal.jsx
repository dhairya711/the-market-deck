import React, { useState } from 'react';
import { X, Volume2, VolumeX, Share2, Bookmark, Check, ShieldCheck } from 'lucide-react';

export function ArticleModal({
  article,
  vibe,
  onClose,
  onToggleBookmark,
  isBookmarked,
  onShare,
}) {
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);

  if (!article) return null;

  const displayTitle =
    vibe === 'executive' && article.titleExecutive ? article.titleExecutive : article.title;

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      return;
    }

    window.speechSynthesis.cancel(); // clear queue
    const textToRead = `${displayTitle}. Summary: ${article.summary}. Tactical Takeaways: ${article.bullets ? article.bullets.join('. ') : ''}. Strategic context: ${article.whyItMatters || ''}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingSpeech(false);
    utterance.onerror = () => setIsPlayingSpeech(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingSpeech(true);
  };

  const handleClose = () => {
    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="story-meta-tags" style={{ marginTop: '4px' }}>
          <span className="source-badge">{article.source}</span>
          <span>•</span>
          <span>{article.categoryLabel || article.category}</span>
          <span>•</span>
          <span>{article.timestamp}</span>
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.85rem',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '12px 0 16px 0',
          }}
        >
          {displayTitle}
        </h2>

        {/* Audio narration & action bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            background: 'var(--bg-muted)',
            borderRadius: '4px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <button
            className="btn-newspaper"
            onClick={handleSpeak}
            style={{ background: isPlayingSpeech ? '#d97706' : undefined, color: isPlayingSpeech ? '#fff' : undefined }}
          >
            {isPlayingSpeech ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isPlayingSpeech ? 'Stop Narrator' : 'Listen to Briefing (Audio)'}</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn-newspaper btn-icon-subtle"
              onClick={() => onToggleBookmark(article.id)}
            >
              <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
            <button
              className="btn-newspaper btn-icon-subtle"
              onClick={() => onShare(article)}
            >
              <Share2 size={15} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Executive Bullets */}
        {article.bullets && article.bullets.length > 0 && (
          <div className="high-signal-bullets" style={{ marginBottom: '22px' }}>
            <div className="bullet-title">Key Executive Takeaways</div>
            {article.bullets.map((b, i) => (
              <div key={i} className="bullet-item">{b}</div>
            ))}
          </div>
        )}

        {/* Why it matters to your portfolio */}
        {article.whyItMatters && (
          <div
            style={{
              padding: '14px 16px',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-card)',
              borderRadius: '4px',
              marginBottom: '22px',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: '800', color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Portfolio Impact Analysis
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-primary)', lineHeight: 1.5 }}>
              {article.whyItMatters}
            </p>
          </div>
        )}

        {/* Detailed Breakdown */}
        <div style={{ fontSize: '0.94rem', lineHeight: 1.65, color: 'var(--ink-secondary)', whiteSpace: 'pre-line', marginBottom: '24px' }}>
          {article.content}
        </div>

        {/* Noise Filtered Badge */}
        {article.noiseFiltered && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.76rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-green)',
              padding: '10px 14px',
              background: 'var(--bg-muted)',
              border: '1px dashed var(--accent-green)',
              borderRadius: '4px',
            }}
          >
            <ShieldCheck size={16} />
            <span><strong>Noise Filter Applied:</strong> {article.noiseFiltered}</span>
          </div>
        )}

        {/* Tickers */}
        {article.tickers && (
          <div style={{ marginTop: '18px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {article.tickers.map((t) => (
              <span key={t} className="ticker-badge">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
