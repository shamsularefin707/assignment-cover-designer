import React, { useState } from 'react';
import { CoverData } from '../../types/cover';
import { getActiveLogoSrc } from '../../utils/logoHelper';
import { generateUniversityCrestSvg } from '../../utils/logoFallback';

interface CoverLogoProps {
  coverData: CoverData;
  maxHeight?: string;
  maxWidth?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CoverLogo: React.FC<CoverLogoProps> = ({
  coverData,
  maxHeight = '85px',
  maxWidth = '180px',
  className = '',
  style = {},
}) => {
  const { customization, university } = coverData;
  const primaryLogoSrc = getActiveLogoSrc(coverData);

  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const [prevPrimary, setPrevPrimary] = useState<string>(primaryLogoSrc);

  // Reset fallback if primary logo source changes
  if (primaryLogoSrc !== prevPrimary) {
    setPrevPrimary(primaryLogoSrc);
    setFallbackSrc(null);
  }

  const handleError = () => {
    // If external URL fails, fall back to crisp SVG academic crest
    if (!fallbackSrc) {
      const fallback = generateUniversityCrestSvg(university.shortName || 'UNIV');
      setFallbackSrc(fallback);
    }
  };

  if (customization.logoPosition === 'hidden') {
    return null;
  }

  const currentSrc = fallbackSrc || primaryLogoSrc;

  if (!currentSrc) {
    return null;
  }

  return (
    <div
      className={`cover-logo-wrapper ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: maxHeight,
        maxHeight,
        maxWidth,
        margin: '0 auto',
        flexShrink: 0,
        ...style,
      }}
    >
      <img
        key={currentSrc}
        src={currentSrc}
        alt={`${university.shortName || 'University'} Logo`}
        crossOrigin="anonymous"
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
          height: 'auto',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={handleError}
      />
    </div>
  );
};
