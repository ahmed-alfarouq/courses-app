import { Link } from "react-router-dom";
import type { Course } from "../types";

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="rounded-md bg-[#1b1b1b] overflow-hidden">
      <Link to={`/courses/${course.id}`}>
        <img src={course.image} alt={course.name} className="w-full" />
      </Link>
      <div className="py-8 px-5">
        <h2 className="font-bold text-2xl text-[#f9f9f9]">
          <Link to={`/courses/${course.id}`}>{course.name}</Link>
        </h2>
        <span className="text-sm font-medium text-[#939393]">
          {course.instructor}
        </span>
        <p className="text-sm font-medium text-[#939393] my-2">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
