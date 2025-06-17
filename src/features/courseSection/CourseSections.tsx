import { useMemo } from "react";
import { cn } from "@sglara/cn";

import CourseSection from "./CourseSection";
import StudentProgress from "../StudentProgress";

import type { CourseSectionsProps } from "./CourseSections.types";

const CourseSections = ({
  course,
  activeSectionId,
  studentProgress,
  className,
}: CourseSectionsProps) => {
  const calcStudentProgress = useMemo(() => {
    const lessonsLength = course.sections.reduce(
      (acc, section) => acc + section.lessons.length,
      0
    );
    const completedLessonsCount = studentProgress.completedLessons.length;

    return Math.round((completedLessonsCount / lessonsLength) * 100);
  }, [course.sections, studentProgress.completedLessons.length]);

  return (
    <section className={cn(className)} id="curriculm">
      <h2 className="font-semibold text-2xl md:text-[27px] mb-4">
        Topics for This Course
      </h2>
      <StudentProgress percent={calcStudentProgress} />
      <section className="space-y-8">
        {course.sections.map((section) => (
          <CourseSection
            key={section.id}
            activeSectionId={activeSectionId}
            section={section}
            studentProgress={studentProgress}
          />
        ))}
      </section>
    </section>
  );
};

export default CourseSections;
