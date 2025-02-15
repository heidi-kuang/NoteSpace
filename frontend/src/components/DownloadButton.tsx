import { Button } from '@/components/ui/button'

interface DownloadButtonProps {
  downloadLink: string | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadLink }) => {
  if (!downloadLink) return null;
  return (
    <div className="mt-4">
      <a href={downloadLink} download="NoteSpace">
        <Button variant="outline">
          Download
        </Button>
      </a>
    </div>
    
  )
}

export default DownloadButton