import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CoverData } from '../types/cover';
import {
  triggerBrowserDownload,
  formatExportFilename,
  waitForFontsReady,
  waitForImagesReady,
} from './downloadHelper';

export interface ExportPdfOptions {
  element: HTMLElement;
  coverData: CoverData;
  onProgress?: (step: string) => void;
}

/**
 * Robust, client-side A4 PDF exporter.
 * Targets exclusively the A4 document element, waits for all custom logos and fonts,
 * renders at print-grade 300 DPI (approx. 2480x3508px), and downloads via browser Blob.
 */
export async function exportToPdf({
  element,
  coverData,
  onProgress,
}: ExportPdfOptions): Promise<boolean> {
  if (!element) {
    throw new Error('Preview element not found in DOM.');
  }

  // Preserve original inline styles to restore after render
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;
  const originalTransition = element.style.transition;
  const originalBoxShadow = element.style.boxShadow;

  try {
    onProgress?.('Preparing document and loading fonts...');

    // 1. Ensure all custom web fonts and Google Fonts are fully ready
    await waitForFontsReady();

    // 2. Ensure all logos and images inside the preview are fully loaded and decoded
    onProgress?.('Verifying logo assets and image readiness...');
    await waitForImagesReady(element);

    // 3. Temporarily reset transform on element for clean unscaled capture
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    element.style.transition = 'none';
    element.style.boxShadow = 'none';

    onProgress?.('Rendering high-resolution vector canvas at 300 DPI...');

    // Scale 3.125 renders standard 794x1123px A4 at exactly 2481x3509px (print-ready 300 DPI)
    const canvas = await html2canvas(element, {
      scale: 3.125,
      useCORS: true,
      allowTaint: false, // Critical: Prevent tainted canvas SecurityErrors on export
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      height: 1123,
      windowWidth: 794,
      windowHeight: 1123,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        const clonedSheet = clonedDoc.getElementById('assignment-cover-page');
        if (clonedSheet) {
          clonedSheet.style.transform = 'none';
          clonedSheet.style.transformOrigin = 'top left';
          clonedSheet.style.margin = '0';
          clonedSheet.style.boxShadow = 'none';
        }
      },
    });

    onProgress?.('Generating standard ISO A4 PDF document...');

    const imgData = canvas.toDataURL('image/png', 1.0);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // ISO A4 portrait dimensions: 210mm x 297mm
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

    const filename = formatExportFilename(coverData, 'pdf');
    const blob = pdf.output('blob');

    onProgress?.('Triggering browser download...');
    triggerBrowserDownload(blob, filename);

    return true;
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    throw error;
  } finally {
    // Always restore live DOM styles
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.transition = originalTransition;
    element.style.boxShadow = originalBoxShadow;
  }
}
