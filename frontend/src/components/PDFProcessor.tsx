import { useState, useEffect } from 'react';
import FileUploader from './FileUploader';
import PDFPreview from './PDFPreview';
import PDFSettingsPanel from './PDFSettingsPanel';
import type { PDFOptions } from '@/types/pdf-options';
import { getWidenedPDFPreviewUrl } from '../utils/widen-pdf';
import DownloadButton from './DownloadButton';
import { useToast } from '@/hooks/use-toast';

const LAST_PDF_REGEX = /\.pdf(?!.*\.pdf)/i;

const PDFWidener = () => {
  const [originalPdf, setOriginalPdf] = useState<File | null>(null);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const processAndShowWiderPDF = async (pdfOptions: PDFOptions) => {
    if (!originalPdf) {
      console.error("No original PDF to process.");
      return;
    }

    try {
      setIsLoading(true);
      setPdfPreviewUrl(await getWidenedPDFPreviewUrl(originalPdf, pdfOptions));
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({description: "Something went wrong processing this PDF.", variant: "error"});

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    }
  }, [pdfPreviewUrl]);

  return (
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
        
        <div>
          {/* Settings on the right. */}
          <div className="bg-white shadow-lg p-5 px-8 rounded-lg self-start max-w-xs">
            <PDFSettingsPanel 
              onSettingsChange={processAndShowWiderPDF}
              isLoading={isLoading}
              originalPdf={originalPdf}
            />
          </div>
          {/* For downloading with custom file name. */}
          <DownloadButton 
            downloadLink={pdfPreviewUrl}
            processedFileName={(fileName ?? '').replace(LAST_PDF_REGEX, "_NoteSpace.pdf")}
          />
        </div>
      </div>
      
    </div>
  );
}

export default PDFWidener;
