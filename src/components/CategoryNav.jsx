import React from 'react';
import { Search } from 'lucide-react';
import { categories } from '../data/defaultNews';

export function CategoryNav({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) {
  return (
    <nav className="category-nav-bar" aria-label="Topic Categories">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        const isSpecial = cat.isSpecial;

        return (
          <button
            key={cat.id}
            className={`category-pill ${isActive ? 'active' : ''} ${isSpecial ? 'special-pill' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.label}
          </button>
        );
      })}

      <div className="nav-search-wrap">
        <Search size={14} className="nav-search-icon" />
        <input
          type="text"
          className="nav-search-input"
          placeholder="Filter ticker, sector, topic..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </nav>
  );
}
