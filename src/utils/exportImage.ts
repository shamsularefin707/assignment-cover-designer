import html2canvas from 'html2canvas';
import { CoverData } from '../types/cover';

export async function exportToImage(element: HTMLElement, coverData: CoverData): Promise<boolean> {
  try {
    const originalTransform = element.style.transform;
    const originalTransformOrigin = element.style.transformOrigin;
    const originalTransition = element.style.transition;

    element.style.transform = 'none';
    element.style.transformOrigin = 'top left';
    element.style.transition = 'none';

    const canvas = await html2canvas(element, {
      scale: 3, // Ultra-high resolution 300+ DPI
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.transition = originalTransition;

    const dataUrl = canvas.toDataURL('image/png');
    const courseCode = coverData.course.code.replace(/[^a-zA-Z0-9]/g, '_') || 'Assignment';
    const studentName = coverData.student.name.replace(/[^a-zA-Z0-9]/g, '_') || 'Student';
    const filename = `${courseCode}_${studentName}_Cover_Page.png`;

    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return true;
  } catch (error) {
    console.error('Failed to export PNG image:', error);
    throw error;
  }
}
