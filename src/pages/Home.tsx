import CourseCard from "../components/CourseCard";
import { useCoursesContext } from "../context/coursesContext";

const Home = () => {
  const { courses } = useCoursesContext();
  return (
    <section>
      <header className="py-6 px-3 bg-[#F5F9FA]">
        <h1 className="text-3xl font-bold">Courses App</h1>
      </header>
      <main className="py-6 px-3 flex flex-wrap justify-center md:justify-start items-center gap-4">
        {courses?.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </main>
    </section>
  );
};

export default Home;
