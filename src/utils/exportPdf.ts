import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CoverData } from '../types/cover';

export interface ExportPdfOptions {
  element: HTMLElement;
  coverData: CoverData;
  onProgress?: (step: string) => void;
}

export async function exportToPdf({ element, coverData, onProgress }: ExportPdfOptions): Promise<boolean> {
  try {
    onProgress?.('Preparing document for PDF generation...');

    // Temporary style override to ensure full rendering without screen scale transforms
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    const originalTransition = element.style.transition;

    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    element.style.transition = 'none';

    onProgress?.('Rendering high-resolution vector canvas...');

    const canvas = await html2canvas(element, {
      scale: 2.5, // 300 DPI equivalent for crisp academic print
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 794, // Standard 96 DPI pixel width of A4 (210mm)
      windowHeight: 1123, // Standard 96 DPI pixel height of A4 (297mm)
    });

    // Restore original styles
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.transition = originalTransition;

    onProgress?.('Assembling A4 PDF document...');

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Standard A4 dimensions in mm: 210 x 297
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

    // Create a descriptive, clean filename
    const courseCode = coverData.course.code.replace(/[^a-zA-Z0-9]/g, '_') || 'Assignment';
    const studentName = coverData.student.name.replace(/[^a-zA-Z0-9]/g, '_') || 'Student';
    const filename = `${courseCode}_${studentName}_Cover_Page.pdf`;

    pdf.save(filename);
    onProgress?.('PDF downloaded successfully!');
    return true;
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
}
