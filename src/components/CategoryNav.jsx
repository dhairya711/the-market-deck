import React from 'react';
import { Search } from 'lucide-react';
import { categories as defaultCategories } from '../data/defaultNews';

export function CategoryNav({
  categories = defaultCategories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  placeholder = 'Filter ticker, sector, topic...',
}) {
  return (
    <nav className="category-nav-bar" aria-label="Topic Categories">
      <div className="category-pills-list">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const isSpecial = cat.isSpecial;

          return (
            <button
              key={cat.id}
              type="button"
              className={`category-pill ${isActive ? 'active' : ''} ${isSpecial ? 'special-pill' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div className="nav-search-wrap">
        <Search size={14} className="nav-search-icon" />
        <input
          type="text"
          className="nav-search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </nav>
  );
}

export default CategoryNav;
