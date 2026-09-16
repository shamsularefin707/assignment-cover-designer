export interface StandardDepartment {
  name: string;
  shortName: string;
  commonCourses: {
    code: string;
    title: string;
  }[];
}

export const COMMON_DEPARTMENTS: StandardDepartment[] = [
  {
    name: 'Department of Computer Science and Engineering (CSE)',
    shortName: 'CSE',
    commonCourses: [
      { code: 'CSE 101', title: 'Structured Programming Language' },
      { code: 'CSE 102', title: 'Structured Programming Language Laboratory' },
      { code: 'CSE 205', title: 'Data Structures and Algorithms' },
      { code: 'CSE 206', title: 'Data Structures Laboratory' },
      { code: 'CSE 311', title: 'Database Management Systems' },
      { code: 'CSE 312', title: 'Database Systems Laboratory' },
      { code: 'CSE 325', title: 'Operating Systems & System Programming' },
      { code: 'CSE 373', title: 'Design and Analysis of Algorithms' },
      { code: 'CSE 415', title: 'Artificial Intelligence & Machine Learning' },
      { code: 'CSE 421', title: 'Computer Networks and Data Communication' },
      { code: 'CSE 499', title: 'Senior Design Project / Capstone' },
    ],
  },
  {
    name: 'Department of Electrical and Electronic Engineering (EEE)',
    shortName: 'EEE',
    commonCourses: [
      { code: 'EEE 163', title: 'Electrical Circuit Analysis I' },
      { code: 'EEE 164', title: 'Circuit Analysis Laboratory I' },
      { code: 'EEE 211', title: 'Analog Electronics I' },
      { code: 'EEE 241', title: 'Electromagnetic Fields and Waves' },
      { code: 'EEE 311', title: 'Digital Signal Processing' },
      { code: 'EEE 331', title: 'Power System Analysis' },
      { code: 'EEE 351', title: 'Microprocessor and Interfacing' },
      { code: 'EEE 411', title: 'VLSI Design and Technology' },
    ],
  },
  {
    name: 'Department of Business Administration (BBA / MBA)',
    shortName: 'BBA',
    commonCourses: [
      { code: 'BUS 101', title: 'Introduction to Business' },
      { code: 'MKT 201', title: 'Principles of Marketing' },
      { code: 'ACT 201', title: 'Financial Accounting' },
      { code: 'FIN 301', title: 'Managerial Finance' },
      { code: 'MGT 311', title: 'Organizational Behavior & Leadership' },
      { code: 'SCM 401', title: 'Supply Chain Management' },
      { code: 'STR 490', title: 'Strategic Management & Business Policy' },
    ],
  },
  {
    name: 'Department of Civil Engineering (CE)',
    shortName: 'CE',
    commonCourses: [
      { code: 'CE 101', title: 'Engineering Mechanics' },
      { code: 'CE 201', title: 'Mechanics of Solids I' },
      { code: 'CE 203', title: 'Engineering Geology and Geomorphology' },
      { code: 'CE 311', title: 'Structural Analysis and Design I' },
      { code: 'CE 331', title: 'Environmental Engineering I' },
      { code: 'CE 341', title: 'Transportation Engineering I' },
      { code: 'CE 351', title: 'Geotechnical Engineering I' },
    ],
  },
  {
    name: 'Department of Mechanical Engineering (ME)',
    shortName: 'ME',
    commonCourses: [
      { code: 'ME 160', title: 'Mechanical Engineering Drawing' },
      { code: 'ME 241', title: 'Thermodynamics I' },
      { code: 'ME 261', title: 'Fluid Mechanics I' },
      { code: 'ME 341', title: 'Heat Transfer' },
      { code: 'ME 361', title: 'Machine Design I' },
      { code: 'ME 401', title: 'Refrigeration and Air Conditioning' },
    ],
  },
  {
    name: 'Department of Economics',
    shortName: 'ECO',
    commonCourses: [
      { code: 'ECO 101', title: 'Introduction to Microeconomics' },
      { code: 'ECO 104', title: 'Introduction to Macroeconomics' },
      { code: 'ECO 201', title: 'Intermediate Microeconomics' },
      { code: 'ECO 311', title: 'Econometrics I' },
      { code: 'ECO 330', title: 'Development Economics' },
      { code: 'ECO 410', title: 'International Trade and Finance' },
    ],
  },
  {
    name: 'Department of English',
    shortName: 'ENG',
    commonCourses: [
      { code: 'ENG 102', title: 'English Reading and Composition' },
      { code: 'ENG 103', title: 'Introduction to Literary Studies' },
      { code: 'ENG 210', title: 'History of English Literature' },
      { code: 'ENG 315', title: 'Romantic Poetry and Prose' },
      { code: 'ENG 401', title: 'Critical Theory and Postcolonial Literature' },
    ],
  },
  {
    name: 'Department of Law',
    shortName: 'LAW',
    commonCourses: [
      { code: 'LAW 101', title: 'Jurisprudence and Legal Theory' },
      { code: 'LAW 102', title: 'Constitutional Law of Bangladesh' },
      { code: 'LAW 201', title: 'Law of Contract and Specific Relief' },
      { code: 'LAW 301', title: 'Criminal Law and Criminal Procedure' },
      { code: 'LAW 401', title: 'Public International Law' },
    ],
  },
  {
    name: 'Department of Pharmacy',
    shortName: 'PHR',
    commonCourses: [
      { code: 'PHR 101', title: 'Inorganic Pharmacy I' },
      { code: 'PHR 201', title: 'Pharmaceutical Microbiology' },
      { code: 'PHR 301', title: 'Pharmacology I' },
      { code: 'PHR 305', title: 'Medicinal Chemistry' },
      { code: 'PHR 401', title: 'Biopharmaceutics and Pharmacokinetics' },
    ],
  },
];
