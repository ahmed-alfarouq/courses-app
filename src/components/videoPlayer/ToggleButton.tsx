import React from "react";

import { FaPlay } from "react-icons/fa6";
import { IoMdPause } from "react-icons/io";

import type { ToggleButtonProps } from "./VideoPlayer.types";

const ToggleButton = React.memo(({ isPaused, toggle }: ToggleButtonProps) => {
  return (
    <button
      onClick={toggle}
      className="text-white text-base md:text-xl p-2 hover:text-rose-600 transition-colors cursor-pointer"
    >
      {!isPaused ? <IoMdPause /> : <FaPlay />}
    </button>
  );
});

export default ToggleButton;
