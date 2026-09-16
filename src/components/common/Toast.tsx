import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useCoverDesigner();

  if (toasts.length === 0) return null;

  return (
    <div
      className="toast-container no-print"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        maxWidth: '380px',
      }}
    >
      {toasts.map((t) => {
        let bg = 'var(--bg-surface-elevated)';
        let border = 'var(--border-medium)';
        let icon = <Info size={18} style={{ color: 'var(--color-accent)' }} />;

        if (t.type === 'success') {
          border = 'var(--color-success)';
          icon = <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />;
        } else if (t.type === 'error') {
          border = 'var(--color-error)';
          icon = <AlertCircle size={18} style={{ color: 'var(--color-error)' }} />;
        }

        return (
          <div
            key={t.id}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              backgroundColor: bg,
              color: 'var(--text-primary)',
              border: `1px solid ${border}`,
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              fontSize: '0.875rem',
              animation: 'slideInRight 200ms ease-out',
            }}
          >
            {icon}
            <span style={{ flex: 1 }}>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
};
