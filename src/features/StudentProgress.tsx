const StudentProgress = ({ percent }: { percent: number }) => {
  return (
    <div className="relative my-14">
      <div
        className="w-full h-[5px] bg-[#E6E6E6] rounded-full"
        role="progressbar"
      >
        <div
          className="bg-[#6ABD8A] h-[5px] rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <span
        className="absolute -top-13 -translate-x-1/2 text-[11px] text-[#485293] border-2 border-primary-border rounded-full p-2 after:border-3 after:border-primary-border after:border-r-transparent after:border-l-transparent after:border-b-transparent after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 transition-all duration-300"
        style={{
          left: `${percent}%`,
        }}
      >
        You
      </span>

      <span
        className="absolute -bottom-6 -translate-x-1/2 text-[11px] text-[#485293] transition-all duration-300"
        style={{
          left: `${percent}%`,
        }}
      >
        {percent}%
      </span>
    </div>
  );
};

export default StudentProgress;
