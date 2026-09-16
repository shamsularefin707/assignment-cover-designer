export type UniversityType = 'public' | 'private' | 'engineering' | 'international';

export interface University {
  id: string;
  name: string;
  shortName: string;
  domain: string;
  logo: string;
  location: string;
  type: UniversityType;
  isPopular?: boolean;
  departments: string[];
}

export interface StudentVisibleFields {
  rollNo: boolean;
  regNo: boolean;
  studentId: boolean;
  batch: boolean;
  section: boolean;
  semester: boolean;
}

export interface StudentInfo {
  name: string;
  rollNo: string;
  regNo: string;
  studentId: string;
  batch: string;
  section: string;
  semester: string;
  visibleFields: StudentVisibleFields;
}

export interface TeamMember {
  id: string;
  name: string;
  studentId: string;
  role?: string;
}

export interface CourseInfo {
  code: string;
  name: string;
  title: string;
  assignmentNo: string;
  assignmentTitle: string;
  section: string;
  batch: string;
  semester: string;
  academicYear: string;
}

export interface SubmissionVisibleFields {
  time: boolean;
  department: boolean;
  designation: boolean;
}

export interface SubmissionInfo {
  submittedTo: string;
  designation: string;
  department: string;
  submissionDate: string;
  submissionTime: string;
  visibleFields: SubmissionVisibleFields;
}

export interface AdditionalVisibleFields {
  groupNumber: boolean;
  teamMembers: boolean;
  labType: boolean;
  topic: boolean;
  notes: boolean;
}

export interface AdditionalInfo {
  isGroupAssignment: boolean;
  groupNumber: string;
  teamMembers: TeamMember[];
  labType: string;
  topic: string;
  notes: string;
  visibleFields: AdditionalVisibleFields;
}

export type BorderStyle = 'none' | 'single' | 'double' | 'thick' | 'decorative' | 'modern';
export type TextAlignment = 'center' | 'left' | 'balanced';
export type LogoSize = 'small' | 'medium' | 'large' | 'extra-large';
export type LogoPosition = 'top-center' | 'top-left' | 'top-right' | 'hidden';
export type SpacingDensity = 'compact' | 'normal' | 'relaxed';
export type TextCasing = 'normal' | 'uppercase' | 'capitalize';

export interface CustomizationSettings {
  templateId: string;
  fontFamily: string;
  fontScale: number; // 0.85 to 1.15
  textAlignment: TextAlignment;
  borderStyle: BorderStyle;
  borderThickness: number; // 1 to 5
  borderColor: string;
  accentColor: string;
  logoSize: LogoSize;
  logoPosition: LogoPosition;
  customLogoUrl: string | null;
  spacingDensity: SpacingDensity;
  textCasing: TextCasing;
  showBorder: boolean;
  showDate: boolean;
}

export interface CoverData {
  university: {
    id: string;
    name: string;
    shortName: string;
    customName?: string;
    customShortName?: string;
    domain: string;
    location: string;
    logoUrl: string;
    isCustomLogo: boolean;
  };
  department: {
    name: string;
    isCustom: boolean;
  };
  course: CourseInfo;
  student: StudentInfo;
  submission: SubmissionInfo;
  additional: AdditionalInfo;
  customization: CustomizationSettings;
}

export interface SavedDesign {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  coverData: CoverData;
}
