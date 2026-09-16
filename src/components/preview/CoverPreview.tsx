import React, { useRef, useEffect, useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { ClassicAcademic } from './templates/ClassicAcademic';
import { MinimalModern } from './templates/MinimalModern';
import { ModernAccent } from './templates/ModernAccent';
import { FormalBorder } from './templates/FormalBorder';
import { UniversityCentered } from './templates/UniversityCentered';
import { ElegantSerif } from './templates/ElegantSerif';
import { TechnicalReport } from './templates/TechnicalReport';
import { CleanGrid } from './templates/CleanGrid';
import { getActiveLogoSrc } from '../../utils/logoHelper';

export const CoverPreview: React.FC<{
  containerRef?: React.RefObject<HTMLDivElement | null>;
  pageRef?: React.RefObject<HTMLDivElement | null>;
}> = ({ containerRef, pageRef }) => {
  const { coverData, previewZoom } = useCoverDesigner();
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const effectiveContainerRef = containerRef || internalContainerRef;
  const internalPageRef = useRef<HTMLDivElement>(null);
  const effectivePageRef = pageRef || internalPageRef;

  const [autoScale, setAutoScale] = useState<number>(0.75);

  const { customization, university } = coverData;

  // Compute responsive auto-scale to fit container width and height
  useEffect(() => {
    const handleResize = () => {
      if (!effectiveContainerRef.current) return;
      const containerWidth = effectiveContainerRef.current.clientWidth - 48; // padding
      const containerHeight = effectiveContainerRef.current.clientHeight - 48;

      const a4Width = 794;
      const a4Height = 1123;

      const scaleW = containerWidth / a4Width;
      const scaleH = containerHeight / a4Height;
      const fitScale = Math.min(scaleW, scaleH, 1.0);

      setAutoScale(Math.max(0.35, fitScale));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [effectiveContainerRef]);

  // Use explicit zoom if set (> 0), otherwise use responsive auto-scale
  const currentScale = previewZoom > 0 ? previewZoom : autoScale;

  // Determine border style
  const getBorderStyle = () => {
    if (!customization.showBorder || customization.borderStyle === 'none') {
      return 'none';
    }
    const color = customization.borderColor || customization.accentColor || '#1e3a8a';
    const thickness = customization.borderThickness || 2;

    switch (customization.borderStyle) {
      case 'double':
        return `${thickness + 2}px double ${color}`;
      case 'thick':
        return `${thickness + 3}px solid ${color}`;
      case 'decorative':
        return `${thickness}px solid ${color}`;
      case 'modern':
        return `none`; // Handled inside template
      case 'single':
      default:
        return `${thickness}px solid ${color}`;
    }
  };

  // Select the appropriate template component
  const renderTemplate = () => {
    switch (customization.templateId) {
      case 'minimal':
        return <MinimalModern coverData={coverData} />;
      case 'modern-accent':
        return <ModernAccent coverData={coverData} />;
      case 'formal-border':
        return <FormalBorder coverData={coverData} />;
      case 'university-centered':
        return <UniversityCentered coverData={coverData} />;
      case 'elegant-serif':
        return <ElegantSerif coverData={coverData} />;
      case 'technical':
        return <TechnicalReport coverData={coverData} />;
      case 'clean-grid':
        return <CleanGrid coverData={coverData} />;
      case 'classic':
      default:
        return <ClassicAcademic coverData={coverData} />;
    }
  };

  return (
    <div
      ref={effectiveContainerRef as any}
      className="preview-workspace"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '24px',
        backgroundColor: 'var(--bg-preview-canvas)',
        position: 'relative',
      }}
    >
      {/* Wrapper holding the scaled A4 document with correct transformed bounding box */}
      <div
        className="preview-scale-wrapper"
        style={{
          width: `${794 * currentScale}px`,
          height: `${1123 * currentScale}px`,
          position: 'relative',
          flexShrink: 0,
          transition: 'width 150ms ease, height 150ms ease',
        }}
      >
        {/* The Exact 794px x 1123px (A4 96 DPI) Document Node */}
        <div
          ref={effectivePageRef as any}
          id="assignment-cover-page"
          className="a4-document-sheet"
          style={{
            transform: `scale(${currentScale})`,
            transformOrigin: 'top left',
            border: getBorderStyle(),
            transition: 'transform 150ms ease',
          }}
        >
          {/* Subtle Institutional Watermark if logo exists */}
          {getActiveLogoSrc(coverData) && (
            <img
              key={getActiveLogoSrc(coverData)}
              src={getActiveLogoSrc(coverData)}
              alt=""
              aria-hidden="true"
              className="a4-watermark-bg"
              crossOrigin="anonymous"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}

          {/* Active Template Content Layer */}
          <div className="a4-content-layer">{renderTemplate()}</div>
        </div>
      </div>
    </div>
  );
};
