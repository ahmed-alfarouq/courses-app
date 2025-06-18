import React from "react";

import Comments from "./Comments";
import CommentForm from "./CommentForm";

import type { CommentsSectionProps } from "./comments.types";

const CommentsSection = React.memo(
  ({ comments, courseId, lessonId }: CommentsSectionProps) => {
    return (
      <section className="mt-10">
        <h2 className="font-semibold text-2xl md:text-[27px]">Comments</h2>
        <Comments comments={comments} courseId={courseId} lessonId={lessonId} />
        <CommentForm courseId={courseId} lessonId={lessonId} />
      </section>
    );
  }
);

export default CommentsSection;
