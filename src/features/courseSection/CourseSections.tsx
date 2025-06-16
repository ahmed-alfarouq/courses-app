import { cn } from "@sglara/cn";

import CourseSection from "./CourseSection";

import type { Course } from "../../types";

const CourseSections = ({
  course,
  className,
}: {
  course: Course;
  className?: string;
}) => {
  return (
    <section className={cn(className)}>
      <h2 className="font-semibold text-2xl md:text-[27px] mb-4">
        Topics for This Course
      </h2>
      <section className="space-y-8">
        {course.sections.map((section) => (
          <CourseSection key={section.id} section={section} />
        ))}
      </section>
    </section>
  );
};

export default CourseSections;
