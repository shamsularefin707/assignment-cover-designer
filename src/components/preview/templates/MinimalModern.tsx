import React from 'react';
import { CoverData } from '../../../types/cover';

interface TemplateProps {
  coverData: CoverData;
}

export const MinimalModern: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#0f172a';

  const logoDimensions = {
    small: '50px',
    medium: '70px',
    large: '90px',
    'extra-large': '115px',
  }[customization.logoSize] || '70px';

  return (
    <div
      style={{
        padding: '52px 58px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: customization.fontFamily,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 1. Top Institutional Brand (Left Aligned with Top Logo) */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
        <div>
          <h1
            style={{
              fontSize: `${1.4 * fontScale}rem`,
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: '4px',
            }}
          >
            {university.name}
          </h1>
          <p
            style={{
              fontSize: `${0.95 * fontScale}rem`,
              fontWeight: 500,
              color: '#64748b',
              letterSpacing: '0.01em',
            }}
          >
            {department.name}
          </p>
        </div>

        {customization.logoPosition !== 'hidden' && university.logoUrl && (
          <img
            src={university.logoUrl}
            alt={university.shortName}
            style={{ height: logoDimensions, maxWidth: '140px', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* 2. Middle Section: Bold Editorial Assignment Headline */}
      <div style={{ margin: 'auto 0', padding: '30px 0' }}>
        {/* Subtle accent vertical hairline with content */}
        <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: `${0.8 * fontScale}rem`,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: '12px',
            }}
          >
            <span>{course.code || 'COURSE'}</span>
            <span>•</span>
            <span>{course.assignmentNo || 'ASSIGNMENT'}</span>
            {additional.visibleFields.labType && additional.labType && (
              <>
                <span>•</span>
                <span>{additional.labType}</span>
              </>
            )}
          </div>

          <h2
            style={{
              fontSize: `${2.1 * fontScale}rem`,
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              marginBottom: '14px',
            }}
          >
            {course.assignmentTitle || 'Assignment Title'}
          </h2>

          <div
            style={{
              fontSize: `${1.1 * fontScale}rem`,
              fontWeight: 500,
              color: '#334155',
              marginBottom: '10px',
            }}
          >
            {course.name}
          </div>

          {additional.visibleFields.topic && additional.topic && (
            <p style={{ fontSize: `${0.9 * fontScale}rem`, color: '#64748b', fontStyle: 'italic' }}>
              Topic: {additional.topic}
            </p>
          )}

          {/* Academic Session Tags */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
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
      </div>

      {/* 3. Bottom: Clean Two-Column Metadata */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '36px',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '24px',
        }}
      >
        {/* Author / Student Details */}
        <div>
          <div
            style={{
              fontSize: `${0.75 * fontScale}rem`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#94a3b8',
              marginBottom: '8px',
            }}
          >
            Prepared By
          </div>

          <div
            style={{
              fontSize: `${1.15 * fontScale}rem`,
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '4px',
            }}
          >
            {student.name || 'Student Name'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
            {student.visibleFields.studentId && student.studentId && (
              <div>ID: {student.studentId}</div>
            )}
            {student.visibleFields.rollNo && student.rollNo && (
              <div>Roll: {student.rollNo}</div>
            )}
            {student.visibleFields.regNo && student.regNo && (
              <div>Reg: {student.regNo}</div>
            )}
          </div>

          {/* Team Members */}
          {additional.visibleFields.teamMembers && additional.teamMembers.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '0.8rem', color: '#475569' }}>
              <span style={{ fontWeight: 600 }}>Team: </span>
              {additional.teamMembers.map((m) => m.name).join(', ')}
            </div>
          )}
        </div>

        {/* Instructor & Date */}
        <div>
          <div
            style={{
              fontSize: `${0.75 * fontScale}rem`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#94a3b8',
              marginBottom: '8px',
            }}
          >
            Evaluated By
          </div>

          <div
            style={{
              fontSize: `${1.1 * fontScale}rem`,
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '2px',
            }}
          >
            {submission.submittedTo || 'Instructor'}
          </div>

          {submission.visibleFields.designation && submission.designation && (
            <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
              {submission.designation}
            </div>
          )}

          {submission.visibleFields.department && submission.department && (
            <div style={{ fontSize: `${0.8 * fontScale}rem`, color: '#64748b', marginTop: '2px' }}>
              {submission.department}
            </div>
          )}

          <div
            style={{
              marginTop: '12px',
              fontSize: `${0.8 * fontScale}rem`,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            Date:{' '}
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
