import React, { useEffect, useState } from "react";
import { parseVTT } from "../../lib/utils/parseVTT";

import type { CaptionOverlayProps } from "./VideoPlayer.types";
import type { Caption } from "src/lib/utils/parseVTT";

const CaptionsOverlay = React.memo(({ videoRef, track }: CaptionOverlayProps) => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [currentCaption, setCurrentCaption] = useState("");

  useEffect(() => {
    if (!track) {
      setCaptions([]);
      return;
    }

    fetch(track.src)
      .then((res) => res.text())
      .then((vtt) => setCaptions(parseVTT(vtt)))
      .catch(() => setCaptions([]));
  }, [track]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = videoRef.current?.currentTime || 0;
      const active = captions.find(
        (c) => currentTime >= c.start && currentTime <= c.end
      );
      setCurrentCaption(active?.text || "");
    }, 200);

    return () => clearInterval(interval);
  }, [captions, videoRef]);

  if (!currentCaption) return null;

  return (
    <div
      dir={track?.srclang === "ar" ? "rtl" : "ltr"}
      className="absolute bottom-8 sm:bottom-15 left-1/2 -translate-x-1/2 sm:px-4 px-2 py-2 bg-black/70 text-white text-sm sm:text-lg font-semibold rounded w-11/12 sm:w-auto max-w-[95%] text-center z-[70] pointer-events-none"
    >
      {currentCaption}
    </div>
  );
});

export default CaptionsOverlay;
