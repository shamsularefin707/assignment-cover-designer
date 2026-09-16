import html2canvas from 'html2canvas';
import { CoverData } from '../types/cover';
import {
  triggerBrowserDownload,
  formatExportFilename,
  waitForFontsReady,
  waitForImagesReady,
} from './downloadHelper';

export interface ExportImageOptions {
  element: HTMLElement;
  coverData: CoverData;
  format?: 'png' | 'jpg';
  onProgress?: (step: string) => void;
}

/**
 * Robust, client-side High-Resolution Image Exporter.
 * Renders at print-grade 300 DPI (approx 2481x3509px) in PNG or JPG format,
 * preserving all custom logos, fonts, margins, and borders.
 */
export async function exportToImage({
  element,
  coverData,
  format = 'png',
  onProgress,
}: ExportImageOptions): Promise<boolean> {
  if (!element) {
    throw new Error('Preview element not found in DOM.');
  }

  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;
  const originalTransition = element.style.transition;
  const originalBoxShadow = element.style.boxShadow;

  try {
    onProgress?.('Preparing image export and verifying fonts...');

    // 1. Wait for web fonts
    await waitForFontsReady();

    // 2. Wait for all logos/images
    onProgress?.('Verifying logo assets and image readiness...');
    await waitForImagesReady(element);

    // 3. Reset transform for clean unscaled capture
    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    element.style.transition = 'none';
    element.style.boxShadow = 'none';

    onProgress?.('Rendering high-resolution 300 DPI canvas...');

    const canvas = await html2canvas(element, {
      scale: 3.125, // Produces 2481 x 3509 px (A4 @ 300 DPI)
      useCORS: true,
      allowTaint: false,
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

    onProgress?.('Assembling image file...');

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.95 : 1.0;
    const filename = formatExportFilename(coverData, format);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            triggerBrowserDownload(blob, filename);
            resolve(true);
          } else {
            // Fallback via data URL if toBlob fails
            try {
              const dataUrl = canvas.toDataURL(mimeType, quality);
              const link = document.createElement('a');
              link.href = dataUrl;
              link.download = filename;
              link.style.display = 'none';
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                if (document.body.contains(link)) document.body.removeChild(link);
              }, 1000);
              resolve(true);
            } catch (fallbackErr) {
              reject(fallbackErr);
            }
          }
        },
        mimeType,
        quality
      );
    });
  } catch (error) {
    console.error(`Failed to export ${format.toUpperCase()} image:`, error);
    throw error;
  } finally {
    // Always restore live DOM styles
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.transition = originalTransition;
    element.style.boxShadow = originalBoxShadow;
  }
}
