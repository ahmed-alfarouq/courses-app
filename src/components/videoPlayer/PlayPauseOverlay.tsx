import React from "react";

import type { PlayPauseOverlayProps } from "./VideoPlayer.types";

const PlayPauseOverlay = React.memo(
  ({ togglePlay, toggleFullScreen, isPaused }: PlayPauseOverlayProps) => {
    return (
      <button
        type="button"
        className="absolute inset-0 z-40 cursor-pointer"
        onClick={togglePlay}
        onDoubleClick={toggleFullScreen}
        aria-label={`${isPaused ? "Play Video" : "Pause video"}`}
      ></button>
    );
  }
);

export default PlayPauseOverlay;
