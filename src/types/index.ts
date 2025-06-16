type LessonType = "video" | "exam" | "pdf";

export interface CourseComment {
  id: number;
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnswerOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: number;
  question: string;
  type: "multiple-choice";
  options: AnswerOption[];
  correctOptionId: string;
}

export interface Lesson {
  id: number;
  name: string;
  type?: LessonType;
  description: string;
  url?: string;
  duration?: string;
  exam?: ExamQuestion[];
  comments: CourseComment[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseSectionProps {
  id: number;
  title: string;
  period: string;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  name: string;
  description: string;
  instructor: string;
  duration: string;
  language: string;
  isFree: boolean;
  price: number;
  enrolled_students: number;
  has_certification: boolean;
  image: string;
  sections: CourseSectionProps[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentProgressProps {
  completedLessons: number[];
  unlockedLessons: number[];
}

// Components
export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export interface VideoBarProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  played: boolean;
  paused: boolean;
  toggleVideo: () => void;
  currentTime: number;
  duration: number;
  toggleFullScreen: () => void;
  toggleWideScreen?: () => void;
}
export interface VolumeControlProps {
  value: number;
  toggleMute: () => void;
  onChange: (percent: number) => void;
}

export interface VideoProgressBarProps {
  currentValue: number;
  direction?: "vertical" | "horizontal";
  barClassName?: string;
  innerBarClassName?: string;
  indicatorClassName?: string;
  onChange: (percent: number) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export interface ToolTipProps {
  id: string;
  text: string;
  className?: string;
}

export interface JumpIconLinkProps {
  toolTipId?: string;
  to: string;
  icon: React.ReactNode;
  ariaLabel: string;
  className?: string;
}

export interface IconButtonProps {
  toolTipId?: string;
  icon: React.ReactNode;
  ariaLabel: string;
  onClick?: () => void;
  className?: string;
}

export interface ModalProps {
  children: React.ReactNode;
  isOpened: boolean;
  close: () => void;
}

export interface PDFSectionProps {
  title: string;
  description: string;
  url: string;
  startNextLesson?: () => void;
}
