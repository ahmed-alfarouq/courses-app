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
}

export interface CourseSectionsProps {
  course: Course;
  studentProgress: StudentProgressProps;
  className?: string;
}
