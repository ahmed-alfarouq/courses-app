import React from "react";

import { LuRectangleHorizontal } from "react-icons/lu";

const TheaterModeButton = React.memo(
  ({ toggleTheaterMode }: { toggleTheaterMode: () => void }) => {
    return (
      <button
        type="button"
        className="text-white cursor-pointer"
        onClick={toggleTheaterMode}
      >
        <LuRectangleHorizontal size={16} />
      </button>
    );
  }
);

export default TheaterModeButton;
