import React, { useState } from "react";

import Button from "../components/Button";
import ExamModal from "./examModal/ExamModal";

import type { ExamSectionProps } from "../types";

const ExamSection = React.memo(
  ({
    title,
    description,
    startNextLesson,
    duration,
    exam,
  }: ExamSectionProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const [examStarted, setExamStarted] = useState(false);

    const toggleModal = () => {
      if (!isOpened) {
        setExamStarted(true);
      }
      setIsOpened((prev) => !prev);
    };

    const handleExamEnd = () => {
      setExamStarted(false);
      setIsOpened(false);
    };

    return (
      <section className="shadow rounded p-6">
        <h2 className="text-primary-text capitalize text-lg md:text-2xl mb-2">
          {title}
        </h2>
        <p className="text-secondary-text text-sm md:text-lg mb-6">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <Button type="button" text="Start Exam" onClick={toggleModal} />
          {startNextLesson && (
            <Button
              type="button"
              text="Next Lesson"
              onClick={startNextLesson}
            />
          )}
        </div>

        <ExamModal
          isOpened={isOpened}
          toggleModal={toggleModal}
          exam={exam}
          duration={duration}
          started={examStarted}
          onEnd={handleExamEnd}
        />
      </section>
    );
  }
);

export default ExamSection;
