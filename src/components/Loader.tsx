const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <span className="relative inline-flex rounded-full h-20 w-20 border-4 border-gray-300 border-t-gray-900 animate-spin"></span>
    </div>
  );
};

export default Loader;
