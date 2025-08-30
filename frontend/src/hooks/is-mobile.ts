import { useContext } from "react";
import { MobileContext } from "@/context/MobileContext";

export const useIsMobile = () => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error("useIsMobile must be used within a MobileProvider");
  }
  return context;
};