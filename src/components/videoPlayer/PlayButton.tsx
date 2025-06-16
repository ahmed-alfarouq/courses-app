import { FaPlay } from "react-icons/fa";

const PlayButton = ({ toggleVideo }: { toggleVideo: () => void }) => {
  return (
    <button
      type="button"
      className="absolute inset-0 flex justify-center items-center bg-black/70 z-50 cursor-pointer"
      onClick={toggleVideo}
      aria-label="Play video"
    >
      <span className="block bg-white rounded-full p-5 ">
        <FaPlay className="size-5 text-[#e54860]" />
      </span>
    </button>
  );
};

export default PlayButton;
