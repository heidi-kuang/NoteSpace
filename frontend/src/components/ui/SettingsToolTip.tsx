import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface SettingsToolTipProps {
  tip: string;
}

const SettingsToolTip: React.FC<SettingsToolTipProps>  = ({tip}) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info size={16} color="lightgray"/>
        </TooltipTrigger>
        <TooltipContent className="max-w-[150px]" side="left">
          <p className="text-gray-600 text-sm">{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SettingsToolTip