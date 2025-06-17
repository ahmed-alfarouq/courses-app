import { cn } from "@sglara/cn";

import { HiCheckCircle } from "react-icons/hi";
import { PiSealWarningFill } from "react-icons/pi";

import type { AlertProps } from "../types";

const alert = {
  icon: {
    success: <HiCheckCircle color="#007e26" size={30} />,
    warning: <PiSealWarningFill color="#ab000e" size={25} />,
  },
  style: {
    success: "bg-[#e7ffec] text-[#007e26]",
    warning: "bg-[#ffe5e9] text-[#ab000e]",
  },
};

const Alert = ({ type, message, className }: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn(
        "py-6 px-4 rounded-md flex items-center gap-3 text-base",
        alert.style[type],
        className
      )}
    >
      {alert.icon[type]}

      <div className="flex flex-col justify-center leading-snug">
        <span className="text-xl font-semibold capitalize">{type}!</span>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
