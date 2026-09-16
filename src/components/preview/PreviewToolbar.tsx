import React, { useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import {
  Download,
  Printer,
  FileImage,
  Bookmark,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Loader2,
  Share2,
  FileDown,
} from 'lucide-react';
import { exportToPdf } from '../../utils/exportPdf';
import { exportToImage } from '../../utils/exportImage';
import { exportDesignJson } from '../../utils/storage';
import { Modal } from '../common/Modal';

export const PreviewToolbar: React.FC<{
  pageRef: React.RefObject<HTMLDivElement | null>;
}> = ({ pageRef }) => {
  const {
    coverData,
    previewZoom,
    setPreviewZoom,
    triggerPrint,
    handleSaveDesign,
    showToast,
  } = useCoverDesigner();

  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState(
    `${coverData.course.code || 'Course'} - ${coverData.university.shortName || 'Univ'} Assignment`
  );

  const handlePdfDownload = async () => {
    if (!pageRef.current) return;
    setIsExportingPdf(true);
    try {
      await exportToPdf({
        element: pageRef.current,
        coverData,
        onProgress: (msg) => console.log(msg),
      });
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.error('PDF export failed:', err);
      showToast('Failed to generate PDF. Please try the Print A4 option.', 'error');
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handlePngDownload = async () => {
    if (!pageRef.current) return;
    setIsExportingPng(true);
    try {
      await exportToImage(pageRef.current, coverData);
      showToast('High-resolution PNG downloaded!', 'success');
    } catch (err) {
      console.error('PNG export failed:', err);
      showToast('Failed to export image.', 'error');
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleSaveConfirm = () => {
    handleSaveDesign(saveTitle);
    setIsSaveModalOpen(false);
  };

  const handleJsonExport = () => {
    exportDesignJson(
      coverData,
      `${coverData.course.code || 'assignment'}_${coverData.student.name || 'cover'}.json`
    );
    showToast('Design exported as portable JSON file', 'success');
  };

  return (
    <>
      <div
        className="preview-toolbar no-print"
        style={{
          padding: '0.625rem 1rem',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          zIndex: 10,
        }}
      >
        {/* Zoom Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '4px' }}>
            Scale:
          </span>

          <button
            type="button"
            className={`btn btn-sm ${previewZoom === 0 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
            onClick={() => setPreviewZoom(0)}
            title="Auto fit to screen"
          >
            Fit Screen
          </button>

          <button
            type="button"
            className={`btn btn-sm ${previewZoom === 0.5 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
            onClick={() => setPreviewZoom(0.5)}
          >
            50%
          </button>

          <button
            type="button"
            className={`btn btn-sm ${previewZoom === 0.75 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
            onClick={() => setPreviewZoom(0.75)}
          >
            75%
          </button>

          <button
            type="button"
            className={`btn btn-sm ${previewZoom === 1.0 ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
            onClick={() => setPreviewZoom(1.0)}
          >
            100%
          </button>
        </div>

        {/* Primary Document Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Save Design */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSaveTitle(
                `${coverData.course.code || 'Course'} - ${coverData.university.shortName || 'Univ'} Assignment`
              );
              setIsSaveModalOpen(true);
            }}
            title="Save design to browser storage"
          >
            <Bookmark size={15} />
            <span>Save Draft</span>
          </button>

          {/* Export JSON */}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleJsonExport}
            title="Export design file as JSON"
          >
            <FileDown size={15} />
            <span className="hide-on-mobile">JSON</span>
          </button>

          {/* Download PNG */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handlePngDownload}
            disabled={isExportingPng}
            title="Download high-resolution image"
          >
            {isExportingPng ? <Loader2 size={15} className="animate-spin" /> : <FileImage size={15} />}
            <span className="hide-on-mobile">PNG Image</span>
          </button>

          {/* Print A4 */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={triggerPrint}
            title="Print A4 cover page directly"
          >
            <Printer size={15} />
            <span>Print A4</span>
          </button>

          {/* Download PDF (Primary) */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handlePdfDownload}
            disabled={isExportingPdf}
            style={{ padding: '0.45rem 0.95rem' }}
            title="Generate high-DPI A4 PDF"
          >
            {isExportingPdf ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span>Download A4 PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save Design Title Modal */}
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Save Cover Design to Browser"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Give this assignment design a recognizable name to reload or edit it anytime from the "Saved Designs" tab.
          </p>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              <span>Design Title</span>
              <span className="required-badge">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={saveTitle}
              onChange={(e) => setSaveTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveConfirm();
              }}
              autoFocus
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsSaveModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleSaveConfirm}
              disabled={!saveTitle.trim()}
            >
              Save Design
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
