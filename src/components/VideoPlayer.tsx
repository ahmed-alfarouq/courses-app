import { useCallback, useRef, useState } from "react";

import VideoBar from "./videoPlayer/VideoBar";
import PlayButton from "./videoPlayer/PlayButton";
import ErrorHandler from "./videoPlayer/ErrorHandler";
import BufferingLoader from "./videoPlayer/BufferingLoader";

const VideoPlayer = ({
  url,
  onVideoEnd,
}: {
  url: string;
  onVideoEnd?: () => void;
}) => {
  const [videoPlayed, setVideoPlayed] = useState<boolean>(false);
  const [videoPaused, setVideoPaused] = useState<boolean>(false);
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
      console.log(video.currentTime);
      if (video.paused) {
        console.log("paused");
        if (currentTime === duration && currentTime !== 0) {
          video.currentTime = 0;
          setCurrentTime(0);
        }
        video.play();
      } else {
        video.pause();
      }
    }
  }, []);

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

  const handleToggleFullScreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div className="relative rounded-md overflow-hidden" ref={containerRef}>
      {error && <ErrorHandler message={error} />}
      {(isWaiting || !canPlay) && <BufferingLoader />}
      <button
        type="button"
        className="absolute inset-0"
        onClick={handleToggleVideo}
        onDoubleClick={handleToggleFullScreen}
        aria-hidden="true"
        tabIndex={-1}
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
      />
    </div>
  );
};

export default VideoPlayer;
