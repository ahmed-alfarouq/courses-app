import { createContext, useContext } from "react";

import type { Course } from "../types";

interface CoursesContextProps {
  courses?: Course[];
}

const CoursesContext = createContext<CoursesContextProps>({
  courses: undefined,
});

export const useCoursesContext = () => useContext(CoursesContext);

export default CoursesContext;
