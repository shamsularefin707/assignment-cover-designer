import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CoverData,
  University,
  CourseInfo,
  StudentInfo,
  SubmissionInfo,
  AdditionalInfo,
  CustomizationSettings,
  SavedDesign,
} from '../types/cover';
import { INITIAL_COVER_DATA } from '../data/defaultData';
import { COVER_TEMPLATES } from '../data/templates';
import {
  loadCurrentDraft,
  saveCurrentDraft,
  getSavedDesigns,
  saveDesign,
  deleteSavedDesign,
  duplicateSavedDesign,
  parseImportedJson,
  getSavedTheme,
  saveTheme,
} from '../utils/storage';
import { BANGLADESH_UNIVERSITIES, getUniversityLogo } from '../data/universities';

export type AppView = 'designer' | 'templates' | 'saved' | 'about';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  id: number;
}

interface CoverDesignerContextType {
  coverData: CoverData;
  theme: 'light' | 'dark';
  currentView: AppView;
  activeSavedDesignId: string | null;
  savedDesigns: SavedDesign[];
  toasts: ToastState[];
  previewZoom: number; // 0.5 to 1.5, 0 = fit
  isPrinting: boolean;
  activeEditorTab: string;

  // Setters & Actions
  setCurrentView: (view: AppView) => void;
  setActiveEditorTab: (tab: string) => void;
  setPreviewZoom: (zoom: number) => void;
  toggleTheme: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  updateUniversity: (univ: University | null, customName?: string, customShortName?: string) => void;
  updateDepartment: (name: string, isCustom?: boolean) => void;
  updateCourse: (updates: Partial<CourseInfo>) => void;
  updateStudent: (updates: Partial<StudentInfo>) => void;
  updateSubmission: (updates: Partial<SubmissionInfo>) => void;
  updateAdditional: (updates: Partial<AdditionalInfo>) => void;
  updateCustomization: (updates: Partial<CustomizationSettings>) => void;
  setCustomLogo: (dataUrl: string | null) => void;
  applyTemplate: (templateId: string) => void;
  loadPreset: (presetData: Partial<CoverData>, name?: string) => void;
  resetDesign: () => void;

  // Saved Designs
  handleSaveDesign: (title?: string) => SavedDesign;
  handleLoadDesign: (design: SavedDesign) => void;
  handleDeleteDesign: (id: string) => void;
  handleDuplicateDesign: (id: string) => void;
  handleImportDesign: (jsonString: string) => boolean;

  // Print helper
  triggerPrint: () => void;
}

const CoverDesignerContext = createContext<CoverDesignerContextType | undefined>(undefined);

export const CoverDesignerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coverData, setCoverData] = useState<CoverData>(() => loadCurrentDraft());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getSavedTheme());
  const [currentView, setCurrentView] = useState<AppView>('designer');
  const [activeSavedDesignId, setActiveSavedDesignId] = useState<string | null>(null);
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>(() => getSavedDesigns());
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [previewZoom, setPreviewZoom] = useState<number>(0); // 0 = auto fit
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [activeEditorTab, setActiveEditorTab] = useState<string>('university');

  // Auto-save draft whenever coverData changes
  useEffect(() => {
    saveCurrentDraft(coverData);
  }, [coverData]);

  // Apply theme to HTML root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const updateUniversity = useCallback(
    (univ: University | null, customName?: string, customShortName?: string) => {
      setCoverData((prev) => {
        if (!univ) {
          return {
            ...prev,
            university: {
              ...prev.university,
              id: 'custom',
              name: customName || 'Custom University',
              shortName: customShortName || 'CU',
              domain: '',
              location: '',
              logoUrl: '',
              isCustomLogo: true,
            },
          };
        }

        const logoUrl = getUniversityLogo(univ);
        const defaultDept = univ.departments[0] || 'Department of Computer Science and Engineering';

        return {
          ...prev,
          university: {
            id: univ.id,
            name: univ.name,
            shortName: univ.shortName,
            domain: univ.domain,
            location: univ.location,
            logoUrl: prev.customization.customLogoUrl || logoUrl,
            isCustomLogo: !!prev.customization.customLogoUrl,
          },
          department: {
            name: defaultDept,
            isCustom: false,
          },
        };
      });
      showToast(`Selected ${univ ? univ.shortName : 'Custom University'}`, 'info');
    },
    [showToast]
  );

  const updateDepartment = useCallback((name: string, isCustom = false) => {
    setCoverData((prev) => ({
      ...prev,
      department: { name, isCustom },
    }));
  }, []);

  const updateCourse = useCallback((updates: Partial<CourseInfo>) => {
    setCoverData((prev) => ({
      ...prev,
      course: { ...prev.course, ...updates },
    }));
  }, []);

  const updateStudent = useCallback((updates: Partial<StudentInfo>) => {
    setCoverData((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        ...updates,
        visibleFields: {
          ...prev.student.visibleFields,
          ...(updates.visibleFields || {}),
        },
      },
    }));
  }, []);

  const updateSubmission = useCallback((updates: Partial<SubmissionInfo>) => {
    setCoverData((prev) => ({
      ...prev,
      submission: {
        ...prev.submission,
        ...updates,
        visibleFields: {
          ...prev.submission.visibleFields,
          ...(updates.visibleFields || {}),
        },
      },
    }));
  }, []);

  const updateAdditional = useCallback((updates: Partial<AdditionalInfo>) => {
    setCoverData((prev) => ({
      ...prev,
      additional: {
        ...prev.additional,
        ...updates,
        visibleFields: {
          ...prev.additional.visibleFields,
          ...(updates.visibleFields || {}),
        },
      },
    }));
  }, []);

  const updateCustomization = useCallback((updates: Partial<CustomizationSettings>) => {
    setCoverData((prev) => ({
      ...prev,
      customization: { ...prev.customization, ...updates },
    }));
  }, []);

  const setCustomLogo = useCallback(
    (dataUrl: string | null) => {
      setCoverData((prev) => {
        let logoUrl = dataUrl;
        let isCustomLogo = true;

        if (!dataUrl) {
          isCustomLogo = false;
          const currentUniv = BANGLADESH_UNIVERSITIES.find((u) => u.id === prev.university.id);
          logoUrl = currentUniv ? getUniversityLogo(currentUniv) : '';
        }

        return {
          ...prev,
          university: {
            ...prev.university,
            logoUrl: logoUrl || '',
            isCustomLogo,
          },
          customization: {
            ...prev.customization,
            customLogoUrl: dataUrl,
          },
        };
      });

      if (dataUrl) {
        showToast('Custom logo uploaded successfully', 'success');
      } else {
        showToast('Restored official university logo', 'info');
      }
    },
    [showToast]
  );

  const applyTemplate = useCallback(
    (templateId: string) => {
      const target = COVER_TEMPLATES.find((t) => t.id === templateId);
      if (!target) return;

      setCoverData((prev) => ({
        ...prev,
        customization: {
          ...prev.customization,
          templateId: target.id,
          fontFamily: target.defaultFont,
          borderStyle: target.defaultBorderStyle,
          borderThickness: target.defaultBorderThickness,
          borderColor: target.defaultAccentColor,
          accentColor: target.defaultAccentColor,
        },
      }));
      showToast(`Applied ${target.name} template`, 'success');
    },
    [showToast]
  );

  const loadPreset = useCallback(
    (presetData: Partial<CoverData>, name?: string) => {
      setCoverData((prev) => ({
        ...prev,
        ...presetData,
        university: { ...prev.university, ...presetData.university },
        department: { ...prev.department, ...presetData.department },
        course: { ...prev.course, ...presetData.course },
        student: { ...prev.student, ...presetData.student },
        submission: { ...prev.submission, ...presetData.submission },
        additional: { ...prev.additional, ...presetData.additional },
        customization: { ...prev.customization, ...presetData.customization },
      }));
      showToast(name ? `Loaded ${name}` : 'Sample data loaded', 'success');
    },
    [showToast]
  );

  const resetDesign = useCallback(() => {
    setCoverData(INITIAL_COVER_DATA);
    setActiveSavedDesignId(null);
    showToast('Reset to default blank design', 'info');
  }, [showToast]);

  const handleSaveDesign = useCallback(
    (title?: string): SavedDesign => {
      const designTitle =
        title ||
        `${coverData.course.code || 'Course'} - ${coverData.university.shortName || 'Univ'} Assignment`;
      const saved = saveDesign(designTitle, coverData, activeSavedDesignId || undefined);
      setActiveSavedDesignId(saved.id);
      setSavedDesigns(getSavedDesigns());
      showToast(`Design "${saved.title}" saved successfully`, 'success');
      return saved;
    },
    [coverData, activeSavedDesignId, showToast]
  );

  const handleLoadDesign = useCallback(
    (design: SavedDesign) => {
      setCoverData(design.coverData);
      setActiveSavedDesignId(design.id);
      setCurrentView('designer');
      showToast(`Loaded "${design.title}"`, 'success');
    },
    [showToast]
  );

  const handleDeleteDesign = useCallback(
    (id: string) => {
      deleteSavedDesign(id);
      if (activeSavedDesignId === id) {
        setActiveSavedDesignId(null);
      }
      setSavedDesigns(getSavedDesigns());
      showToast('Design removed from saved library', 'info');
    },
    [activeSavedDesignId, showToast]
  );

  const handleDuplicateDesign = useCallback(
    (id: string) => {
      const duplicated = duplicateSavedDesign(id);
      if (duplicated) {
        setSavedDesigns(getSavedDesigns());
        showToast(`Duplicated as "${duplicated.title}"`, 'success');
      }
    },
    [showToast]
  );

  const handleImportDesign = useCallback(
    (jsonString: string): boolean => {
      const parsed = parseImportedJson(jsonString);
      if (!parsed) {
        showToast('Invalid design file format', 'error');
        return false;
      }
      setCoverData(parsed);
      setActiveSavedDesignId(null);
      setCurrentView('designer');
      showToast('Imported cover design successfully', 'success');
      return true;
    },
    [showToast]
  );

  const triggerPrint = useCallback(() => {
    setIsPrinting(true);
    showToast('Opening browser print dialog...', 'info');
    // Ensure all DOM updates finish before print dialog opens
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 250);
  }, [showToast]);

  return (
    <CoverDesignerContext.Provider
      value={{
        coverData,
        theme,
        currentView,
        activeSavedDesignId,
        savedDesigns,
        toasts,
        previewZoom,
        isPrinting,
        activeEditorTab,
        setCurrentView,
        setActiveEditorTab,
        setPreviewZoom,
        toggleTheme,
        showToast,
        updateUniversity,
        updateDepartment,
        updateCourse,
        updateStudent,
        updateSubmission,
        updateAdditional,
        updateCustomization,
        setCustomLogo,
        applyTemplate,
        loadPreset,
        resetDesign,
        handleSaveDesign,
        handleLoadDesign,
        handleDeleteDesign,
        handleDuplicateDesign,
        handleImportDesign,
        triggerPrint,
      }}
    >
      {children}
    </CoverDesignerContext.Provider>
  );
};

export function useCoverDesigner(): CoverDesignerContextType {
  const context = useContext(CoverDesignerContext);
  if (!context) {
    throw new Error('useCoverDesigner must be used within CoverDesignerProvider');
  }
  return context;
}
