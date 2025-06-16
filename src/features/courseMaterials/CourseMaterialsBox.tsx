import CourseMaterialItem from "./CourseMaterialItem";

import { TbBooks } from "react-icons/tb";
import { CiClock2 } from "react-icons/ci";
import { GrLanguage } from "react-icons/gr";
import {
  PiStudent,
  PiChalkboardTeacherLight,
  PiCertificate,
} from "react-icons/pi";

import type { Course } from "../../types";

const CourseMaterialsBox = ({ course }: { course: Course }) => {
  const lessons = course.sections.reduce((acc, section) => {
    return acc + section.lessons.length;
  }, 0);

  return (
    <section className="w-full bg-white p-6 mt-2 rounded-md shadow flex flex-col md:flex-row justify-between gap-5">
      <div className="flex flex-col gap-5 md:gap-3 w-full md:w-[45%]">
        <CourseMaterialItem
          icon={<CiClock2 size={20} />}
          title="Duration"
          description={course.duration}
        />
        <CourseMaterialItem
          icon={<TbBooks size={20} />}
          title="Lessons"
          description={lessons.toString()}
        />
        <CourseMaterialItem
          icon={<PiStudent size={20} />}
          title="Enrolled"
          description={`${course.enrolled_students} students`}
        />
        <CourseMaterialItem
          icon={<GrLanguage size={20} />}
          title="Language"
          description={course.language}
        />
      </div>
      <div className="flex flex-col gap-5 md:gap-3 w-full md:w-[45%]">
        <CourseMaterialItem
          icon={<PiChalkboardTeacherLight size={20} />}
          title="Instructor"
          description={course.instructor}
        />
        <CourseMaterialItem
          icon={<PiCertificate size={20} />}
          title="Certificate"
          description={course.has_certification ? "Yes" : "No"}
        />
      </div>
    </section>
  );
};

export default CourseMaterialsBox;
