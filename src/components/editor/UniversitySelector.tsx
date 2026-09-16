import React, { useState, useMemo } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { BANGLADESH_UNIVERSITIES } from '../../data/universities';
import { Search, Building2, MapPin, Globe, Check, Plus } from 'lucide-react';
import { UniversityType } from '../../types/cover';

export const UniversitySelector: React.FC = () => {
  const { coverData, updateUniversity } = useCoverDesigner();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isCustomMode, setIsCustomMode] = useState(coverData.university.id === 'custom');
  const [customName, setCustomName] = useState(coverData.university.customName || '');
  const [customShortName, setCustomShortName] = useState(coverData.university.customShortName || '');

  // Popular universities for fast one-click pill access
  const popularList = useMemo(
    () => BANGLADESH_UNIVERSITIES.filter((u) => u.isPopular),
    []
  );

  const filteredUniversities = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return BANGLADESH_UNIVERSITIES.filter((univ) => {
      const matchesType =
        selectedType === 'all' ||
        univ.type === selectedType ||
        (selectedType === 'public' && univ.type === 'engineering');

      if (!matchesType) return false;
      if (!query) return true;

      return (
        univ.name.toLowerCase().includes(query) ||
        univ.shortName.toLowerCase().includes(query) ||
        univ.location.toLowerCase().includes(query) ||
        univ.domain.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedType]);

  const handleSelect = (id: string) => {
    setIsCustomMode(false);
    const target = BANGLADESH_UNIVERSITIES.find((u) => u.id === id);
    if (target) {
      updateUniversity(target);
    }
  };

  const handleSaveCustom = () => {
    if (!customName.trim()) return;
    setIsCustomMode(true);
    updateUniversity(null, customName.trim(), customShortName.trim() || 'UNIV');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Current Selection Header Card */}
      <div
        style={{
          padding: '0.875rem 1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
              flexShrink: 0,
            }}
          >
            {coverData.university.logoUrl ? (
              <img
                src={coverData.university.logoUrl}
                alt={coverData.university.shortName}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <Building2 size={20} style={{ color: 'var(--color-primary)' }} />
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                {coverData.university.shortName || 'University'}
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>
                Active
              </span>
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {coverData.university.name}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setIsCustomMode(!isCustomMode)}
        >
          {isCustomMode ? 'Search Preset' : 'Custom'}
        </button>
      </div>

      {isCustomMode ? (
        /* Custom University Entry Form */
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-medium)',
            backgroundColor: 'var(--bg-surface-elevated)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.875rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={16} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Custom University Details</span>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              <span>University Full Name</span>
              <span className="required-badge">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Bangabandhu Sheikh Mujibur Rahman Digital University"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Short Acronym / Abbreviation</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. BDU"
              value={customShortName}
              onChange={(e) => setCustomShortName(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleSaveCustom}
            disabled={!customName.trim()}
          >
            Apply Custom University
          </button>
        </div>
      ) : (
        /* Searchable University Selector */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Quick Popular Pills */}
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Select Popular
            </span>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.375rem',
                marginTop: '0.375rem',
              }}
            >
              {popularList.map((u) => {
                const isSelected = coverData.university.id === u.id;
                return (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleSelect(u.id)}
                    style={{
                      padding: '0.25rem 0.625rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-full)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-medium)'}`,
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--bg-surface)',
                      color: isSelected ? '#ffffff' : 'var(--text-primary)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    {u.shortName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input & Category Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '34px' }}
                placeholder="Search university by name, acronym, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '0.25rem', overflowX: 'auto', paddingBottom: '2px' }}>
              {[
                { id: 'all', label: 'All' },
                { id: 'public', label: 'Public' },
                { id: 'private', label: 'Private' },
                { id: 'engineering', label: 'Engineering / Tech' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedType(tab.id)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: selectedType === tab.id ? 'var(--color-primary-light)' : 'transparent',
                    color: selectedType === tab.id ? 'var(--color-primary)' : 'var(--text-muted)',
                    fontWeight: selectedType === tab.id ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* University Results List */}
          <div
            style={{
              maxHeight: '260px',
              overflowY: 'auto',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {filteredUniversities.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '0.875rem' }}>No university found matching "{searchQuery}"</p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => {
                    setCustomName(searchQuery);
                    setIsCustomMode(true);
                  }}
                >
                  <Plus size={14} /> Add as Custom University
                </button>
              </div>
            ) : (
              filteredUniversities.map((univ) => {
                const isSelected = coverData.university.id === univ.id;
                return (
                  <div
                    key={univ.id}
                    onClick={() => handleSelect(univ.id)}
                    style={{
                      padding: '0.625rem 0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'transparent',
                      transition: 'background-color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                          {univ.name}
                        </span>
                        <span
                          className="badge"
                          style={{
                            fontSize: '0.65rem',
                            padding: '1px 5px',
                            backgroundColor: 'var(--bg-subtle)',
                          }}
                        >
                          {univ.shortName}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <MapPin size={11} /> {univ.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Globe size={11} /> {univ.domain}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
