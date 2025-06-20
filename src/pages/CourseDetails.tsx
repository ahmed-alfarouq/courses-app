import { cn } from "@sglara/cn";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Alert from "../components/Alert";
import Loader from "../components/Loader";
import ErrorOverlay from "../components/ErrorOverlay";

import LessonActions from "../features/LessonActions";
import CourseContent from "../features/CourseContent";
import { CommentsSection } from "../features/comments";
import { CourseSections } from "../features/courseSection";
import { CourseMaterialBox } from "../features/courseMaterials";
import CourseDetailsHeader from "../features/CourseDetailsHeader";

import useCourseLesson from "../hooks/useCourseLesson";

import { useMobileContext } from "../context/MobileContext";

import type { StudentProgressProps } from "../types";

const CourseDetails = () => {
  const containerRef = useRef<HTMLElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [studentProgress, setStudentProgress] = useState<StudentProgressProps>({
    completedLessons: [],
    unlockedLessons: [],
  });
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const { isMobile } = useMobileContext();

  const { id, lesson_id } = useParams<{ id: string; lesson_id: string }>();

  const { course, currentLesson, currentSection, startNextLesson } =
    useCourseLesson({
      courseId: id,
      lessonId: lesson_id,
      setCourseCompleted,
    });

  useEffect(() => {
    if (!course || !currentLesson) return;

    setIsLoading(false);

    if (isTheaterMode && currentLesson?.type !== "video") {
      toggleTheaterMode();
    }

    const storageName = `progress-${course.id}`;
    const stored = localStorage.getItem(storageName);

    if (stored) {
      const parsedData: StudentProgressProps = JSON.parse(stored);
      setStudentProgress(parsedData);
      return;
    }

    const defaultProgress = {
      completedLessons: [],
      unlockedLessons: [currentLesson.id],
    };
    localStorage.setItem(storageName, JSON.stringify(defaultProgress));
    setStudentProgress(defaultProgress);
  }, [course, currentLesson, isTheaterMode]);

  const toggleTheaterMode = () => {
    setIsTheaterMode((prev) => !prev);
  };

  if (isLoading) return <Loader />;

  if (!course || !currentLesson)
    return <ErrorOverlay message="Course/Lesson Not Found!" />;

  return (
    <section>
      <CourseDetailsHeader title={course.name} />
      <main className="py-3 px-3 md:px-12 3xl:px-0">
        <div className="3xl:container 3xl:mx-auto flex gap-5 flex-col md:flex-row md:justify-between">
          <section
            className={cn(
              "transition-all duration-300",
              isTheaterMode
                ? "w-full flex flex-wrap justify-between"
                : "block w-full md:w-3/5"
            )}
            ref={containerRef}
          >
            <CourseContent
              currentLesson={currentLesson}
              startNextLesson={startNextLesson}
              toggleTheaterMode={toggleTheaterMode}
              lessonDuration={parseInt(currentLesson.duration!)}
              exam={currentLesson.exam}
            />
            {courseCompleted && (
              <Alert
                type="success"
                message="Congratulations, you've completed the course."
                className="mt-4"
              />
            )}
            <div
              className={cn(
                isTheaterMode && !isMobile && "w-[57%]",
                isMobile && "w-full"
              )}
            >
              <LessonActions course={course} />
              <CourseMaterialBox course={course} />
              {isMobile && (
                <CourseSections
                  activeSectionId={currentSection?.id}
                  studentProgress={studentProgress}
                  course={course}
                  className="mt-10"
                />
              )}
              <CommentsSection
                comments={currentLesson.comments}
                courseId={course.id}
                lessonId={currentLesson.id}
              />
            </div>
            {/* Show on theater mode */}
            {!isMobile && isTheaterMode && (
              <CourseSections
                activeSectionId={currentSection?.id}
                studentProgress={studentProgress}
                course={course}
                className="mt-4 md:w-2/5"
              />
            )}
          </section>
          {!isMobile && !isTheaterMode && (
            <CourseSections
              activeSectionId={currentSection?.id}
              studentProgress={studentProgress}
              course={course}
            />
          )}
        </div>
      </main>
    </section>
  );
};

export default CourseDetails;
