import { cn } from "@sglara/cn";

import type { IconButtonProps } from "../types";
import ToolTip from "./ToolTip";
import React from "react";

const IconButton = React.memo(
  ({ toolTipId, icon, ariaLabel, className, onClick }: IconButtonProps) => {
    return (
      <button
        type="button"
        className={cn(
          "relative border border-gray/50 rounded-full p-3 text-gray cursor-pointer group",
          className
        )}
        aria-describedby={toolTipId || ""}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {toolTipId && <ToolTip id={toolTipId} text={ariaLabel} />}
        {icon}
      </button>
    );
  }
);

export default IconButton;
