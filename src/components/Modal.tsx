import { cn } from "@sglara/cn";

import { CgClose } from "react-icons/cg";

import type { ModalProps } from "../types";

const Modal = ({ children, isOpened, close, className }: ModalProps) => {
  return (
    <section
      role="dialog"
      className={cn(
        "fixed inset-0 p-6 flex justify-center items-center transition-all z-[100]",
        isOpened
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      )}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70"
        aria-label="close modal backdrop"
        onClick={close}
      ></button>

      <div
        className={cn(
          "relative bg-white rounded px-3 pt-12 pb-2 h-[calc(100vh-5%)] w-full md:w-1/2 z-[120]",
          className
        )}
      >
        <button
          type="button"
          aria-label="close modal"
          className="absolute top-4 right-4 cursor-pointer"
          onClick={close}
        >
          <CgClose size={20} />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
