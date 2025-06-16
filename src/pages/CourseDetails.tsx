import { useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Breadcrumb from "../components/Breadcrumb";
import IconButton from "../components/IconButton";
import VideoPlayer from "../components/VideoPlayer";
import ErrorOverlay from "../components/ErrorOverlay";
import JumpIconLink from "../components/JumpIconLink";

import PDFSection from "../features/PDFSection";
import { CommentsSection } from "../features/comments";
import { CourseSections } from "../features/courseSection";
import { CourseMaterialBox } from "../features/courseMaterials";

import { useCoursesContext } from "../context/coursesContext";
import { useMobileContext } from "../context/MobileContext";

import { IoBookSharp } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { FaComments, FaQuestion } from "react-icons/fa";

import type { Lesson, StudentProgressProps } from "../types";


const breadcrumbItems = [
  { label: "Home", to: "/" },
  {
    label: "Courses",
    to: "/courses",
  },
  {
    label: "Course Details",
  },
];

const CourseDetails = () => {
  const navigate = useNavigate();

  const sectionLessonsRef = useRef<Lesson[]>([]);

  const { id, lesson_id } = useParams<{ id: string; lesson_id: string }>();
  const { courses } = useCoursesContext();
  const { isMobile } = useMobileContext();

  const course = useMemo(() => {
    if (!courses || !id) return null;
    return courses.find((c) => c.id === Number(id)) || null;
  }, [courses, id]);

  const isLessonUnlocked = () => {
    const stored = localStorage.getItem(`progress-${id}`);
    if (!stored) return false;

    const progress: StudentProgressProps = JSON.parse(stored);
    return progress.unlockedLessons.includes(Number(lesson_id));
  };

  const currentLessonData = useMemo(() => {
    if (!course) return null;
    const lessonUnlocked = isLessonUnlocked();

    if (!lesson_id || !lessonUnlocked) {
      const lessonId = course.sections[0].lessons[0].id;
      navigate(`/courses/${id}/${lessonId}`);
    }

    for (const section of course.sections) {
      let lessonIndex = 0;
      const lesson = section.lessons.find((l, i) => {
        if (l.id === Number(lesson_id)) {
          lessonIndex = i;
          return l;
        }
      });
      if (lesson) {
        sectionLessonsRef.current = section.lessons;
        return { ...lesson, index: lessonIndex };
      }
    }

    return null;
  }, [course, lesson_id]);

  const currentLessonType = currentLessonData?.type || "";
  const currentUrl = currentLessonData?.url || "";
  const currentComments = currentLessonData?.comments || [];

  if (!courses) return null;

  if (!course || !currentLessonData)
    return <ErrorOverlay message="Course/Lesson Not Found!" />;

  const startNextLesson = () => {
    if (!currentLessonData) return;

    const storageName = `progress-${id}`;
    let nextLesson = sectionLessonsRef.current[currentLessonData.index + 1];

    if (!nextLesson) {
      const currentSectionIndex = course.sections.findIndex((section) =>
        section.lessons.find((lesson) => lesson.id === currentLessonId)
      );

      const nextSection = course.sections[currentSectionIndex + 1];
      if (!nextSection || nextSection.lessons.length === 0) return;

      nextLesson = nextSection.lessons[0];
    }

    if (nextLesson.type === "pdf") {
      nextLesson = sectionLessonsRef.current[currentLessonData.index + 1];
    }

    const stored = localStorage.getItem(storageName);
    const currentLessonId = Number(lesson_id);

    let progress: StudentProgressProps = {
      completedLessons: [],
      unlockedLessons: [],
    };

    if (stored) {
      progress = JSON.parse(stored);
    }

    const completedSet = new Set(progress.completedLessons);
    const unlockedSet = new Set(progress.unlockedLessons);

    completedSet.add(currentLessonId);
    unlockedSet.add(currentLessonId);
    unlockedSet.add(nextLesson.id);

    const updatedProgress = {
      completedLessons: [...completedSet],
      unlockedLessons: [...unlockedSet],
    };

    localStorage.setItem(storageName, JSON.stringify(updatedProgress));
    navigate(`/courses/${id}/${nextLesson.id}`);
  };

  return (
    <section>
      <header className="py-3 px-3 md:px-12 3xl:px-0 bg-[#F5F9FA] space-y-1 md:space-y-4">
        <div className="3xl:container 3xl:mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-3xl md:text-4xl font-medium leading-9">
            {course.name}
          </h1>
        </div>
      </header>
      <main className="py-3 px-3 md:px-12 3xl:px-0">
        <div className="3xl:container 3xl:mx-auto flex gap-5 flex-col md:flex-row md:justify-between">
          <section className="w-full md:w-3/5">
            {currentLessonType === "video" && (
              <VideoPlayer url={currentUrl} onVideoEnd={startNextLesson} />
            )}
            {currentLessonType === "pdf" && (
              <PDFSection
                title={currentLessonData.name}
                description={currentLessonData.description}
                url={currentUrl}
                startNextLesson={startNextLesson}
              />
            )}
            <section className="flex items-center gap-4 mt-4">
              <JumpIconLink
                toolTipId="curriculm"
                to="#curriculm"
                icon={<IoBookSharp size={18} />}
                ariaLabel="go to curriculm"
              />
              <JumpIconLink
                toolTipId="comments"
                to="#comments"
                icon={<FaComments size={18} />}
                ariaLabel="go to comments"
              />
              <IconButton
                toolTipId="q&a"
                icon={<FaQuestion size={18} />}
                ariaLabel="open Q&A"
              />
              <IconButton
                toolTipId="leaderboard"
                icon={<MdLeaderboard size={18} />}
                ariaLabel="open leaderboard"
              />
            </section>
            <section className="mt-10">
              <h2 className="font-semibold text-2xl md:text-[27px]">
                Course Materials
              </h2>
              <CourseMaterialBox course={course} />
            </section>
            {isMobile && <CourseSections course={course} className="mt-10" />}
            <CommentsSection comments={currentComments} />
          </section>
          {!isMobile && <CourseSections course={course} />}
        </div>
      </main>
    </section>
  );
};

export default CourseDetails;
