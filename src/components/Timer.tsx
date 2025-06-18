import { cn } from "@sglara/cn";
import { useCallback, useEffect, useState } from "react";

import { LuAlarmClock } from "react-icons/lu";

import type { TimerProps } from "../types";

const Timer = ({ duration, start, onEnd, className }: TimerProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(duration * 60);

  const resetTimer = useCallback(() => {
    setRemainingSeconds(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onEnd();
      resetTimer();
      return;
    }

    if (!start) {
      resetTimer();
    }

    if (start) {
      const interval = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingSeconds, onEnd, start, resetTimer]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime =
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "flex justify-center items-center gap-2 py-1 px-3 text-xl bg-[#fad400] shadow-sm shadow-[#fad400] rounded min-w-32 max-w-fit",
        className
      )}
    >
      <LuAlarmClock size={20} />
      <span className="block pt-1">{formattedTime}</span>
    </div>
  );
};

export default Timer;
