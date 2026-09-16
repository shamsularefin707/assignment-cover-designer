import React from 'react';
import { CoverData } from '../../../types/cover';

interface TemplateProps {
  coverData: CoverData;
}

export const ModernAccent: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#0284c7';

  const logoDimensions = {
    small: '55px',
    medium: '75px',
    large: '95px',
    'extra-large': '120px',
  }[customization.logoSize] || '75px';

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: customization.fontFamily,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 1. Top Decorative Colored Header Band */}
      <div
        style={{
          backgroundColor: accent,
          color: '#ffffff',
          padding: '28px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: `${1.4 * fontScale}rem`,
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.25,
              color: '#ffffff',
            }}
          >
            {university.name}
          </h1>
          <h2
            style={{
              fontSize: `${0.95 * fontScale}rem`,
              fontWeight: 400,
              opacity: 0.9,
              marginTop: '4px',
              color: '#ffffff',
            }}
          >
            {department.name}
          </h2>
        </div>

        {customization.logoPosition !== 'hidden' && university.logoUrl && (
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <img
              src={university.logoUrl}
              alt={university.shortName}
              style={{ maxHeight: logoDimensions, maxWidth: '120px', objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* 2. Body Area */}
      <div
        style={{
          flex: 1,
          padding: '40px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Assignment Subject Block */}
        <div style={{ textAlign: 'center', margin: 'auto 0' }}>
          <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '14px' }}>
            {course.code && (
              <span
                style={{
                  backgroundColor: '#f1f5f9',
                  color: accent,
                  fontWeight: 700,
                  fontSize: `${0.85 * fontScale}rem`,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  border: `1px solid ${accent}`,
                }}
              >
                {course.code}
              </span>
            )}
            {course.assignmentNo && (
              <span
                style={{
                  backgroundColor: accent,
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: `${0.85 * fontScale}rem`,
                  padding: '4px 12px',
                  borderRadius: '9999px',
                }}
              >
                {course.assignmentNo}
              </span>
            )}
          </div>

          <h2
            style={{
              fontSize: `${1.75 * fontScale}rem`,
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.3,
              marginBottom: '12px',
            }}
          >
            {course.assignmentTitle || 'Assignment Title'}
          </h2>

          <h3
            style={{
              fontSize: `${1.1 * fontScale}rem`,
              fontWeight: 600,
              color: '#475569',
              marginBottom: '8px',
            }}
          >
            {course.name}
          </h3>

          {additional.visibleFields.topic && additional.topic && (
            <p style={{ fontSize: `${0.9 * fontScale}rem`, color: '#64748b', fontStyle: 'italic' }}>
              Topic: {additional.topic}
            </p>
          )}

          {/* Metadata Badges */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '16px',
              fontSize: `${0.82 * fontScale}rem`,
              color: '#475569',
            }}
          >
            {course.semester && <span>Semester: {course.semester}</span>}
            {course.section && <span>Section: {course.section}</span>}
            {course.batch && <span>Batch: {course.batch}</span>}
            {course.academicYear && <span>Session: {course.academicYear}</span>}
          </div>
        </div>

        {/* Bottom Submission Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            borderTop: `2px solid ${accent}`,
            paddingTop: '20px',
          }}
        >
          {/* Student Info */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                fontSize: `${0.75 * fontScale}rem`,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: accent,
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}
            >
              Submitted By:
            </div>

            <div style={{ fontSize: `${1.1 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
              {student.name || 'Student Name'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px', fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
              {student.visibleFields.studentId && student.studentId && (
                <div>ID: <strong>{student.studentId}</strong></div>
              )}
              {student.visibleFields.rollNo && student.rollNo && (
                <div>Roll: <strong>{student.rollNo}</strong></div>
              )}
              {student.visibleFields.regNo && student.regNo && (
                <div>Reg: <strong>{student.regNo}</strong></div>
              )}
              {student.visibleFields.batch && student.batch && (
                <div>Batch: {student.batch}</div>
              )}
            </div>

            {additional.visibleFields.teamMembers && additional.teamMembers.length > 0 && (
              <div style={{ marginTop: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Team:</span>
                {additional.teamMembers.map((m) => (
                  <div key={m.id} style={{ fontSize: '0.78rem', color: '#1e293b' }}>
                    • {m.name} ({m.studentId})
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructor Info */}
          <div
            style={{
              padding: '16px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                fontSize: `${0.75 * fontScale}rem`,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: accent,
                letterSpacing: '0.08em',
                marginBottom: '6px',
              }}
            >
              Submitted To:
            </div>

            <div style={{ fontSize: `${1.1 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
              {submission.submittedTo || 'Faculty Name'}
            </div>

            {submission.visibleFields.designation && submission.designation && (
              <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#475569', marginTop: '2px' }}>
                {submission.designation}
              </div>
            )}

            {submission.visibleFields.department && submission.department && (
              <div style={{ fontSize: `${0.82 * fontScale}rem`, color: '#64748b', marginTop: '2px' }}>
                {submission.department}
              </div>
            )}

            <div style={{ marginTop: '10px', fontSize: `${0.82 * fontScale}rem`, color: '#334155' }}>
              <strong>Date: </strong>
              {submission.submissionDate
                ? new Date(submission.submissionDate).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Date'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
