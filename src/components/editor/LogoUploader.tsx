import React, { useRef, useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { Upload, Trash2, RefreshCw, AlertTriangle, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { processUploadedLogoFile, getActiveLogoSrc } from '../../utils/logoHelper';

export const LogoUploader: React.FC = () => {
  const { coverData, setCustomLogo, showToast } = useCoverDesigner();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isCustom = coverData.logo?.source === 'custom' && !!coverData.logo?.src;
  const activeLogoSrc = getActiveLogoSrc(coverData);
  const customFileName = coverData.logo?.fileName || 'Custom Logo';

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      // Process completely client-side: validate, optimize size/transparency, convert to data URL
      const { dataUrl, fileName } = await processUploadedLogoFile(file);
      setCustomLogo(dataUrl, fileName);
      showToast('Custom logo uploaded successfully', 'success');
    } catch (err: any) {
      const msg = err?.message || 'Failed to process the uploaded logo.';
      setErrorMsg(msg);
      showToast(msg, 'error');
    } finally {
      setIsProcessing(false);
      // Reset input value so re-uploading the same file works
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setCustomLogo(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast('Custom logo removed. Reverted to default university logo.', 'info');
  };

  return (
    <div
      style={{
        padding: '1.125rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={18} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Upload University Logo</span>
        </div>
        {isCustom ? (
          <span
            className="badge badge-primary"
            style={{
              fontSize: '0.7rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(37, 99, 235, 0.12)',
              color: '#2563eb',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontWeight: 500,
            }}
          >
            <CheckCircle2 size={12} /> Custom Logo Active
          </span>
        ) : (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Default University Emblem
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Preview Thumbnail */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#ffffff',
            border: isCustom ? '2px solid var(--color-primary)' : '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            flexShrink: 0,
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            position: 'relative',
          }}
        >
          {activeLogoSrc ? (
            <img
              key={activeLogoSrc}
              src={activeLogoSrc}
              alt="Active University Logo Preview"
              crossOrigin="anonymous"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          ) : (
            <ImageIcon size={26} style={{ color: 'var(--text-muted)' }} />
          )}

          {isProcessing && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RefreshCw size={18} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
            style={{ display: 'none' }}
          />

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {isCustom ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  title="Choose a different image from device"
                >
                  <RefreshCw size={14} className={isProcessing ? 'animate-spin' : ''} />
                  Change Logo
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={handleRemove}
                  disabled={isProcessing}
                  style={{ color: 'var(--color-error)' }}
                  title="Revert to default university logo"
                >
                  <Trash2 size={14} />
                  Remove Logo
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
              >
                <Upload size={14} />
                {isProcessing ? 'Processing Image...' : 'Upload University Logo'}
              </button>
            )}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {isCustom ? (
              <span>
                File: <strong>{customFileName}</strong>. Stored safely in browser memory.
              </span>
            ) : (
              <span>
                Upload your official department or university crest (PNG, JPG, WebP, SVG). 100% client-side.
              </span>
            )}
          </div>
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-error-bg)',
            color: 'var(--color-error)',
            fontSize: '0.78rem',
          }}
        >
          <AlertTriangle size={15} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
