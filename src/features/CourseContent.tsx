import PDFSection from "./PDFSection";
import ExamSection from "./ExamSection";
import VideoPlayer from "../VideoPlayer";

import type { ExamQuestion, Lesson } from "../types";

const CourseContent = ({
  currentLesson,
  startNextLesson,
  toggleTheaterMode,
  exam,
  lessonDuration,
}: {
  currentLesson: Lesson;
  startNextLesson: () => void;
  toggleTheaterMode: () => void;
  exam?: ExamQuestion[];
  lessonDuration: number;
}) => {
  return (
    <>
      {currentLesson.type === "video" && (
        <VideoPlayer
          src={currentLesson.url || ""}
          tracks={[
            {
              src: "/captions/ar.vtt",
              srclang: "ar",
              label: "Arabic",
              default: true,
            },
            {
              src: "/captions/en.vtt",
              srclang: "en",
              label: "English",
            },
          ]}
          onVideoEnd={startNextLesson}
          onTheaterModeToggle={toggleTheaterMode}
        />
      )}
      {currentLesson.type === "pdf" && (
        <PDFSection
          title={currentLesson.name}
          description={currentLesson.description}
          url={currentLesson.url || ""}
          startNextLesson={startNextLesson}
        />
      )}
      {currentLesson.type === "exam" && (
        <ExamSection
          title={currentLesson.name}
          description={currentLesson.description}
          startNextLesson={startNextLesson}
          duration={lessonDuration}
          exam={exam!}
        />
      )}
    </>
  );
};

export default CourseContent;
