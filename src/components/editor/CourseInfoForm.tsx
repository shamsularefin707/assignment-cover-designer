import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import { BookMarked, Hash, Calendar, Layers } from 'lucide-react';
import { COMMON_DEPARTMENTS } from '../../data/departments';

export const CourseInfoForm: React.FC = () => {
  const { coverData, updateCourse } = useCoverDesigner();
  const { course } = coverData;

  // Find quick course suggestions based on department
  const matchedDept = COMMON_DEPARTMENTS.find(
    (d) =>
      coverData.department.name.toLowerCase().includes(d.shortName.toLowerCase()) ||
      coverData.department.name.toLowerCase().includes(d.name.toLowerCase())
  );

  const courseSuggestions = matchedDept?.commonCourses || COMMON_DEPARTMENTS[0].commonCourses;

  const handleSuggestionClick = (c: { code: string; title: string }) => {
    updateCourse({
      code: c.code,
      name: c.title,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Course Code & Name Suggestion Pills */}
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
          Suggested Courses for Department
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.375rem' }}>
          {courseSuggestions.slice(0, 4).map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSuggestionClick(c)}
              style={{
                padding: '0.2rem 0.5rem',
                fontSize: '0.7rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Row 1: Course Code & Course Name */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span>Course Code</span>
            <span className="required-badge">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. CSE 311"
            value={course.code}
            onChange={(e) => updateCourse({ code: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span>Course Name</span>
            <span className="required-badge">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Database Management Systems"
            value={course.name}
            onChange={(e) => updateCourse({ name: e.target.value })}
          />
        </div>
      </div>

      {/* Row 2: Assignment Number & Assignment Title */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span>Assignment No.</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 01 / Lab 02"
            value={course.assignmentNo}
            onChange={(e) => updateCourse({ assignmentNo: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            <span>Assignment Title</span>
            <span className="required-badge">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Relational Normalization & SQL Queries"
            value={course.assignmentTitle}
            onChange={(e) => updateCourse({ assignmentTitle: e.target.value })}
          />
        </div>
      </div>

      {/* Quick Assignment No Pills */}
      <div style={{ display: 'flex', gap: '0.375rem', marginTop: '-0.5rem' }}>
        {['Assignment 01', 'Assignment 02', 'Lab Report 01', 'Term Paper', 'Case Study'].map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => updateCourse({ assignmentNo: tag })}
            style={{
              padding: '0.15rem 0.45rem',
              fontSize: '0.65rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Row 3: Semester, Batch, Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Semester</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 5th / Fall 2024"
            value={course.semester}
            onChange={(e) => updateCourse({ semester: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Batch</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 20th / 2020"
            value={course.batch}
            onChange={(e) => updateCourse({ batch: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Section</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. A / A1"
            value={course.section}
            onChange={(e) => updateCourse({ section: e.target.value })}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Academic Year</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. 2024-2025"
            value={course.academicYear}
            onChange={(e) => updateCourse({ academicYear: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};
