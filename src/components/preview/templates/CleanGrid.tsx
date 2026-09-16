import React from 'react';
import { CoverData } from '../../../types/cover';
import { CoverLogo } from '../CoverLogo';

interface TemplateProps {
  coverData: CoverData;
}

export const CleanGrid: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#4338ca';

  const logoDimensions = {
    small: '55px',
    medium: '75px',
    large: '95px',
    'extra-large': '120px',
  }[customization.logoSize] || '75px';

  return (
    <div
      style={{
        padding: '38px 44px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: customization.fontFamily,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Box 1: Institutional Card */}
      <div
        style={{
          padding: '20px 24px',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          backgroundColor: '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: `${0.75 * fontScale}rem`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: accent,
              marginBottom: '4px',
            }}
          >
            Institutional Affiliation
          </div>
          <h1
            style={{
              fontSize: `${1.35 * fontScale}rem`,
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.25,
            }}
          >
            {university.name}
          </h1>
          <h2
            style={{
              fontSize: `${0.95 * fontScale}rem`,
              fontWeight: 500,
              color: '#475569',
              marginTop: '2px',
            }}
          >
            {department.name}
          </h2>
        </div>

        {customization.logoPosition !== 'hidden' && (
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <CoverLogo coverData={coverData} maxHeight={logoDimensions} maxWidth="130px" />
          </div>
        )}
      </div>

      {/* Box 2: Course & Assignment Central Card */}
      <div
        style={{
          margin: '20px 0',
          padding: '28px 32px',
          border: `1.5px solid ${accent}`,
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 14px rgba(0,0,0,0.03)',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'inline-flex', gap: '8px', marginBottom: '12px' }}>
          {course.code && (
            <span
              style={{
                backgroundColor: accent,
                color: '#ffffff',
                fontSize: `${0.8 * fontScale}rem`,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '4px',
              }}
            >
              {course.code}
            </span>
          )}
          {course.assignmentNo && (
            <span
              style={{
                backgroundColor: '#eef2ff',
                color: accent,
                fontSize: `${0.8 * fontScale}rem`,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '4px',
                border: `1px solid ${accent}`,
              }}
            >
              {course.assignmentNo}
            </span>
          )}
        </div>

        <h2
          style={{
            fontSize: `${1.7 * fontScale}rem`,
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.3,
            marginBottom: '8px',
          }}
        >
          {course.assignmentTitle || 'Assignment Title'}
        </h2>

        <h3
          style={{
            fontSize: `${1.1 * fontScale}rem`,
            fontWeight: 600,
            color: '#334155',
          }}
        >
          {course.name}
        </h3>

        {additional.visibleFields.topic && additional.topic && (
          <p style={{ fontSize: `${0.9 * fontScale}rem`, color: '#64748b', fontStyle: 'italic', marginTop: '6px' }}>
            Topic: {additional.topic}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #f1f5f9',
            fontSize: `${0.82 * fontScale}rem`,
            color: '#64748b',
          }}
        >
          {course.semester && <span>Semester: <strong>{course.semester}</strong></span>}
          {course.section && <span>Section: <strong>{course.section}</strong></span>}
          {course.batch && <span>Batch: <strong>{course.batch}</strong></span>}
          {course.academicYear && <span>Session: <strong>{course.academicYear}</strong></span>}
        </div>
      </div>

      {/* Box 3: Dual Column Credentials Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Student Box */}
        <div
          style={{
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
          }}
        >
          <div
            style={{
              fontSize: `${0.75 * fontScale}rem`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: accent,
              marginBottom: '6px',
            }}
          >
            Student Credentials
          </div>

          <div style={{ fontSize: `${1.1 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
            {student.name || 'Student Name'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px', fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
            {student.visibleFields.studentId && student.studentId && (
              <div>Student ID: <strong>{student.studentId}</strong></div>
            )}
            {student.visibleFields.rollNo && student.rollNo && (
              <div>Roll No: <strong>{student.rollNo}</strong></div>
            )}
            {student.visibleFields.regNo && student.regNo && (
              <div>Reg No: <strong>{student.regNo}</strong></div>
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

        {/* Instructor Box */}
        <div
          style={{
            padding: '16px 20px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
          }}
        >
          <div
            style={{
              fontSize: `${0.75 * fontScale}rem`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: accent,
              marginBottom: '6px',
            }}
          >
            Faculty Evaluator
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
            <strong>Submission Date: </strong>
            {submission.submissionDate
              ? new Date(submission.submissionDate).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : 'Date'}
          </div>
        </div>
      </div>
    </div>
  );
};
