import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { UserCheck, Calendar, Clock, Eye, EyeOff } from 'lucide-react';

const COMMON_DESIGNATIONS = [
  'Professor',
  'Associate Professor',
  'Assistant Professor',
  'Senior Lecturer',
  'Lecturer',
  'Adjunct Faculty',
  'Course Instructor',
  'Teaching Assistant',
];

export const SubmissionInfoForm: React.FC = () => {
  const { coverData, updateSubmission } = useCoverDesigner();
  const { submission } = coverData;

  const setTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    updateSubmission({ submissionDate: today });
  };

  const setTomorrowDate = () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    updateSubmission({ submissionDate: tomorrow });
  };

  const toggleField = (field: keyof typeof submission.visibleFields) => {
    updateSubmission({
      visibleFields: {
        ...submission.visibleFields,
        [field]: !submission.visibleFields[field],
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Instructor / Faculty Name */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">
          <span>Submitted To (Faculty / Instructor Name)</span>
          <span className="required-badge">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Dr. Mohammad Sadique Rahman"
          value={submission.submittedTo}
          onChange={(e) => updateSubmission({ submittedTo: e.target.value })}
        />
      </div>

      {/* Designation & Quick Pills */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div className="form-label">
          <span>Designation</span>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => toggleField('designation')}
            title={submission.visibleFields.designation ? 'Hide designation' : 'Show designation'}
          >
            {submission.visibleFields.designation ? (
              <Eye size={14} style={{ color: 'var(--color-primary)' }} />
            ) : (
              <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Professor"
          value={submission.designation}
          onChange={(e) => updateSubmission({ designation: e.target.value })}
        />

        {/* Quick Designation Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.375rem' }}>
          {COMMON_DESIGNATIONS.slice(0, 5).map((desig) => (
            <button
              key={desig}
              type="button"
              onClick={() => updateSubmission({ designation: desig })}
              style={{
                padding: '0.15rem 0.45rem',
                fontSize: '0.68rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: submission.designation === desig ? 'var(--color-primary-light)' : 'var(--bg-subtle)',
                color: submission.designation === desig ? 'var(--color-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {desig}
            </button>
          ))}
        </div>
      </div>

      {/* Faculty Department */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <div className="form-label">
          <span>Faculty Department / Institute</span>
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
            onClick={() => toggleField('department')}
          >
            {submission.visibleFields.department ? (
              <Eye size={14} style={{ color: 'var(--color-primary)' }} />
            ) : (
              <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
            )}
          </button>
        </div>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Department of Computer Science and Engineering"
          value={submission.department}
          onChange={(e) => updateSubmission({ department: e.target.value })}
        />
      </div>

      {/* Submission Date & Time Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span>Submission Date</span>
            <span className="required-badge">*</span>
          </label>
          <input
            type="date"
            className="form-input"
            value={submission.submissionDate}
            onChange={(e) => updateSubmission({ submissionDate: e.target.value })}
          />
          {/* Quick Date Pills */}
          <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.25rem' }}>
            <button
              type="button"
              onClick={setTodayDate}
              style={{
                padding: '0.15rem 0.4rem',
                fontSize: '0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'transparent',
                color: 'var(--color-primary)',
                cursor: 'pointer',
              }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={setTomorrowDate}
              style={{
                padding: '0.15rem 0.4rem',
                fontSize: '0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'transparent',
                color: 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              Tomorrow
            </button>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Time (Optional)</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleField('time')}
            >
              {submission.visibleFields.time ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: submission.visibleFields.time ? 1 : 0.6 }}
            placeholder="e.g. 11:59 PM"
            value={submission.submissionTime}
            onChange={(e) => updateSubmission({ submissionTime: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
