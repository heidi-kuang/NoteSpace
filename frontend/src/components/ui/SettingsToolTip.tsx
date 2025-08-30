import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Info } from "lucide-react"
import { useIsMobile } from "@/hooks/is-mobile"

interface SettingsToolTipProps {
  tip: string;
}

const SettingsToolTip: React.FC<SettingsToolTipProps>  = ({tip}) => {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Popover>
      <PopoverTrigger asChild>
        <Info size={16} color="lightgray" className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="max-w-[150px]" side="left">
        <p className="text-gray-600 text-sm">{tip}</p>
      </PopoverContent>
    </Popover>
  ) : (
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