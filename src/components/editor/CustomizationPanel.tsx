import React, { useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { ACADEMIC_FONTS } from '../../data/fonts';
import {
  Type,
  Maximize2,
  AlignCenter,
  AlignLeft,
  Square,
  Palette,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';
import { BorderStyle, TextAlignment, LogoSize, LogoPosition, SpacingDensity, TextCasing } from '../../types/cover';

const ACCENT_COLOR_PRESETS = [
  { name: 'Navy Blue', hex: '#1e3a8a' },
  { name: 'Royal Blue', hex: '#1d4ed8' },
  { name: 'Sky Accent', hex: '#0284c7' },
  { name: 'Forest Green', hex: '#0f766e' },
  { name: 'Emerald', hex: '#047857' },
  { name: 'Burgundy Crimson', hex: '#991b1b' },
  { name: 'Charcoal Black', hex: '#0f172a' },
  { name: 'Slate Gray', hex: '#334155' },
];

export const CustomizationPanel: React.FC = () => {
  const { coverData, updateCustomization, resetDesign } = useCoverDesigner();
  const { customization } = coverData;
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Group fonts by category
  const serifFonts = ACADEMIC_FONTS.filter((f) => f.category === 'Serif');
  const sansFonts = ACADEMIC_FONTS.filter((f) => f.category === 'Sans Serif');
  const modernFonts = ACADEMIC_FONTS.filter((f) => f.category === 'Modern');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* 1. Font Selection */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
          <label className="form-label" style={{ marginBottom: 0 }}>
            <Type size={15} style={{ color: 'var(--color-primary)' }} />
            <span>Academic Typography</span>
          </label>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Categorized by Style
          </span>
        </div>

        <select
          className="form-select"
          value={customization.fontFamily}
          onChange={(e) => updateCustomization({ fontFamily: e.target.value })}
        >
          <optgroup label="Serif (Traditional Academic & Thesis)">
            {serifFonts.map((f) => (
              <option key={f.id} value={f.fontFamily}>
                {f.name} {f.isPopular ? '★ Popular' : ''}
              </option>
            ))}
          </optgroup>
          <optgroup label="Sans-Serif (Clean, Engineering & Modern)">
            {sansFonts.map((f) => (
              <option key={f.id} value={f.fontFamily}>
                {f.name} {f.isPopular ? '★ Popular' : ''}
              </option>
            ))}
          </optgroup>
          <optgroup label="Modern & Contemporary (BBA & Projects)">
            {modernFonts.map((f) => (
              <option key={f.id} value={f.fontFamily}>
                {f.name} {f.isPopular ? '★ Popular' : ''}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* 2. Font Scale Slider */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div className="form-label">
          <span>Font Scaling</span>
          <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
            {Math.round(customization.fontScale * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.85"
          max="1.15"
          step="0.05"
          value={customization.fontScale}
          onChange={(e) => updateCustomization({ fontScale: parseFloat(e.target.value) })}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <span>85% (Compact)</span>
          <span>100% (Standard)</span>
          <span>115% (Spacious)</span>
        </div>
      </div>

      {/* 3. Text Alignment & Text Casing */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Text Alignment</label>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              type="button"
              className={`btn btn-sm ${customization.textAlignment === 'center' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '0.4rem 0.25rem' }}
              onClick={() => updateCustomization({ textAlignment: 'center' })}
            >
              <AlignCenter size={14} /> Center
            </button>
            <button
              type="button"
              className={`btn btn-sm ${customization.textAlignment === 'left' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '0.4rem 0.25rem' }}
              onClick={() => updateCustomization({ textAlignment: 'left' })}
            >
              <AlignLeft size={14} /> Left
            </button>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Heading Casing</label>
          <select
            className="form-select"
            value={customization.textCasing}
            onChange={(e) => updateCustomization({ textCasing: e.target.value as TextCasing })}
          >
            <option value="normal">Standard Case</option>
            <option value="uppercase">UPPERCASE HEADINGS</option>
            <option value="capitalize">Capitalize Words</option>
          </select>
        </div>
      </div>

      {/* 4. Border Style & Thickness */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Border Style</label>
          <select
            className="form-select"
            value={customization.borderStyle}
            onChange={(e) => updateCustomization({ borderStyle: e.target.value as BorderStyle })}
          >
            <option value="none">No Border</option>
            <option value="single">Single Line</option>
            <option value="double">Double Line (Formal)</option>
            <option value="thick">Thick Border</option>
            <option value="decorative">Ornate Frame</option>
            <option value="modern">Modern Accent</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Border Thickness</label>
          <select
            className="form-select"
            value={customization.borderThickness}
            onChange={(e) => updateCustomization({ borderThickness: parseInt(e.target.value) })}
            disabled={customization.borderStyle === 'none'}
          >
            <option value="1">1px (Subtle)</option>
            <option value="2">2px (Standard)</option>
            <option value="3">3px (Medium)</option>
            <option value="4">4px (Bold)</option>
            <option value="5">5px (Heavy)</option>
          </select>
        </div>
      </div>

      {/* 5. Accent Color Palette */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">
          <Palette size={14} style={{ color: 'var(--color-primary)' }} />
          <span>Accent Color</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {ACCENT_COLOR_PRESETS.map((color) => {
            const isSelected = customization.accentColor.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => updateCustomization({ accentColor: color.hex, borderColor: color.hex })}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: color.hex,
                  border: isSelected ? '2px solid #ffffff' : '1px solid var(--border-medium)',
                  boxShadow: isSelected ? '0 0 0 2px var(--color-primary)' : 'none',
                  cursor: 'pointer',
                  transition: 'transform var(--transition-fast)',
                }}
                title={color.name}
              />
            );
          })}
          <input
            type="color"
            value={customization.accentColor}
            onChange={(e) => updateCustomization({ accentColor: e.target.value, borderColor: e.target.value })}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            title="Custom Accent Color"
          />
        </div>
      </div>

      {/* 6. Logo Size & Position */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Logo Size</label>
          <select
            className="form-select"
            value={customization.logoSize}
            onChange={(e) => updateCustomization({ logoSize: e.target.value as LogoSize })}
          >
            <option value="small">Small (60px)</option>
            <option value="medium">Medium (85px)</option>
            <option value="large">Large (110px)</option>
            <option value="extra-large">Extra Large (135px)</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Logo Position</label>
          <select
            className="form-select"
            value={customization.logoPosition}
            onChange={(e) => updateCustomization({ logoPosition: e.target.value as LogoPosition })}
          >
            <option value="top-center">Top Center</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
      </div>

      {/* 7. Spacing Density */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">Vertical Spacing Density</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.375rem' }}>
          {[
            { id: 'compact', label: 'Compact' },
            { id: 'normal', label: 'Balanced' },
            { id: 'relaxed', label: 'Spacious' },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              className={`btn btn-sm ${customization.spacingDensity === s.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => updateCustomization({ spacingDensity: s.id as SpacingDensity })}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Design Button */}
      <div
        style={{
          marginTop: '0.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {showResetConfirm ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-error)' }}>Reset all form data?</span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: 'var(--color-error)' }}
              onClick={() => {
                resetDesign();
                setShowResetConfirm(false);
              }}
            >
              Yes, Reset
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowResetConfirm(true)}
            style={{ color: 'var(--text-muted)' }}
          >
            <RotateCcw size={14} /> Reset Design & Form
          </button>
        )}
      </div>
    </div>
  );
};
