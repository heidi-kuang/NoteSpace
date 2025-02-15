interface PDFPreviewProps {
  previewUrl: string | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl }) => {
  if (!previewUrl) return null;

  return (
    <div style={{ marginTop: "20px", height: "500px", border: "1px solid #ccc" }}>
      <h3>Here's your processed pdf:</h3>
      <iframe src={previewUrl} width="100%" height="500px" title="PDF Preview"></iframe>
    </div>
  );
};

export default PDFPreview;
