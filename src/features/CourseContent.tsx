import PDFSection from "./PDFSection";
import ExamSection from "./ExamSection";
import VideoPlayer from "../components/VideoPlayer";

import type { Lesson } from "../types";

const CourseContent = ({
  currentLesson,
  startNextLesson,
}: {
  currentLesson: Lesson;
  startNextLesson: () => void;
}) => {
  return (
    <>
      {currentLesson.type === "video" && (
        <VideoPlayer
          url={currentLesson.url || ""}
          onVideoEnd={startNextLesson}
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
        />
      )}
    </>
  );
};

export default CourseContent;
