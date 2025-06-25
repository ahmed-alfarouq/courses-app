import React from "react";

import { FaPlay } from "react-icons/fa";

import type { PlayButtonOverlayProps } from "./VideoPlayer.types";

const PlayButtonOverlay = React.memo(({ play }: PlayButtonOverlayProps) => {
  return (
    <button
      type="button"
      className="absolute inset-0 flex justify-center items-center bg-black/70 z-50 cursor-pointer"
      onClick={play}
      aria-label="Play video"
    >
      <span className="block bg-rose-600 rounded-full p-4 md:p-7">
        <FaPlay className="size-4 md:size-7 text-[#E5E7EB] text-center" />
      </span>
    </button>
  );
});

export default PlayButtonOverlay;
