import { PDFDocument } from 'pdf-lib';
import type { PDFPage } from 'pdf-lib';

import { CONTENT_ALIGNMENT } from '@/constants/pdf-options';
import type { ContentAlignment, PDFOptions } from '@/types/pdf-options';

const alignPage = (page: PDFPage, align: ContentAlignment, oldWidth: number, newWidth: number) => {
  const newlyAddedWidth = newWidth - oldWidth;
  switch (align) {
    case CONTENT_ALIGNMENT.LEFT:
      // No translation needed for left alignment
      break;
    case CONTENT_ALIGNMENT.CENTER:
      page.translateContent(newlyAddedWidth / 2, 0);
      break;
    case CONTENT_ALIGNMENT.RIGHT:
      page.translateContent(newlyAddedWidth, 0);
      break;
    default:
      throw new Error(`Unknown alignment option: ${align}`);
  }
}

/**
 * Widen the original PDF
 * @param pdfDoc the PDFDocument object to be widened
 * @param options options for widening, e.g., width multiplier
 * @returns the widened PDF as a Blob
 */
const getWidenedPDFBlob = async (pdfDoc: PDFDocument, options: PDFOptions) => {
  const { marginRatio, anchor } = options;
  
  const pages = pdfDoc.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();

      // Set new width, e.g., 1.5× wider
      const newWidth = width * (1 + marginRatio);
      page.setSize(newWidth, height);

      // Optionally move the content to center it on the wider page
      alignPage(page, anchor, width, newWidth);
    }

    const modifiedBytes = await pdfDoc.save();
    const fixedBuffer = new Uint8Array(modifiedBytes.buffer.slice(0)) as Uint8Array<ArrayBuffer>; // creates a new buffer with correct type
    const blob = new Blob([fixedBuffer], { type: 'application/pdf' });

    return blob;
}

/**
 * Widen the original PDF and get a url to it
 * @param file the original PDF file
 * @param options options for widening
 * @returns the url of the widened Blob, for preview and download purposes
 */
const getWidenedPDFPreviewUrl = async (file: File, options: PDFOptions) => { 
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const blob = await getWidenedPDFBlob(pdfDoc, options);
    const url = URL.createObjectURL(blob);
    return url;
};

export { getWidenedPDFPreviewUrl };