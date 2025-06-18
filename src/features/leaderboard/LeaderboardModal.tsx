import Modal from "../../components/Modal";

import LeaderboardHeader from "./LeaderboardHeader";
import LeaderboardItem from "./LeaderboardItem";

import type { LeaderboardModalProps } from "./Leaderboard.types";

const LeaderboardModal = ({ isOpen, close, course }: LeaderboardModalProps) => {
  return (
    <Modal
      isOpened={isOpen}
      close={close}
      className="flex flex-col justify-between px-8 md:px-10"
    >
      <LeaderboardHeader course={course} />
      <div className="flex flex-col gap-5 px-4 py-5 my-10 bg-[#F5F9FA] overflow-y-auto rounded">
        {Array.from({ length: 10 }).map((_, i) => (
          <LeaderboardItem key={i} />
        ))}
      </div>
    </Modal>
  );
};

export default LeaderboardModal;
