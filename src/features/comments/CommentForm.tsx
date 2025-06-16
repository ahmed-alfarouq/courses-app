import { useState } from "react";

import Button from "../../components/Button";

const CommentForm = () => {
  const [error, setError] = useState("");

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment");

    if (!comment || typeof comment != "string") {
      setError("Please enter a valid comment");
      return;
    }

    console.log(comment);
  };

  return (
    <form onSubmit={handleComment} className="my-4">
      <textarea
        name="comment"
        rows={8}
        className="shadow w-full rounded-md mb-4 p-2 text-secondary-text text-[15px]"
      />
      {error && <span className="block mb-2 text-red-500">{error}</span>}
      <Button type="submit" text="Submit Review" />
    </form>
  );
};

export default CommentForm;
