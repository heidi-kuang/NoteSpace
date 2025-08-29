import { useState } from 'react'
import SettingsForm from '@/components/SettingsForm'
import PDFPreview from '@/components/PDFPreview'
import FileUploader from './FileUploader'
import { FormValues } from '@/types/form'
import DownloadButton from '@/components/DownloadButton'
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"

const Uploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [processedFileName, setProcessedFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  /**
   * Handle form submission: upload file and process PDF
   * @param data file, margin ratio, clip RHS, anchor
   * @post downloadLink is set to the processed PDF
   */
  const handleFormSubmit = async (data: FormValues) => {
    if (!file) {
      toast({description: "Please select a file first.", variant: "error", duration: 3000});
      return;
    }
    let loadingToastShown = false; // keep track of whether we showed the loading toast

    const toastTimer = setTimeout(() => {
      loadingToastShown = true;
      toast({title: "Processing...", 
        description: "If this takes a while, it's because the free server I'm using to host my backend falls asleep after 15 minutes of inactivity and has to reboot. Give it a minute or two. Your next uploads should be processed much faster!",
        duration: Infinity,
      });
    }, 3000); // show toast only if loading exceeds 3 seconds
    

    const formData = new FormData();
    formData.append("file", file);
    formData.append("margin_ratio", data.marginRatio.toString());
    formData.append("clip_rhs", data.clipRHS.toString());
    formData.append("clip_lhs", data.clipLHS.toString());
    formData.append("anchor", data.anchor);
    formData.append("desc", "test-frontend");

    try {
      // await new Promise((resolve) => setTimeout(resolve, 5000)); // DEBUG
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      } else {
        console.log("PDF successfully processed");

        clearTimeout(toastTimer);
        console.log("shown:", loadingToastShown);
        if (loadingToastShown) {
          toast({
            title: "Success!",
            description: "Your PDF is ready.",
            duration: 2000,
          }); // if user had to wait, update toast to success
        }
        
      }

      // Convert response to blob and create a download link
      const blob = await response.blob();
      console.log("blob acquired");
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
      console.log("set download link:", url);

      // get file name from response header
      const contentDisposition = response.headers.get("Content-Disposition");
      console.log("contentDisposition:", contentDisposition);
      let newProcessedFileName = "hellooo";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename=(.+)/);
        if (fileNameMatch) {
          setProcessedFileName(fileNameMatch[1]);
          newProcessedFileName = fileNameMatch[1];
        } else {
          console.log("no match")
        }
      }
      console.log("set processed file name:", newProcessedFileName);
    } catch (error) {
      console.error("Error uploading file:", error);
      clearTimeout(toastTimer);
    }
  }

  return (
    <div style={{ padding: "20px", margin: "auto"}}>
      <div className="flex flex-col md:flex-row w-full sm:gap-8 md:gap-16 lg:gap-24 gap-y-4"> 
        {/* File uploader on the left. Take up more space. */}
        <div className="flex-2 flex-grow">
          <FileUploader
            onFileUpload={(selectedFile) => {
              setFile(selectedFile);
            }}
          />
        </div>
        
        {/* Settings on the right. */}
        <div className="bg-white shadow-lg p-5 px-8 rounded-lg flex-grow flex-1  max-w-xs">
          <SettingsForm onSubmit={handleFormSubmit} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
      </div>

      {downloadLink && (
        <h3 className="mt-8 text-l">Here's your processed PDF 🎉</h3>
      )}
      
      <DownloadButton downloadLink={downloadLink} processedFileName={processedFileName}/>
      
      <PDFPreview previewUrl={downloadLink} />
    </div>
  )
}

export default Uploader