import type { Course } from "../../types";

export interface LeaderboardHeaderProps {
  course: Course;
}

export interface LeaderboardModalProps {
  isOpen: boolean;
  close: () => void;
  course: Course;
}

export interface MotivationalWordProps {
  word: string;
  icon: React.ReactNode;
}
