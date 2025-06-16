import { createContext, useContext } from "react";

interface MobileContextProps {
  isMobile: boolean;
}

const MobileContext = createContext<MobileContextProps>({
  isMobile: false,
});

export const useMobileContext = () => useContext(MobileContext);

export default MobileContext;
