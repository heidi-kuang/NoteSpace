import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import { getWidenedPDFBlob } from '../utils/widen-pdf';

import { CONTENT_ALIGNMENT } from '@/constants/pdf-options';
import FileUploader from './FileUploader';
import PDFPreview from './PDFPreview';
import SettingsForm from './SettingsForm';
import PDFSettingsPanel from './PDFSettingsPanel';

import type { PDFOptions } from '@/types/pdf-options';
import { getWidenedPDFPreviewUrl } from '../utils/widen-pdf';

const PDFWidener = () => {
  const [originalPdf, setOriginalPdf] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const selectedFile = e.target.files[0];
  //     setOriginalPdf(selectedFile);
  //     setPdfUrl(URL.createObjectURL(selectedFile));
  //     setFileName(selectedFile.name);
  //   }
    
  //   // const file = e.target.files?.[0];
  //   // if (!file) return;

  //   // const arrayBuffer = await file.arrayBuffer();
  //   // const pdfDoc = await PDFDocument.load(arrayBuffer);
  //   // const blob = await getWidenedPDFBlob(pdfDoc, { marginRatio: 0.5, align: CONTENT_ALIGNMENT.RIGHT });
  //   // const url = URL.createObjectURL(blob);
  //   // setPdfUrl(url);
  // };

  const processAndShowWiderPDF = async (pdfOptions: PDFOptions) => {
    if (!originalPdf) {
      console.error("No original PDF to process.");
      return;
    }

    try {
      setPdfPreviewUrl(await getWidenedPDFPreviewUrl(originalPdf, pdfOptions));
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  }

  return (
    // <div>
    //   <input type="file" accept="application/pdf" onChange={handleFileUpload} />
    //   {pdfUrl && (
    //     <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />
    //   )}
    // </div>
    <div style={{ padding: "20px", margin: "auto"}}>
      <div className="flex flex-col md:flex-row w-full sm:gap-8 md:gap-16 lg:gap-24 gap-y-4"> 
        {/* File uploader and preview */}
        <div className="flex-2 flex-grow gap-8">
          <FileUploader
            setOriginalPdf={setOriginalPdf}
            setPdfPreviewUrl={setPdfPreviewUrl}
            setFileName={setFileName}
          />
          
          <PDFPreview previewUrl={pdfPreviewUrl} fileName={fileName}/>
        </div>
        
        {/* Settings on the right. */}
        <div className="bg-white shadow-lg p-5 px-8 rounded-lg self-start max-w-xs">
          <PDFSettingsPanel onSettingsChange={processAndShowWiderPDF}/>
        </div>
      </div>

      {/* {downloadLink && (
        <h3 className="mt-8 text-l">Here's your processed PDF 🎉</h3>
      )} */}
      
      {/* <DownloadButton downloadLink={downloadLink} processedFileName={processedFileName}/>
      
      <PDFPreview previewUrl={downloadLink} /> */}
    </div>
  );
}

export default PDFWidener;
