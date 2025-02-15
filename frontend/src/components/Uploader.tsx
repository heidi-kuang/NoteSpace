import { useState } from 'react'
import SettingsForm from '@/components/SettingsForm'
import PDFPreview from '@/components/PDFPreview'
import FileUploader from './FileUploader'
import { FormValues } from '@/types/form'
import DownloadButton from './DownloadButton'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"

const Uploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [fileName, setFileName] = useState<string>(""); // filename after download

  /**
   * Handle form submission: upload file and process PDF
   * @param data file, margin ratio, clip RHS, anchor
   * @post downloadLink is set to the processed PDF
   */
  const handleFormSubmit = async (data: FormValues) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("margin_ratio", data.marginRatio.toString());
    formData.append("clip_rhs", data.clipRHS.toString());
    formData.append("clip_lhs", data.clipLHS.toString());
    formData.append("anchor", data.anchor);
    formData.append("desc", "test-frontend");

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      } else {
        console.log("PDF successfully processed");
      }

      // Convert response to blob and create a download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div style={{ padding: "20px", margin: "auto"}}>
      <div className="flex flex-col md:flex-row w-full"> 
        {/* File uploader on the left. Take up more space. */}
        <div className="flex-2 mr-8 flex-grow">
          <FileUploader
            onFileSelect={(selectedFile) => {
              setFile(selectedFile);
            }}
          />
        </div>
        
        {/* Settings on the right. */}
        <div className="h-[380px] bg-white shadow-lg p-5 rounded-lg flex-grow flex-1">
          <SettingsForm onSubmit={handleFormSubmit}/>
        </div>
      </div>

      {downloadLink && (
        <h3 className="mt-8 text-l">Here's your processed PDF 🎉</h3>
      )}
        
      
      
      {/* <DownloadButton downloadLink={downloadLink}/> */}
      
      <PDFPreview previewUrl={downloadLink} />
    </div>
  )
}

export default Uploader