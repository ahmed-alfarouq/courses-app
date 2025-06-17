import { useState } from "react";
import { cn } from "@sglara/cn";

import CourseSectionItem from "./CourseSectionItem";

import { BsDash, BsPlus } from "react-icons/bs";

import { useMobileContext } from "../../context/MobileContext";

import type { CourseSectionComponentProps } from "./CourseSections.types";

const CourseSection = ({
  section,
  activeSectionId,
  studentProgress,
}: CourseSectionComponentProps) => {
  const { isMobile } = useMobileContext();

  const [isOpened, setIsOpened] = useState(
    !isMobile || section.id === activeSectionId
  );

  const handleToggleSection = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <section className="py-4 px-5 space-y-3 border border-primary-border">
      <header className="border-b border-primary-border pb-3 flex justify-between items-center">
        <div>
          {isMobile ? (
            <h3 className="text-semibold text-xl capitalize">
              {section.title}
            </h3>
          ) : (
            <h3 className="text-semibold text-xl capitalize">
              {section.period}
            </h3>
          )}

          <p className="text-secondary-text text-[15px]">
            {section.description}
          </p>
        </div>
        {isMobile && (
          <button
            type="button"
            className="cursor-pointer"
            onClick={handleToggleSection}
          >
            {isOpened ? <BsDash size={18} /> : <BsPlus size={18} />}
          </button>
        )}
      </header>
      <section
        className={cn(
          "space-y-2 overflow-hidden transition-all",
          isOpened ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        {section.lessons.map((lesson) => {
          const isOpen =
            !!studentProgress.completedLessons?.find((l) => l === lesson.id) ||
            false;
          return (
            <CourseSectionItem
              key={lesson.id}
              lesson={lesson}
              isOpen={isOpen}
              duration={lesson.duration}
              numOfQuestions={lesson.exam?.length}
            />
          );
        })}
      </section>
    </section>
  );
};

export default CourseSection;
