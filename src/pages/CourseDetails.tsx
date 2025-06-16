import { useParams } from "react-router-dom";

import Breadcrumb from "../components/Breadcrumb";
import VideoPlayer from "../components/VideoPlayer";
import ErrorOverlay from "../components/ErrorOverlay";

import { useCoursesContext } from "../context/coursesContext";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useCoursesContext();

  const course = courses?.find((course) => course.id === Number(id));
  if (!course) return <ErrorOverlay message="Course Not Found!" />;

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
        <div className="3xl:container 3xl:mx-auto flex gap-2 flex-col md:flex-row">
          <section className="w-full md:w-3/5">
            <VideoPlayer url={course.sections[0].lessons[0].url} />
          </section>
          <section>sidebar</section>
        </div>
      </main>
    </section>
  );
};

export default CourseDetails;
