import { useMemo } from "react";
import { cn } from "@sglara/cn";

import CourseSection from "./CourseSection";
import StudentProgress from "../StudentProgress";

import type { Course, StudentProgressProps } from "../../types";

const CourseSections = ({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) => {
  const calcStudentProgress = useMemo(() => {
    const stored = localStorage.getItem(`progress-${course.id}`);
    if (!stored) return 0;

    const studentProgress: StudentProgressProps = JSON.parse(stored);
    const lessonsLength = course.sections.reduce(
      (acc, section) => acc + section.lessons.length,
      0
    );
    const completedLessonsCount = studentProgress.completedLessons.length;

    return Math.round((completedLessonsCount / lessonsLength) * 100);
  }, [course.id, course.sections]);

  return (
    <section className={cn(className)}>
      <h2 className="font-semibold text-2xl md:text-[27px] mb-4">
        Topics for This Course
      </h2>
      <StudentProgress percent={calcStudentProgress} />
      <section className="space-y-8">
        {course.sections.map((section) => (
          <CourseSection
            key={section.id}
            section={section}
            courseId={course.id}
          />
        ))}
      </section>
    </section>
  );
};

export default CourseSections;
