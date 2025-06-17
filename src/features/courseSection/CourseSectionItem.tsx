import React from "react";
import { cn } from "@sglara/cn";
import { Link, useParams } from "react-router-dom";

import Badge from "../../components/Badge";

import { AiOutlineLock } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";

import type { CourseSectionItemProps } from "./CourseSections.types";

const CourseSectionItem = React.memo(
  ({ lesson, isOpen, duration, numOfQuestions }: CourseSectionItemProps) => {
    const { id } = useParams<{ id: string }>();

    return (
      <div className="flex justify-between items-center gap-2 border-b border-primary-border py-5">
        <Link
          to={`/courses/${id}/${lesson.id}`}
          className={cn("flex gap-2 w-3/5", !isOpen && "pointer-events-none")}
        >
          <IoDocumentTextOutline size={18} className="shrink-0" />
          <p className="text-secondary-text text-[15px]">{lesson.name}</p>
        </Link>

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
