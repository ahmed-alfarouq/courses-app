import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

// Components
import ErrorOverlay from "./components/ErrorOverlay";
import CoursesContext from "./context/coursesContext";

// API
import { getCourses } from "./lib/api/courses";

// Types
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ErrorOverlay message={error} />
    </CoursesContext.Provider>
  );
};

export default App;
