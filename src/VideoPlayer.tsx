import { useCallback, useRef, useState } from "react";
import { cn } from "@sglara/cn";

import Controls from "./components/videoPlayer/Controls";
import ErrorMessage from "./components/videoPlayer/ErrorMessage";
import PlayPauseOverlay from "./components/videoPlayer/PlayPauseOverlay";
import PlayButtonOverlay from "./components/videoPlayer/PlayButtonOverlay";
import BufferingIndicator from "./components/videoPlayer/BufferingIndicator";

import useStickyOnMobile from "./hooks/useStickyOnMobile";
import useAutoHideControls from "./hooks/useAutoHideControls";

import { useMobileContext } from "./context/MobileContext";

import type { VideoPlayerProps } from "./components/videoPlayer/VideoPlayer.types";

const VideoPlayer = ({
  src,
  poster,
  isSticky,
  isAutoPlay,
  isMuted,
  controlsAutoHideDelay = 2500,
  forwardSeconds = 10,
  backwardSeconds = 10,
  className,
  onVideoEnd,
  onTheaterModeToggle,
}: VideoPlayerProps) => {
  const { isMobile } = useMobileContext();

  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isStickyActive = useStickyOnMobile({
    enabled: isSticky === true,
    containerRef,
    isMobile,
  });

  const controlsVisible = useAutoHideControls({
    containerRef,
    delayMs: controlsAutoHideDelay,
  });

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  }, []);

  const handleCanPlay = useCallback(() => {
    setCanPlay(true);
    setIsBuffering(false);
  }, []);

  const handlePause = useCallback(() => setIsPaused(true), []);

  const handlePlay = useCallback(() => {
    setHasPlayed(true);
    setIsPaused(false);
  }, []);

  const handleWaiting = useCallback(() => {
    setIsBuffering(true);
  }, []);

  const handleSeeking = useCallback(() => {
    if (!isPaused) setIsBuffering(true);
  }, [isPaused]);

  const handleSeeked = useCallback(() => setIsBuffering(false), []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  }, []);

  const handleError = useCallback(
    () => setErrorMessage("Failed to load the video. Please try again later."),
    []
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const isAtEnd = currentTime === duration && duration !== 0;

    if (video.paused) {
      if (isAtEnd) {
        video.currentTime = 0;
        setCurrentTime(0);
      }
      video.play();
    } else {
      video.pause();
    }
  }, [duration]);

  const toggleFullScreen = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      await container.requestFullscreen();
      if (
        screen.orientation &&
        "lock" in screen.orientation &&
        typeof screen.orientation.lock === "function"
      ) {
        try {
          await screen.orientation.lock("landscape");
        } catch (err) {
          console.warn(err);
        }
      }
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div
      className={cn(
        "relative w-full max-h-[85vh] bg-black rounded-md transition-all duration-300",
        isStickyActive && "fixed top-0 left-0 right-0 rounded-none z-[60]",
        className
      )}
      ref={containerRef}
    >
      {!hasPlayed && canPlay && <PlayButtonOverlay play={togglePlay} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {hasPlayed && (isBuffering || !canPlay) && <BufferingIndicator />}

      <PlayPauseOverlay
        togglePlay={togglePlay}
        toggleFullScreen={toggleFullScreen}
        isPaused={isPaused}
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        {...(isMuted ? { muted: true } : {})}
        {...(isAutoPlay ? { autoPlay: true } : {})}
        className="w-full"
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onPlay={handlePlay}
        onPause={handlePause}
        onWaiting={handleWaiting}
        onSeeking={handleSeeking}
        onSeeked={handleSeeked}
        onError={handleError}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onVideoEnd}
      >
        Your browser does not support the video tag.
      </video>
      {canPlay && (
        <Controls
          videoRef={videoRef}
          isAutoPlay={isAutoPlay}
          isMuted={isMuted}
          hasPlayed={hasPlayed}
          isPaused={isPaused}
          isVisible={controlsVisible}
          currentTime={currentTime}
          duration={duration}
          backwardSeconds={backwardSeconds}
          forwardSeconds={forwardSeconds}
          togglePlay={togglePlay}
          toggleFullScreen={toggleFullScreen}
          toggleTheaterMode={onTheaterModeToggle}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
