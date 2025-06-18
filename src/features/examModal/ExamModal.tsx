import { useState } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Modal from "../../components/Modal";
import Timer from "../../components/Timer";

import Question from "./Question";
import QuestionNumber from "./QuestionNumber";

import type { Swiper as SwiperType } from "swiper";
import type { ExamModalProps } from "./examModal.types";

const ExamModal = ({
  isOpened,
  toggleModal,
  duration,
  exam,
  started,
  onEnd,
}: ExamModalProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const handleToggleModal = () => {
    toggleModal();
    onEnd();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    console.log(swiper.activeIndex);
    setActiveQuestion(swiper.activeIndex);
  };

  return (
    <Modal
      isOpened={isOpened}
      close={handleToggleModal}
      className="fixed inset-0 md:relative h-full md:h-[calc(100vh-10%)] px-0 bg-gradient-to-br from-[#4056ba] to-[#5a77fd] text-white flex flex-col items-center overflow-auto"
    >
      <Timer
        start={started}
        duration={duration}
        onEnd={onEnd}
        className="absolute top-9 left-1/2 -translate-1/2"
      />
      <div className="flex gap-4 my-10">
        {Array.from({ length: exam.length }).map((_, i) => (
          <QuestionNumber
            key={`question-${i}`}
            number={i + 1}
            isActive={i === activeQuestion}
          />
        ))}
      </div>
      <Swiper
        modules={[A11y]}
        spaceBetween={20}
        slidesPerView={1.15}
        centeredSlides={true}
        onSlideChange={handleSlideChange}
        className="w-full h-full flex-1"
      >
        {exam.map((q, i) => (
          <SwiperSlide>
            <Question
              key={i}
              question={q.question}
              answers={q.options}
              number={i + 1}
            />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </Modal>
  );
};

export default ExamModal;
