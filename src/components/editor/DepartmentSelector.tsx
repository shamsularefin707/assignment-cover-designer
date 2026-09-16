import React, { useState, useEffect, useMemo } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { BANGLADESH_UNIVERSITIES } from '../../data/universities';
import { COMMON_DEPARTMENTS } from '../../data/departments';
import { BookOpen, Plus, Check } from 'lucide-react';

export const DepartmentSelector: React.FC = () => {
  const { coverData, updateDepartment } = useCoverDesigner();
  const [isCustomMode, setIsCustomMode] = useState(coverData.department.isCustom);
  const [customDeptText, setCustomDeptText] = useState('');

  // Get departments for currently selected university
  const currentUniv = useMemo(
    () => BANGLADESH_UNIVERSITIES.find((u) => u.id === coverData.university.id),
    [coverData.university.id]
  );

  const departmentList = useMemo(() => {
    if (currentUniv && currentUniv.departments.length > 0) {
      return currentUniv.departments;
    }
    // Fallback to common departments
    return COMMON_DEPARTMENTS.map((d) => d.name);
  }, [currentUniv]);

  useEffect(() => {
    setIsCustomMode(coverData.department.isCustom);
    if (coverData.department.isCustom) {
      setCustomDeptText(coverData.department.name);
    }
  }, [coverData.department]);

  const handleSelect = (deptName: string) => {
    setIsCustomMode(false);
    updateDepartment(deptName, false);
  };

  const handleCustomApply = () => {
    if (!customDeptText.trim()) return;
    setIsCustomMode(true);
    updateDepartment(customDeptText.trim(), true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Academic Department</span>
        </div>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.75rem' }}
          onClick={() => setIsCustomMode(!isCustomMode)}
        >
          {isCustomMode ? 'Choose from list' : '+ Other / Custom'}
        </button>
      </div>

      {isCustomMode ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="form-label">
            <span>Custom Department Name</span>
            <span className="required-badge">*</span>
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Department of Robotics and Mechatronics Engineering"
              value={customDeptText}
              onChange={(e) => setCustomDeptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCustomApply();
              }}
            />
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleCustomApply}
              disabled={!customDeptText.trim()}
            >
              Apply
            </button>
          </div>
          <span className="form-hint">
            Will be displayed under the university masthead on your cover page.
          </span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <select
            className="form-select"
            value={coverData.department.name}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                setIsCustomMode(true);
              } else {
                handleSelect(e.target.value);
              }
            }}
          >
            {departmentList.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
            <option value="__custom__">+ Other / Custom Department...</option>
          </select>

          {/* Quick Select Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.25rem' }}>
            {departmentList.slice(0, 5).map((dept, idx) => {
              const isSelected = coverData.department.name === dept && !isCustomMode;
              // Extract short label inside parenthesis or first 3 words
              const shortLabel = dept.match(/\(([^)]+)\)/)?.[1] || dept.split(' ').slice(2, 4).join(' ');
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(dept)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.7rem',
                    borderRadius: 'var(--radius-sm)',
                    border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-subtle)'}`,
                    backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--bg-subtle)',
                    color: isSelected ? 'var(--color-primary)' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {shortLabel || dept}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
