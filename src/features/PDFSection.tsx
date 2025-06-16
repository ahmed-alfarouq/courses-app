import { useState } from "react";

import Modal from "../components/Modal";
import Button from "../components/Button";

import type { PDFSectionProps } from "../types";

const PDFSection = ({
  title,
  description,
  url,
  startNextLesson,
}: PDFSectionProps) => {
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
        <iframe
          src={url}
          width="100%"
          height="100%"
          className="rounded"
        ></iframe>
      </Modal>
    </section>
  );
};

export default PDFSection;
