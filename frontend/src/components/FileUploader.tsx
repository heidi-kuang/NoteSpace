import { useState } from "react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      onFileSelect(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div>
      <h3>Select a PDF File:</h3>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {previewUrl && <embed src={previewUrl} width="100%" height="300px" />}
    </div>
  );
};

export default FileUploader;
