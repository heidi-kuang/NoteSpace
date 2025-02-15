import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"

const Uploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [marginRatio, setMarginRatio] = useState<number>(0.5);
  const [clipRHS, setClipRHS] = useState<number>(0.0); // 0.02 for networks
  const [anchor, setAnchor] = useState<string>("left"); 
  const [downloadLink, setDownloadLink] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("margin_ratio", marginRatio.toString());
    formData.append("clip_rhs", clipRHS.toString());
    formData.append("anchor", anchor);
    formData.append("desc", "test-frontend");

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      }

      // Convert response to blob and create a download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>NoteSpace</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <label>
        Margin Ratio:
        <input
          type="number"
          value={marginRatio}
          onChange={(e) => setMarginRatio(parseFloat(e.target.value))}
          step={0.1}
          min={0.1}
          max={1.0}
        />
      </label>
      <label>
        RHS Clip:
        <input
          type="number"
          value={clipRHS}
          onChange={(e) => setClipRHS(parseFloat(e.target.value))}
          step={0.01}
          min={0.0}
          max={1.0}
        />
      </label>

      {/* Anchor Selection Dropdown */}
      <label>
        Anchor:
        <select value={anchor} onChange={(e) => setAnchor(e.target.value)}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>
      <br />

      <button onClick={handleUpload}>Upload and Process</button>

      {downloadLink && (
        <div>
          <h3>Download Processed PDF:</h3>
          <a href={downloadLink} download="processed.pdf">
            Click here to download
          </a>
        </div>
      )}
    </div>
  )
}

export default Uploader