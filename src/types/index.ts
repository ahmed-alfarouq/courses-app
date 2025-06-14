export interface Comment {
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
  options: AnswerOption[];
  correctOptionId: number;
}

export interface Exam {
  id: number;
  title: string;
  duration: string;
  passingScore: string;
  questions: ExamQuestion[];
}

export interface Lesson {
  id: number;
  name: string;
  description: string;
  url: string;
  comments: Comment[];
  exam?: Exam;
  createdAt: string;
  updatedAt: string;
}

export interface CourseSection {
  id: number;
  title: string;
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
  image: string;
  sections: CourseSection[];
  createdAt: string;
  updatedAt: string;
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
