import { useCallback, useEffect, useState } from "react";
import { cn } from "@sglara/cn";

import SeekBar from "./SeekBar";
import ToggleButton from "./ToggleButton";
import VolumeControl from "./VolumeControl";
import DurationDisplay from "./DurationDisplay";
import FullScreenToggle from "./FullScreenToggle";
import WideScreenToggle from "./WideScreenToggle";

import type { VideoBarProps } from "../../types";

const VideoBar = ({
  videoRef,
  played,
  paused,
  toggleVideo,
  duration,
  currentTime,
  toggleFullScreen,
  toggleWideScreen,
}: VideoBarProps) => {
  const [volume, setVolume] = useState(100);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      if (video.volume > 0) {
        video.volume = 0;
        setVolume(0);
        return;
      }

      video.volume = 1;
      setVolume(100);
    }
  }, [videoRef]);

  const handleVolumeChange = useCallback(
    (percent: number) => {
      const video = videoRef.current;
      if (video) {
        if (Number.isFinite(percent)) {
          video.volume = percent / 100;
          setVolume(percent);
        }
      }
    },
    [videoRef]
  );

  const handleSeek = useCallback(
    (percent: number) => {
      const video = videoRef.current;
      if (video) {
        const newTime = (percent / 100) * duration;
        if (Number.isFinite(newTime)) {
          video.currentTime = newTime;
        }
      }
    },
    [videoRef, duration]
  );

  const handleIncreaseVolume = () => {
    const video = videoRef.current;
    if (video) {
      if (video.volume < 1) {
        video.volume = Math.min(video.volume + 0.2, 1);
        setVolume(video.volume * 100);
      }
    }
  };

  const handleDecreaseVolume = () => {
    const video = videoRef.current;
    if (video) {
      if (video.volume > 0) {
        video.volume = Math.max(video.volume - 0.2, 0);
        setVolume(video.volume * 100);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      setVolume(video.volume * 100);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!video) return;

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          toggleVideo();
          break;
        case "m":
          handleToggleMute();
          break;
        case "f":
          toggleFullScreen();
          break;
        case "arrowright":
          video.currentTime += 5;
          break;
        case "arrowleft":
          video.currentTime -= 5;
          break;
        case "arrowup":
          e.preventDefault();
          handleIncreaseVolume();
          break;
        case "arrowdown":
          e.preventDefault();
          handleDecreaseVolume();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [videoRef.current]);

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-[60] bg-black/70 flex items-center gap-3 px-2 py-2",
        !played && "hidden"
      )}
    >
      <ToggleButton paused={paused} toggle={toggleVideo} />
      <VolumeControl
        value={volume}
        onChange={handleVolumeChange}
        toggleMute={handleToggleMute}
      />
      <SeekBar
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
      />
      <DurationDisplay duration={duration} currentTime={currentTime} />
      {toggleWideScreen && (
        <WideScreenToggle toggleWideScreen={toggleWideScreen} />
      )}
      <FullScreenToggle toggle={toggleFullScreen} />
    </div>
  );
};

export default VideoBar;
