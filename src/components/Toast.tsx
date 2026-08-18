import React from 'react';
import type { ToastMessage } from '../types';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '360px',
      width: '100%'
    }}>
      {toasts.map((toast) => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success': return <CheckCircle2 size={18} color="#34d399" />;
            case 'warning': return <AlertCircle size={18} color="#fbbf24" />;
            default: return <Info size={18} color="#818cf8" />;
          }
        };

        const getBorderColor = () => {
          switch (toast.type) {
            case 'success': return 'rgba(16, 185, 129, 0.4)';
            case 'warning': return 'rgba(245, 158, 11, 0.4)';
            default: return 'rgba(99, 102, 241, 0.4)';
          }
        };

        return (
          <div
            key={toast.id}
            className="glass-panel"
            style={{
              padding: '12px 16px',
              background: '#0d1322',
              border: `1px solid ${getBorderColor()}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {getIcon()}
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'white' }}>
                  {toast.title}
                </h5>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
