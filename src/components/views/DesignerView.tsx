import React, { useRef, useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { EditorSidebar } from '../editor/EditorSidebar';
import { CoverPreview } from '../preview/CoverPreview';
import { PreviewToolbar } from '../preview/PreviewToolbar';
import { Edit3, Eye, Download, Printer } from 'lucide-react';

export const DesignerView: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerPrint } = useCoverDesigner();

  // Mobile view mode toggle: 'editor' vs 'preview'
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor');

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 65px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mobile Tab Switcher Bar */}
      <div
        className="mobile-tab-bar no-print"
        style={{
          display: 'none',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-medium)',
          padding: '0.375rem 1rem',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <button
          type="button"
          className={`btn btn-sm ${mobileMode === 'editor' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, maxWidth: '200px' }}
          onClick={() => setMobileMode('editor')}
        >
          <Edit3 size={15} /> Edit Form
        </button>
        <button
          type="button"
          className={`btn btn-sm ${mobileMode === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ flex: 1, maxWidth: '200px' }}
          onClick={() => setMobileMode('preview')}
        >
          <Eye size={15} /> Live Preview
        </button>
      </div>

      {/* Main Two-Panel Layout */}
      <div
        className="designer-workspace"
        style={{
          flex: 1,
          display: 'flex',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Left Column: Form Editor Sidebar */}
        <div
          className={`editor-column ${mobileMode === 'preview' ? 'hide-mobile' : ''}`}
          style={{
            width: '460px',
            minWidth: '380px',
            maxWidth: '520px',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <EditorSidebar />
        </div>

        {/* Right Column: Live A4 Preview & Toolbar */}
        <div
          className={`preview-column ${mobileMode === 'editor' ? 'hide-mobile' : ''}`}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-preview-canvas)',
          }}
        >
          <PreviewToolbar pageRef={pageRef} />
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <CoverPreview pageRef={pageRef} containerRef={containerRef} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div
        className="mobile-sticky-action-bar no-print"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-surface-elevated)',
          borderTop: '1px solid var(--border-medium)',
          padding: '0.5rem 1rem',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
          zIndex: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
          onClick={() => setMobileMode(mobileMode === 'editor' ? 'preview' : 'editor')}
        >
          {mobileMode === 'editor' ? (
            <>
              <Eye size={15} /> Preview A4
            </>
          ) : (
            <>
              <Edit3 size={15} /> Back to Edit
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
          onClick={triggerPrint}
        >
          <Printer size={15} /> Print
        </button>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .mobile-tab-bar {
            display: flex !important;
          }
          .mobile-sticky-action-bar {
            display: flex !important;
          }
          .editor-column {
            width: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
          }
          .preview-column {
            width: 100% !important;
          }
          .hide-mobile {
            display: none !important;
          }
          .designer-workspace {
            padding-bottom: 50px;
          }
        }
      `}</style>
    </div>
  );
};
