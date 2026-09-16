export interface AcademicFont {
  id: string;
  name: string;
  category: 'Serif' | 'Sans Serif' | 'Modern';
  fontFamily: string;
  description: string;
  isPopular?: boolean;
}

export const ACADEMIC_FONTS: AcademicFont[] = [
  // Serif Fonts (Classic, formal, scholarly)
  {
    id: 'times',
    name: 'Times New Roman',
    category: 'Serif',
    fontFamily: '"Times New Roman", Times, "EB Garamond", serif',
    description: 'The global standard for formal academic papers, theses, and reports.',
    isPopular: true,
  },
  {
    id: 'garamond',
    name: 'EB Garamond',
    category: 'Serif',
    fontFamily: '"EB Garamond", Garamond, "Times New Roman", serif',
    description: 'Scholarly, bookish elegance with historical academic authority.',
    isPopular: true,
  },
  {
    id: 'georgia',
    name: 'Georgia',
    category: 'Serif',
    fontFamily: 'Georgia, "Times New Roman", serif',
    description: 'High-readability serif with distinguished character shapes.',
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    category: 'Serif',
    fontFamily: '"Merriweather", Georgia, serif',
    description: 'Pleasant, highly legible modern academic serif.',
  },

  // Sans Serif Fonts (Clean, modern academic, engineering)
  {
    id: 'inter',
    name: 'Inter',
    category: 'Sans Serif',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    description: 'Crisp, contemporary, clean typography favored in tech departments.',
    isPopular: true,
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'Sans Serif',
    fontFamily: '"Roboto", Arial, sans-serif',
    description: 'Geometric and balanced, ideal for engineering and lab reports.',
  },
  {
    id: 'arial',
    name: 'Arial / Helvetica',
    category: 'Sans Serif',
    fontFamily: 'Arial, Helvetica, sans-serif',
    description: 'Universally supported neutral presentation standard.',
  },

  // Modern Fonts (Design, BBA, contemporary)
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Modern',
    fontFamily: '"Poppins", sans-serif',
    description: 'Distinctive geometric sans-serif for sleek, punchy cover pages.',
    isPopular: true,
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Modern',
    fontFamily: '"Montserrat", sans-serif',
    description: 'Architectural, urban proportions with excellent uppercase heading weight.',
  },
  {
    id: 'lato',
    name: 'Lato',
    category: 'Modern',
    fontFamily: '"Lato", sans-serif',
    description: 'Warm and professional corporate-academic balance.',
  },
];
