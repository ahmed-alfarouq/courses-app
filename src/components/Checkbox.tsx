import { cn } from "@sglara/cn";
import { useState } from "react";

import type { CheckboxProps } from "../types";

const Checkbox = ({ label, id, name }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={cn(
        "flex items-center gap-3 min-h-16 px-3 rounded cursor-pointer shadow shadow-[#5d7bff3a] hover:bg-[#5d7aff] group",
        checked && "bg-[#5d7aff]"
      )}
    >
      <div
        className={cn(
          "relative after:absolute after:right-0 after:top-0 after:bottom-0 after:w-0.25 after:bg-gray group-hover:after:bg-white pr-5",
          checked && "after:bg-white"
        )}
      >
        <div
          className={cn(
            "w-5 h-5 border-1 rounded-sm flex items-center justify-center transition-all",
            checked ? "bg-[#5d7aff] border-white" : "bg-white border-[#5d7aff]"
          )}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="hidden"
      />
      <span
        className={cn(
          "text-lg font-semibold group-hover:text-white",
          checked && "text-white"
        )}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
