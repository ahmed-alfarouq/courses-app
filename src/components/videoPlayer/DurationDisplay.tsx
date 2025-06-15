import React from "react";

const DurationDisplay = React.memo(
  ({ currentTime, duration }: { currentTime: number; duration: number }) => {
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const seconds = Math.ceil(time % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
    return (
      <span className="text-white text-sm font-light leading-0">
        {formatTime(duration - currentTime)}
      </span>
    );
  }
);

export default DurationDisplay;
