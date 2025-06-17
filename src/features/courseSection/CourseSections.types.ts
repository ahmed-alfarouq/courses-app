import type { Course, Lesson } from "../../types";

export interface CourseSectionItemProps {
  lesson: Lesson;
  isOpen: boolean;
  duration?: string;
  numOfQuestions?: number;
}

export interface CourseSectionsProps {
  course: Course;
  className?: string;
}
