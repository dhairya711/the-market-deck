import React, { useState } from 'react';
import {
  GraduationCap,
  Trophy,
  Swords,
  BookOpen,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import {
  financeGlossary,
  financeQuizLevels,
  higherReturnDuels,
} from '../data/financeEducationData';

export function FinanceZeroToHero() {
  const [activeTab, setActiveTab] = useState('game'); // 'game' | 'duels' | 'masterclass'

  // Game / Quiz State
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [streak, setStreak] = useState(0);

  // Duels State
  const [selectedDuelIdx, setSelectedDuelIdx] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [duelRevealed, setDuelRevealed] = useState(false);

  // Masterclass Concept State
  const [selectedConceptKey, setSelectedConceptKey] = useState('liquidFund');

  const currentLevel = financeQuizLevels[currentLevelIdx];
  const currentDuel = higherReturnDuels[selectedDuelIdx];
  const currentConcept = financeGlossary[selectedConceptKey];

  // Handle Option Selection in Game
  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);

    const isCorrect = currentLevel.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 100 + streak * 20);
      setStreak((prev) => prev + 1);
      if (!completedLevels.includes(currentLevel.level)) {
        setCompletedLevels([...completedLevels, currentLevel.level]);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextLevel = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    if (currentLevelIdx < financeQuizLevels.length - 1) {
      setCurrentLevelIdx((prev) => prev + 1);
    } else {
      // Reached the top!
      setCurrentLevelIdx(0);
    }
  };

  const handleResetGame = () => {
    setCurrentLevelIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setCompletedLevels([]);
  };

  // Handle Duel Guess
  const handleDuelGuess = (choice) => {
    setUserGuess(choice);
    setDuelRevealed(true);
  };

  const handleNextDuel = () => {
    setUserGuess(null);
    setDuelRevealed(false);
    setSelectedDuelIdx((prev) => (prev + 1) % higherReturnDuels.length);
  };

  return (
    <section className="finance-academy-section" id="finance-game" style={{ marginTop: '36px', marginBottom: '40px' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border-strong)',
          padding: '24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border-strong)', paddingBottom: '16px', marginBottom: '22px' }}>
          <div className="section-meta-label" style={{ justifyContent: 'center', marginBottom: '6px' }}>
            ACADEMY & ARENA • INTERACTIVE FINANCE MASTERY
          </div>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2.1rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Finance: Zero-to-Hero Academy
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--ink-secondary)', maxWidth: '750px', margin: '4px auto 0 auto' }}>
            Master investing from the ground up: understand what Liquid Funds, SIPs, and Fixed Deposits really do, discover what gives higher returns, and level up from novice saver to Dalal Street hero.
          </p>

          {/* Navigation Mode Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'game' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('game')}
            >
              <Trophy size={14} />
              <span>Zero-to-Hero Quest (Level Quiz)</span>
            </button>

            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'duels' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('duels')}
            >
              <Swords size={14} />
              <span>Higher Return Duels (What Gives More?)</span>
            </button>

            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'masterclass' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('masterclass')}
            >
              <BookOpen size={14} />
              <span>The Financial Instruments Masterclass</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: ZERO-TO-HERO QUEST (LEVEL GAME)
            ========================================================================= */}
        {activeTab === 'game' && (
          <div>
            {/* Score & Level Ribbon */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                background: 'var(--bg-muted)',
                padding: '12px 18px',
                borderRadius: '4px',
                marginBottom: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
              }}
            >
              <div>
                <span style={{ color: 'var(--ink-muted)' }}>CURRENT RANK: </span>
                <strong style={{ color: 'var(--accent-red)' }}>{currentLevel.badge}</strong>
                <span style={{ marginLeft: '12px', color: 'var(--ink-muted)' }}>
                  (Level {currentLevel.level} of {financeQuizLevels.length})
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div>
                  <span style={{ color: 'var(--ink-muted)' }}>XP SCORE: </span>
                  <strong>{score} pts</strong>
                </div>
                {streak > 1 && (
                  <div style={{ color: 'var(--accent-green)', fontWeight: 800 }}>
                    🔥 {streak}x Streak!
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleResetGame}
                  className="btn-newspaper"
                  style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                  title="Reset Game"
                >
                  <RefreshCw size={11} />
                  <span>Restart</span>
                </button>
              </div>
            </div>

            {/* Level Question Box */}
            <div
              style={{
                background: 'var(--bg-page)',
                border: '1px solid var(--border-strong)',
                padding: '24px',
                borderRadius: '4px',
                marginBottom: '20px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--accent-blue)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                LEVEL {currentLevel.level} MISSION • {currentLevel.levelName}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 800, lineHeight: 1.4, marginBottom: '20px' }}>
                {currentLevel.question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {currentLevel.options.map((opt, oIdx) => {
                  let borderStyle = '1px solid var(--border-light)';
                  let bgStyle = 'var(--bg-card)';
                  let icon = null;

                  if (showFeedback) {
                    if (opt.isCorrect) {
                      borderStyle = '2px solid var(--accent-green)';
                      bgStyle = 'rgba(16, 185, 129, 0.08)';
                      icon = <CheckCircle2 size={18} color="var(--accent-green)" />;
                    } else if (selectedOption === oIdx) {
                      borderStyle = '2px solid var(--accent-red)';
                      bgStyle = 'rgba(239, 68, 68, 0.08)';
                      icon = <XCircle size={18} color="var(--accent-red)" />;
                    }
                  } else if (selectedOption === oIdx) {
                    borderStyle = '2px solid var(--border-strong)';
                  }

                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        background: bgStyle,
                        border: borderStyle,
                        borderRadius: '4px',
                        cursor: showFeedback ? 'default' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!showFeedback) e.currentTarget.style.background = 'var(--bg-muted)';
                      }}
                      onMouseLeave={(e) => {
                        if (!showFeedback && selectedOption !== oIdx) e.currentTarget.style.background = 'var(--bg-card)';
                      }}
                    >
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--ink-primary)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', marginRight: '10px', color: 'var(--ink-muted)' }}>
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        {opt.text}
                      </div>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {/* Feedback and Axiom Box */}
              {showFeedback && (
                <div
                  style={{
                    background: currentLevel.options[selectedOption]?.isCorrect
                      ? 'rgba(16, 185, 129, 0.08)'
                      : 'rgba(239, 68, 68, 0.08)',
                    border: `1px solid ${currentLevel.options[selectedOption]?.isCorrect ? 'var(--accent-green)' : 'var(--accent-red)'}`,
                    padding: '16px 20px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.92rem', color: currentLevel.options[selectedOption]?.isCorrect ? 'var(--accent-green)' : 'var(--accent-red)', marginBottom: '4px' }}>
                    {currentLevel.options[selectedOption]?.isCorrect ? '🎉 Correct Decision!' : '⚠️ Caution & Learning Point:'}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-primary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {currentLevel.options[selectedOption]?.feedback}
                  </p>
                  <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--ink-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '8px' }}>
                    <strong>Golden Axiom:</strong> "{currentLevel.axiom}"
                  </div>
                </div>
              )}

              {/* Next Level Button */}
              {showFeedback && (
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn-newspaper btn-primary-dark"
                    onClick={handleNextLevel}
                    style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                  >
                    <span>{currentLevelIdx < financeQuizLevels.length - 1 ? 'Next Level Mission →' : '🏆 Complete Academy & Celebrate!'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: HIGHER RETURN DUELS (WHAT GIVES MORE?)
            ========================================================================= */}
        {activeTab === 'duels' && (
          <div>
            {/* Duel Selector Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
              {higherReturnDuels.map((d, dIdx) => (
                <button
                  key={d.id}
                  type="button"
                  className={`ticker-badge ${selectedDuelIdx === dIdx ? 'active' : ''}`}
                  style={{
                    cursor: 'pointer',
                    padding: '5px 12px',
                    fontSize: '0.78rem',
                    background: selectedDuelIdx === dIdx ? 'var(--border-strong)' : 'var(--bg-muted)',
                    color: selectedDuelIdx === dIdx ? 'var(--bg-card)' : 'var(--ink-primary)',
                  }}
                  onClick={() => {
                    setSelectedDuelIdx(dIdx);
                    setUserGuess(null);
                    setDuelRevealed(false);
                  }}
                >
                  Duel #{dIdx + 1}: {d.assetA.name.split(' ')[0]} vs {d.assetB.name.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Arena Duel Card */}
            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-strong)', padding: '24px', borderRadius: '4px' }}>
              <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                <span className="ticker-badge" style={{ background: 'var(--accent-red)', color: '#fff', fontSize: '0.72rem' }}>
                  ⚔️ RETURN DUEL ARENA
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 800, marginTop: '6px' }}>
                  {currentDuel.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', maxWidth: '640px', margin: '4px auto 0 auto' }}>
                  {currentDuel.question}
                </p>
              </div>

              {/* Side-by-Side Contenders */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                {/* Contender A */}
                <div
                  onClick={() => !duelRevealed && handleDuelGuess('A')}
                  style={{
                    background: 'var(--bg-card)',
                    border: userGuess === 'A' ? '2px solid var(--border-strong)' : '1px solid var(--border-light)',
                    padding: '18px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    cursor: duelRevealed ? 'default' : 'pointer',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>CONTENDER A</div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, margin: '6px 0' }}>
                    {currentDuel.assetA.name}
                  </h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent-blue)', fontWeight: 700 }}>
                    {currentDuel.assetA.annualReturn}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
                    Risk: {currentDuel.assetA.risk}
                  </div>

                  {!duelRevealed && (
                    <button type="button" className="btn-newspaper" style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}>
                      Bet on Option A
                    </button>
                  )}
                </div>

                {/* VS Badge */}
                <div style={{ fontFamily: 'var(--font-masthead)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-red)' }}>
                  VS
                </div>

                {/* Contender B */}
                <div
                  onClick={() => !duelRevealed && handleDuelGuess('B')}
                  style={{
                    background: 'var(--bg-card)',
                    border: userGuess === 'B' ? '2px solid var(--border-strong)' : '1px solid var(--border-light)',
                    padding: '18px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    cursor: duelRevealed ? 'default' : 'pointer',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)' }}>CONTENDER B</div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 800, margin: '6px 0' }}>
                    {currentDuel.assetB.name}
                  </h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                    {currentDuel.assetB.annualReturn}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
                    Risk: {currentDuel.assetB.risk}
                  </div>

                  {!duelRevealed && (
                    <button type="button" className="btn-newspaper btn-primary-dark" style={{ width: '100%', marginTop: '12px', justifyContent: 'center' }}>
                      Bet on Option B
                    </button>
                  )}
                </div>
              </div>

              {/* Reveal Result Box */}
              {duelRevealed && (
                <div
                  style={{
                    background: 'var(--bg-muted)',
                    border: '2px dashed var(--border-strong)',
                    padding: '18px 22px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                    <Trophy size={16} />
                    <span>WINNER: {currentDuel.winner === 'B' ? currentDuel.assetB.name : currentDuel.assetA.name}</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    <div style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                      <strong>{currentDuel.assetA.name}:</strong>
                      <div>{currentDuel.outcomeA}</div>
                    </div>
                    <div style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: '4px', border: '1px solid var(--border-light)' }}>
                      <strong>{currentDuel.assetB.name}:</strong>
                      <div>{currentDuel.outcomeB}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-red)', marginBottom: '8px' }}>
                    📊 {currentDuel.difference}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: 1.45 }}>
                    <strong>Strategic Lesson:</strong> {currentDuel.takeaway}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <button type="button" className="btn-newspaper" onClick={handleNextDuel}>
                      <span>Try Next Duel Challenge →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: THE FINANCIAL INSTRUMENTS MASTERCLASS (CONCEPTS)
            ========================================================================= */}
        {activeTab === 'masterclass' && (
          <div>
            {/* Concept Selector Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
              {Object.entries(financeGlossary).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  className={`btn-newspaper ${selectedConceptKey === key ? 'btn-primary-dark' : ''}`}
                  onClick={() => setSelectedConceptKey(key)}
                  style={{ fontSize: '0.78rem' }}
                >
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            {/* Selected Concept Deep-Dive Card */}
            <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border-strong)', padding: '24px', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-light)', paddingBottom: '14px', marginBottom: '16px' }}>
                <div>
                  <span className="ticker-badge" style={{ fontSize: '0.72rem', background: 'var(--border-strong)', color: 'var(--bg-card)' }}>
                    {currentConcept.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 800, marginTop: '4px' }}>
                    {currentConcept.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--accent-red)', fontWeight: 600, fontStyle: 'italic' }}>
                    "{currentConcept.oneLiner}"
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <div style={{ background: 'var(--bg-card)', padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: '4px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.66rem', color: 'var(--ink-muted)', display: 'block', fontFamily: 'var(--font-mono)' }}>EXPECTED RETURN</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--accent-green)' }}>{currentConcept.expectedReturn}</strong>
                  </div>
                  <div style={{ background: 'var(--bg-card)', padding: '8px 12px', border: '1px solid var(--border-light)', borderRadius: '4px', textAlign: 'right' }}>
                    <span style={{ fontSize: '0.66rem', color: 'var(--ink-muted)', display: 'block', fontFamily: 'var(--font-mono)' }}>LOCK-IN PERIOD</span>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{currentConcept.lockIn}</strong>
                  </div>
                </div>
              </div>

              {/* In-Depth Explanation */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--accent-blue)', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  What Exactly Is It & How It Works
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-primary)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                  {currentConcept.explanation}
                </p>
              </div>

              {/* Tactical Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '18px' }}>
                {currentConcept.whyBetterThanSavings && (
                  <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid var(--accent-green)', padding: '14px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      ⚡ THE EDGE OVER SAVINGS / TRADITIONAL CASH
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                      {currentConcept.whyBetterThanSavings}
                    </p>
                  </div>
                )}

                {currentConcept.mathExample && (
                  <div style={{ background: 'rgba(59, 130, 246, 0.06)', border: '1px solid var(--accent-blue)', padding: '14px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      📈 REAL WEALTH COMPOUNDING MATH
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                      {currentConcept.mathExample}
                    </p>
                  </div>
                )}

                {currentConcept.taxation && (
                  <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', padding: '14px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                      ⚖️ TAXATION & DEDUCTIONS
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: 1.45 }}>
                      {currentConcept.taxation}
                    </p>
                  </div>
                )}
              </div>

              {/* Best For Summary */}
              <div style={{ background: 'var(--bg-muted)', padding: '12px 16px', borderRadius: '4px', borderLeft: '4px solid var(--border-strong)' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
                  WHO SHOULD USE THIS:
                </span>
                <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--ink-primary)', marginTop: '2px' }}>
                  {currentConcept.bestFor}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
