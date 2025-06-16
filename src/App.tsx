import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

// Components
import ErrorOverlay from "./components/ErrorOverlay";
import CoursesContext from "./context/coursesContext";

// API
import { getCourses } from "./lib/api/courses";

// Types
import type { Course } from "./types";
import MobileContext from "./context/mobileContext";

const App = () => {
  const [courses, setCourses] = useState<Course[] | undefined>();
  const [error, setError] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <Route path="/courses/:id" element={<CourseDetails />} />
          </Routes>
        </BrowserRouter>
        <ErrorOverlay message={error} />
      </MobileContext.Provider>
    </CoursesContext.Provider>
  );
};

export default App;
