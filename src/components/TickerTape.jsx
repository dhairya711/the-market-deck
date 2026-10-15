import React from 'react';

export function TickerTape({ indices, watchlist }) {
  // Combine macro indices with user's tracked portfolio stocks
  const combinedItems = [
    ...indices,
    ...watchlist.map(w => ({
      symbol: w.symbol,
      value: w.price,
      change: w.change,
      up: w.up,
      isStock: true
    }))
  ];

  // Duplicate for smooth seamless endless ticker scrolling
  const fullTrack = [...combinedItems, ...combinedItems];

  return (
    <div className="ticker-tape-container" aria-label="Live Market Ticker">
      <div className="ticker-track">
        {fullTrack.map((item, idx) => {
          let statusClass = 'flat';
          if (item.up === true) statusClass = 'up';
          if (item.up === false) statusClass = 'down';

          return (
            <div
              key={`${item.symbol}-${idx}`}
              className={`ticker-item ${item.justUpdated ? 'flash-update' : ''}`}
            >
              <span className="ticker-name">{item.symbol}</span>
              <span className="ticker-val">{item.value}</span>
              <span className={`ticker-pct ${statusClass}`}>{item.change}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
