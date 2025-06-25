import React from "react";

import { LuRectangleHorizontal } from "react-icons/lu";

import type { TheaterModeButtonProps } from "./VideoPlayer.types";

const TheaterModeButton = React.memo(
  ({ toggle }: TheaterModeButtonProps) => {
    return (
      <button
        type="button"
        className="text-white text-base md:text-xl cursor-pointer"
        onClick={toggle}
      >
        <LuRectangleHorizontal />
      </button>
    );
  }
);

export default TheaterModeButton;
