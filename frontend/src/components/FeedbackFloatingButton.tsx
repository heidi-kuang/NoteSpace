import { Button } from "@/components/ui/button";
import { MessageCircleHeart } from "lucide-react"; // Or any icon
import { cn } from "@/lib/utils"; // Optional utility for class merging
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { isMobile } from "../utils/is-mobile";

const FeedbackFloatingButton = () => {
  const feedbackFormLink = "https://forms.gle/kAcAamQnzH55p4ar9";
  const blurb = "Have suggestions or feedback? Let us know!";

  return (
    <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              className={cn(
                // `${isMobile ? "top" : "bottom"}-6 ${isMobile ? "left" : "right"}-6`,
                "top-6 left-6",
                "fixed z-50 h-12 w-12 rounded-full p-0 bg-gray-200 text-gray-500",
                "hover:bg-black hover:text-white transition-all duration-300 ease-in-out",
                "hover:scale-110 active:scale-95 shadow-lg",
                "[&_svg]:size-5"
              )}
            >
              <a
                href={feedbackFormLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Give feedback"
                className="flex items-center justify-center w-full"
              >
                <MessageCircleHeart className="h-8 w-8" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={16}>
            <p className="text-gray-600 text-sm">{blurb}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    
  );
};

export default FeedbackFloatingButton;
