interface PDFPreviewProps {
  previewUrl: string | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl }) => {
  if (!previewUrl) return null;

  console.log("PDFPreview previewUrl:", previewUrl);
  return (
    <div style={{ marginTop: "16px", height: "500px"}}>
      <div className="border rounded-lg overflow-hidden shadow-md">
          <object
            data={previewUrl}
            type="application/pdf"
            width="100%"
            height="500px"
            className="w-full h-96"
          >
            <p className="text-gray-600 text-sm m-8">PDF preview is not supported on this device. Use the download button above.</p>
          </object>
      </div>
      
    </div>
  );
};

export default PDFPreview;
