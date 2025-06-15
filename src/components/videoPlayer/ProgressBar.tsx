import { useCallback, useEffect, useRef } from "react";

import { cn } from "@sglara/cn";

import type { VideoProgressBarProps } from "../../types";

const INDICATOR_PADDING = "8px";

const ProgressBar = ({
  currentValue,
  direction = "horizontal",
  barClassName,
  innerBarClassName,
  indicatorClassName,
  onChange,
  onKeyDown,
}: VideoProgressBarProps) => {
  const mouseDownRef = useRef(false);
  const barRef = useRef<HTMLDivElement>(null);
  const innerBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const setBarPosition = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const clientX =
        e instanceof TouchEvent ? e.changedTouches[0].clientX : e.clientX;
      const clientY =
        e instanceof TouchEvent ? e.changedTouches[0].clientY : e.clientY;

      if (innerBarRef.current && barRef.current && indicatorRef.current) {
        const barRect = barRef.current.getBoundingClientRect();
        const offsetX = clientX - barRect.left;
        const offsetY = -clientY + barRect.bottom;

        const percent =
          direction === "horizontal"
            ? Math.min(Math.max((offsetX / barRect.width) * 100, 0), 100)
            : Math.min(Math.max((offsetY / barRect.height) * 100, 0), 100);
        innerBarRef.current.style.width = `${percent}%`;
        if (direction === "horizontal") {
          indicatorRef.current.style.left = `calc(${percent}% - ${INDICATOR_PADDING})`;
        } else {
          indicatorRef.current.style.bottom = `calc(${percent}% - ${INDICATOR_PADDING})`;
        }
        onChange(percent);
      }
    },
    [onChange]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseDownRef.current = true;
    setBarPosition(e.nativeEvent);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    mouseDownRef.current = true;
    setBarPosition(e.nativeEvent);
  };

  const handleMouseUp = useCallback(() => {
    if (!mouseDownRef.current) return;
    mouseDownRef.current = false;
    if (innerBarRef.current && barRef.current) {
      const width = parseFloat(innerBarRef.current.style.width);
      onChange(width);
    }
  }, [onChange]);

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!mouseDownRef.current) return;
      setBarPosition(e);
    },
    [setBarPosition]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className={cn(
        "relative h-2 w-full rounded bg-gray/80 cursor-pointer",
        barClassName
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onKeyDown={handleKeyDown}
      ref={barRef}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(currentValue)}
      aria-label="Progress"
      tabIndex={0}
    >
      <div
        className={cn("h-full w-0 bg-[#6ABD8A] rounded", innerBarClassName)}
        style={{ width: `${currentValue}%` }}
        ref={innerBarRef}
      ></div>
      <span
        className={cn(
          "absolute top-1/2 -translate-y-1/2 size-[14px] bg-[#6ABD8A] border-gray rounded-full",
          indicatorClassName
        )}
        style={{ left: `calc(${currentValue}% - ${INDICATOR_PADDING})` }}
        ref={indicatorRef}
      ></span>
    </div>
  );
};

export default ProgressBar;
