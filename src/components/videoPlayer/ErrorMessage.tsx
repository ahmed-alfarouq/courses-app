import { cn } from "@sglara/cn";

import { TiWarning } from "react-icons/ti";

import type { ErrorMessageProps } from "./VideoPlayer.types";

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  const refreshPage = () => window.location.reload();

  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-center items-center gap-3 p-4 bg-red-50/70 text-red-700 rounded-md z-50",
        className
      )}
    >
      <TiWarning className="size-10 text-red-600" />
      <span className="text-lg font-medium">{message}</span>
      <button
        type="button"
        onClick={refreshPage}
        className="bg-primary text-white text-base font-medium px-6 py-1 rounded hover:cursor-pointer"
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorMessage;
