import React from "react";

import type { DurationDisplayProps } from "./VideoPlayer.types";

const DurationDisplay = React.memo(
  ({ currentTime, duration }: DurationDisplayProps) => {
    const formatTime = (time: number) => {
      const totalSeconds = Math.floor(time);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const hh = hours.toString().padStart(2, "0");
      const mm = minutes.toString().padStart(2, "0");
      const ss = seconds.toString().padStart(2, "0");

      return hours > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
    };

    return (
      <span className="text-white text-base md:text-lg font-light leading-0">
        {formatTime(duration - currentTime)}
      </span>
    );
  }
);

export default DurationDisplay;
