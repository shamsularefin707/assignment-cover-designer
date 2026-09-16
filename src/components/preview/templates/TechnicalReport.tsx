import React from 'react';
import { CoverData } from '../../../types/cover';
import { CoverLogo } from '../CoverLogo';

interface TemplateProps {
  coverData: CoverData;
}

export const TechnicalReport: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#0f766e';

  const logoDimensions = {
    small: '55px',
    medium: '75px',
    large: '95px',
    'extra-large': '120px',
  }[customization.logoSize] || '75px';

  return (
    <div
      style={{
        padding: '36px 42px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: customization.fontFamily,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 1. Engineering Header with Logo */}
      <div style={{ textAlign: 'center', borderBottom: `2px solid ${accent}`, paddingBottom: '16px' }}>
        <CoverLogo
          coverData={coverData}
          maxHeight={logoDimensions}
          maxWidth="160px"
          style={{ marginBottom: '10px' }}
        />

        <h1
          style={{
            fontSize: `${1.5 * fontScale}rem`,
            fontWeight: 800,
            color: '#0f172a',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1.25,
            marginBottom: '4px',
          }}
        >
          {university.name}
        </h1>

        <h2
          style={{
            fontSize: `${1.05 * fontScale}rem`,
            fontWeight: 600,
            color: '#334155',
          }}
        >
          {department.name}
        </h2>

        <div
          style={{
            display: 'inline-block',
            marginTop: '8px',
            backgroundColor: '#f0fdfa',
            color: accent,
            border: `1px solid ${accent}`,
            padding: '2px 14px',
            fontSize: `${0.8 * fontScale}rem`,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            borderRadius: '2px',
          }}
        >
          {additional.visibleFields.labType && additional.labType
            ? additional.labType
            : 'ENGINEERING LABORATORY REPORT'}
        </div>
      </div>

      {/* 2. Technical Specification Table (The core of engineering covers) */}
      <div style={{ margin: 'auto 0', padding: '16px 0' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: `${0.9 * fontScale}rem`,
            border: '2px solid #0f172a',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: '30%',
                  padding: '8px 12px',
                  fontWeight: 700,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                }}
              >
                Course No.
              </td>
              <td style={{ padding: '8px 12px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#0f172a' }}>
                {course.code || 'N/A'}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: '8px 12px',
                  fontWeight: 700,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                }}
              >
                Course Title
              </td>
              <td style={{ padding: '8px 12px', border: '1px solid #cbd5e1', fontWeight: 600, color: '#0f172a' }}>
                {course.name || 'Course Title'}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: '8px 12px',
                  fontWeight: 700,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                }}
              >
                Experiment / Assign No.
              </td>
              <td style={{ padding: '8px 12px', border: '1px solid #cbd5e1', fontWeight: 700, color: accent }}>
                {course.assignmentNo || '01'}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: '10px 12px',
                  fontWeight: 700,
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  verticalAlign: 'top',
                }}
              >
                Experiment Title
              </td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700, fontSize: `${1.05 * fontScale}rem`, color: '#0f172a' }}>
                {course.assignmentTitle || 'Experiment / Assignment Title'}
                {additional.visibleFields.topic && additional.topic && (
                  <div style={{ fontSize: '0.82rem', fontWeight: 400, color: '#64748b', marginTop: '4px' }}>
                    Topic: {additional.topic}
                  </div>
                )}
              </td>
            </tr>

            {additional.visibleFields.groupNumber && additional.groupNumber && (
              <tr>
                <td
                  style={{
                    padding: '8px 12px',
                    fontWeight: 700,
                    backgroundColor: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                  }}
                >
                  Group Number
                </td>
                <td style={{ padding: '8px 12px', border: '1px solid #cbd5e1', fontWeight: 600 }}>
                  {additional.groupNumber}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Bottom: Dual Submission Info & Teacher's Evaluation Box */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Student Credentials Box */}
          <div
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '2px',
              padding: '12px 14px',
              backgroundColor: '#f8fafc',
            }}
          >
            <div
              style={{
                fontSize: `${0.8 * fontScale}rem`,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: accent,
                letterSpacing: '0.08em',
                marginBottom: '6px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '3px',
              }}
            >
              Student Credentials
            </div>

            <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
              {student.name || 'Student Name'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px', fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
              {student.visibleFields.studentId && student.studentId && (
                <div><strong>Student ID:</strong> {student.studentId}</div>
              )}
              {student.visibleFields.rollNo && student.rollNo && (
                <div><strong>Roll No:</strong> {student.rollNo}</div>
              )}
              {student.visibleFields.regNo && student.regNo && (
                <div><strong>Reg No:</strong> {student.regNo}</div>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                {student.visibleFields.batch && student.batch && <span>Batch: {student.batch}</span>}
                {student.visibleFields.section && student.section && <span>Sec: {student.section}</span>}
              </div>
            </div>

            {additional.visibleFields.teamMembers && additional.teamMembers.length > 0 && (
              <div style={{ marginTop: '6px', borderTop: '1px dashed #cbd5e1', paddingTop: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Lab Partners:</span>
                {additional.teamMembers.map((m) => (
                  <div key={m.id} style={{ fontSize: '0.75rem', color: '#1e293b' }}>
                    • {m.name} ({m.studentId})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructor Box */}
          <div
            style={{
              border: '1px solid #cbd5e1',
              borderRadius: '2px',
              padding: '12px 14px',
              backgroundColor: '#f8fafc',
            }}
          >
            <div
              style={{
                fontSize: `${0.8 * fontScale}rem`,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: accent,
                letterSpacing: '0.08em',
                marginBottom: '6px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '3px',
              }}
            >
              Submitted To
            </div>

            <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
              {submission.submittedTo || 'Teacher / Instructor'}
            </div>

            {submission.visibleFields.designation && submission.designation && (
              <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155', marginTop: '2px' }}>
                {submission.designation}
              </div>
            )}

            {submission.visibleFields.department && submission.department && (
              <div style={{ fontSize: `${0.8 * fontScale}rem`, color: '#475569', marginTop: '2px' }}>
                {submission.department}
              </div>
            )}

            <div style={{ marginTop: '8px', fontSize: `${0.85 * fontScale}rem`, color: '#0f172a' }}>
              <strong>Date:</strong>{' '}
              {submission.submissionDate
                ? new Date(submission.submissionDate).toLocaleDateString('en-GB')
                : 'Date'}
            </div>
          </div>
        </div>

        {/* Dedicated Teacher's Assessment / Sign-off Strip */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: `${0.8 * fontScale}rem`,
            border: '1px solid #94a3b8',
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #94a3b8', fontWeight: 600, backgroundColor: '#f1f5f9' }}>
                Date of Submission
              </td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #94a3b8', fontWeight: 600, backgroundColor: '#f1f5f9' }}>
                Teacher's Signature
              </td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #94a3b8', fontWeight: 600, backgroundColor: '#f1f5f9' }}>
                Grade / Marks
              </td>
              <td style={{ width: '25%', padding: '6px 10px', border: '1px solid #94a3b8', fontWeight: 600, backgroundColor: '#f1f5f9' }}>
                Remarks
              </td>
            </tr>
            <tr>
              <td style={{ height: '36px', padding: '6px 10px', border: '1px solid #94a3b8' }}>
                {submission.submissionDate || ''}
              </td>
              <td style={{ height: '36px', padding: '6px 10px', border: '1px solid #94a3b8' }}></td>
              <td style={{ height: '36px', padding: '6px 10px', border: '1px solid #94a3b8' }}></td>
              <td style={{ height: '36px', padding: '6px 10px', border: '1px solid #94a3b8' }}></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
