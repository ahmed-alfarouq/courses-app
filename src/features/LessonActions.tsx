import React, { useCallback, useMemo, useState } from "react";
import IconButton from "../components/IconButton";
import QAModal from "./QAModal";

import { IoBookSharp } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { FaComments, FaQuestion } from "react-icons/fa";

const LessonActions = React.memo(({ courseId }: { courseId: number }) => {
  const [qaIsOpened, setQaIsOpened] = useState(false);

  const bookIcon = useMemo(() => <IoBookSharp size={18} />, []);
  const commentsIcon = useMemo(() => <FaComments size={18} />, []);
  const questionIcon = useMemo(() => <FaQuestion size={18} />, []);
  const leaderboardIcon = useMemo(() => <MdLeaderboard size={18} />, []);

  const goToSection = useCallback((id: string) => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const goToCurriculm = useCallback(
    () => goToSection("curriculm"),
    [goToSection]
  );

  const goToComments = useCallback(
    () => goToSection("comments"),
    [goToSection]
  );

  const toggleQaModal = useCallback(() => {
    setQaIsOpened((prev) => !prev);
  }, []);

  return (
    <section className="flex items-center gap-4 mt-4">
      <IconButton
        toolTipId="curriculmTooltip"
        icon={bookIcon}
        ariaLabel="go to curriculm"
        onClick={goToCurriculm}
      />
      <IconButton
        toolTipId="commentsTooltip"
        icon={commentsIcon}
        ariaLabel="go to comments"
        onClick={goToComments}
      />
      <IconButton
        toolTipId="q&a"
        icon={questionIcon}
        ariaLabel="open Q&A"
        onClick={toggleQaModal}
      />
      <IconButton
        toolTipId="leaderboard"
        icon={leaderboardIcon}
        ariaLabel="open leaderboard"
      />
      <QAModal isOpen={qaIsOpened} close={toggleQaModal} courseId={courseId} />
    </section>
  );
});

export default LessonActions;
