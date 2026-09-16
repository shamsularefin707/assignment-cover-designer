import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import {
  Building2,
  BookOpen,
  User,
  Send,
  PlusCircle,
  Image as ImageIcon,
  Palette,
  ChevronRight,
} from 'lucide-react';
import { UniversitySelector } from './UniversitySelector';
import { DepartmentSelector } from './DepartmentSelector';
import { CourseInfoForm } from './CourseInfoForm';
import { StudentInfoForm } from './StudentInfoForm';
import { SubmissionInfoForm } from './SubmissionInfoForm';
import { AdditionalInfoForm } from './AdditionalInfoForm';
import { LogoUploader } from './LogoUploader';
import { CustomizationPanel } from './CustomizationPanel';

const EDITOR_TABS = [
  { id: 'university', label: 'University', icon: Building2, step: '1' },
  { id: 'course', label: 'Course Info', icon: BookOpen, step: '2' },
  { id: 'student', label: 'Student Info', icon: User, step: '3' },
  { id: 'submission', label: 'Submission', icon: Send, step: '4' },
  { id: 'additional', label: 'Group & Lab', icon: PlusCircle, step: '5' },
  { id: 'logo', label: 'Logo', icon: ImageIcon, step: '6' },
  { id: 'customize', label: 'Styling', icon: Palette, step: '7' },
];

export const EditorSidebar: React.FC = () => {
  const { activeEditorTab, setActiveEditorTab } = useCoverDesigner();

  const currentTabIndex = EDITOR_TABS.findIndex((t) => t.id === activeEditorTab);

  const goToNextTab = () => {
    if (currentTabIndex < EDITOR_TABS.length - 1) {
      setActiveEditorTab(EDITOR_TABS[currentTabIndex + 1].id);
    }
  };

  return (
    <aside
      className="editor-sidebar"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-medium)',
      }}
    >
      {/* Tab Navigation Header */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--bg-subtle)',
          padding: '0.25rem 0.5rem 0',
          scrollbarWidth: 'none',
        }}
      >
        {EDITOR_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeEditorTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveEditorTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.625rem 0.75rem',
                fontSize: '0.78rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--color-primary)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                border: 'none',
                borderTopLeftRadius: 'var(--radius-md)',
                borderTopRightRadius: 'var(--radius-md)',
                borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {activeEditorTab === 'university' && (
          <>
            <UniversitySelector />
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <DepartmentSelector />
            </div>
          </>
        )}

        {activeEditorTab === 'course' && <CourseInfoForm />}
        {activeEditorTab === 'student' && <StudentInfoForm />}
        {activeEditorTab === 'submission' && <SubmissionInfoForm />}
        {activeEditorTab === 'additional' && <AdditionalInfoForm />}
        {activeEditorTab === 'logo' && <LogoUploader />}
        {activeEditorTab === 'customize' && <CustomizationPanel />}
      </div>

      {/* Footer / Next Step Banner */}
      {currentTabIndex < EDITOR_TABS.length - 1 && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={goToNextTab}
            style={{ fontSize: '0.75rem' }}
          >
            <span>Next: {EDITOR_TABS[currentTabIndex + 1].label}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </aside>
  );
};
