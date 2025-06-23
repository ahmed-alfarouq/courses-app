import * as react_jsx_runtime from 'react/jsx-runtime';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    isSticky?: boolean;
    controlsAutoHideDelay?: number;
    forwardSeconds?: number;
    backwardSeconds?: number;
    className?: string;
    onVideoEnd?: () => void;
    onTheaterModeToggle?: () => void;
}

declare const VideoPlayer: ({ src, poster, isSticky, controlsAutoHideDelay, forwardSeconds, backwardSeconds, className, onVideoEnd, onTheaterModeToggle, }: VideoPlayerProps) => react_jsx_runtime.JSX.Element;

export { VideoPlayer as default };
