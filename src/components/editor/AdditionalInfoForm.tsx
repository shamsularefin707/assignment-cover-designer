import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { Users, Plus, Trash2, Eye, EyeOff, FileText } from 'lucide-react';

const COMMON_LAB_TYPES = [
  'Theory Assignment',
  'Laboratory Experiment Report',
  'Term Paper',
  'Case Study Analysis',
  'Project Report',
  'Thesis / Capstone Defense',
  'Field Survey Report',
];

export const AdditionalInfoForm: React.FC = () => {
  const { coverData, updateAdditional } = useCoverDesigner();
  const { additional } = coverData;

  const toggleField = (field: keyof typeof additional.visibleFields) => {
    updateAdditional({
      visibleFields: {
        ...additional.visibleFields,
        [field]: !additional.visibleFields[field],
      },
    });
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: '',
      studentId: '',
      role: '',
    };
    updateAdditional({
      teamMembers: [...additional.teamMembers, newMember],
      isGroupAssignment: true,
      visibleFields: {
        ...additional.visibleFields,
        teamMembers: true,
      },
    });
  };

  const removeTeamMember = (id: string) => {
    const filtered = additional.teamMembers.filter((m) => m.id !== id);
    updateAdditional({
      teamMembers: filtered,
      isGroupAssignment: filtered.length > 0,
    });
  };

  const updateMember = (id: string, updates: Partial<{ name: string; studentId: string; role: string }>) => {
    const updated = additional.teamMembers.map((m) => (m.id === id ? { ...m, ...updates } : m));
    updateAdditional({ teamMembers: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Assignment Type / Lab Report Type */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div className="form-label">
          <span>Assignment / Document Type</span>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => toggleField('labType')}
          >
            {additional.visibleFields.labType ? (
              <Eye size={14} style={{ color: 'var(--color-primary)' }} />
            ) : (
              <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Laboratory Experiment Report"
          value={additional.labType}
          onChange={(e) => updateAdditional({ labType: e.target.value })}
        />

        {/* Quick Type Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.375rem' }}>
          {COMMON_LAB_TYPES.slice(0, 4).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateAdditional({ labType: t })}
              style={{
                padding: '0.15rem 0.45rem',
                fontSize: '0.68rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: additional.labType === t ? 'var(--color-primary-light)' : 'var(--bg-subtle)',
                color: additional.labType === t ? 'var(--color-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Specific Topic / Subtitle */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div className="form-label">
          <span>Specific Topic / Focus Area</span>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => toggleField('topic')}
          >
            {additional.visibleFields.topic ? (
              <Eye size={14} style={{ color: 'var(--color-primary)' }} />
            ) : (
              <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Relational Normalization to Boyce-Codd Normal Form"
          value={additional.topic}
          onChange={(e) => updateAdditional({ topic: e.target.value })}
        />
      </div>

      {/* Group Assignment Toggle & Group Number */}
      <div
        style={{
          padding: '0.875rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={16} style={{ color: 'var(--color-primary)' }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Group Assignment / Team</span>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addTeamMember}
            style={{ fontSize: '0.75rem' }}
          >
            <Plus size={13} /> Add Team Member
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Group No.</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Group 04"
              value={additional.groupNumber}
              onChange={(e) =>
                updateAdditional({
                  groupNumber: e.target.value,
                  visibleFields: { ...additional.visibleFields, groupNumber: true },
                })
              }
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Supports multi-student team members with individual IDs & roles</span>
          </div>
        </div>

        {/* Team Members List */}
        {additional.teamMembers.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Team Members ({additional.teamMembers.length})
            </span>

            {additional.teamMembers.map((member, idx) => (
              <div
                key={member.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr auto',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
                <input
                  type="text"
                  className="form-input"
                  placeholder={`Member ${idx + 1} Name`}
                  value={member.name}
                  onChange={(e) => updateMember(member.id, { name: e.target.value })}
                />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Student ID"
                  value={member.studentId}
                  onChange={(e) => updateMember(member.id, { studentId: e.target.value })}
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => removeTeamMember(member.id)}
                  style={{ color: 'var(--color-error)', padding: '6px' }}
                  title="Remove member"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Optional Academic Notes / Footnote */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div className="form-label">
          <span>Notes / Formal Declaration (Optional)</span>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => toggleField('notes')}
          >
            {additional.visibleFields.notes ? (
              <Eye size={14} style={{ color: 'var(--color-primary)' }} />
            ) : (
              <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
        <textarea
          className="form-textarea"
          rows={2}
          placeholder="e.g. Submitted in partial fulfillment of the requirements for the degree of B.Sc. in CSE."
          value={additional.notes}
          onChange={(e) => updateAdditional({ notes: e.target.value })}
        />
      </div>
    </div>
  );
};
