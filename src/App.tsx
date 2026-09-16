import React, { useEffect } from 'react';
import { CoverDesignerProvider, useCoverDesigner, AppView } from './context/CoverDesignerContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { DesignerView } from './components/views/DesignerView';
import { TemplatesView } from './components/views/TemplatesView';
import { SavedDesignsView } from './components/views/SavedDesignsView';
import { AboutView } from './components/views/AboutView';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView } = useCoverDesigner();

  // Sync route with URL hash for navigation & bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['designer', 'templates', 'saved', 'about'].includes(hash)) {
        setCurrentView(hash as AppView);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setCurrentView]);

  // Update URL hash when currentView changes
  useEffect(() => {
    const targetHash = currentView === 'designer' ? '#/' : `#/${currentView}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
  }, [currentView]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentView === 'designer' && <DesignerView />}
        {currentView === 'templates' && <TemplatesView />}
        {currentView === 'saved' && <SavedDesignsView />}
        {currentView === 'about' && <AboutView />}
      </main>

      {/* Hide footer on live designer view to maximize screen workspace, show on others */}
      {currentView !== 'designer' && <Footer />}

      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <CoverDesignerProvider>
      <AppContent />
    </CoverDesignerProvider>
  );
}

export default App;
