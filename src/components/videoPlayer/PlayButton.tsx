import { FaPlay } from "react-icons/fa";

const PlayButton = ({ toggleVideo }: { toggleVideo: () => void }) => {
  return (
    <button
      type="button"
      className="absolute top-1/2 left-1/2 -translate-1/2 bg-white rounded-full p-5 cursor-pointer"
      onClick={toggleVideo}
      aria-label="Play video"
    >
      <FaPlay className="size-5 text-[#e54860]" />
    </button>
  );
};

export default PlayButton;
