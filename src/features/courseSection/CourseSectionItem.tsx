import React from "react";
import Badge from "../../components/Badge";

import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineLock } from "react-icons/ai";

import type { Lesson } from "../../types";

const CourseSectionItem = React.memo(
  ({
    lesson,
    isOpen,
    duration,
    numOfQuestions,
  }: {
    lesson: Lesson;
    isOpen: boolean;
    duration?: string;
    numOfQuestions?: number;
  }) => {
    return (
      <div className="flex justify-between items-center gap-2 border-b border-primary-border py-5">
        <div className="flex gap-2 w-3/5">
          <IoDocumentTextOutline size={18} className="shrink-0" />
          <p className="text-secondary-text text-[15px]">{lesson.name}</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {numOfQuestions && (
            <Badge variant="secondary" text={`${numOfQuestions} questions`} />
          )}
          {duration && <Badge variant="primary" text={duration} />}
        </div>
        {!isOpen && <AiOutlineLock size={18} className="shrink-0" />}
      </div>
    );
  }
);

export default CourseSectionItem;
