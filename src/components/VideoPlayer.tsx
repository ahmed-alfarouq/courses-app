import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@sglara/cn";

import VideoBar from "./videoPlayer/VideoBar";
import PlayButton from "./videoPlayer/PlayButton";
import ErrorHandler from "./videoPlayer/ErrorHandler";
import BufferingLoader from "./videoPlayer/BufferingLoader";

import { useMobileContext } from "../context/MobileContext";

const VideoPlayer = ({
  url,
  className,
  onVideoEnd,
  onTheaterModeToggle,
}: {
  url: string;
  className?: string;
  onVideoEnd?: () => void;
  onTheaterModeToggle: () => void;
}) => {
  const { isMobile } = useMobileContext();

  const [videoPlayed, setVideoPlayed] = useState<boolean>(false);
  const [videoPaused, setVideoPaused] = useState<boolean>(false);
  const [stickedOnTop, setStickOnTop] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [canPlay, setCanPlay] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleVideo = useCallback(() => {
    const video = videoRef.current;

    if (video) {
      if (video.paused) {
        if (currentTime === duration && currentTime !== 0 && duration !== 0) {
          video.currentTime = 0;
          setCurrentTime(0);
        }
        video.play();
      } else {
        video.pause();
      }
    }
  }, [currentTime, duration]);

  const handleCanPlay = () => setCanPlay(true);

  const handleOnPlay = () => {
    setVideoPlayed(true);
    setVideoPaused(false);
  };

  const handleOnPause = () => setVideoPaused(true);

  const handleWaiting = () => {
    setIsWaiting(true);
  };

  const handleOnSeeking = () => {
    if (videoPaused) return;
    setIsWaiting(true);
  };

  const handleOnSeeked = () => {
    setIsWaiting(false);
  };

  const handleOnError = () =>
    setError("Failed to load the video. Please try again later.");

  const handleOnEnded = () => {
    if (onVideoEnd) {
      onVideoEnd();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleMetaData = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleToggleFullScreen = useCallback(async () => {
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

  const handleTheaterModeToggle = useCallback(() => {
    onTheaterModeToggle();
  }, [onTheaterModeToggle]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const offsetY = container.getBoundingClientRect().top;
      const scrollY = window.scrollY;

      if (offsetY <= 0 && !stickedOnTop) {
        setStickOnTop(true);
        return;
      }
      if (scrollY < 50 && stickedOnTop) {
        setStickOnTop(false);
        return;
      }
    }
  }, [stickedOnTop]);

  useEffect(() => {
    if (isMobile) {
      document.addEventListener("scroll", handleScroll);
      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll, isMobile]);

  return (
    <div
      className={cn(
        "relative w-full max-h-[85vh] rounded-md overflow-hidden transition-all duration-300",
        stickedOnTop && "fixed top-0 left-0 right-0 rounded-none z-[60]",
        className
      )}
      ref={containerRef}
    >
      {error && <ErrorHandler message={error} />}
      {(isWaiting || !canPlay) && <BufferingLoader />}
      <button
        type="button"
        className="absolute inset-0 z-40 cursor-pointer"
        onClick={handleToggleVideo}
        onDoubleClick={handleToggleFullScreen}
        aria-label={`${videoPaused ? "Play Video" : "Pause video"}`}
      ></button>
      <video
        src={url}
        className="w-full h-auto block"
        ref={videoRef}
        onCanPlay={handleCanPlay}
        onPlay={handleOnPlay}
        onPause={handleOnPause}
        onWaiting={handleWaiting}
        onSeeking={handleOnSeeking}
        onSeeked={handleOnSeeked}
        onError={handleOnError}
        onEnded={handleOnEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleMetaData}
      />
      {!videoPlayed && canPlay && (
        <PlayButton toggleVideo={handleToggleVideo} />
      )}

      <VideoBar
        videoRef={videoRef}
        played={videoPlayed}
        paused={videoPaused}
        toggleVideo={handleToggleVideo}
        currentTime={currentTime}
        duration={duration}
        toggleFullScreen={handleToggleFullScreen}
        toggleTheaterMode={handleTheaterModeToggle}
      />
    </div>
  );
};

export default VideoPlayer;
