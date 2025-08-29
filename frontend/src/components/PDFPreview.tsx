interface PDFPreviewProps {
  previewUrl: string | null;
  fileName: string | null;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ previewUrl }) => {
  if (!previewUrl) return null;

  console.log("PDFPreview previewUrl:", previewUrl);
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

/*
{fileName && <p className="text-sm text-gray-700 mt-2 text-center">{fileName}</p>}}

      {previewUrl && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">PDF Preview:</h4>
          <div className="border rounded-lg overflow-hidden shadow-md">
            <embed src={previewUrl} width="100%" height="300px" className="rounded-lg" />
          </div>
        </div>
      )}
*/