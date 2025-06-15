import React from "react";

import { FaPlay } from "react-icons/fa6";
import { IoMdPause } from "react-icons/io";

const ToggleButton = React.memo(
  ({ paused, toggle }: { paused: boolean; toggle: () => void }) => {
    return (
      <button onClick={toggle} className="text-white p-0 cursor-pointer">
        {!paused ? (
          <IoMdPause className="size-4" />
        ) : (
          <FaPlay className="size-4" />
        )}
      </button>
    );
  }
);

export default ToggleButton;
