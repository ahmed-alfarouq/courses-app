import { cn } from "@sglara/cn";

import { TiWarning } from "react-icons/ti";

const ErrorOverlay = ({ message }: { message: string }) => {
  const refreshPage = () => window.location.reload();
  return (
    <section
      className={cn(
        "absolute inset-0 bg-black/80 px-4 hidden",
        message.length && "block"
      )}
    >
      <div className="h-full flex flex-col justify-center items-center gap-5">
        <TiWarning className="size-28 md:size-36 text-red-700" />
        <p className="text-4xl leading-12 text-white font-medium text-center">
          {message}
        </p>
        <button
          type="button"
          onClick={refreshPage}
          className="bg-white text-2xl font-medium px-8 py-2 rounded hover:bg-white/80 hover:cursor-pointer"
        >
          Refresh
        </button>
      </div>
    </section>
  );
};

export default ErrorOverlay;
