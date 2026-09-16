# Assignment Cover Designer (Bangladesh) 🎓

A fully functional, responsive, production-quality academic web application built for university students across Bangladesh. Quickly select your university and department, enter course and submission details, customize professional typography and layouts, preview live in true A4 proportions, and download or print high-resolution cover pages.

![Assignment Cover Designer](https://img.shields.io/badge/A4_Academic_Generator-Bangladesh-blue)
![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.3-646cff?logo=vite)
[![Deploy with Vercel](https://vercel.com/button)](https://assignment-cover-designer.vercel.app)
![License](https://img.shields.io/badge/License-MIT-green)

**Live Website**: 🚀 [https://assignment-cover-designer.vercel.app](https://assignment-cover-designer.vercel.app)


---

## 🌟 Key Features

### 1. Comprehensive Bangladeshi Universities Catalog
- Includes major **Public**, **Private**, and **Engineering** universities:
  - **Public / Engineering**: BUET, University of Dhaka (DU), Jahangirnagar University (JU), Rajshahi University (RU), Chittagong University (CU), SUST, KUET, RUET, CUET, BUTEX, BUP, MIST, Khulna University, BAU, Jagannath University, DUET, Comilla University, etc.
  - **Private**: North South University (NSU), BRAC University (BRACU), Ahsanullah University (AUST), Independent University (IUB), AIUB, UIU, East West University (EWU), Daffodil (DIU), ULAB, Green University, Southeast University, etc.
  - **International**: Islamic University of Technology (IUT).
- Instant search by name, acronym, location, or domain.
- Quick pills for commonly accessed universities.
- Configurable departments dynamically filtered per institution, plus full support for custom departments and universities.

### 2. 8 Distinct Professional Academic Templates
Each template genuinely transforms document geometry, hierarchy, typography, and borders:
1. **Classic Academic**: Traditional double border, institutional seal, centered hierarchy, balanced Submitted By / Submitted To boxes.
2. **Minimal Modern**: Asymmetric editorial typography, hairline vertical accent rule, generous whitespace.
3. **Modern Accent**: Top colored institutional banner, course code badge pill, structured card metadata.
4. **Formal Border**: Ornate corner-bracket frame, classical roman numerals, formal serif hierarchy.
5. **University-Centered**: Large prominent central university emblem as focal point, framed assignment title.
6. **Elegant Serif**: Scholarly monograph / thesis aesthetic with Garamond/Georgia typography and delicate rules.
7. **Technical / Engineering**: Engineering metadata matrix (Course No., Experiment No., Date of Performance), dedicated Teacher Signature & Evaluation box.
8. **Clean Modern Grid**: Modular 3-section card layout cleanly separating Institution, Course, and Student/Faculty credentials.

### 3. Live A4 Document Preview & Print Purity
- **True A4 Dimensions**: Styled strictly to 210mm × 297mm (794px × 1123px at 96 DPI).
- **Responsive Zoom Controls**: Auto-fit to screen, 50%, 75%, 100%.
- **Direct A4 Print (`@media print`)**: Dedicated print stylesheet that strips away all website navigation, sidebars, and buttons, guaranteeing an exact 1-page physical A4 printout with zero blank extra pages.
- **Client-Side High-DPI PDF & PNG Export**: Instant vector/canvas A4 PDF (`jspdf` + `html2canvas`) and 300+ DPI PNG export.

### 4. Logo Engine & Custom Uploads
- Official institutional logos and vector crests.
- Dynamic fallback SVG crest generator for network resilience.
- Custom logo upload supporting PNG, JPG, SVG, WebP up to 4MB with validation.

### 5. Local Persistence & Privacy
- **100% Client-Side**: No login or registration required. All student data stays private on your machine.
- **Draft Auto-Save**: Never lose progress upon refreshing.
- **Saved Designs Library**: Save multiple named drafts, duplicate, reload, or export/import portable JSON design files.

### 6. Dark Mode & Responsive Layout
- Full dark/light mode for the editor interface.
- Preserves the physical paper-white background of the A4 document for true print fidelity.
- Optimized for desktops, laptops, tablets, and smartphones.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Semantic Vanilla CSS with CSS Custom Properties (Design Tokens) for pixel-perfect print layout
- **Document Export**: jsPDF, html2canvas
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Times New Roman, EB Garamond, Georgia, Merriweather, Inter, Roboto, Poppins, Montserrat, Lato)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/shamsularefin707/assignment-cover-designer.git

# Navigate to project directory
cd assignment-cover-designer

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Building for Production
```bash
npm run build
```

---

## 📄 License

MIT License © 2026. Built with pride for university students in Bangladesh.
