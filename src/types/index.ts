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
  lessons: Lesson[];
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
