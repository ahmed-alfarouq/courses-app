import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCoursesContext } from "../context/coursesContext";

import type { CourseSectionProps, StudentProgressProps } from "../types";

const useCourseLesson = ({
  courseId,
  lessonId,
  setCourseCompleted,
}: {
  courseId?: string;
  lessonId?: string;
  setCourseCompleted?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [redirect, setRedirect] = useState({ state: false, to: "" });
  const sectionRef = useRef<(CourseSectionProps & { index: number }) | null>(
    null
  );

  const navigate = useNavigate();
  const { courses } = useCoursesContext();

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

    for (const [i, section] of course.sections.entries()) {
      let lessonIndex = 0;
      const lesson = section.lessons.find((l, i) => {
        if (l.id === Number(lessonId)) {
          lessonIndex = i;
          return l;
        }
      });
      if (lesson) {
        sectionRef.current = { ...section, index: i };
        return { ...lesson, index: lessonIndex };
      }
    }

    return null;
  }, [course, lessonId]);

  const storeProgress = (currentLessonId: number, nextLessonId?: number) => {
    const storageName = `progress-${courseId}`;
    const stored = localStorage.getItem(storageName);

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

    if (nextLessonId) unlockedSet.add(nextLessonId);

    const updatedProgress = {
      completedLessons: [...completedSet],
      unlockedLessons: [...unlockedSet],
    };

    localStorage.setItem(storageName, JSON.stringify(updatedProgress));
  };

  const startNextLesson = () => {
    if (!currentLesson || !course || !sectionRef.current) return;

    const currentLessonId = Number(lessonId);
    let nextLesson = sectionRef.current.lessons[currentLesson.index + 1];

    if (!nextLesson) {
      const currentSectionIndex = sectionRef.current.index;
      const nextSection = course.sections[currentSectionIndex + 1];

      if (!nextSection || nextSection.lessons.length === 0) {
        if (setCourseCompleted) {
          storeProgress(currentLessonId);
          setCourseCompleted(true);
        }
        return;
      }

      nextLesson = nextSection.lessons[0];
    }

    if (nextLesson.type === "pdf") {
      nextLesson = sectionRef.current.lessons[currentLesson.index + 1];
    }
    storeProgress(currentLessonId, nextLesson.id);
    setRedirect({ state: true, to: `/courses/${courseId}/${nextLesson.id}` });
  };

  useEffect(() => {
    if (course && (!lessonId || !isLessonUnlocked)) {
      const defaultId = course.sections[0].lessons[0].id;
      if (defaultId) {
        setRedirect({ state: true, to: `/courses/${courseId}/${defaultId}` });
      }
    }
  }, [course, lessonId, isLessonUnlocked, courseId]);

  useEffect(() => {
    if (redirect.state) {
      setRedirect({ state: false, to: "" });
      navigate(redirect.to);
    }
  }, [navigate, redirect.state, redirect.to]);
  return {
    course,
    currentLesson,
    currentSection: sectionRef.current,
    startNextLesson,
  };
};

export default useCourseLesson;
