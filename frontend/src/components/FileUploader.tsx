import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react"; // ShadCN supports Lucide icons

interface FileUploaderProps {
  setOriginalPdf: ( file: File ) => void;
  setPdfPreviewUrl: ( url: string ) => void;
  setFileName: ( name: string ) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  setOriginalPdf,
  setPdfPreviewUrl,
  setFileName
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setOriginalPdf(selectedFile);
    setPdfPreviewUrl(URL.createObjectURL(selectedFile));
    setFileName(selectedFile.name);
    console.log('FileUploader: uploaded', selectedFile.name);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Upload a PDF File</h3>

      <Label htmlFor="file-upload" className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-500 transition cursor-pointer">
        <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
        <span className="text-gray-600 text-sm">Click to upload or drag & drop</span>
        <Input
          id="file-upload"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </Label>
    </div>
  );
};

export default FileUploader;
