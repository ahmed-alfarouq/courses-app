import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

// Components
import ErrorOverlay from "./components/ErrorOverlay";
import CoursesContext from "./context/coursesContext";

// Hooks
import useMobile from "./hooks/useMobile";

// Contexts
import MobileContext from "./context/MobileContext";

// API
import { getCourses } from "./lib/api/courses";

// Types
import type { Course } from "./types";

const App = () => {
  const { isMobile } = useMobile();
  const [courses, setCourses] = useState<Course[] | undefined>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCourses()
      .then((courses) => setCourses(courses))
      .catch((err: Error) => setError(err.message));
  }, []);

  return (
    <CoursesContext.Provider value={{ courses }}>
      <MobileContext.Provider value={{ isMobile }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />}>
              <Route path=":lesson_id" element={<CourseDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ErrorOverlay message={error} />
      </MobileContext.Provider>
    </CoursesContext.Provider>
  );
};

export default App;
