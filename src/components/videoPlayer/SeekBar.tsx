import React from "react";

import ProgressBar from "./ProgressBar";

import type { SeekBarProps } from "./VideoPlayer.types";

const SeekBar = React.memo(
  ({ duration, currentTime, onSeek }: SeekBarProps) => {
    const currentValue = (currentTime / duration) * 100;
    return (
      <ProgressBar
        currentValue={currentValue}
        onChange={onSeek}
        barClassName="absolute -top-1.5 right-0 left-0 w-auto"
      />
    );
  }
);

export default SeekBar;
