import { useCallback, useEffect, useState } from "react";
import type { useVideoControlsProps } from "../components/videoPlayer/VideoPlayer.types";
import useVideoShortcuts from "./useVideoShortcuts";

const useVideoControls = ({
  videoRef,
  isAutoPlay,
  isMuted,
  duration,
  togglePlay,
  toggleFullScreen,
  toggleTheaterMode,
}: useVideoControlsProps) => {
  const [volume, setVolume] = useState(100);

  const unmute = useCallback(() => {
    const video = videoRef.current;
    if (video?.muted) video.muted = false;
  }, [videoRef]);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    unmute();
    const isMutedVolume = video.volume === 0;

    video.volume = isMutedVolume ? 1 : 0;
    setVolume(video.volume * 100);
  }, [unmute, videoRef]);

  const handleVolumeChange = useCallback(
    (percent: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(percent)) return;

      unmute();
      video.volume = percent / 100;
      setVolume(percent);
    },
    [unmute, videoRef]
  );

  const handleSeek = useCallback(
    (percent: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(percent)) return;

      const newTime = (percent / 100) * duration;
      video.currentTime = newTime;
    },
    [videoRef, duration]
  );

  const handleSeekBackward = useCallback(
    (seconds: number) => {
      const video = videoRef.current;
      if (video) video.currentTime -= seconds;
    },
    [videoRef]
  );

  const handleSeekForward = useCallback(
    (seconds: number) => {
      const video = videoRef.current;
      if (video) video.currentTime += seconds;
    },
    [videoRef]
  );

  const handleIncreaseVolume = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.muted) return;

    video.volume = Math.min(video.volume + 0.2, 1);
    setVolume(video.volume * 100);
  }, [videoRef]);

  const handleDecreaseVolume = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.muted) return;

    video.volume = Math.max(video.volume - 0.2, 0);
    setVolume(video.volume * 100);
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isAutoPlay && isMuted) video.volume = 0;
    setVolume(video.volume * 100);
  }, [isAutoPlay, isMuted, videoRef]);

  useVideoShortcuts({
    videoRef,
    togglePlay,
    toggleFullScreen,
    toggleTheaterMode,
    handleToggleMute,
    handleIncreaseVolume,
    handleDecreaseVolume,
  });

  return {
    volume,
    handleVolumeChange,
    handleToggleMute,
    handleSeek,
    handleSeekBackward,
    handleSeekForward,
  };
};

export default useVideoControls;
