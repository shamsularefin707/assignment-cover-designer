import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { ShieldCheck, Heart, FileText, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView } = useCoverDesigner();

  return (
    <footer
      className="app-footer no-print"
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-medium)',
        padding: '2rem 1.5rem 1.5rem',
        color: 'var(--text-muted)',
        fontSize: '0.8125rem',
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Col 1 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>
              Assignment Cover Designer
            </span>
            <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
              Bangladesh
            </span>
          </div>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            A fast, free utility built for university students across Bangladesh. Generates compliant, print-ready A4 assignment and lab report covers with verified institution logos.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Quick Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li>
              <button
                type="button"
                className="btn-ghost"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-accent)' }}
                onClick={() => setCurrentView('designer')}
              >
                Cover Page Designer
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-ghost"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-accent)' }}
                onClick={() => setCurrentView('templates')}
              >
                Browse 8 Templates
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-ghost"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-accent)' }}
                onClick={() => setCurrentView('saved')}
              >
                Saved Drafts & Designs
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn-ghost"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'var(--color-accent)' }}
                onClick={() => setCurrentView('about')}
              >
                Formatting Standards & FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Privacy & Trust
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={16} style={{ color: 'var(--color-success)' }} />
              <span>100% Client-Side & Private</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={16} style={{ color: 'var(--color-accent)' }} />
              <span>Standard A4 Print Dimensions (210×297mm)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} style={{ color: 'var(--color-warning)' }} />
              <span>No Account or Sign-in Needed</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <p>
          © {new Date().getFullYear()} Assignment Cover Designer. Made with{' '}
          <Heart size={14} style={{ display: 'inline', color: '#ef4444', verticalAlign: 'middle' }} /> for students in Bangladesh.
        </p>
        <p>Works with BUET, DU, NSU, BRACU, SUST, RUET, CUET, KUET, IUT, AIUB, UIU & more.</p>
      </div>
    </footer>
  );
};
