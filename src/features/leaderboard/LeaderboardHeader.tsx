import { useMemo } from "react";

import MotivationalWord from "./MotivationalWord";

import type { StudentProgressProps } from "../../types";
import type { LeaderboardHeaderProps } from "./Leaderboard.types";

import { SAYS } from "../constants";

const LeaderboardHeader = ({ course }: LeaderboardHeaderProps) => {
  const studentScore = useMemo(() => {
    const stored = localStorage.getItem(`progress-${course.id}`);
    if (!stored) return 0;
    const studentProgress: StudentProgressProps = JSON.parse(stored);

    const lessonsLength = course.sections.reduce(
      (acc, section) => acc + section.lessons.length,
      0
    );
    const completedLessonsCount = studentProgress.completedLessons.length;

    return Math.round((completedLessonsCount / lessonsLength) * 100);
  }, [course.id, course.sections]);

  const SayByScore = useMemo(() => {
    const closest = SAYS.reduce((prev, curr) =>
      Math.abs(curr.score - studentScore) < Math.abs(prev.score - studentScore)
        ? curr
        : prev
    );
    return closest;
  }, [studentScore]);

  return (
    <header className="flex flex-col items-center gap-2">
      <h2 className="text-[#080264] text-[15px] font-light">{course.name}</h2>
      <span className="text-[#080264] text-[15px] font-bold">Leaderboard</span>
      <MotivationalWord
        word={SayByScore.message}
        icon={<SayByScore.icon size={50} color="green" />}
      />
    </header>
  );
};

export default LeaderboardHeader;
