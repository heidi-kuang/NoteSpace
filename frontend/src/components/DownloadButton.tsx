import { Button } from '@/components/ui/button'

interface DownloadButtonProps {
  downloadLink: string | null;
  processedFileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadLink, processedFileName }) => {
  if (!downloadLink) return null;
  return (
    <div className="mt-4">
      <a href={downloadLink} download={processedFileName}>
        <Button variant="outline">
          Download
        </Button>
      </a>
    </div>
    
  )
}

export default DownloadButton