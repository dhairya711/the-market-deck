import React, { useState, useEffect } from 'react';
import { X, Zap, Volume2, VolumeX, CheckCircle } from 'lucide-react';

export function CatchMeUpModal({ stories, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Synthesize top 4 stories into ultra punchy executive bullets
  const topBriefings = stories.slice(0, 4).map((s) => ({
    title: s.title,
    takeaway: s.bullets ? s.bullets[0] : s.summary,
    ticker: s.tickers ? s.tickers[0] : null,
  }));

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script = `Good day. Here is your 60-second TFG high-signal market dossier. First, ${topBriefings.map((b, i) => `Point ${i + 1}: ${b.title}. ${b.takeaway}`).join('. Next, ')}. You are now fully caught up on your portfolio. Have high conviction today.`;

    const utterance = new SpeechSynthesisUtterance(script);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handleClose = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
    }
    onClose();
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Zap size={22} color="#f59e0b" fill="#f59e0b" />
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '1.7rem', fontWeight: 900 }}>
            60-SECOND CATCH ME UP
          </h2>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', marginBottom: '18px' }}>
          Pure signal. Zero filler. The 4 critical things impacting your capital right now.
        </p>

        {/* Audio Narrator Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'var(--bg-muted)',
            borderRadius: '4px',
            border: '1px solid var(--border-strong)',
            marginBottom: '20px',
          }}
        >
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>
              🎙️ AI Executive Audio Briefing
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
              Natural speech synthesis readout of today's key moves
            </div>
          </div>

          <button
            className="btn-newspaper btn-catch-up"
            onClick={handleToggleAudio}
          >
            {isPlaying ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isPlaying ? 'Pause Audio' : 'Play Audio Briefing'}</span>
          </button>
        </div>

        {/* 4 Key Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {topBriefings.map((b, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '12px',
                padding: '12px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderLeft: '4px solid var(--accent-red)',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  color: 'var(--accent-red)',
                }}
              >
                0{idx + 1}
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  {b.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                  {b.takeaway}
                </p>
                {b.ticker && (
                  <span className="ticker-badge" style={{ marginTop: '6px', display: 'inline-block' }}>
                    {b.ticker}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn-newspaper btn-primary-dark" onClick={handleClose}>
            <CheckCircle size={14} />
            <span>I Am Caught Up, Back To Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
