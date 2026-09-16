import React from 'react';
import { CoverData } from '../../../types/cover';
import { CoverLogo } from '../CoverLogo';

interface TemplateProps {
  coverData: CoverData;
}

export const UniversityCentered: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#1e40af';

  const logoDimensions = {
    small: '90px',
    medium: '120px',
    large: '150px',
    'extra-large': '175px',
  }[customization.logoSize] || '120px';

  return (
    <div
      style={{
        padding: '44px 50px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: customization.fontFamily,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 1. Large Central University Emblem & Institutional Masthead */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <CoverLogo
          coverData={coverData}
          maxHeight={logoDimensions}
          maxWidth="220px"
          style={{ marginBottom: '18px' }}
        />

        <h1
          style={{
            fontSize: `${1.65 * fontScale}rem`,
            fontWeight: 800,
            color: '#0f172a',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1.25,
            marginBottom: '6px',
            maxWidth: '680px',
          }}
        >
          {university.name}
        </h1>

        <h2
          style={{
            fontSize: `${1.1 * fontScale}rem`,
            fontWeight: 600,
            color: '#334155',
            letterSpacing: '0.02em',
          }}
        >
          {department.name}
        </h2>
      </div>

      {/* 2. Middle Assignment Framing */}
      <div style={{ width: '100%', maxWidth: '640px', margin: 'auto 0', padding: '16px 0' }}>
        <div
          style={{
            border: `2px solid ${accent}`,
            borderRadius: '4px',
            padding: '24px 28px',
            backgroundColor: '#f8fafc',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
          }}
        >
          {course.assignmentNo && (
            <div
              style={{
                fontSize: `${0.95 * fontScale}rem`,
                fontWeight: 700,
                color: accent,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '8px',
              }}
            >
              {course.assignmentNo}
            </div>
          )}

          <h3
            style={{
              fontSize: `${1.55 * fontScale}rem`,
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.3,
              marginBottom: '12px',
            }}
          >
            {course.assignmentTitle || 'Assignment Title'}
          </h3>

          <div
            style={{
              fontSize: `${1.15 * fontScale}rem`,
              fontWeight: 600,
              color: '#1e293b',
            }}
          >
            {course.code ? `${course.code}: ` : ''}
            {course.name}
          </div>

          {additional.visibleFields.topic && additional.topic && (
            <div style={{ fontSize: `${0.9 * fontScale}rem`, fontStyle: 'italic', color: '#64748b', marginTop: '6px' }}>
              Topic: {additional.topic}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              marginTop: '12px',
              fontSize: `${0.82 * fontScale}rem`,
              color: '#475569',
              borderTop: '1px solid #e2e8f0',
              paddingTop: '10px',
            }}
          >
            {course.semester && <span>Semester: {course.semester}</span>}
            {course.section && <span>Section: {course.section}</span>}
            {course.batch && <span>Batch: {course.batch}</span>}
            {course.academicYear && <span>Session: {course.academicYear}</span>}
          </div>
        </div>
      </div>

      {/* 3. Bottom Columns */}
      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            borderTop: '1px solid #cbd5e1',
            paddingTop: '20px',
            textAlign: 'left',
          }}
        >
          {/* Student */}
          <div>
            <div
              style={{
                fontSize: `${0.85 * fontScale}rem`,
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
            <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155', marginTop: '4px', lineHeight: 1.4 }}>
              {student.visibleFields.studentId && student.studentId && (
                <div>ID: {student.studentId}</div>
              )}
              {student.visibleFields.rollNo && student.rollNo && (
                <div>Roll: {student.rollNo}</div>
              )}
              {student.visibleFields.regNo && student.regNo && (
                <div>Reg: {student.regNo}</div>
              )}
              {student.visibleFields.batch && student.batch && (
                <div>Batch: {student.batch}</div>
              )}
            </div>

            {additional.visibleFields.teamMembers && additional.teamMembers.length > 0 && (
              <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#475569' }}>
                <span style={{ fontWeight: 600 }}>Team Members:</span>
                {additional.teamMembers.map((m) => (
                  <div key={m.id}>• {m.name} ({m.studentId})</div>
                ))}
              </div>
            )}
          </div>

          {/* Instructor */}
          <div>
            <div
              style={{
                fontSize: `${0.85 * fontScale}rem`,
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
              <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155', marginTop: '2px' }}>
                {submission.designation}
              </div>
            )}
            {submission.visibleFields.department && submission.department && (
              <div style={{ fontSize: `${0.82 * fontScale}rem`, color: '#64748b', marginTop: '2px' }}>
                {submission.department}
              </div>
            )}
          </div>
        </div>

        {/* Date */}
        <div style={{ marginTop: '16px', fontSize: `${0.85 * fontScale}rem`, color: '#64748b' }}>
          Date of Submission:{' '}
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
  );
};
