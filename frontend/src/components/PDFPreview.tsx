interface PDFPreviewProps {
  previewUrl: string | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl }) => {
  if (!previewUrl) return null;

  return (
    <div style={{ marginTop: "64px", height: "500px"}}>
      <h3>Here's your processed pdf:</h3>
      <div className="mt-4 border rounded-lg overflow-hidden shadow-md">
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
