import React, { useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { COVER_TEMPLATES } from '../../data/templates';
import { Layout, Check, Sparkles, ArrowRight, Filter } from 'lucide-react';

export const TemplatesView: React.FC = () => {
  const { coverData, applyTemplate, setCurrentView } = useCoverDesigner();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Templates (8)' },
    { id: 'academic', label: 'Academic / Formal' },
    { id: 'modern', label: 'Modern & Corporate' },
    { id: 'minimal', label: 'Minimal Editorial' },
    { id: 'technical', label: 'Engineering / Lab' },
    { id: 'formal', label: 'Ornate Frame' },
  ];

  const filteredTemplates = COVER_TEMPLATES.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  const handleSelectTemplate = (id: string) => {
    applyTemplate(id);
    setCurrentView('designer');
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem 1.5rem 4rem',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Title */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={15} /> 8 Professionally Crafted Academic Designs
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Academic Cover Page Templates
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              margin: '0.5rem auto 0',
            }}
          >
            Tailored specifically for universities across Bangladesh. Each template genuinely alters layout geometry, section hierarchy, borders, and academic typography.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-full)', padding: '0.4rem 1rem' }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredTemplates.map((template) => {
            const isCurrent = coverData.customization.templateId === template.id;

            return (
              <div
                key={template.id}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${isCurrent ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                  boxShadow: isCurrent ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-normal)',
                }}
              >
                {/* Visual Thumbnail / Schematic Representation */}
                <div
                  style={{
                    height: '180px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border-subtle)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Miniature A4 Representation */}
                  <div
                    style={{
                      width: '110px',
                      height: '155px',
                      backgroundColor: '#ffffff',
                      boxShadow: 'var(--shadow-md)',
                      borderRadius: '2px',
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: template.defaultBorderStyle === 'double' ? '2px double #1e3a8a' : '1px solid #cbd5e1',
                    }}
                  >
                    {/* Header line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: template.defaultAccentColor, opacity: 0.8 }} />
                      <div style={{ width: '80%', height: '4px', backgroundColor: '#334155', borderRadius: '1px' }} />
                      <div style={{ width: '50%', height: '3px', backgroundColor: '#94a3b8', borderRadius: '1px' }} />
                    </div>

                    {/* Middle assignment title */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', margin: 'auto 0' }}>
                      <div style={{ width: '90%', height: '6px', backgroundColor: template.defaultAccentColor, borderRadius: '1px' }} />
                      <div style={{ width: '70%', height: '4px', backgroundColor: '#64748b', borderRadius: '1px' }} />
                    </div>

                    {/* Bottom footer blocks */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                      <div style={{ width: '45%', height: '18px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }} />
                      <div style={{ width: '45%', height: '18px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }} />
                    </div>
                  </div>

                  {isCurrent && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'var(--color-primary)',
                        color: '#ffffff',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Check size={12} /> Active
                    </div>
                  )}
                </div>

                {/* Content Card Body */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {template.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '0.875rem' }}>
                    {template.shortDescription}
                  </p>

                  {/* Feature Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
                    {template.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Recommended For */}
                  <div
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-subtle)',
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '1.25rem',
                      marginTop: 'auto',
                    }}
                  >
                    <strong>Ideal for:</strong> {template.recommendedFor}
                  </div>

                  {/* Select Button */}
                  <button
                    type="button"
                    className={`btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ width: '100%' }}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    {isCurrent ? (
                      <>
                        <span>Continue Editing</span>
                        <ArrowRight size={15} />
                      </>
                    ) : (
                      <>
                        <span>Use This Template</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
