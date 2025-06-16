import { useState } from "react";

import Modal from "../components/Modal";
import Button from "../components/Button";

import type { ExamSectionProps } from "../types";

const ExamSection = ({
  title,
  description,
  startNextLesson,
}: ExamSectionProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleModal = () => setIsOpened((prev) => !prev);

  return (
    <section className="shadow rounded p-6">
      <h2 className="text-primary-text capitalize text-lg md:text-2xl mb-2">
        {title}
      </h2>
      <p className="text-secondary-text text-sm md:text-lg mb-6">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <Button type="button" text="Open File" onClick={toggleModal} />
        {startNextLesson && (
          <Button type="button" text="Next Lesson" onClick={startNextLesson} />
        )}
      </div>

      <Modal isOpened={isOpened} close={toggleModal}>
        Exam's Data
      </Modal>
    </section>
  );
};

export default ExamSection;
