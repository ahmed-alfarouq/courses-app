import React from "react";
import { FaForward } from "react-icons/fa";

import type { ForwardButtonProps } from "./VideoPlayer.types";

const ForwardButton = React.memo(
  ({
    seconds = 10,
    onSeekForward,
    className = "",
    ariaLabel = `Seek forward ${seconds} seconds`,
  }: ForwardButtonProps) => {
    const handleClick = () => onSeekForward(seconds);

    return (
      <button
        type="button"
        onClick={handleClick}
        className={`flex items-center justify-center text-white text-base md:text-xl hover:text-rose-600 transition-colors cursor-pointer focus:outline-none ${className}`}
        aria-label={ariaLabel}
      >
        <FaForward />
      </button>
    );
  }
);

export default ForwardButton;
