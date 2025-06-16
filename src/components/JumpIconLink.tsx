import { cn } from "@sglara/cn";

import ToolTip from "./ToolTip";

import type { JumpIconLinkProps } from "../types";

const JumpIconLink = ({
  toolTipId,
  to,
  icon,
  ariaLabel,
  className,
}: JumpIconLinkProps) => {
  return (
    <a
      href={to}
      className={cn(
        "relative border border-gray/50 rounded-full p-3 text-gray cursor-pointer group",
        className
      )}
      aria-describedby={toolTipId || ""}
      aria-label={ariaLabel}
    >
      {toolTipId && <ToolTip id={toolTipId} text={ariaLabel} />}
      {icon}
    </a>
  );
};

export default JumpIconLink;
