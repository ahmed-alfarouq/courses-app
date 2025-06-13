const COURSES_API = import.meta.env.VITE_COURSES_API;

export const getCourses = async () => {
  const res = await fetch(COURSES_API);
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(
      "Something went wrong while fetching courses: Expected JSON file!"
    );
  }
  return res.json();
};