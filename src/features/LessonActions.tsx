import React from "react";
import IconButton from "../components/IconButton";

import { IoBookSharp } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { FaComments, FaQuestion } from "react-icons/fa";

const LessonActions = React.memo(() => {
  const goToSection = (id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="flex items-center gap-4 mt-4">
      <IconButton
        toolTipId="curriculmTooltip"
        icon={<IoBookSharp size={18} />}
        ariaLabel="go to curriculm"
        onClick={() => goToSection("curriculm")}
      />
      <IconButton
        toolTipId="commentsTooltip"
        icon={<FaComments size={18} />}
        ariaLabel="go to comments"
        onClick={() => goToSection("comments")}
      />
      <IconButton
        toolTipId="q&a"
        icon={<FaQuestion size={18} />}
        ariaLabel="open Q&A"
      />
      <IconButton
        toolTipId="leaderboard"
        icon={<MdLeaderboard size={18} />}
        ariaLabel="open leaderboard"
      />
    </section>
  );
});

export default LessonActions;
