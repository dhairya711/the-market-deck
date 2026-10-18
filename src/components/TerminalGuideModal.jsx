import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Compass,
  ArrowDown,
  ArrowUp,
  Sparkles,
  MousePointerClick,
  CheckCircle,
  Crosshair,
  Newspaper,
  TrendingUp,
  BarChart2,
  Scale,
  Landmark,
  GraduationCap,
  Gamepad2,
} from 'lucide-react';

export function TerminalGuideModal({ isOpen, onClose, onNavigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const cardRef = useRef(null);

  // 7 High-Impact Buttons to Spotlight on the Actual Screen (Strictly <= 8 steps)
  const steps = [
    {
      id: 'page-all-news',
      targetId: 'tour-page-all-news',
      page: 'all-news',
      subTab: null,
      badge: 'STEP 1 OF 7 • ALL NEWS BROADSHEET',
      buttonLabel: '1. All News & Dispatches Tab',
      icon: Newspaper,
      title: 'Here is the All News Page Button',
      desc: 'Click this button to view front-page market journalism, daily news wire, company scoops, and the editorial cartoon.',
      actionHint: 'Click to navigate to the All News Page',
    },
    {
      id: 'benchmarks-pulse',
      targetId: 'tour-benchmarks',
      page: 'all-news',
      subTab: null,
      badge: 'STEP 2 OF 7 • STEADY BENCHMARKS',
      buttonLabel: 'NSE NIFTY 50 & BSE SENSEX Benchmarks',
      icon: TrendingUp,
      title: 'Here is the Steady Market Pulse',
      desc: 'These two benchmark indices stay rock-steady in the top bar with smaller, crisp typography. Click either one to open its deep-dive analytics desk.',
      actionHint: 'Click Nifty 50 or Sensex for instant analytics',
    },
    {
      id: 'subtab-stock-research',
      targetId: 'tour-subtab-stock-research',
      page: 'financial-hub',
      subTab: 'stock-research',
      badge: 'STEP 3 OF 7 • STOCK DEEP-DIVE DESK',
      buttonLabel: 'Stock Deep-Dive Desk Button',
      icon: BarChart2,
      title: 'Here is the Stock Deep-Dive Button',
      desc: 'Click this button to see institutional 1-2 year dossiers, balance sheet health radar, and economic moats for 15+ Indian corporations (Tata Elxsi, Infosys, Reliance, etc.).',
      actionHint: 'Click to open the Stock Deep-Dive Desk',
    },
    {
      id: 'subtab-compare-arena',
      targetId: 'tour-subtab-compare-arena',
      page: 'financial-hub',
      subTab: 'compare-arena',
      badge: 'STEP 4 OF 7 • HEAD-TO-HEAD BATTLES',
      buttonLabel: 'Compare 2 Assets/Stocks Button',
      icon: Scale,
      title: 'Here is the Compare 2 Assets/Stocks Button',
      desc: 'Click this button right here to pit any two stocks, indices, or gold side-by-side with color-coded returns (Green for +, Red for -) and valuation multiples.',
      actionHint: 'Click to open the Compare Arena',
    },
    {
      id: 'subtab-funds-comparator',
      targetId: 'tour-subtab-funds-comparator',
      page: 'financial-hub',
      subTab: 'funds-comparator',
      badge: 'STEP 5 OF 7 • ALL FUNDS & SCHEMES',
      buttonLabel: 'All Funds & Wealth Schemes Button',
      icon: Landmark,
      title: 'Here is the All Funds & Schemes Button',
      desc: 'Click this button to inspect individual real-world funds like the HDFC Transportation & Logistics Fund (holdings, sector breakdown), plus the 21-attribute FD vs SIP vs LIC comparison matrix.',
      actionHint: 'Click to open the Funds & Schemes Comparator',
    },
    {
      id: 'subtab-finance-game',
      targetId: 'tour-subtab-finance-game',
      page: 'financial-hub',
      subTab: 'finance-game',
      badge: 'STEP 6 OF 7 • ACADEMY & GAMES',
      buttonLabel: 'Zero-to-Hero Academy Button',
      icon: GraduationCap,
      title: 'Here is the Financial Academy Button',
      desc: 'Click this button to learn personal finance fundamentals first (FDs, compounding, cap sizes), followed by the 26-question randomized quiz and risk duels.',
      actionHint: 'Click to open the Zero-to-Hero Academy',
    },
    {
      id: 'page-brain-games',
      targetId: 'tour-page-brain-games',
      page: 'brain-games',
      subTab: null,
      badge: 'STEP 7 OF 7 • INVESTOR BRAIN GAMES',
      buttonLabel: '3. Investor Brain Games Tab',
      icon: Gamepad2,
      title: 'Here is the Investor Brain Games Button',
      desc: 'Click this button to enter the 5-game cognitive arcade (Sudoku, Maze, Wordle, Trivia). You can reopen this interactive spotlight guide anytime by clicking "Tour" in the top bar!',
      actionHint: 'Click to open the Brain Games Arcade',
    },
  ];

  const step = steps[currentStep];

  // When step changes, ensure the appropriate page and sub-tab are active
  useEffect(() => {
    if (!isOpen) return;

    if (onNavigate) {
      onNavigate(step.page, step.subTab);
    }
  }, [isOpen, currentStep, step.page, step.subTab, onNavigate]);

  // Recalculate target element bounding box
  const updateRect = () => {
    if (!isOpen) return;
    const el = document.getElementById(step.targetId);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right,
      });

      // Scroll element into view smoothly if not in viewport
      if (rect.top < 80 || rect.bottom > window.innerHeight - 80) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    // Small delay to allow React DOM to render the tab/button
    const timer = setTimeout(updateRect, 100);
    const timer2 = setTimeout(updateRect, 300);

    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isOpen, currentStep, step.targetId]);

  // Keyboard navigation: Left/Right to change steps, Escape to exit
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, steps.length, onClose]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleActivateTarget = () => {
    const el = document.getElementById(step.targetId);
    if (el) {
      el.click();
    }
    handleNext();
  };

  // Position the floating callout card relative to the highlighted button
  const cardWidth = 440;
  let cardTop = 150;
  let cardLeft = window.innerWidth / 2 - cardWidth / 2;
  let arrowDirection = 'up'; // 'up' means arrow points up towards the button above it

  if (targetRect) {
    // If target is in the upper half of screen, place card below it
    if (targetRect.bottom + 220 < window.innerHeight) {
      cardTop = targetRect.bottom + 14;
      arrowDirection = 'up';
    } else {
      // Otherwise place card above it
      cardTop = Math.max(20, targetRect.top - 230);
      arrowDirection = 'down';
    }

    // Center card horizontally around target center, clamped to screen margins
    const targetCenterX = targetRect.left + targetRect.width / 2;
    cardLeft = Math.max(16, Math.min(window.innerWidth - cardWidth - 16, targetCenterX - cardWidth / 2));
  }

  return (
    <div
      className="interactive-tour-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        pointerEvents: 'auto',
      }}
    >
      {/* 1. Dark Backdrop with Cutout Effect */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(1px)',
        }}
        onClick={onClose}
      />

      {/* 2. Spotlight Ring Around the Actual Button on Screen */}
      {targetRect && (
        <div
          style={{
            position: 'fixed',
            top: targetRect.top - 5,
            left: targetRect.left - 5,
            width: targetRect.width + 10,
            height: targetRect.height + 10,
            borderRadius: '6px',
            border: '3px solid var(--accent-red)',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65), 0 0 25px rgba(239, 68, 68, 0.8)',
            zIndex: 99995,
            pointerEvents: 'none',
            animation: 'spotlightPulse 1.4s ease-in-out infinite',
            transition: 'all 0.25s ease-out',
          }}
        >
          {/* Animated "CLICK HERE" Beacon Pin */}
          <div
            style={{
              position: 'absolute',
              top: arrowDirection === 'up' ? '100%' : 'auto',
              bottom: arrowDirection === 'down' ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: arrowDirection === 'up' ? '4px' : '0',
              marginBottom: arrowDirection === 'down' ? '4px' : '0',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'var(--accent-red)',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '3px',
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            {arrowDirection === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            <span>ACTUAL BUTTON</span>
          </div>
        </div>
      )}

      {/* 3. Interactive Floating Guide Callout Card */}
      <div
        ref={cardRef}
        style={{
          position: 'fixed',
          top: cardTop,
          left: cardLeft,
          width: `${cardWidth}px`,
          maxWidth: 'calc(100vw - 32px)',
          background: 'var(--bg-card)',
          border: '2px solid var(--border-strong)',
          borderRadius: '4px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          animation: 'guideFadeIn 0.2s ease-out',
        }}
      >
        {/* Card Header */}
        <div
          style={{
            background: 'var(--bg-muted)',
            borderBottom: '2px solid var(--border-strong)',
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} style={{ color: 'var(--accent-red)' }} />
            <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-red)' }}>
              {step.badge}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--ink-muted)',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Exit guide (Esc)"
          >
            <span>No thanks</span>
            <X size={14} />
          </button>
        </div>

        {/* Progress Bar (7 Segments) */}
        <div style={{ display: 'flex', height: '3px', background: 'var(--bg-muted)' }}>
          {steps.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              style={{
                flex: 1,
                height: '100%',
                background: idx <= currentStep ? 'var(--accent-red)' : 'transparent',
                borderRight: '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              title={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>

        {/* Card Body */}
        <div style={{ padding: '16px 18px' }}>
          {/* Highlighted Button Name Pill */}
          {(() => {
            const StepIcon = step.icon || Crosshair;
            return (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--bg-page)',
                  border: '1px solid var(--accent-red)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  color: 'var(--ink-primary)',
                  marginBottom: '10px',
                }}
              >
                <StepIcon size={13} style={{ color: 'var(--accent-red)' }} />
                <span>TARGET: {step.buttonLabel}</span>
              </div>
            );
          })()}

          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 900, margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
            {step.title}
          </h4>

          <p style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', lineHeight: '1.5', margin: '0 0 14px 0' }}>
            {step.desc}
          </p>

          {/* Action Button: Click It Right Now */}
          <button
            type="button"
            onClick={handleActivateTarget}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 14px',
              background: 'var(--accent-red)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '3px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              marginBottom: '12px',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
            }}
          >
            <MousePointerClick size={14} />
            <span>Click this button & proceed</span>
          </button>
        </div>

        {/* Card Footer Controls */}
        <div
          style={{
            background: 'var(--bg-muted)',
            borderTop: '1px solid var(--border-light)',
            padding: '10px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
            {currentStep + 1} of {steps.length}
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-newspaper"
              onClick={handlePrev}
              disabled={currentStep === 0}
              style={{
                fontSize: '0.72rem',
                padding: '4px 10px',
                opacity: currentStep === 0 ? 0.4 : 1,
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <ChevronLeft size={12} />
              <span>Back</span>
            </button>

            <button
              type="button"
              className="btn-newspaper btn-primary-dark"
              onClick={handleNext}
              style={{ fontSize: '0.72rem', padding: '4px 12px' }}
            >
              <span>{currentStep === steps.length - 1 ? 'Finish Guide' : 'Next Button'}</span>
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TerminalGuideModal;
