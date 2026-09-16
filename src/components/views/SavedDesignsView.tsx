import React, { useRef, useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import {
  Bookmark,
  Plus,
  FolderOpen,
  Copy,
  Trash2,
  FileDown,
  Upload,
  Calendar,
  Building2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { exportDesignJson } from '../../utils/storage';
import { SavedDesign } from '../../types/cover';
import { Modal } from '../common/Modal';

export const SavedDesignsView: React.FC = () => {
  const {
    savedDesigns,
    handleLoadDesign,
    handleDeleteDesign,
    handleDuplicateDesign,
    handleImportDesign,
    setCurrentView,
    showToast,
  } = useCoverDesigner();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const success = handleImportDesign(content);
        if (success && fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.onerror = () => {
      showToast('Error reading uploaded file', 'error');
    };
    reader.readAsText(file);
  };

  const confirmDelete = () => {
    if (deleteCandidateId) {
      handleDeleteDesign(deleteCandidateId);
      setDeleteCandidateId(null);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2rem 1.5rem 4rem',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border-medium)',
            paddingBottom: '1.25rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Saved Cover Designs
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Manage, duplicate, reload, or backup your assignment cover drafts locally.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Hidden File Input for JSON Import */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fileInputRef.current?.click()}
              title="Import a saved design from a .json file"
            >
              <Upload size={15} />
              <span>Import JSON</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setCurrentView('designer')}
            >
              <Plus size={15} />
              <span>New Cover Page</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {savedDesigns.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-medium)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '520px',
              margin: '2rem auto',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <Bookmark size={30} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              No Saved Designs Yet
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              When creating an assignment cover in the Designer, click <strong>"Save Draft"</strong> in the toolbar to store your configurations here.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setCurrentView('designer')}
            >
              Go to Cover Designer
            </button>
          </div>
        ) : (
          /* Grid of Saved Designs */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {savedDesigns.map((design) => {
              const data = design.coverData;
              const formattedDate = new Date(design.updatedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={design.id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-medium)',
                    boxShadow: 'var(--shadow-sm)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h3
                        style={{
                          fontSize: '1.05rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                        }}
                      >
                        {design.title}
                      </h3>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>
                        {data.customization.templateId.replace('-', ' ')}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={13} style={{ color: 'var(--color-primary)' }} />
                        <span style={{ fontWeight: 600 }}>{data.university.shortName || data.university.name}</span>
                        <span>•</span>
                        <span>{data.department.name.replace('Department of ', '')}</span>
                      </div>

                      <div>
                        <strong>Course: </strong>
                        {data.course.code ? `${data.course.code} — ` : ''}
                        {data.course.assignmentTitle || data.course.name}
                      </div>

                      <div>
                        <strong>Student: </strong>
                        {data.student.name} {data.student.studentId ? `(${data.student.studentId})` : ''}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.75rem',
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '0.5rem',
                      }}
                    >
                      <Clock size={12} />
                      <span>Saved: {formattedDate}</span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '0.75rem',
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleLoadDesign(design)}
                    >
                      <FolderOpen size={14} /> Open in Designer
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => handleDuplicateDesign(design.id)}
                        title="Duplicate this design"
                        style={{ padding: '6px' }}
                      >
                        <Copy size={15} />
                      </button>

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() =>
                          exportDesignJson(
                            design.coverData,
                            `${design.title.replace(/[^a-zA-Z0-9]/g, '_')}.json`
                          )
                        }
                        title="Export JSON backup"
                        style={{ padding: '6px' }}
                      >
                        <FileDown size={15} />
                      </button>

                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => setDeleteCandidateId(design.id)}
                        title="Delete design"
                        style={{ padding: '6px', color: 'var(--color-error)' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteCandidateId !== null}
        onClose={() => setDeleteCandidateId(null)}
        title="Confirm Delete"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-error)' }}>
            <AlertTriangle size={24} />
            <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>
              Are you sure you want to delete this saved design?
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            This action cannot be undone. If you might need this design again, consider exporting it as a JSON file first.
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setDeleteCandidateId(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: 'var(--color-error)' }}
              onClick={confirmDelete}
            >
              Delete Forever
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
