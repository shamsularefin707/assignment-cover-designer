import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { User, Eye, EyeOff } from 'lucide-react';

export const StudentInfoForm: React.FC = () => {
  const { coverData, updateStudent } = useCoverDesigner();
  const { student } = coverData;

  const toggleFieldVisibility = (field: keyof typeof student.visibleFields) => {
    updateStudent({
      visibleFields: {
        ...student.visibleFields,
        [field]: !student.visibleFields[field],
      },
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Student Name */}
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label className="form-label">
          <span>Student Full Name</span>
          <span className="required-badge">*</span>
        </label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Arefin Ahmed"
          value={student.name}
          onChange={(e) => updateStudent({ name: e.target.value })}
        />
      </div>

      {/* Field Visibility Info Banner */}
      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span>Toggle the</span>
        <Eye size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
        <span>icon to show or hide optional fields on the printed cover page.</span>
      </div>

      {/* ID, Roll & Reg No Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
        {/* Student ID */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Student ID</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleFieldVisibility('studentId')}
              title={student.visibleFields.studentId ? 'Hide Student ID' : 'Show Student ID'}
            >
              {student.visibleFields.studentId ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: student.visibleFields.studentId ? 1 : 0.6 }}
            placeholder="e.g. 2005042"
            value={student.studentId}
            onChange={(e) => updateStudent({ studentId: e.target.value })}
          />
        </div>

        {/* Roll Number */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Roll Number</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleFieldVisibility('rollNo')}
              title={student.visibleFields.rollNo ? 'Hide Roll No' : 'Show Roll No'}
            >
              {student.visibleFields.rollNo ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: student.visibleFields.rollNo ? 1 : 0.6 }}
            placeholder="e.g. 2005042"
            value={student.rollNo}
            onChange={(e) => updateStudent({ rollNo: e.target.value })}
          />
        </div>

        {/* Registration Number */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Registration No.</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleFieldVisibility('regNo')}
              title={student.visibleFields.regNo ? 'Hide Reg No' : 'Show Reg No'}
            >
              {student.visibleFields.regNo ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: student.visibleFields.regNo ? 1 : 0.6 }}
            placeholder="e.g. 2020-542-019"
            value={student.regNo}
            onChange={(e) => updateStudent({ regNo: e.target.value })}
          />
        </div>
      </div>

      {/* Batch, Section, Semester */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem' }}>
        {/* Batch */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Batch</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleFieldVisibility('batch')}
            >
              {student.visibleFields.batch ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: student.visibleFields.batch ? 1 : 0.6 }}
            placeholder="e.g. 20"
            value={student.batch}
            onChange={(e) => updateStudent({ batch: e.target.value })}
          />
        </div>

        {/* Section */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Section</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleFieldVisibility('section')}
            >
              {student.visibleFields.section ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: student.visibleFields.section ? 1 : 0.6 }}
            placeholder="e.g. A1"
            value={student.section}
            onChange={(e) => updateStudent({ section: e.target.value })}
          />
        </div>

        {/* Semester */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <div className="form-label">
            <span>Semester / Level</span>
            <button
              type="button"
              className="btn-ghost"
              style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
              onClick={() => toggleFieldVisibility('semester')}
            >
              {student.visibleFields.semester ? (
                <Eye size={14} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <EyeOff size={14} style={{ color: 'var(--text-muted)' }} />
              )}
            </button>
          </div>
          <input
            type="text"
            className="form-input"
            style={{ opacity: student.visibleFields.semester ? 1 : 0.6 }}
            placeholder="e.g. Level-3, Term-1"
            value={student.semester}
            onChange={(e) => updateStudent({ semester: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
