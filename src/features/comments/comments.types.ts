import type { CourseComment } from "../../types";

export interface CommentsSectionProps {
  comments: CourseComment[];
  courseId: number;
  lessonId: number;
}

export interface CommentProps {
  avatar: string;
  name: string;
  date: string;
  comment: string;
}

export interface CommentsProps {
  comments: CourseComment[];
  courseId: number;
  lessonId: number;
}

export interface CommentFormProps {
  courseId: number;
  lessonId: number;
}
