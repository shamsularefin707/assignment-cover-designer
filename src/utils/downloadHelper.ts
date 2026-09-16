import { CoverData } from '../types/cover';

/**
 * Triggers a client-side file download using a Blob and temporary object URL.
 * Fully compatible with modern desktop and mobile browsers.
 */
export function triggerBrowserDownload(blob: Blob, filename: string): void {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);

  // Trigger download
  link.click();

  // Cleanup after browser initiates download
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(blobUrl);
  }, 1500);
}

/**
 * Generates a clean, readable, sanitized filename for the exported cover page.
 * Format: [CourseCode]_[StudentName]_assignment-cover.[ext]
 * Example: CSE311_Rahim_assignment-cover.pdf
 */
export function formatExportFilename(
  coverData: CoverData,
  ext: 'pdf' | 'png' | 'jpg'
): string {
  const sanitize = (str: string) =>
    str
      .trim()
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .replace(/_+/g, '_')
      .slice(0, 30);

  const coursePart = sanitize(coverData.course?.code || coverData.course?.assignmentNo || '');
  const studentPart = sanitize(coverData.student?.name || '');

  const parts = [coursePart, studentPart, 'assignment-cover'].filter(Boolean);
  const baseName = parts.length > 1 ? parts.join('_') : 'assignment-cover';
  return `${baseName}.${ext}`;
}

/**
 * Waits for all web fonts to be completely downloaded and ready.
 * Ensures typography like Google Fonts (Inter, Outfit, Cinzel, etc.)
 * renders accurately in the canvas / PDF without falling back to system serif.
 */
export async function waitForFontsReady(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document && document.fonts.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 2000)), // 2s timeout safeguard
      ]);
    } catch (e) {
      console.warn('Font loading check timed out or failed, proceeding with system fallbacks:', e);
    }
  }
}

/**
 * Ensures all <img> elements inside a container are completely loaded and decoded
 * before canvas capture or PDF generation.
 */
export async function waitForImagesReady(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        if ('decode' in img && typeof img.decode === 'function') {
          return img.decode().catch(() => {});
        }
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const onDone = () => {
          img.removeEventListener('load', onDone);
          img.removeEventListener('error', onDone);
          resolve();
        };
        img.addEventListener('load', onDone);
        img.addEventListener('error', onDone);
        setTimeout(onDone, 2500); // 2.5s safeguard timeout
      });
    })
  );
}
