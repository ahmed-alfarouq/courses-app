import React from "react";

import { LuRectangleHorizontal } from "react-icons/lu";

const WideScreenToggle = React.memo(
  ({ toggleWideScreen }: { toggleWideScreen: () => void }) => {
    return (
      <button
        type="button"
        className="text-white cursor-pointer"
        onClick={toggleWideScreen}
      >
        <LuRectangleHorizontal size={16} />
      </button>
    );
  }
);

export default WideScreenToggle;
