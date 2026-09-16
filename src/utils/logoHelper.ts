import { CoverData } from '../types/cover';
import { BANGLADESH_UNIVERSITIES } from '../data/universities';
import { generateUniversityCrestSvg } from './logoFallback';

/**
 * Retrieves the single active logo source for the cover page.
 * Follows the strict priority:
 * 1. Custom uploaded logo (if present)
 * 2. Selected university default logo or SVG crest fallback
 */
export function getActiveLogoSrc(coverData: CoverData): string {
  // 1. Custom logo has top priority
  if (coverData.logo?.source === 'custom' && coverData.logo.src) {
    return coverData.logo.src;
  }
  if (coverData.customization?.customLogoUrl) {
    return coverData.customization.customLogoUrl;
  }

  // 2. University logo
  if (coverData.university?.logoUrl && coverData.university.logoUrl.trim() !== '') {
    return coverData.university.logoUrl;
  }

  // 3. Fallback SVG crest based on university shortName
  const currentUniv = BANGLADESH_UNIVERSITIES.find((u) => u.id === coverData.university?.id);
  const shortName = currentUniv?.shortName || coverData.university?.shortName || 'UNIV';
  return generateUniversityCrestSvg(shortName);
}

/**
 * Validates and processes an uploaded logo file entirely client-side.
 * Converts to an optimized base64 Data URL, preserving transparency for PNGs.
 */
export async function processUploadedLogoFile(
  file: File
): Promise<{ dataUrl: string; fileName: string }> {
  // Validate extension and MIME
  const fileName = file.name || 'custom-logo.png';
  const ext = fileName.split('.').pop()?.toLowerCase() || '';
  const validExtensions = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
  const validMimes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/svg+xml',
  ];

  const isValidType = validMimes.includes(file.type) || validExtensions.includes(ext);
  if (!isValidType) {
    throw new Error('Unsupported file type. Please upload a PNG, JPG, JPEG, WebP, or SVG image.');
  }

  // Validate size (up to 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image file is too large. Please upload an image under 10MB.');
  }

  // If SVG, read as text and encode
  if (file.type === 'image/svg+xml' || ext === 'svg') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        if (!text.includes('<svg')) {
          reject(new Error('Invalid SVG file format.'));
          return;
        }
        const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(text)}`;
        resolve({ dataUrl, fileName });
      };
      reader.onerror = () => reject(new Error('Failed to read SVG file.'));
      reader.readAsText(file);
    });
  }

  // For raster images (PNG, JPG, WebP), downscale if larger than 1200px to maintain
  // print-grade 300 DPI while keeping memory and storage light.
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();

      img.onload = () => {
        const maxDim = 1200;
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (width <= maxDim && height <= maxDim) {
          // Keep original dataUrl
          resolve({ dataUrl: rawDataUrl, fileName });
          return;
        }

        // Scale down proportionally
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl: rawDataUrl, fileName });
          return;
        }

        // Maintain transparency
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
        const optimizedDataUrl = canvas.toDataURL(mime, 0.95);
        resolve({ dataUrl: optimizedDataUrl, fileName });
      };

      img.onerror = () => {
        // Fallback to raw data url if Image decode fails
        resolve({ dataUrl: rawDataUrl, fileName });
      };

      img.src = rawDataUrl;
    };

    reader.onerror = () => reject(new Error('Failed to read image file from device.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Ensures all <img> elements inside a container are fully loaded and decoded
 * before canvas capture or PDF generation.
 */
export async function waitForImagesToLoad(container: HTMLElement): Promise<void> {
  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) {
        if ('decode' in img) {
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
        // Safety timeout so export never hangs
        setTimeout(onDone, 2000);
      });
    })
  );
}
