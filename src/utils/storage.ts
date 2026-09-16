import { CoverData, SavedDesign } from '../types/cover';
import { INITIAL_COVER_DATA } from '../data/defaultData';

const STORAGE_KEYS = {
  CURRENT_DRAFT: 'acd_current_cover_draft_v1',
  SAVED_DESIGNS: 'acd_saved_designs_v1',
  THEME: 'acd_theme_preference',
};

/**
 * Loads current draft from localStorage or falls back to initial data
 */
export function loadCurrentDraft(): CoverData {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_DRAFT);
    if (!raw) return INITIAL_COVER_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_COVER_DATA,
      ...parsed,
      university: { ...INITIAL_COVER_DATA.university, ...parsed.university },
      department: { ...INITIAL_COVER_DATA.department, ...parsed.department },
      course: { ...INITIAL_COVER_DATA.course, ...parsed.course },
      student: {
        ...INITIAL_COVER_DATA.student,
        ...parsed.student,
        visibleFields: {
          ...INITIAL_COVER_DATA.student.visibleFields,
          ...(parsed.student?.visibleFields || {}),
        },
      },
      submission: {
        ...INITIAL_COVER_DATA.submission,
        ...parsed.submission,
        visibleFields: {
          ...INITIAL_COVER_DATA.submission.visibleFields,
          ...(parsed.submission?.visibleFields || {}),
        },
      },
      additional: {
        ...INITIAL_COVER_DATA.additional,
        ...parsed.additional,
        visibleFields: {
          ...INITIAL_COVER_DATA.additional.visibleFields,
          ...(parsed.additional?.visibleFields || {}),
        },
      },
      customization: {
        ...INITIAL_COVER_DATA.customization,
        ...parsed.customization,
      },
    };
  } catch (err) {
    console.error('Failed to load current draft from localStorage', err);
    return INITIAL_COVER_DATA;
  }
}

/**
 * Saves current draft to localStorage
 */
export function saveCurrentDraft(data: CoverData): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENT_DRAFT, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save current draft to localStorage', err);
  }
}

/**
 * Retrieves all saved user designs
 */
export function getSavedDesigns(): SavedDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_DESIGNS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse saved designs', err);
    return [];
  }
}

/**
 * Saves a new design or updates an existing one
 */
export function saveDesign(title: string, coverData: CoverData, existingId?: string): SavedDesign {
  const designs = getSavedDesigns();
  const now = new Date().toISOString();

  if (existingId) {
    const index = designs.findIndex((d) => d.id === existingId);
    if (index >= 0) {
      designs[index] = {
        ...designs[index],
        title,
        updatedAt: now,
        coverData,
      };
      localStorage.setItem(STORAGE_KEYS.SAVED_DESIGNS, JSON.stringify(designs));
      return designs[index];
    }
  }

  const newDesign: SavedDesign = {
    id: 'design_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: title.trim() || 'Untitled Cover Design',
    createdAt: now,
    updatedAt: now,
    coverData,
  };

  designs.unshift(newDesign);
  localStorage.setItem(STORAGE_KEYS.SAVED_DESIGNS, JSON.stringify(designs));
  return newDesign;
}

/**
 * Deletes a saved design by ID
 */
export function deleteSavedDesign(id: string): void {
  const designs = getSavedDesigns().filter((d) => d.id !== id);
  localStorage.setItem(STORAGE_KEYS.SAVED_DESIGNS, JSON.stringify(designs));
}

/**
 * Duplicates a saved design
 */
export function duplicateSavedDesign(id: string): SavedDesign | null {
  const designs = getSavedDesigns();
  const target = designs.find((d) => d.id === id);
  if (!target) return null;

  const duplicated: SavedDesign = {
    ...target,
    id: 'design_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    title: `${target.title} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  designs.unshift(duplicated);
  localStorage.setItem(STORAGE_KEYS.SAVED_DESIGNS, JSON.stringify(designs));
  return duplicated;
}

/**
 * Export cover data as JSON download
 */
export function exportDesignJson(coverData: CoverData, filename = 'assignment-cover-design.json'): void {
  const jsonStr = JSON.stringify(coverData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Validates and imports JSON design
 */
export function parseImportedJson(jsonString: string): CoverData | null {
  try {
    const data = JSON.parse(jsonString);
    if (!data.university || !data.course || !data.student || !data.customization) {
      throw new Error('Invalid schema');
    }
    return data as CoverData;
  } catch (err) {
    console.error('Failed to parse imported design JSON', err);
    return null;
  }
}

/**
 * Theme persistence
 */
export function getSavedTheme(): 'light' | 'dark' {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function saveTheme(theme: 'light' | 'dark'): void {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}
