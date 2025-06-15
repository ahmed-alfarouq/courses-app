const BufferingLoader = () => {
  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex justify-center items-center">
      <span className="block size-14 rounded-full border-2 border-gray border-t-0 border-l-0 animate-spin"></span>
    </div>
  );
};

export default BufferingLoader;
