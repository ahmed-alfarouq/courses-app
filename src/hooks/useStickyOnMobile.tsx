import { useCallback, useEffect, useState } from "react";

const useStickyOnMobile = ({
  enabled,
  containerRef,
  isMobile,
}: {
  enabled: boolean;
  containerRef: React.RefObject<HTMLElement | null>;
  isMobile: boolean;
}) => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const offsetTop = container.getBoundingClientRect().top;
    const scrollY = window.scrollY;

    if (offsetTop <= 0 && !isSticky) {
      setIsSticky(true);
    } else if (scrollY < 50 && isSticky) {
      setIsSticky(false);
    }
  }, [containerRef, isSticky]);

  useEffect(() => {
    if (!enabled || !isMobile) return;

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [enabled, isMobile, handleScroll]);

  return isSticky;
};

export default useStickyOnMobile;
