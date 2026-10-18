import React, { useState, useEffect } from 'react';
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
  Shuffle,
  AlertTriangle,
  Flame,
  Calculator,
  Check,
  ChevronRight,
} from 'lucide-react';
import {
  financeGlossary,
  masterQuizQuestionBank,
  getRandomizedQuiz,
  higherReturnDuels,
} from '../data/financeEducationData';

export function FinanceZeroToHero() {
  // Default to 'learn' as requested: learn FIRST, then play
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'quiz' | 'duels'

  // Masterclass Concept State
  const [selectedConceptKey, setSelectedConceptKey] = useState('sip');

  // Interactive SIP Calculator inside Learn section
  const [calcMonthly, setCalcMonthly] = useState(5000);
  const [calcYears, setCalcYears] = useState(15);
  const [calcRate, setCalcRate] = useState(13.5);

  // Interactive FD Post-Tax Calculator inside Learn section
  const [fdInterestRate, setFdInterestRate] = useState(7.0);
  const [taxSlab, setTaxSlab] = useState(30);
  const [inflationRate, setInflationRate] = useState(5.5);

  // Quiz / Game State: initialized with randomized questions!
  const [quizQuestions, setQuizQuestions] = useState(() => getRandomizedQuiz(10));
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  // Duels State
  const [selectedDuelIdx, setSelectedDuelIdx] = useState(0);
  const [userGuess, setUserGuess] = useState(null);
  const [duelRevealed, setDuelRevealed] = useState(false);

  const currentConcept = financeGlossary[selectedConceptKey] || financeGlossary.sip;
  const currentQuestion = quizQuestions[currentQuestionIdx];
  const currentDuel = higherReturnDuels[selectedDuelIdx];

  // Helper to start a fresh randomized quiz session
  const handleShuffleNewQuiz = () => {
    setQuizQuestions(getRandomizedQuiz(10));
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setCompletedCount(0);
  };

  // Handle Option Selection in Quiz
  const handleSelectOption = (idx) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);

    const isCorrect = currentQuestion.options[idx].isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 100 + streak * 25);
      setStreak((prev) => prev + 1);
      setCompletedCount((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Reached the end of this random 10-question set; generate a new fresh set!
      setQuizQuestions(getRandomizedQuiz(10));
      setCurrentQuestionIdx(0);
    }
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

  // SIP Compound Math Helper
  const calculateSipResult = () => {
    const months = calcYears * 12;
    const r = calcRate / 100 / 12;
    const futureVal = calcMonthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
    const invested = calcMonthly * months;
    return {
      invested: Math.round(invested),
      futureVal: Math.round(futureVal),
      gain: Math.round(futureVal - invested),
    };
  };

  // FD Post-Tax Math Helper
  const calculateFdResult = () => {
    const postTaxReturn = fdInterestRate * (1 - taxSlab / 100);
    const realReturn = postTaxReturn - inflationRate;
    return {
      postTax: postTaxReturn.toFixed(2),
      real: realReturn.toFixed(2),
      isNegative: realReturn < 0,
    };
  };

  const sipRes = calculateSipResult();
  const fdRes = calculateFdResult();

  const conceptKeys = [
    { key: 'sip', label: '1. SIP Mechanics' },
    { key: 'fixedDeposit', label: '2. Bank FD Reality' },
    { key: 'largeCap', label: '3. Large Cap Index' },
    { key: 'midCap', label: '4. Mid Cap Funds' },
    { key: 'smallCap', label: '5. Small Cap Funds' },
    { key: 'licVsTerm', label: '6. LIC vs Term Plan' },
    { key: 'stocksValuation', label: '7. Stock Valuation (P/E)' },
    { key: 'ppf', label: '8. PPF (100% Tax-Free)' },
    { key: 'sgbGold', label: '9. Sovereign Gold Bonds' },
    { key: 'liquidFunds', label: '10. Liquid Cash Funds' },
  ];

  return (
    <section className="finance-academy-section" id="finance-game" style={{ marginTop: '28px', marginBottom: '40px' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border-strong)',
          padding: '24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Masthead Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid var(--border-strong)', paddingBottom: '18px', marginBottom: '22px' }}>
          <div className="section-meta-label" style={{ justifyContent: 'center', marginBottom: '6px' }}>
            CAPITAL LITERACY FIRST • INTERACTIVE WEALTH ARENA
          </div>
          <h2 style={{ fontFamily: 'var(--font-masthead)', fontSize: '2.15rem', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
            Finance: Zero-to-Hero Academy
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.96rem', color: 'var(--ink-secondary)', maxWidth: '780px', margin: '4px auto 0 auto' }}>
            First learn how SIPs, Bank FDs, Small/Mid/Large Cap Funds, Stocks, and LIC policies truly work with visual math. Then test your mastery with randomized Dalal Street challenges and return duels.
          </p>

          {/* Primary Section Switcher (Learn First, then Play) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'learn' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('learn')}
              style={{ fontWeight: activeTab === 'learn' ? 900 : 700 }}
            >
              <BookOpen size={15} />
              <span>1. LEARN CAPITAL CONCEPTS (START HERE)</span>
            </button>

            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'quiz' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('quiz')}
              style={{ fontWeight: activeTab === 'quiz' ? 900 : 700 }}
            >
              <Trophy size={15} />
              <span>2. PLAY & TEST: ZERO-TO-HERO QUEST (RANDOM QUIZ)</span>
            </button>

            <button
              type="button"
              className={`btn-newspaper ${activeTab === 'duels' ? 'btn-primary-dark' : ''}`}
              onClick={() => setActiveTab('duels')}
              style={{ fontWeight: activeTab === 'duels' ? 900 : 700 }}
            >
              <Swords size={15} />
              <span>3. HIGHER RETURN DUELS (BET & REVEAL)</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: LEARN CAPITAL CONCEPTS (LEARN FIRST!)
            ========================================================================= */}
        {activeTab === 'learn' && (
          <div>
            {/* Concept Selector Strip */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '8px', textTransform: 'uppercase' }}>
                SELECT CONCEPT TO STUDY:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {conceptKeys.map((c) => {
                  const isActive = selectedConceptKey === c.key;
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSelectedConceptKey(c.key)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '3px',
                        border: isActive ? '2px solid var(--accent-red)' : '1px solid var(--border-strong)',
                        background: isActive ? 'var(--bg-muted)' : 'var(--bg-page)',
                        color: isActive ? 'var(--accent-red)' : 'var(--ink-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: isActive ? 900 : 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Concept Dossier Card */}
            <div
              style={{
                background: 'var(--bg-page)',
                border: '1px solid var(--border-strong)',
                borderRadius: '4px',
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              {/* Concept Title & Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', borderBottom: '2px solid var(--border-strong)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                      {currentConcept.category.toUpperCase()}
                    </span>
                    <span className="ticker-badge" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {currentConcept.badge}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 900, margin: '2px 0 6px 0' }}>
                    {currentConcept.title}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--ink-secondary)' }}>
                    "{currentConcept.oneLiner}"
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-newspaper btn-primary-dark"
                  onClick={() => setActiveTab('quiz')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px' }}
                >
                  <Trophy size={14} />
                  <span>Test Knowledge in Quiz</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* 4 Essential Metric Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  background: 'var(--bg-muted)',
                  padding: '14px',
                  borderRadius: '4px',
                  marginBottom: '22px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>EXPECTED RETURN</span>
                  <strong style={{ color: 'var(--accent-green)', fontSize: '0.9rem' }}>{currentConcept.expectedReturn}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>RISK / VOLATILITY</span>
                  <strong style={{ color: 'var(--accent-red)', fontSize: '0.9rem' }}>{currentConcept.riskLevel}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>LOCK-IN PERIOD</span>
                  <strong style={{ color: 'var(--ink-primary)', fontSize: '0.9rem' }}>{currentConcept.lockIn}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--ink-muted)', display: 'block', fontSize: '0.68rem' }}>TAXATION RULES</span>
                  <strong style={{ color: 'var(--accent-blue)', fontSize: '0.82rem' }}>{currentConcept.taxation}</strong>
                </div>
              </div>

              {/* Core Explanation */}
              <div style={{ marginBottom: '22px' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '8px', letterSpacing: '0.06em' }}>
                  CORE EXPLANATION & MECHANISM:
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-primary)', lineHeight: '1.65', margin: 0 }}>
                  {currentConcept.explanation}
                </p>
              </div>

              {/* How It Actually Works: Step-by-Step */}
              {currentConcept.howItWorks && (
                <div style={{ marginBottom: '22px' }}>
                  <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '10px', letterSpacing: '0.06em' }}>
                    HOW IT ACTUALLY WORKS IN PRACTICE:
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                    {currentConcept.howItWorks.map((step, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-light)',
                          padding: '12px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                        }}
                      >
                        <span style={{ background: 'var(--bg-muted)', border: '1px solid var(--border-strong)', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 900, flexShrink: 0, fontFamily: 'var(--font-mono)' }}>
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)', lineHeight: '1.45' }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Real Math Calculation & Traps Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '22px' }}>
                {/* Math Card */}
                <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border-strong)', borderLeft: '4px solid var(--accent-green)', padding: '16px', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '6px' }}>
                    <Calculator size={15} />
                    <span>THE REAL COMPOUNDING MATH:</span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: '1.5', margin: 0, fontFamily: 'var(--font-mono)' }}>
                    {currentConcept.theMath}
                  </p>
                </div>

                {/* Common Traps Card */}
                <div style={{ background: 'var(--bg-muted)', border: '1px solid var(--border-strong)', borderLeft: '4px solid var(--accent-red)', padding: '16px', borderRadius: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '6px' }}>
                    <AlertTriangle size={15} />
                    <span>COMMON TRAPS & MYTHS BUSTED:</span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--ink-primary)', lineHeight: '1.5', margin: 0 }}>
                    {currentConcept.commonTraps}
                  </p>
                </div>
              </div>

              {/* Best For Tagline */}
              <div style={{ background: 'var(--bg-card)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--border-light)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--ink-muted)' }}>WHO THIS IS BEST FOR: </span>
                <strong style={{ color: 'var(--ink-primary)' }}>{currentConcept.bestFor}</strong>
              </div>
            </div>

            {/* Interactive Embedded Mini-Calculator for Hands-On Learning */}
            <div style={{ background: 'var(--bg-page)', border: '2px solid var(--border-strong)', borderRadius: '4px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Sparkles size={17} style={{ color: 'var(--accent-red)' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Hands-On Learning Simulator: {selectedConceptKey === 'fixedDeposit' ? 'Bank FD Post-Tax Inflation Drag' : 'Systematic Compounding Visualizer'}
                </h4>
              </div>

              {selectedConceptKey === 'fixedDeposit' ? (
                // FD Post-Tax vs Inflation Calculator
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                        FD Gross Interest: <strong>{fdInterestRate}% p.a.</strong>
                      </label>
                      <input
                        type="range"
                        min="5.0"
                        max="9.0"
                        step="0.1"
                        value={fdInterestRate}
                        onChange={(e) => setFdInterestRate(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                        Your Income Tax Slab: <strong>{taxSlab}%</strong>
                      </label>
                      <select
                        value={taxSlab}
                        onChange={(e) => setTaxSlab(Number(e.target.value))}
                        style={{ width: '100%', padding: '6px', fontFamily: 'var(--font-mono)', background: 'var(--bg-card)', color: 'var(--ink-primary)', border: '1px solid var(--border-strong)' }}
                      >
                        <option value={0}>0% (Tax Free / Student)</option>
                        <option value={10}>10% Slab</option>
                        <option value={20}>20% Slab</option>
                        <option value={30}>30% Slab (Peak Tax)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                        Expected Annual CPI Inflation: <strong>{inflationRate}%</strong>
                      </label>
                      <input
                        type="range"
                        min="4.0"
                        max="8.0"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'var(--bg-muted)', padding: '14px', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>NOMINAL FD RATE:</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{fdInterestRate}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>AFTER-TAX RETURN:</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--ink-primary)' }}>{fdRes.postTax}%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>REAL WEALTH GROWTH:</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: fdRes.isNegative ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                        {fdRes.real > 0 ? `+${fdRes.real}%` : `${fdRes.real}%`}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: fdRes.isNegative ? 'var(--accent-red)' : 'var(--accent-green)' }}>
                        {fdRes.isNegative ? 'Losing purchasing power!' : 'Beating inflation'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // SIP Compounding Calculator
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                        Monthly SIP Amount: <strong>₹{calcMonthly.toLocaleString('en-IN')}</strong>
                      </label>
                      <input
                        type="range"
                        min="1000"
                        max="50000"
                        step="1000"
                        value={calcMonthly}
                        onChange={(e) => setCalcMonthly(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                        Investment Tenure: <strong>{calcYears} Years</strong>
                      </label>
                      <input
                        type="range"
                        min="3"
                        max="30"
                        step="1"
                        value={calcYears}
                        onChange={(e) => setCalcYears(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', display: 'block', marginBottom: '4px' }}>
                        Expected CAGR Return: <strong>{calcRate}% p.a.</strong>
                      </label>
                      <input
                        type="range"
                        min="6.0"
                        max="22.0"
                        step="0.5"
                        value={calcRate}
                        onChange={(e) => setCalcRate(Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'var(--bg-muted)', padding: '14px', borderRadius: '4px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>TOTAL INVESTED:</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>₹{sipRes.invested.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>COMPOUNDED PROFIT:</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-green)' }}>+₹{sipRes.gain.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--ink-muted)' }}>FINAL WEALTH:</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--accent-blue)' }}>₹{sipRes.futureVal.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: PLAY & TEST: ZERO-TO-HERO QUEST (RANDOMIZED QUIZ!)
            ========================================================================= */}
        {activeTab === 'quiz' && currentQuestion && (
          <div>
            {/* Top Game Ribbon: Score, Streak, Shuffle */}
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
                <span style={{ color: 'var(--ink-muted)' }}>QUESTION: </span>
                <strong style={{ color: 'var(--accent-red)' }}>
                  {currentQuestionIdx + 1} of {quizQuestions.length}
                </strong>
                <span style={{ marginLeft: '10px', color: 'var(--ink-muted)' }}>
                  [{currentQuestion.topic}]
                </span>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <div>
                  <span style={{ color: 'var(--ink-muted)' }}>XP SCORE: </span>
                  <strong style={{ color: 'var(--accent-green)' }}>{score} pts</strong>
                </div>

                {streak > 1 && (
                  <div style={{ color: 'var(--accent-green)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Flame size={14} />
                    <span>{streak}x Streak!</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleShuffleNewQuiz}
                  className="btn-newspaper"
                  style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  title="Shuffle 10 New Random Questions"
                >
                  <Shuffle size={12} />
                  <span>Randomize Set</span>
                </button>
              </div>
            </div>

            {/* Question Card */}
            <div
              style={{
                background: 'var(--bg-page)',
                border: '1px solid var(--border-strong)',
                borderRadius: '4px',
                padding: '24px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                  {currentQuestion.badge}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', fontWeight: 800, lineHeight: '1.4', marginBottom: '20px' }}>
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let optStyle = {
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-strong)',
                    background: 'var(--bg-card)',
                    color: 'var(--ink-primary)',
                    textAlign: 'left',
                    cursor: showFeedback ? 'default' : 'pointer',
                    fontSize: '0.9rem',
                    transition: 'all 0.15s ease',
                  };

                  if (showFeedback) {
                    if (opt.isCorrect) {
                      optStyle.background = 'rgba(16, 185, 129, 0.12)';
                      optStyle.border = '2px solid var(--accent-green)';
                      optStyle.color = 'var(--accent-green)';
                      optStyle.fontWeight = 800;
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle.background = 'rgba(239, 68, 68, 0.12)';
                      optStyle.border = '2px solid var(--accent-red)';
                      optStyle.color = 'var(--accent-red)';
                    }
                  } else if (isSelected) {
                    optStyle.border = '2px solid var(--accent-red)';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={showFeedback}
                      onClick={() => handleSelectOption(idx)}
                      style={optStyle}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '1px solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          flexShrink: 0,
                          background: 'var(--bg-muted)',
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span style={{ lineHeight: '1.45' }}>{opt.text}</span>
                      {showFeedback && opt.isCorrect && (
                        <CheckCircle2 size={18} style={{ color: 'var(--accent-green)', marginLeft: 'auto', flexShrink: 0 }} />
                      )}
                      {showFeedback && isSelected && !opt.isCorrect && (
                        <XCircle size={18} style={{ color: 'var(--accent-red)', marginLeft: 'auto', flexShrink: 0 }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Reveal Card */}
              {showFeedback && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '16px',
                    borderRadius: '4px',
                    background: 'var(--bg-muted)',
                    borderLeft: selectedOption !== null && currentQuestion.options[selectedOption].isCorrect
                      ? '4px solid var(--accent-green)'
                      : '4px solid var(--accent-red)',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '6px', color: currentQuestion.options[selectedOption].isCorrect ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {currentQuestion.options[selectedOption].isCorrect ? '✓ CORRECT ANSWER!' : '✗ INCORRECT!'}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--ink-secondary)', margin: '0 0 10px 0', lineHeight: '1.45' }}>
                    {currentQuestion.options[selectedOption].feedback}
                  </p>

                  <div style={{ fontSize: '0.78rem', fontStyle: 'italic', color: 'var(--ink-primary)', borderTop: '1px dashed var(--border-light)', paddingTop: '8px' }}>
                    <strong>Axiom to Remember: </strong>{currentQuestion.axiom}
                  </div>

                  <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn-newspaper btn-primary-dark"
                      onClick={handleNextQuestion}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px' }}
                    >
                      <span>{currentQuestionIdx < quizQuestions.length - 1 ? 'Next Question' : 'Complete Set & Roll New 10'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: HIGHER RETURN DUELS (BET & REVEAL)
            ========================================================================= */}
        {activeTab === 'duels' && currentDuel && (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 20px auto' }}>
              <div style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)', marginBottom: '4px' }}>
                HEAD-TO-HEAD WEALTH RACE • DUEL {selectedDuelIdx + 1} OF {higherReturnDuels.length}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', fontWeight: 900, margin: '0 0 8px 0' }}>
                {currentDuel.title}
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)' }}>
                {currentDuel.question}
              </p>
            </div>

            {/* The 2 Contenders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '780px', margin: '0 auto 20px auto' }}>
              {/* Contender A */}
              <div
                style={{
                  background: 'var(--bg-page)',
                  border: userGuess === 'A' ? '2px solid var(--accent-red)' : '1px solid var(--border-strong)',
                  padding: '20px',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                  CONTENDER A
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, margin: '6px 0 10px 0' }}>
                  {currentDuel.assetA.name}
                </h4>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginBottom: '14px' }}>
                  Annual Benchmark: <strong>{currentDuel.assetA.annualReturn}</strong>
                </div>

                {!duelRevealed ? (
                  <button
                    type="button"
                    className="btn-newspaper"
                    style={{ width: '100%', padding: '10px', fontWeight: 800 }}
                    onClick={() => handleDuelGuess('A')}
                  >
                    Bet on Contender A
                  </button>
                ) : (
                  <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    {currentDuel.outcomeA}
                  </div>
                )}
              </div>

              {/* Contender B */}
              <div
                style={{
                  background: 'var(--bg-page)',
                  border: userGuess === 'B' ? '2px solid var(--accent-red)' : '1px solid var(--border-strong)',
                  padding: '20px',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
                  CONTENDER B
                </div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, margin: '6px 0 10px 0' }}>
                  {currentDuel.assetB.name}
                </h4>
                <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)', marginBottom: '14px' }}>
                  Annual Benchmark: <strong>{currentDuel.assetB.annualReturn}</strong>
                </div>

                {!duelRevealed ? (
                  <button
                    type="button"
                    className="btn-newspaper"
                    style={{ width: '100%', padding: '10px', fontWeight: 800 }}
                    onClick={() => handleDuelGuess('B')}
                  >
                    Bet on Contender B
                  </button>
                ) : (
                  <div style={{ background: 'var(--bg-muted)', padding: '10px', borderRadius: '4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    {currentDuel.outcomeB}
                  </div>
                )}
              </div>
            </div>

            {/* Duel Result Card */}
            {duelRevealed && (
              <div
                style={{
                  maxWidth: '780px',
                  margin: '0 auto',
                  background: 'var(--bg-muted)',
                  border: '2px solid var(--border-strong)',
                  borderLeft: '5px solid var(--accent-green)',
                  padding: '20px',
                  borderRadius: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 900, fontSize: '1.1rem', marginBottom: '8px' }}>
                  <CheckCircle2 size={20} />
                  <span>WINNER: CONTENDER {currentDuel.winner} DELIVERS HIGHER WEALTH!</span>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--ink-primary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                  {currentDuel.difference}
                </div>

                <div style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', fontStyle: 'italic', borderTop: '1px dashed var(--border-light)', paddingTop: '10px' }}>
                  <strong>Dalal Street Lesson: </strong>{currentDuel.takeaway}
                </div>

                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="btn-newspaper btn-primary-dark"
                    onClick={handleNextDuel}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  >
                    <span>Next Duel</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default FinanceZeroToHero;
