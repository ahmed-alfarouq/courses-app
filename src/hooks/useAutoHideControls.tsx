import { useCallback, useEffect, useRef, useState } from "react";

const useAutoHideControls = ({
  containerRef,
  delayMs = 2000,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  delayMs: number;
}) => {
  const [visible, setVisible] = useState(true);
  const [canDisappear, setCanDisappear] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);

    if (canDisappear) {
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, delayMs);
    }
  }, [delayMs, canDisappear]);

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

  useEffect(() => {
    const handleCanDisappear = () => {
      const videoSettingsMenu = document.getElementById("video-settings-menu");

      // To wait till data-open updated
      setTimeout(() => {
        const open = videoSettingsMenu?.dataset.open === "true";
        setCanDisappear(!open);
      }, 0);
    };
    document.addEventListener("click", handleCanDisappear);

    return () => {
      document.removeEventListener("click", handleCanDisappear);
    };
  }, []);

  return visible;
};

export default useAutoHideControls;
