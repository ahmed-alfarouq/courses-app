import Breadcrumb from "../components/Breadcrumb";

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

const CourseDetailsHeader = ({ title }: { title: string }) => {
  return (
    <header className="py-3 px-3 md:px-12 3xl:px-0 bg-[#F5F9FA] space-y-1 md:space-y-4">
      <div className="3xl:container 3xl:mx-auto">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl md:text-4xl font-medium leading-9">{title}</h1>
      </div>
    </header>
  );
};

export default CourseDetailsHeader;
