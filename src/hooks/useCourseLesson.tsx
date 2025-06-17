import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useCoursesContext } from "../context/coursesContext";

import type { Lesson, StudentProgressProps } from "../types";

const useCourseLesson = ({
  courseId,
  lessonId,
}: {
  courseId?: string;
  lessonId?: string;
}) => {
  const navigate = useNavigate();
  const { courses } = useCoursesContext();
  const sectionLessonsRef = useRef<Lesson[]>([]);

  const course = useMemo(() => {
    if (!courses || !courseId) return null;
    return courses.find((c) => c.id === Number(courseId)) || null;
  }, [courses, courseId]);

  const isLessonUnlocked = useMemo(() => {
    const stored = localStorage.getItem(`progress-${courseId}`);
    if (!stored) return false;

    const progress: StudentProgressProps = JSON.parse(stored);
    return progress.unlockedLessons.includes(Number(lessonId));
  }, [courseId, lessonId]);

  const currentLesson = useMemo(() => {
    if (!course) return null;

    if (!lessonId || !isLessonUnlocked) {
      const lessonId = course.sections[0].lessons[0].id;
      navigate(`/courses/${courseId}/${lessonId}`);
    }

    for (const section of course.sections) {
      let lessonIndex = 0;
      const lesson = section.lessons.find((l, i) => {
        if (l.id === Number(lessonId)) {
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
  }, [course, courseId, isLessonUnlocked, lessonId, navigate]);

  const startNextLesson = () => {
    if (!currentLesson || !course) return;

    const storageName = `progress-${courseId}`;
    let nextLesson = sectionLessonsRef.current[currentLesson.index + 1];

    if (!nextLesson) {
      const currentSectionIndex = course.sections.findIndex((section) =>
        section.lessons.find((lesson) => lesson.id === currentLessonId)
      );

      const nextSection = course.sections[currentSectionIndex + 1];
      if (!nextSection || nextSection.lessons.length === 0) return;

      nextLesson = nextSection.lessons[0];
    }

    if (nextLesson.type === "pdf") {
      nextLesson = sectionLessonsRef.current[currentLesson.index + 1];
    }

    const stored = localStorage.getItem(storageName);
    const currentLessonId = Number(lessonId);

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
    navigate(`/courses/${courseId}/${nextLesson.id}`);
  };

  return { course, currentLesson, startNextLesson };
};

export default useCourseLesson;
