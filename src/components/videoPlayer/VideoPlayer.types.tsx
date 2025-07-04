export type Tab = "speed" | "captions";

export interface Track {
  src: string;
  srclang: string;
  label: string;
  default?: boolean;
}

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  tracks?: Track[];
  isSticky?: boolean;
  isAutoPlay?: boolean;
  isMuted?: boolean;
  controlsAutoHideDelay?: number;
  forwardSeconds?: number;
  backwardSeconds?: number;
  className?: string;
  onVideoEnd?: () => void;
  onTheaterModeToggle?: () => void;
}

export interface CaptionOverlayProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  track?: Track | null;
}

export interface ControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  tracks?: Track[];
  setSelectedTrack: (t: string) => void;
  defaultTrackLang?: string;
  isAutoPlay?: boolean;
  isMuted?: boolean;
  hasPlayed: boolean;
  isPaused: boolean;
  isVisible: boolean;
  currentTime: number;
  duration: number;
  forwardSeconds?: number;
  backwardSeconds?: number;
  togglePlay: () => void;
  toggleFullScreen: () => void;
  toggleTheaterMode?: () => void;
}

export interface PlayPauseOverlayProps {
  togglePlay: () => void;
  toggleFullScreen: () => void;
  isPaused: boolean;
}

export interface PlayButtonOverlayProps {
  play: () => void;
}

export interface ToggleButtonProps {
  isPaused: boolean;
  toggle: () => void;
}

export interface ForwardButtonProps {
  seconds?: number;
  onSeekForward: (seconds: number) => void;
  className?: string;
  ariaLabel?: string;
}

export interface BackwardButtonProps {
  seconds?: number;
  onSeekBackward: (seconds: number) => void;
  className?: string;
  ariaLabel?: string;
}

export interface VolumeControlProps {
  volume: number; // From 0 to 100
  onChange: (percent: number) => void;
  toggleMute: () => void;
}

export interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface DurationDisplayProps {
  currentTime: number;
  duration: number;
}

export interface VideoProgressBarProps {
  currentValue: number; // from 0 to 100
  direction?: "vertical" | "horizontal";
  barClassName?: string;
  innerBarClassName?: string;
  indicatorClassName?: string;
  onChange: (percent: number) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface FullScreenButtonProps {
  toggle: () => void;
}

export interface TheaterModeButtonProps {
  toggle: () => void;
}

export interface ErrorMessageProps {
  message: string;
  className?: string;
}

export interface Settings {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  tracks?: Track[];
  setSelectedTrack: (t: string) => void;
  defaultTrackLang?: string;
}

export interface TabSelectorProps {
  tabs: Tab[];
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export interface MenuListProps<T> {
  items: T[];
  activeItem: T;
  onSelect: (item: T) => void;
  renderItem?: (item: T) => React.ReactNode;
  formatLabel?: (item: T) => string;
}

export interface MenuItemProps {
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

// Hooks
export interface useVideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isAutoPlay?: boolean;
  isMuted?: boolean;
  duration: number;
  togglePlay: () => void;
  toggleFullScreen: () => void;
  toggleTheaterMode?: () => void;
}

export interface useVideoShortcutsProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  togglePlay: () => void;
  toggleFullScreen: () => void;
  toggleTheaterMode?: () => void;
  handleToggleMute: () => void;
  handleIncreaseVolume: () => void;
  handleDecreaseVolume: () => void;
}
