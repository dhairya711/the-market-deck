import React from 'react';
import { Info, CheckCircle, RefreshCw } from 'lucide-react';

export function Toast({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast-message">
          {t.type === 'refresh' ? (
            <RefreshCw size={14} className="spin-anim" />
          ) : (
            <CheckCircle size={14} color="var(--accent-green)" />
          )}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
