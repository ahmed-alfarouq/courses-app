import React from "react";
import ProgressBar from "./ProgressBar";

import type { SeekBarProps } from "../../types";

const SeekBar = React.memo(
  ({ duration, currentTime, onSeek }: SeekBarProps) => {
    const currentValue = (currentTime / duration) * 100;
    return <ProgressBar currentValue={currentValue} onChange={onSeek} />;
  }
);

export default SeekBar;
