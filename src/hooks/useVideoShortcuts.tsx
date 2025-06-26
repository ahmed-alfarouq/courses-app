import { useEffect } from "react";

import type { useVideoShortcutsProps } from "../components/videoPlayer/VideoPlayer.types";

const useVideoShortcuts = ({
  videoRef,
  togglePlay,
  toggleFullScreen,
  toggleTheaterMode,
  handleToggleMute,
  handleIncreaseVolume,
  handleDecreaseVolume,
}: useVideoShortcutsProps) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
          handleToggleMute();
          break;
        case "f":
          toggleFullScreen();
          break;
        case "t":
          toggleTheaterMode?.();
          break;
        case "arrowright":
          video.currentTime += 5;
          break;
        case "arrowleft":
          video.currentTime -= 5;
          break;
        case "arrowup":
          e.preventDefault();
          handleIncreaseVolume();
          break;
        case "arrowdown":
          e.preventDefault();
          handleDecreaseVolume();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    togglePlay,
    handleToggleMute,
    toggleFullScreen,
    toggleTheaterMode,
    handleIncreaseVolume,
    handleDecreaseVolume,
    videoRef,
  ]);
};

export default useVideoShortcuts;
