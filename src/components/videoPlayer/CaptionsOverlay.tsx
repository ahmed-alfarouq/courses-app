import { useEffect, useState } from "react";
import { parseVTT } from "../../lib/utils/parseVTT";

import type { CaptionOverlayProps } from "./VideoPlayer.types";
import type { Caption } from "src/lib/utils/parseVTT";

const CaptionsOverlay = ({ videoRef, track }: CaptionOverlayProps) => {
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
      className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 text-white text-lg font-semibold rounded max-w-[90%] text-center z-[70] pointer-events-none"
    >
      {currentCaption}
    </div>
  );
};

export default CaptionsOverlay;
