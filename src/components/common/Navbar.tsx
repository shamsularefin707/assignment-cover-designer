import React, { useState } from 'react';
import { useCoverDesigner } from '../../context/CoverDesignerContext';
import {
  GraduationCap,
  Layout,
  Bookmark,
  BookOpen,
  Sun,
  Moon,
  Printer,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../../data/defaultData';
import { Modal } from './Modal';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    theme,
    toggleTheme,
    savedDesigns,
    triggerPrint,
    loadPreset,
  } = useCoverDesigner();

  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'designer', label: 'Designer', icon: Layout },
    { id: 'templates', label: 'Templates (8)', icon: Layout },
    {
      id: 'saved',
      label: 'Saved Designs',
      icon: Bookmark,
      badge: savedDesigns.length > 0 ? savedDesigns.length : undefined,
    },
    { id: 'about', label: 'Guidelines & About', icon: BookOpen },
  ];

  return (
    <>
      <header
        className="app-navbar no-print"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-medium)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '0.625rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
            }}
            onClick={() => setCurrentView('designer')}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <GraduationCap size={22} />
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                  }}
                >
                  Assignment Cover Designer
                </span>
                <span
                  className="badge badge-primary"
                  style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                >
                  Bangladesh
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  marginTop: '-2px',
                }}
              >
                A4 Academic Cover Page Generator
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                  style={{
                    fontSize: '0.8125rem',
                    padding: '0.45rem 0.85rem',
                  }}
                  onClick={() => setCurrentView(item.id as any)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        backgroundColor: isActive
                          ? 'rgba(255, 255, 255, 0.25)'
                          : 'var(--bg-subtle)',
                        color: isActive ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setIsSampleModalOpen(true)}
              title="Load realistic sample data (BUET CSE, DU BBA, NSU ECE)"
            >
              <Sparkles size={15} style={{ color: 'var(--color-warning)' }} />
              <span className="hide-on-tiny">Sample Data</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={triggerPrint}
              title="Print A4 cover page"
            >
              <Printer size={15} />
              <span className="hide-on-mobile">Print A4</span>
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ padding: '0.45rem', borderRadius: 'var(--radius-md)' }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} style={{ color: '#fbbf24' }} />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="btn btn-ghost btn-sm mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            style={{
              padding: '0.75rem 1.25rem 1rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-surface-elevated)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`btn ${isActive ? 'btn-primary' : 'btn-ghost'}`}
                  style={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    padding: '0.625rem 1rem',
                  }}
                  onClick={() => {
                    setCurrentView(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        backgroundColor: isActive
                          ? 'rgba(255, 255, 255, 0.25)'
                          : 'var(--bg-subtle)',
                        fontSize: '0.75rem',
                        padding: '1px 8px',
                        borderRadius: 'var(--radius-full)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Preset Selector Modal */}
      <Modal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        title="Load Example Bangladeshi Assignment"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Choose a realistic pre-filled cover page from popular universities to see instant layout and typography rendering:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SAMPLE_PRESETS.map((preset, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => {
                  loadPreset(preset.data, preset.name);
                  setCurrentView('designer');
                  setIsSampleModalOpen(false);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{preset.name}</h4>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {preset.description}
                  </p>
                </div>
                <button type="button" className="btn btn-primary btn-sm">
                  Load
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 520px) {
          .hide-on-tiny {
            display: none;
          }
        }
        @media (max-width: 767px) {
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
