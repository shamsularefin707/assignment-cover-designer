import React, { useRef, useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { Upload, RotateCcw, AlertTriangle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

export const LogoUploader: React.FC = () => {
  const { coverData, setCustomLogo, showToast } = useCoverDesigner();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentLogo = coverData.university.logoUrl;
  const isCustom = coverData.university.isCustomLogo;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Invalid file format. Please upload PNG, JPG, SVG, or WebP.');
      showToast('Unsupported file type', 'error');
      return;
    }

    // Validate size (max 4MB)
    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg('File size exceeds 4MB limit.');
      showToast('Image too large (max 4MB)', 'error');
      return;
    }

    // Read as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomLogo(reader.result);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file.');
      showToast('Error reading image', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setCustomLogo(null);
    setErrorMsg(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.875rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={16} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>University Logo & Crest</span>
        </div>
        {isCustom && (
          <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>
            Custom Upload
          </span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Logo Preview Square */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          {currentLogo ? (
            <img
              src={currentLogo}
              alt="University Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <ImageIcon size={24} style={{ color: 'var(--text-muted)' }} />
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
            style={{ display: 'none' }}
          />

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={14} /> Upload New Logo
            </button>

            {isCustom && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={handleReset}
                title="Restore default university logo"
              >
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>

          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Supports PNG, JPG, SVG, WebP (Max 4MB). Automatically scales.
          </span>
        </div>
      </div>

      {errorMsg && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-error-bg)',
            color: 'var(--color-error)',
            fontSize: '0.75rem',
          }}
        >
          <AlertTriangle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
