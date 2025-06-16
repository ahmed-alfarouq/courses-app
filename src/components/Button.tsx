import React from "react";

import { cn } from "@sglara/cn";

const Button = React.memo(
  ({
    type,
    text,
    onClick,
    className,
  }: {
    type: "button" | "submit";
    text: string;
    onClick?: () => void;
    className?: string;
  }) => {
    return (
      <button
        type={type}
        className={cn(
          "px-6 py-3 text-base md:text-lg rounded-md bg-primary text-white hover:bg-primary/80 transition cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
);

export default Button;
