import { useState } from "react";

import { Comment } from "./comments";
import Modal from "../components/Modal";
import Button from "../components/Button";

import type { QAModalProps } from "../types";

const QAModal = ({ isOpen, close, courseId }: QAModalProps) => {
  const [error, setError] = useState("");
  const [textareaValue, setTextareaValue] = useState(
    sessionStorage.getItem(`qa-${courseId}-current`) || ""
  );
  const [questions, setQuestions] = useState<string[]>(() =>
    JSON.parse(sessionStorage.getItem(`qa-${courseId}`) || "[]")
  );

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    setError("");

    if (!textareaValue) {
      setError("Please enter a valid question");
      return;
    }

    const newQuestions = [...questions, textareaValue];
    sessionStorage.setItem(`qa-${courseId}`, JSON.stringify(newQuestions));
    setQuestions(newQuestions);
    setTextareaValue("");
    sessionStorage.removeItem(`qa-${courseId}-current`);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    sessionStorage.setItem(`qa-${courseId}-current`, e.target.value);
    setTextareaValue(e.target.value);
  };

  return (
    <Modal
      isOpened={isOpen}
      close={close}
      className="flex flex-col justify-between"
    >
      <div className="flex flex-col gap-5 px-4 py-5 overflow-y-auto">
        {questions.map((question, i) => (
          <Comment
            key={i}
            date={`${new Date()}`}
            avatar="https://placehold.co/150x150?text=AF"
            name="Ahmed Al-Farouq"
            comment={question}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          name="question"
          rows={8}
          value={textareaValue}
          className="shadow w-full rounded-md mb-4 p-2 text-secondary-text text-[15px]"
          onChange={handleTyping}
        />
        {error && <span className="block mb-2 text-red-500">{error}</span>}
        <Button type="submit" text="Submit Question" />
      </form>
    </Modal>
  );
};

export default QAModal;
