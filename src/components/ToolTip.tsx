import { cn } from "@sglara/cn";

import type { ToolTipProps } from "../types";

const ToolTip = ({ id, text, className }: ToolTipProps) => {
  return (
    <span
      id={id}
      role="tooltip"
      className={cn(
        "absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-[100] capitalize bg-black/70 text-white whitespace-nowrap p-2 rounded after:absolute after:-bottom-[18px] after:left-1/2 after:-translate-1/2 after:border-6 after:border-black/70 after:border-b-transparent after:border-l-transparent after:border-r-transparent after:w-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all",
        className
      )}
    >
      {text}
    </span>
  );
};

export default ToolTip;
