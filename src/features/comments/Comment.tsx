import formatDate from "../../lib/utils/formatDate";
import type { CommentProps } from "./comments.types";

const Comment = ({ avatar, name, date, comment }: CommentProps) => {
  const commentDate = formatDate(date).shortDate;

  return (
    <div className="border-b-1 last:border-0 border-primary-border pb-5 px-1 flex gap-4">
      <img src={avatar} alt={name} className="size-13 md:size-18 rounded-full" />
      <div>
        <h3 className="text-[15px] font-semibold text-[#6C6C6C]">{name}</h3>
        <span className="text-[15px] text-gray">{commentDate}</span>
        <p className="text-[15px] text-gray mt-2">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
