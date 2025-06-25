import React from "react";
import { FaBackward } from "react-icons/fa";

import type { BackwardButtonProps } from "./VideoPlayer.types";

const BackwardButton = React.memo(
  ({
    seconds = 10,
    onSeekBackward,
    className = "",
    ariaLabel = `Seek backward ${seconds} seconds`,
  }: BackwardButtonProps) => {
    const handleClick = () => onSeekBackward(seconds);

    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center text-white text-base md:text-xl hover:text-rose-600 transition-colors cursor-pointer focus:outline-none ${className}`}
        aria-label={ariaLabel}
      >
        <FaBackward />
      </button>
    );
  }
);

export default BackwardButton;
