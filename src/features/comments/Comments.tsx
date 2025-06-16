import type { CourseComment } from "../../types";
import Comment from "./Comment";

const Comments = ({ comments }: { comments: CourseComment[] }) => {
  return (
    <section className="mt-4 space-y-4" id="comments">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          avatar={comment.avatar}
          name={comment.name}
          date={comment.createdAt}
          comment={comment.content}
        />
      ))}
    </section>
  );
};

export default Comments;
