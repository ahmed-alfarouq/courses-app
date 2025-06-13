import { Link } from "react-router-dom";

import PageHeader from "../components/PageHeader";

const Home = () => {
  return (
    <section className="min-h-screen flex flex-col items-stretch">
      <PageHeader />
      <main className="py-3 px-3 md:px-12 flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">Welcome to CoursesApp 🎓</h2>
        <p className="text-xl md:text-2xl text-secondary-text mb-6">
          Learn, grow, and level up your skills with our courses.
        </p>
        <Link
          to="/courses"
          className="px-6 py-3 text-base md:text-lg rounded-md bg-primary text-white hover:bg-primary/80 transition"
        >
          Browse Courses
        </Link>
      </main>
    </section>
  );
};

export default Home;
