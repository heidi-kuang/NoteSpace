import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import confetti from "canvas-confetti";

interface DownloadButtonProps {
  downloadLink: string | null;
  processedFileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ downloadLink, processedFileName }) => {
  if (!downloadLink) return null;
  
  const blurb = processedFileName;

  const confettiAnimation = () => {
    confetti({
      particleCount: 90,
      spread: 220,
    });
  }
  
  return (
    <div className="mt-4">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a href={downloadLink} download={processedFileName}>
              <Button variant="outline" onClick={() => confettiAnimation()}>
                Download
              </Button>
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={16}>
            <p className="text-gray-600 text-sm">{blurb}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
    </div>
    
  )
}

export default DownloadButton

