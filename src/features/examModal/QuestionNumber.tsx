import React from "react";
import { cn } from "@sglara/cn";

import type { QuestionNumberProps } from "./examModal.types";

const QuestionNumber = React.memo(
  ({ number, isActive }: QuestionNumberProps) => {
    return (
      <button
        type="button"
        className={cn(
          "size-13 border-1 border-white rounded-full text-xl hover:bg-white hover:text-[#5a77fd] transition-all cursor-pointer",
          isActive && "bg-white text-[#5a77fd]"
        )}
      >
        {number}
      </button>
    );
  }
);

export default QuestionNumber;
