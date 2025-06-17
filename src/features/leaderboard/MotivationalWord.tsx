import type { MotivationalWordProps } from "./Leaderboard.types";

const MotivationalWord = ({ word, icon }: MotivationalWordProps) => {
  return (
    <div dir="rtl" className="flex gap-3 items-center bg-[#F5F9FA] rounded p-4">
      {icon}
      <p className=" text-[#182578] text-[15px] font-ge-ss-two font-light text-center">
        {word}
      </p>
    </div>
  );
};

export default MotivationalWord;
