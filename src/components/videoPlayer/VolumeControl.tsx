import React from "react";
import ProgressBar from "./ProgressBar";

import { FaVolumeUp, FaVolumeDown, FaVolumeOff } from "react-icons/fa";

import type { VolumeControlProps } from "../../types";

const VolumeControl = React.memo(
  ({ value, toggleMute, onChange }: VolumeControlProps) => {
    return (
      <div className="relative flex items-center text-white">
        <button
          type="button"
          className="relative w-5 flex text-white size-full peer cursor-pointer"
          onClick={toggleMute}
        >
          {value > 50 ? (
            <FaVolumeUp />
          ) : value < 50 && value !== 0 ? (
            <FaVolumeDown className="pr-1" />
          ) : (
            <FaVolumeOff className="pr-2" />
          )}
        </button>
        <div className="absolute -top-20 -left-10 flex justify-center items-center w-24 h-11 bg-black/70 p-3 rounded -rotate-90 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100 transition-all">
          <ProgressBar
            currentValue={value}
            onChange={onChange}
            direction="vertical"
          />
        </div>
      </div>
    );
  }
);

export default VolumeControl;
