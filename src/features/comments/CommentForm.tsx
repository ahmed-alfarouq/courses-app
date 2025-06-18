import uuid4 from "uuid4";
import { useState } from "react";

import Button from "../../components/Button";

import type { CourseComment } from "../../types";
import type { CommentFormProps } from "./comments.types";

const CommentForm = ({ courseId, lessonId }: CommentFormProps) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const sotreComment = (newComment: CourseComment) => {
    const storageName = `comments-${courseId}-${lessonId}`;
    const store = localStorage.getItem(storageName);
    if (store) {
      const parsedData: CourseComment[] = JSON.parse(store);
      const newComments = [...parsedData, newComment];

      localStorage.setItem(storageName, JSON.stringify(newComments));
      return;
    }
    localStorage.setItem(storageName, JSON.stringify([newComment]));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!comment.length) {
      setError("Please enter a valid comment");
      return;
    }

    sotreComment({
      id: uuid4(),
      avatar: "https://placehold.co/150x150?text=AF",
      name: "Ahmed Al-Farouq",
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      content: comment,
    });
    setComment("");
  };

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (error) setError("");
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <label htmlFor="comment" className="sr-only">
        Enter a comment
      </label>
      <textarea
        id="comment"
        name="comment"
        rows={8}
        value={comment}
        onChange={handleComment}
        className="shadow w-full rounded-md mb-4 p-2 text-secondary-text text-[15px]"
        placeholder="Enter a comment"
        aria-invalid={!!error}
        aria-describedby={error ? "comment-error" : undefined}
      />
      {error && (
        <span id="comment-error" className="block mb-2 text-red-500">
          {error}
        </span>
      )}
      <Button type="submit" text="Submit Review" />
    </form>
  );
};

export default CommentForm;
