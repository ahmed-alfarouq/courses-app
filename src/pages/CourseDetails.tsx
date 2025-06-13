import { useParams } from "react-router-dom";

import ErrorOverlay from "../components/ErrorOverlay";
import { useCoursesContext } from "../context/coursesContext";
import Breadcrumb from "../components/Breadcrumb";

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
      <header className="py-3 px-3 md:px-12 bg-[#F5F9FA] space-y-1 md:space-y-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-medium leading-9">{course.name}</h1>
      </header>
    </section>
  );
};

export default CourseDetails;
