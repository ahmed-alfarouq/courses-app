import { useEffect, useState } from "react";

import { getCourses } from "./lib/api/courses";

import ErrorOverlay from "./components/ErrorOverlay";

import CoursesContext from "./context/coursesContext";

import type { Course } from "./types";

const App = () => {
  const [courses, setCourses] = useState<Course[] | undefined>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCourses()
      .then((courses) => setCourses(courses))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      <h1 className="text-3xl font-bold">Course Management System</h1>
      <ErrorOverlay message={error} />
    </CoursesContext.Provider>
  );
};

export default App;
