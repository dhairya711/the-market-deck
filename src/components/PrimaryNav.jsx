import React from 'react';
import { Newspaper, TrendingUp, Gamepad2, Search, Scale, GraduationCap, Flame, ArrowRight, Landmark } from 'lucide-react';

export function PrimaryNav({
  activePage,
  onSelectPage,
  activeFinancialTab,
  onSelectFinancialTab,
}) {
  const pages = [
    {
      id: 'all-news',
      title: '1. All News & Dispatches',
      subtitle: 'Broadsheet • Macro • Tech • Global Wire',
      icon: Newspaper,
      badge: 'LIVE WIRE',
      badgeClass: 'badge-live',
    },
    {
      id: 'financial-hub',
      title: '2. Financial Hub & Knowledge Gainer',
      subtitle: 'Stock Deep-Dive • Compare 2 Things • Capital Academy',
      icon: TrendingUp,
      badge: 'ALPHA SUITE',
      badgeClass: 'badge-alpha',
    },
    {
      id: 'brain-games',
      title: '3. Investor Brain Games',
      subtitle: 'Sudoku • Bull/Bear Maze • Wordle • Trivia • Duels',
      icon: Gamepad2,
      badge: '5 GAMES',
      badgeClass: 'badge-games',
    },
  ];

  const financialSubTabs = [
    {
      id: 'stock-research',
      title: 'Stock Deep-Dive Desk',
      desc: '1-2Y Intelligence Dossier',
      icon: Search,
    },
    {
      id: 'compare-arena',
      title: 'Compare 2 Assets/Stocks',
      desc: 'Head-to-Head Arena',
      icon: Scale,
    },
    {
      id: 'funds-comparator',
      title: 'All Funds & Wealth Schemes',
      desc: 'FD, SIP, LIC, Small/Mid/Large Cap',
      icon: Landmark,
    },
    {
      id: 'finance-game',
      title: 'Zero-to-Hero Academy',
      desc: 'Learn First, Quiz & Duels',
      icon: GraduationCap,
    },
    {
      id: 'finance-news',
      title: 'Financial News Wire',
      desc: 'Stonks, Yields & VC Dispatches',
      icon: Flame,
    },
  ];

  return (
    <nav className="primary-nav-container" aria-label="Main Navigation">
      {/* 3 Main Pages / View Switcher */}
      <div className="primary-page-switcher">
        {pages.map((p) => {
          const isActive = activePage === p.id;
          const Icon = p.icon;

          return (
            <button
              key={p.id}
              id={`tour-page-${p.id}`}
              type="button"
              className={`primary-page-tab ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPage(p.id)}
            >
              <div className="tab-icon-wrap">
                <Icon size={20} className="tab-icon" />
              </div>
              <div className="tab-text-wrap">
                <div className="tab-header-row">
                  <span className="tab-title">{p.title}</span>
                  <span className={`tab-badge ${p.badgeClass}`}>{p.badge}</span>
                </div>
                <span className="tab-subtitle">{p.subtitle}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-Navigation for Page 2: Financial Hub & Knowledge Gainer */}
      {activePage === 'financial-hub' && (
        <div className="financial-subnav-strip animate-fade-in">
          <div className="subnav-label">
            <span>FINANCIAL INTELLIGENCE SUITE:</span>
          </div>
          <div className="subnav-tabs-row">
            {financialSubTabs.map((sub) => {
              const isSubActive = activeFinancialTab === sub.id;
              const SubIcon = sub.icon;

              return (
                <button
                  key={sub.id}
                  id={`tour-subtab-${sub.id}`}
                  type="button"
                  className={`financial-subnav-btn ${isSubActive ? 'active' : ''}`}
                  onClick={() => onSelectFinancialTab(sub.id)}
                >
                  <SubIcon size={15} />
                  <span className="subnav-btn-text">{sub.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

export default PrimaryNav;
