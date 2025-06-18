import type { AnswerOption, ExamQuestion } from "../../types";

export interface ExamModalProps {
  isOpened: boolean;
  toggleModal: () => void;
  duration: number;
  exam: ExamQuestion[];
  started: boolean;
  onEnd: () => void;
}

export interface QuestionNumberProps {
  number: number;
  isActive: boolean;
}

export interface QuestionProps {
  question: string;
  answers: AnswerOption[];
  number: number;
}
