import React from 'react';
import { CoverData } from '../../../types/cover';
import { CoverLogo } from '../CoverLogo';

interface TemplateProps {
  coverData: CoverData;
}

export const ClassicAcademic: React.FC<TemplateProps> = ({ coverData }) => {
  const { university, department, course, student, submission, additional, customization } = coverData;

  const fontScale = customization.fontScale || 1;
  const accent = customization.accentColor || '#1e3a8a';
  const casing = customization.textCasing === 'uppercase' ? 'uppercase' : 'none';

  // Determine logo dimension
  const logoDimensions = {
    small: '65px',
    medium: '85px',
    large: '110px',
    'extra-large': '135px',
  }[customization.logoSize] || '85px';

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
      }}
    >
      {/* 1. Header: University Logo & Name */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CoverLogo
          coverData={coverData}
          maxHeight={logoDimensions}
          maxWidth="180px"
          style={{ marginBottom: '14px' }}
        />

        <h1
          style={{
            fontSize: `${1.5 * fontScale}rem`,
            fontWeight: 700,
            color: '#0f172a',
            textTransform: casing === 'uppercase' ? 'uppercase' : 'uppercase',
            letterSpacing: '0.04em',
            lineHeight: 1.25,
            marginBottom: '6px',
          }}
        >
          {university.name}
        </h1>

        <div
          style={{
            width: '120px',
            height: '2px',
            backgroundColor: accent,
            margin: '4px auto 8px',
          }}
        />

        <h2
          style={{
            fontSize: `${1.05 * fontScale}rem`,
            fontWeight: 600,
            color: '#334155',
            lineHeight: 1.3,
          }}
        >
          {department.name}
        </h2>
      </div>

      {/* 2. Middle Section: Assignment & Course Credentials */}
      <div style={{ textAlign: 'center', margin: 'auto 0', padding: '16px 0' }}>
        {/* Assignment Type / Badge */}
        {additional.visibleFields.labType && additional.labType && (
          <div
            style={{
              display: 'inline-block',
              fontSize: `${0.85 * fontScale}rem`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: accent,
              padding: '3px 12px',
              border: `1px solid ${accent}`,
              borderRadius: '2px',
              marginBottom: '14px',
            }}
          >
            {additional.labType}
          </div>
        )}

        {/* Assignment No & Title */}
        <div style={{ marginBottom: '18px' }}>
          {course.assignmentNo && (
            <h3
              style={{
                fontSize: `${1.15 * fontScale}rem`,
                fontWeight: 600,
                color: '#1e293b',
                letterSpacing: '0.05em',
                marginBottom: '4px',
              }}
            >
              {course.assignmentNo}
            </h3>
          )}

          <h2
            style={{
              fontSize: `${1.45 * fontScale}rem`,
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.3,
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
              textDecorationColor: accent,
              padding: '0 20px',
            }}
          >
            {course.assignmentTitle || 'Assignment Title'}
          </h2>

          {additional.visibleFields.topic && additional.topic && (
            <p
              style={{
                fontSize: `${0.95 * fontScale}rem`,
                fontStyle: 'italic',
                color: '#475569',
                marginTop: '10px',
              }}
            >
              Topic: {additional.topic}
            </p>
          )}
        </div>

        {/* Course Details Block */}
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '12px 18px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
            {course.code ? `${course.code}: ` : ''}
            {course.name}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: `${0.85 * fontScale}rem`,
              color: '#475569',
              marginTop: '2px',
            }}
          >
            {course.semester && <span>Semester: {course.semester}</span>}
            {course.section && <span>Section: {course.section}</span>}
            {course.batch && <span>Batch: {course.batch}</span>}
            {course.academicYear && <span>Session: {course.academicYear}</span>}
          </div>
        </div>
      </div>

      {/* 3. Bottom: Submitted By & Submitted To Dual Columns */}
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            borderTop: `1px solid #cbd5e1`,
            paddingTop: '20px',
            marginBottom: '16px',
          }}
        >
          {/* Submitted By */}
          <div
            style={{
              padding: '14px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
            }}
          >
            <h4
              style={{
                fontSize: `${0.9 * fontScale}rem`,
                fontWeight: 700,
                color: accent,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px',
                borderBottom: '1px dashed #cbd5e1',
                paddingBottom: '4px',
              }}
            >
              Submitted By:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
                {student.name || 'Student Name'}
              </div>

              {student.visibleFields.studentId && student.studentId && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
                  <strong>Student ID:</strong> {student.studentId}
                </div>
              )}

              {student.visibleFields.rollNo && student.rollNo && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
                  <strong>Roll No:</strong> {student.rollNo}
                </div>
              )}

              {student.visibleFields.regNo && student.regNo && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
                  <strong>Reg No:</strong> {student.regNo}
                </div>
              )}

              {student.visibleFields.batch && student.batch && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
                  <strong>Batch:</strong> {student.batch}
                </div>
              )}

              {student.visibleFields.section && student.section && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
                  <strong>Section:</strong> {student.section}
                </div>
              )}

              {/* Multi-student Team Members if group */}
              {additional.visibleFields.teamMembers && additional.teamMembers.length > 0 && (
                <div style={{ marginTop: '6px', borderTop: '1px solid #e2e8f0', paddingTop: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>
                    Group Members:
                  </span>
                  {additional.teamMembers.map((m) => (
                    <div key={m.id} style={{ fontSize: '0.78rem', color: '#1e293b' }}>
                      • {m.name} {m.studentId ? `(${m.studentId})` : ''}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submitted To */}
          <div
            style={{
              padding: '14px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
            }}
          >
            <h4
              style={{
                fontSize: `${0.9 * fontScale}rem`,
                fontWeight: 700,
                color: accent,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '8px',
                borderBottom: '1px dashed #cbd5e1',
                paddingBottom: '4px',
              }}
            >
              Submitted To:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ fontSize: `${1.05 * fontScale}rem`, fontWeight: 700, color: '#0f172a' }}>
                {submission.submittedTo || 'Course Instructor'}
              </div>

              {submission.visibleFields.designation && submission.designation && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#334155' }}>
                  {submission.designation}
                </div>
              )}

              {submission.visibleFields.department && submission.department && (
                <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#475569', lineHeight: 1.3 }}>
                  {submission.department}
                </div>
              )}

              <div style={{ fontSize: `${0.85 * fontScale}rem`, color: '#64748b', marginTop: '2px' }}>
                {university.name}
              </div>
            </div>
          </div>
        </div>

        {/* Submission Date Centered */}
        <div style={{ textAlign: 'center', fontSize: `${0.875 * fontScale}rem`, color: '#475569' }}>
          <strong>Date of Submission:</strong>{' '}
          {submission.submissionDate
            ? new Date(submission.submissionDate).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'Date'}
          {submission.visibleFields.time && submission.submissionTime && (
            <span> ({submission.submissionTime})</span>
          )}
        </div>
      </div>
    </div>
  );
};
