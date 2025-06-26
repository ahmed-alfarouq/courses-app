import type { MenuItemProps } from "../VideoPlayer.types";

const MenuItem = ({ label, isActive = false, onClick }: MenuItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
        isActive ? "font-semibold text-blue-600" : "text-gray-700"
      }`}
    >
      {label}
    </button>
  );
};

export default MenuItem;
