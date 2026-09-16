import React from 'react';
import { CoverData } from '../../../types/cover';

interface TemplateProps {
  coverData: CoverData;
}

export const ElegantSerif: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#334155';

  const logoDimensions = {
    small: '50px',
    medium: '70px',
    large: '90px',
    'extra-large': '115px',
  }[customization.logoSize] || '70px';

  return (
    <div
      style={{
        padding: '56px 64px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'center',
        fontFamily: customization.fontFamily,
        boxSizing: 'border-box',
        backgroundColor: '#ffffff',
      }}
    >
      {/* 1. Scholarly Masthead */}
      <div>
        {customization.logoPosition !== 'hidden' && university.logoUrl && (
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
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

        <div
          style={{
            fontSize: `${0.85 * fontScale}rem`,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#64748b',
            marginBottom: '6px',
          }}
        >
          {university.location || 'Bangladesh'}
        </div>

        <h1
          style={{
            fontSize: `${1.6 * fontScale}rem`,
            fontWeight: 600,
            color: '#0f172a',
            letterSpacing: '0.04em',
            lineHeight: 1.3,
            marginBottom: '4px',
          }}
        >
          {university.name}
        </h1>

        <h2
          style={{
            fontSize: `${1.05 * fontScale}rem`,
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#475569',
          }}
        >
          {department.name}
        </h2>

        <div
          style={{
            width: '80px',
            height: '1px',
            backgroundColor: '#94a3b8',
            margin: '16px auto 0',
          }}
        />
      </div>

      {/* 2. Middle Section: Academic Thesis / Assignment Focus */}
      <div style={{ margin: 'auto 0', padding: '24px 0' }}>
        <p
          style={{
            fontSize: `${0.88 * fontScale}rem`,
            fontStyle: 'italic',
            color: '#64748b',
            marginBottom: '10px',
          }}
        >
          {additional.visibleFields.labType && additional.labType
            ? additional.labType
            : 'An Academic Paper Submitted For'}
        </p>

        <div
          style={{
            fontSize: `${1.15 * fontScale}rem`,
            fontWeight: 600,
            color: '#1e293b',
            marginBottom: '18px',
          }}
        >
          {course.code ? `${course.code}: ` : ''}
          {course.name}
        </div>

        <div style={{ width: '40px', height: '1px', backgroundColor: accent, margin: '0 auto 18px' }} />

        {course.assignmentNo && (
          <div
            style={{
              fontSize: `${0.95 * fontScale}rem`,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#475569',
              marginBottom: '8px',
            }}
          >
            {course.assignmentNo}
          </div>
        )}

        <h3
          style={{
            fontSize: `${1.85 * fontScale}rem`,
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.35,
            maxWidth: '620px',
            margin: '0 auto 12px',
          }}
        >
          {course.assignmentTitle || 'Assignment Title'}
        </h3>

        {additional.visibleFields.topic && additional.topic && (
          <p style={{ fontSize: `${0.95 * fontScale}rem`, fontStyle: 'italic', color: '#64748b' }}>
            Focus: {additional.topic}
          </p>
        )}

        {additional.visibleFields.notes && additional.notes && (
          <p style={{ fontSize: `${0.82 * fontScale}rem`, color: '#64748b', maxWidth: '500px', margin: '14px auto 0', lineHeight: 1.5 }}>
            {additional.notes}
          </p>
        )}
      </div>

      {/* 3. Bottom Attribution */}
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            borderTop: '1px solid #cbd5e1',
            paddingTop: '20px',
            textAlign: 'center',
          }}
        >
          {/* Author */}
          <div>
            <div style={{ fontSize: `${0.8 * fontScale}rem`, fontStyle: 'italic', color: '#64748b', marginBottom: '4px' }}>
              Prepared by
            </div>
            <div style={{ fontSize: `${1.1 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
              {student.name || 'Student Name'}
            </div>
            <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#475569', marginTop: '2px' }}>
              {student.visibleFields.studentId && student.studentId && <span>ID: {student.studentId} • </span>}
              {student.visibleFields.batch && student.batch && <span>Batch: {student.batch}</span>}
            </div>
            {student.visibleFields.rollNo && student.rollNo && (
              <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
                Roll: {student.rollNo}
              </div>
            )}
          </div>

          {/* Supervisor */}
          <div>
            <div style={{ fontSize: `${0.8 * fontScale}rem`, fontStyle: 'italic', color: '#64748b', marginBottom: '4px' }}>
              Supervised by
            </div>
            <div style={{ fontSize: `${1.1 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
              {submission.submittedTo || 'Professor / Instructor'}
            </div>
            {submission.visibleFields.designation && submission.designation && (
              <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#475569' }}>
                {submission.designation}
              </div>
            )}
            {submission.visibleFields.department && submission.department && (
              <div style={{ fontSize: `${0.8 * fontScale}rem`, color: '#64748b' }}>
                {submission.department}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '20px', fontSize: `${0.85 * fontScale}rem`, color: '#64748b' }}>
          {submission.submissionDate
            ? new Date(submission.submissionDate).toLocaleDateString('en-GB', {
                month: 'long',
                year: 'numeric',
              })
            : 'Academic Session'}
        </div>
      </div>
    </div>
  );
};
