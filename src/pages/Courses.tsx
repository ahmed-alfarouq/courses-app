import CourseCard from "../components/CourseCard";
import PageHeader from "../components/PageHeader";
import { useCoursesContext } from "../context/coursesContext";

const Courses = () => {
  const { courses } = useCoursesContext();
  return (
    <section>
      <PageHeader />
      <main className="py-6 px-3 md:px-12 flex flex-wrap justify-center md:justify-start items-center gap-4">
        {courses?.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </main>
    </section>
  );
};

export default Courses;
