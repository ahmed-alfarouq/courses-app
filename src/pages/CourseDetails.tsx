import { useParams } from "react-router-dom";

import Breadcrumb from "../components/Breadcrumb";
import IconButton from "../components/IconButton";
import VideoPlayer from "../components/VideoPlayer";
import ErrorOverlay from "../components/ErrorOverlay";
import JumpIconLink from "../components/JumpIconLink";
import { CourseMaterialBox } from "../features/courseMaterials";

import { useCoursesContext } from "../context/coursesContext";

import { IoBookSharp } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { FaComments, FaQuestion } from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useCoursesContext();

  if (!courses) return null;

  const course = courses.find((course) => course.id === Number(id));

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
            <section className="flex items-center gap-4 mt-4">
              <JumpIconLink
                toolTipId="curriculm"
                to="#curriculm"
                icon={<IoBookSharp size={18} />}
                ariaLabel="go to curriculm"
              />
              <JumpIconLink
                toolTipId="comments"
                to="#comments"
                icon={<FaComments size={18} />}
                ariaLabel="go to comments"
              />
              <IconButton
                toolTipId="q&a"
                icon={<FaQuestion size={18} />}
                ariaLabel="open Q&A"
                onClick={() => {}}
              />
              <IconButton
                toolTipId="leaderboard"
                icon={<MdLeaderboard size={18} />}
                ariaLabel="open leaderboard"
                onClick={() => {}}
              />
            </section>
            <section className="mt-10">
              <h2 className="font-semibold text-2xl md:text-[27px]">
                Course Materials
              </h2>
              <CourseMaterialBox course={course} />
            </section>
          </section>
          <section>sidebar</section>
        </div>
      </main>
    </section>
  );
};

export default CourseDetails;
