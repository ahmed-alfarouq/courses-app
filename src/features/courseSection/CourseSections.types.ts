import type {
  Course,
  CourseSectionProps,
  Lesson,
  StudentProgressProps,
} from "../../types";

export interface CourseSectionItemProps {
  lesson: Lesson;
  isOpen: boolean;
  duration?: string;
  numOfQuestions?: number;
}

export interface CourseSectionComponentProps {
  section: CourseSectionProps;
  studentProgress: StudentProgressProps;
  activeSectionId?: number;
}

export interface CourseSectionsProps {
  course: Course;
  activeSectionId?: number;
  studentProgress: StudentProgressProps;
  className?: string;
}
