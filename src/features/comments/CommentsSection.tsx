import Comments from "./Comments";
import CommentForm from "./CommentForm";

import type { CourseComment } from "../../types";

const CommentsSection = ({ comments }: { comments: CourseComment[] }) => {
  return (
    <section className="mt-10">
      <h2 className="font-semibold text-2xl md:text-[27px]">Comments</h2>
      <Comments comments={comments} />
      <CommentForm />
    </section>
  );
};

export default CommentsSection;
