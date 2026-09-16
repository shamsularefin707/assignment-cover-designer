import React from 'react';
import { CoverData } from '../../../types/cover';

interface TemplateProps {
  coverData: CoverData;
}

export const FormalBorder: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#1e293b';

  const logoDimensions = {
    small: '60px',
    medium: '80px',
    large: '100px',
    'extra-large': '125px',
  }[customization.logoSize] || '80px';

  return (
    <div
      style={{
        padding: '24px',
        height: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
        fontFamily: customization.fontFamily,
      }}
    >
      {/* Decorative Outer Border with Inner Border */}
      <div
        style={{
          border: `2px solid ${accent}`,
          padding: '6px',
          height: '100%',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        <div
          style={{
            border: `1px solid ${accent}`,
            padding: '36px 40px',
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Corner Flourishes */}
          <div
            style={{
              position: 'absolute',
              top: '6px',
              left: '6px',
              width: '16px',
              height: '16px',
              borderTop: `3px solid ${accent}`,
              borderLeft: `3px solid ${accent}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '16px',
              height: '16px',
              borderTop: `3px solid ${accent}`,
              borderRight: `3px solid ${accent}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              left: '6px',
              width: '16px',
              height: '16px',
              borderBottom: `3px solid ${accent}`,
              borderLeft: `3px solid ${accent}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '6px',
              right: '6px',
              width: '16px',
              height: '16px',
              borderBottom: `3px solid ${accent}`,
              borderRight: `3px solid ${accent}`,
            }}
          />

          {/* 1. University Header */}
          <div style={{ textAlign: 'center' }}>
            {customization.logoPosition !== 'hidden' && university.logoUrl && (
              <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={university.logoUrl}
                  alt={university.shortName}
                  style={{ maxHeight: logoDimensions, maxWidth: '160px', objectFit: 'contain' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <h1
              style={{
                fontSize: `${1.55 * fontScale}rem`,
                fontWeight: 700,
                color: '#0f172a',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                lineHeight: 1.25,
                marginBottom: '6px',
              }}
            >
              {university.name}
            </h1>

            <h2
              style={{
                fontSize: `${1.05 * fontScale}rem`,
                fontWeight: 600,
                color: '#334155',
                letterSpacing: '0.02em',
              }}
            >
              {department.name}
            </h2>

            {/* Classical Divider Flourish */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px',
                color: accent,
              }}
            >
              <span style={{ width: '40px', height: '1px', backgroundColor: accent }} />
              <span style={{ fontSize: '0.8rem' }}>❖</span>
              <span style={{ width: '40px', height: '1px', backgroundColor: accent }} />
            </div>
          </div>

          {/* 2. Middle Section */}
          <div style={{ textAlign: 'center', margin: 'auto 0', padding: '16px 0' }}>
            <div
              style={{
                fontSize: `${0.9 * fontScale}rem`,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#64748b',
                marginBottom: '8px',
                fontWeight: 600,
              }}
            >
              {course.assignmentNo || 'ACADEMIC SUBMISSION'}
            </div>

            <h2
              style={{
                fontSize: `${1.65 * fontScale}rem`,
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.35,
                maxWidth: '620px',
                margin: '0 auto 14px',
              }}
            >
              {course.assignmentTitle || 'Assignment Title'}
            </h2>

            {additional.visibleFields.topic && additional.topic && (
              <p style={{ fontSize: `${0.95 * fontScale}rem`, fontStyle: 'italic', color: '#475569', marginBottom: '14px' }}>
                Under the Theme of: {additional.topic}
              </p>
            )}

            <div
              style={{
                fontSize: `${1.1 * fontScale}rem`,
                fontWeight: 600,
                color: '#1e293b',
                marginTop: '8px',
              }}
            >
              {course.code ? `${course.code} — ` : ''}
              {course.name}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                marginTop: '8px',
                fontSize: `${0.85 * fontScale}rem`,
                color: '#475569',
              }}
            >
              {course.semester && <span>Semester: {course.semester}</span>}
              {course.batch && <span>Batch: {course.batch}</span>}
              {course.academicYear && <span>Session: {course.academicYear}</span>}
            </div>
          </div>

          {/* 3. Bottom Columns */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                borderTop: `1px solid ${accent}`,
                paddingTop: '20px',
                marginBottom: '14px',
              }}
            >
              {/* Submitted By */}
              <div>
                <div
                  style={{
                    fontSize: `${0.85 * fontScale}rem`,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: accent,
                    marginBottom: '6px',
                  }}
                >
                  Submitted By:
                </div>

                <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
                  {student.name || 'Student Name'}
                </div>

                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155', marginTop: '4px', lineHeight: 1.4 }}>
                  {student.visibleFields.studentId && student.studentId && (
                    <div>ID No: {student.studentId}</div>
                  )}
                  {student.visibleFields.rollNo && student.rollNo && (
                    <div>Roll No: {student.rollNo}</div>
                  )}
                  {student.visibleFields.regNo && student.regNo && (
                    <div>Registration No: {student.regNo}</div>
                  )}
                  {student.visibleFields.section && student.section && (
                    <div>Section: {student.section}</div>
                  )}
                </div>

                {additional.visibleFields.teamMembers && additional.teamMembers.length > 0 && (
                  <div style={{ marginTop: '6px', fontSize: '0.78rem', color: '#475569' }}>
                    <span style={{ fontWeight: 600 }}>Team: </span>
                    {additional.teamMembers.map((m) => m.name).join(', ')}
                  </div>
                )}
              </div>

              {/* Submitted To */}
              <div>
                <div
                  style={{
                    fontSize: `${0.85 * fontScale}rem`,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: accent,
                    marginBottom: '6px',
                  }}
                >
                  Submitted To:
                </div>

                <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
                  {submission.submittedTo || 'Professor / Instructor'}
                </div>

                {submission.visibleFields.designation && submission.designation && (
                  <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155', marginTop: '2px' }}>
                    {submission.designation}
                  </div>
                )}

                {submission.visibleFields.department && submission.department && (
                  <div style={{ fontSize: `${0.82 * fontScale}rem`, color: '#475569', marginTop: '2px' }}>
                    {submission.department}
                  </div>
                )}
              </div>
            </div>

            {/* Date */}
            <div style={{ textAlign: 'center', fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
              Submission Date:{' '}
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
