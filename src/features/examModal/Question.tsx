import Checkbox from "../../components/Checkbox";

import type { QuestionProps } from "./examModal.types";

const Question = ({ question, answers, number }: QuestionProps) => {
  return (
    <section className="h-full bg-white text-[#424154] rounded-3xl py-7 px-4 overflow-auto shadow">
      <h3 className="text-xl font-bold mb-5">
        <span className="block mb-2">{number}.</span>
        {question}
      </h3>
      <div className="flex flex-col flex-1 gap-8 mt-10">
        {answers.map((answer) => (
          <Checkbox
            key={answer.id}
            label={answer.text}
            id={answer.id}
            name={`question-${number}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Question;
