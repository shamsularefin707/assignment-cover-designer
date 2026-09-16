import React, { useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { Download, FileImage, Image as ImageIcon, Printer, Loader2, CheckCircle2 } from 'lucide-react';
import { exportToPdf } from '../../utils/exportPdf';
import { exportToImage } from '../../utils/exportImage';

interface ExportSectionProps {
  pageRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  variant?: 'card' | 'compact' | 'bar';
}

export const ExportSection: React.FC<ExportSectionProps> = ({
  pageRef,
  className = '',
  variant = 'card',
}) => {
  const { coverData, triggerPrint, showToast } = useCoverDesigner();
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingJpg, setIsExportingJpg] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const getTargetElement = (): HTMLElement | null => {
    if (pageRef?.current) return pageRef.current;
    return document.getElementById('assignment-cover-page');
  };

  const handlePdf = async () => {
    const element = getTargetElement();
    if (!element) {
      showToast('Could not find cover preview to export.', 'error');
      return;
    }

    setIsExportingPdf(true);
    setStatusMessage('Generating A4 PDF (300 DPI)...');

    try {
      await exportToPdf({
        element,
        coverData,
        onProgress: (msg) => setStatusMessage(msg),
      });
      showToast('PDF downloaded successfully!', 'success');
    } catch (err: any) {
      console.error('PDF export failed:', err);
      showToast('Could not generate the PDF. Please try again or use Print A4.', 'error');
    } finally {
      setIsExportingPdf(false);
      setStatusMessage(null);
    }
  };

  const handleImage = async (format: 'png' | 'jpg') => {
    const element = getTargetElement();
    if (!element) {
      showToast('Could not find cover preview to export.', 'error');
      return;
    }

    const setExporting = format === 'png' ? setIsExportingPng : setIsExportingJpg;
    setExporting(true);
    setStatusMessage(`Generating high-resolution ${format.toUpperCase()} image...`);

    try {
      await exportToImage({
        element,
        coverData,
        format,
        onProgress: (msg) => setStatusMessage(msg),
      });
      showToast(`${format.toUpperCase()} image downloaded successfully!`, 'success');
    } catch (err: any) {
      console.error(`${format} export failed:`, err);
      showToast(`Could not generate ${format.toUpperCase()} image. Please try again.`, 'error');
    } finally {
      setExporting(false);
      setStatusMessage(null);
    }
  };

  const isBusy = isExportingPdf || isExportingPng || isExportingJpg;

  if (variant === 'bar') {
    return (
      <div
        className={`export-action-bar ${className}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handlePdf}
          disabled={isBusy}
          title="Download ISO standard A4 PDF"
        >
          {isExportingPdf ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={15} />
              <span>Download PDF</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => handleImage('png')}
          disabled={isBusy}
          title="Download 300 DPI high-resolution PNG"
        >
          {isExportingPng ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>PNG...</span>
            </>
          ) : (
            <>
              <FileImage size={15} />
              <span>Download PNG</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => handleImage('jpg')}
          disabled={isBusy}
          title="Download compact JPG image"
        >
          {isExportingJpg ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>JPG...</span>
            </>
          ) : (
            <>
              <ImageIcon size={15} />
              <span>Download JPG</span>
            </>
          )}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={triggerPrint}
          disabled={isBusy}
          title="Open browser print dialog for A4 sheet"
        >
          <Printer size={15} />
          <span>Print</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`export-card ${className}`}
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Export Assignment Cover
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', margin: 0 }}>
            Standard A4 dimensions (210×297mm) • Print-ready 300 DPI • 100% Client-Side
          </p>
        </div>
        {statusMessage && (
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Loader2 size={13} className="animate-spin" />
            {statusMessage}
          </span>
        )}
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '0.875rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.625rem',
        }}
      >
        {/* PDF Export */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePdf}
          disabled={isBusy}
          style={{ justifyContent: 'center', padding: '0.625rem 1rem' }}
          title="Download official A4 PDF document"
        >
          {isExportingPdf ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* PNG Export */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleImage('png')}
          disabled={isBusy}
          style={{ justifyContent: 'center', padding: '0.625rem 1rem' }}
          title="Download high-resolution PNG image"
        >
          {isExportingPng ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating PNG...</span>
            </>
          ) : (
            <>
              <FileImage size={16} />
              <span>Download PNG</span>
            </>
          )}
        </button>

        {/* JPG Export */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => handleImage('jpg')}
          disabled={isBusy}
          style={{ justifyContent: 'center', padding: '0.625rem 1rem' }}
          title="Download compact JPG image"
        >
          {isExportingJpg ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating JPG...</span>
            </>
          ) : (
            <>
              <ImageIcon size={16} />
              <span>Download JPG</span>
            </>
          )}
        </button>

        {/* Print A4 */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={triggerPrint}
          disabled={isBusy}
          style={{ justifyContent: 'center', padding: '0.625rem 1rem' }}
          title="Print A4 sheet directly to connected printer"
        >
          <Printer size={16} />
          <span>Print A4</span>
        </button>
      </div>
    </div>
  );
};
