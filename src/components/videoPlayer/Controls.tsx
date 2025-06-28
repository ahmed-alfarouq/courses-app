import { cn } from "@sglara/cn";

import SeekBar from "./SeekBar";
import ToggleButton from "./ToggleButton";
import ForwardButton from "./ForwardButton";
import VolumeControl from "./VolumeControl";
import BackwardButton from "./BackwardButton";
import DurationDisplay from "./DurationDisplay";
import FullScreenToggle from "./FullScreenToggle";
import TheaterModeButton from "./TheaterModeButton";

import useVideoControls from "../../hooks/useVideoControls";

import { useMobileContext } from "../../context/MobileContext";

import type { ControlsProps } from "./VideoPlayer.types";
import SettingsMenu from "./SettingsMenu";

const Controls = ({
  videoRef,
  tracks,
  setSelectedTrack,
  defaultTrackLang,
  isAutoPlay,
  isMuted,
  hasPlayed,
  isPaused,
  isVisible,
  duration,
  currentTime,
  forwardSeconds,
  backwardSeconds,
  togglePlay,
  toggleFullScreen,
  toggleTheaterMode,
}: ControlsProps) => {
  const { isMobile } = useMobileContext();
  const {
    volume,
    handleVolumeChange,
    handleToggleMute,
    handleSeek,
    handleSeekBackward,
    handleSeekForward,
  } = useVideoControls({
    videoRef,
    isAutoPlay,
    isMuted,
    duration,
    togglePlay,
    toggleFullScreen,
    toggleTheaterMode,
  });

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-[60] bg-black/70 flex justify-between items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 transition-all duration-300",
        !hasPlayed && "hidden",
        isVisible ? "opacity-100 h-11" : "opacity-0 h-0 pointer-events-none"
      )}
    >
      <div className="flex items-center sm:gap-3">
        <BackwardButton
          seconds={backwardSeconds}
          onSeekBackward={handleSeekBackward}
          className="p-2"
          ariaLabel="Go 5 seconds back"
        />

        <ToggleButton isPaused={isPaused} toggle={togglePlay} />
        <ForwardButton
          seconds={forwardSeconds}
          onSeekForward={handleSeekForward}
          className="p-2"
          ariaLabel="Skip forward 15 seconds"
        />
        <VolumeControl
          volume={volume}
          onChange={handleVolumeChange}
          toggleMute={handleToggleMute}
        />
      </div>
      <SeekBar
        duration={duration}
        currentTime={currentTime}
        onSeek={handleSeek}
      />
      <div className="flex items-center gap-5">
        <DurationDisplay duration={duration} currentTime={currentTime} />
        <SettingsMenu
          videoRef={videoRef}
          tracks={tracks}
          setSelectedTrack={setSelectedTrack}
          defaultTrackLang={defaultTrackLang}
        />
        {!isMobile && toggleTheaterMode && (
          <TheaterModeButton toggle={toggleTheaterMode} />
        )}
        <FullScreenToggle toggle={toggleFullScreen} />
      </div>
    </div>
  );
};

export default Controls;
