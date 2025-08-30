"use client";

import React, { createContext, useEffect, useState } from "react";
import MobileDetect from "mobile-detect";

const MobileContext = createContext<boolean | undefined>(undefined);

const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    setIsMobile(!!md.mobile());
  }, []);

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  );
};

export { MobileContext, MobileProvider };

