import React, { useRef, useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { EditorSidebar } from '../editor/EditorSidebar';
import { CoverPreview } from '../preview/CoverPreview';
import { PreviewToolbar } from '../preview/PreviewToolbar';
import { Edit3, Eye, Download, Printer, FileImage, Loader2 } from 'lucide-react';
import { exportToPdf } from '../../utils/exportPdf';
import { exportToImage } from '../../utils/exportImage';

export const DesignerView: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { coverData, triggerPrint, showToast } = useCoverDesigner();

  // Mobile view mode toggle: 'editor' vs 'preview'
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor');
  const [isMobilePdf, setIsMobilePdf] = useState(false);
  const [isMobilePng, setIsMobilePng] = useState(false);

  const getTargetElement = (): HTMLElement | null => {
    return pageRef.current || document.getElementById('assignment-cover-page');
  };

  const handleMobilePdf = async () => {
    const el = getTargetElement();
    if (!el) {
      showToast('Could not find cover preview to export.', 'error');
      return;
    }
    setIsMobilePdf(true);
    try {
      await exportToPdf({ element: el, coverData });
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('Mobile PDF export failed:', err);
      showToast('Could not generate the PDF. Please try Print.', 'error');
    } finally {
      setIsMobilePdf(false);
    }
  };

  const handleMobilePng = async () => {
    const el = getTargetElement();
    if (!el) {
      showToast('Could not find cover preview to export.', 'error');
      return;
    }
    setIsMobilePng(true);
    try {
      await exportToImage({ element: el, coverData, format: 'png' });
      showToast('PNG downloaded successfully!', 'success');
    } catch (err) {
      console.error('Mobile PNG export failed:', err);
      showToast('Could not generate PNG image.', 'error');
    } finally {
      setIsMobilePng(false);
    }
  };

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
          padding: '0.5rem 0.75rem',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
          zIndex: 80,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.375rem',
        }}
      >
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem' }}
          onClick={() => setMobileMode(mobileMode === 'editor' ? 'preview' : 'editor')}
        >
          {mobileMode === 'editor' ? (
            <>
              <Eye size={15} /> Preview
            </>
          ) : (
            <>
              <Edit3 size={15} /> Edit
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          style={{ flex: 1, padding: '0.4rem 0.5rem' }}
          onClick={handleMobilePdf}
          disabled={isMobilePdf || isMobilePng}
        >
          {isMobilePdf ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          <span>PDF</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ flex: 1, padding: '0.4rem 0.5rem' }}
          onClick={handleMobilePng}
          disabled={isMobilePdf || isMobilePng}
        >
          {isMobilePng ? <Loader2 size={14} className="animate-spin" /> : <FileImage size={14} />}
          <span>PNG</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.4rem 0.6rem' }}
          onClick={triggerPrint}
        >
          <Printer size={15} />
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
          .editor-column.hide-mobile {
            display: none !important;
          }
          .preview-column.hide-mobile {
            position: absolute !important;
            left: -99999px !important;
            top: 0 !important;
            opacity: 0 !important;
            pointer-events: none !important;
            visibility: visible !important;
            display: flex !important;
            z-index: -999 !important;
            width: 794px !important;
            height: 1123px !important;
          }
          .designer-workspace {
            padding-bottom: 54px;
          }
        }
      `}</style>
    </div>
  );
};

