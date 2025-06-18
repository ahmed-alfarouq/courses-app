import { useEffect, useState } from "react";
import Comment from "./Comment";

import type { CommentsProps } from "./comments.types";
import type { CourseComment } from "../../types";

const Comments = ({ comments, courseId, lessonId }: CommentsProps) => {
  const [allComments, setAllComments] = useState(comments);

  useEffect(() => {
    const storageName = `comments-${courseId}-${lessonId}`;
    const store = localStorage.getItem(storageName);

    if (store) {
      const parsedData: CourseComment[] = JSON.parse(store);
      const newComments = [...parsedData, ...comments];

      setAllComments(newComments);
    } else {
      setAllComments(comments);
    }
  }, [comments, courseId, lessonId]);

  return (
    <section className="mt-4 space-y-4" id="comments">
      {allComments.map((comment) => (
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
