import { BorderStyle } from './cover';

export interface CoverTemplateMeta {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: 'academic' | 'modern' | 'minimal' | 'technical' | 'formal';
  tags: string[];
  defaultFont: string;
  defaultBorderStyle: BorderStyle;
  defaultBorderThickness: number;
  defaultAccentColor: string;
  recommendedFor: string;
  features: string[];
}
