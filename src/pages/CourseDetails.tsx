import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../components/Breadcrumb";
import ErrorOverlay from "../components/ErrorOverlay";


import { CommentsSection } from "../features/comments";
import { CourseSections } from "../features/courseSection";
import { CourseMaterialBox } from "../features/courseMaterials";

import useCourseLesson from "../hooks/useCourseLesson";

import { useMobileContext } from "../context/MobileContext";

import LessonActions from "../features/LessonActions";
import Loader from "../components/Loader";
import CourseContent from "../features/CourseContent";

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
  const [isLoading, setIsLoading] = useState(true);
  const { isMobile } = useMobileContext();

  const { id, lesson_id } = useParams<{ id: string; lesson_id: string }>();

  const { course, currentLesson, startNextLesson } = useCourseLesson({
    courseId: id,
    lessonId: lesson_id,
  });

  useEffect(() => {
    if (course && currentLesson) {
      setIsLoading(false);
    }
  }, [course, currentLesson]);

  if (isLoading) return <Loader />;

  if (!course || !currentLesson)
    return <ErrorOverlay message="Course/Lesson Not Found!" />;

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
            <CourseContent
              currentLesson={currentLesson}
              startNextLesson={startNextLesson}
            />
            <LessonActions />
            <section className="mt-10">
              <h2 className="font-semibold text-2xl md:text-[27px]">
                Course Materials
              </h2>
              <CourseMaterialBox course={course} />
            </section>
            {isMobile && <CourseSections course={course} className="mt-10" />}
            <CommentsSection comments={currentLesson.comments} />
          </section>
          {!isMobile && <CourseSections course={course} />}
        </div>
      </main>
    </section>
  );
};

export default CourseDetails;
