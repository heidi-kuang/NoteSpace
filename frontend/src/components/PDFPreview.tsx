interface PDFPreviewProps {
  previewUrl: string | null;
  fileName: string | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl }) => {
  if (!previewUrl) return null;

  return (
    <div style={{ marginTop: "16px", height: "500px", gap: "4px"}}>
      <div className="border rounded-lg overflow-hidden shadow-md">
        <embed 
            src={previewUrl} 
            width="100%" 
            height="500px" 
            title="PDF Preview"
            className="rounded-lg"
          />
      </div>
      
    </div>
  );
};

export default PDFPreview;
