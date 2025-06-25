import { useCallback, useEffect, useRef, useState } from "react";

const useAutoHideControls = ({
  containerRef,
  delayMs = 2000,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  delayMs: number;
}) => {
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, delayMs);
  }, [delayMs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleActivity = () => resetTimer();

    container.addEventListener("mousemove", handleActivity);
    container.addEventListener("touchstart", handleActivity);

    resetTimer();

    return () => {
      container.removeEventListener("mousemove", handleActivity);
      container.removeEventListener("touchstart", handleActivity);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [containerRef, resetTimer]);

  return visible;
};

export default useAutoHideControls;
