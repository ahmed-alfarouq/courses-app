import React from "react";

import { RiFullscreenExitLine } from "react-icons/ri";

const FullScreenToggle = React.memo(({ toggle }: { toggle: () => void }) => {
  return (
    <button
      type="button"
      className="text-white cursor-pointer"
      onClick={toggle}
    >
      <RiFullscreenExitLine size={16} />
    </button>
  );
});

export default FullScreenToggle;
