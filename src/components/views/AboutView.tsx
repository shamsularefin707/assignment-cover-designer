import React from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Printer,
  Sparkles,
  Layers,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useCoverDesigner();

  const guidelines = [
    {
      title: '1. Official Institution Name & Crest',
      description:
        'Always use the official English spelling of the university (e.g., "Bangladesh University of Engineering and Technology", not just "BUET"). Place the crest centered or at the top header, ensuring it is crisp and unpixellated.',
    },
    {
      title: '2. Department & Faculty Affiliation',
      description:
        'State your complete academic department name (e.g., "Department of Computer Science and Engineering" or "School of Business and Economics") immediately below the institutional title.',
    },
    {
      title: '3. Standard A4 Paper Proportions',
      description:
        'In Bangladesh, academic coursework is universally printed on standard ISO A4 paper (210 mm × 297 mm) with at least 15mm to 20mm print-safe margin. This generator calculates exact A4 pixels (794px × 1123px at 96 DPI, rendering at 300 DPI on export).',
    },
    {
      title: '4. Clear Student Identification',
      description:
        'For public universities (BUET, DU, RUET, etc.), Roll Number and Registration Number are customary. For private universities (NSU, BRACU, AIUB), Student ID is primary. Use the visibility toggles to format accordingly.',
    },
    {
      title: '5. Accurate Faculty Designation',
      description:
        'Academic titles (Professor, Associate Professor, Assistant Professor, Lecturer) show proper scholarly respect. Double check spelling of the teacher’s name and specific course code (e.g., CSE 311).',
    },
  ];

  const faqs = [
    {
      q: 'Will my generated cover page print cleanly on A4 paper?',
      a: 'Yes! The document is sized strictly according to international A4 dimensions (210mm x 297mm). When clicking "Print A4", our custom CSS hides all web navigation, buttons, and sidebars, guaranteeing a clean single-sheet printout with 0 blank pages.',
    },
    {
      q: 'Do I need to sign up or create an account?',
      a: 'No account, login, or registration is required. All your drafts, edits, and preferences are safely saved in your own browser using LocalStorage. Your student data never leaves your computer.',
    },
    {
      q: 'What if my university logo is missing or outdated?',
      a: 'You can instantly upload any image (PNG, JPG, SVG, WebP) up to 4MB using the "Logo" tab in the editor. Furthermore, if a network image ever fails, our resilient fallback engine automatically renders a crisp SVG academic crest.',
    },
    {
      q: 'Why does the cover page stay white when Dark Mode is enabled?',
      a: 'Dark mode is designed for your comfortable viewing of the editor controls at night, but an assignment cover page must reflect the physical printed sheet. Printing black ink on white paper is the academic standard.',
    },
    {
      q: 'Can I export to PDF on my mobile phone?',
      a: 'Yes. Both "Download A4 PDF" and "PNG Image" work seamlessly on mobile browsers (Safari on iOS, Chrome on Android, etc.).',
    },
  ];

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '2.5rem 1.5rem 5rem',
        backgroundColor: 'var(--bg-app)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            <FileCheck size={16} /> Bangladeshi Academic Standards
          </div>

          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            Assignment Cover Page Guidelines
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              margin: '0.5rem auto 0',
              lineHeight: 1.6,
            }}
          >
            A practical guide to preparing compliant, high-scoring assignment and laboratory report cover pages for university courses in Bangladesh.
          </p>
        </div>

        {/* Academic Formatting Standards Cards */}
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Core Cover Page Standards
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {guidelines.map((g, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  {g.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {g.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* University Format Comparison Box */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-medium)',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            Public vs. Private University Conventions
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}
          >
            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                🏛️ Public Universities (BUET, DU, RU, JU, SUST)
              </h4>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingLeft: '1.25rem' }}>
                <li>Classic double-border or ornate academic frame</li>
                <li>Times New Roman or EB Garamond serif typography</li>
                <li>Roll Number and Registration Number strictly required</li>
                <li>Level/Term or Academic Session format</li>
                <li>Formal centered alignment</li>
              </ul>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>
                🏢 Private Universities (NSU, BRACU, AIUB, UIU, IUB)
              </h4>
              <ul style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.375rem', paddingLeft: '1.25rem' }}>
                <li>Clean modern grid or color accent header bands</li>
                <li>Inter, Poppins, or Roboto sans-serif typography</li>
                <li>7-digit or 9-digit Student ID and Section Number</li>
                <li>Trimester / Semester format (Spring/Summer/Fall)</li>
                <li>Contemporary badges for Course Codes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.25rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <h3
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <HelpCircle size={16} style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{faq.q}</span>
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, paddingLeft: '24px' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-medium)',
          }}
        >
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Ready to Design Your Assignment Cover?
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Choose your university, select from 8 templates, and print or download an A4 PDF in under 60 seconds.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={() => setCurrentView('designer')}
          >
            <Sparkles size={18} /> Open Assignment Cover Designer
          </button>
        </div>
      </div>
    </div>
  );
};
