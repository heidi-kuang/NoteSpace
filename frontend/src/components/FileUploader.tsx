import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react"; // ShadCN supports Lucide icons

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      onFileSelect(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
    }
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

      {fileName && <p className="text-sm text-gray-700 mt-2 text-center">{fileName}</p>}

      {previewUrl && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">PDF Preview:</h4>
          <div className="border rounded-lg overflow-hidden shadow-md">
            <embed src={previewUrl} width="100%" height="300px" className="rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
