import { cn } from "@sglara/cn";

import type { MenuListProps } from "../VideoPlayer.types";



const MenuList = <T extends string | number>({
  items,
  activeItem,
  onSelect,
  renderItem,
  formatLabel,
}: MenuListProps<T>) => {
  return (
    <div className="flex flex-col py-2 max-h-36 sm:max-h-max overflow-scroll">
      {items.map((item) => {
        const isActive = activeItem === item;
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={cn(
              "py-1.5 px-4 text-left text-sm hover:bg-rose-600 transition-all cursor-pointer",
              isActive && "bg-rose-600 text-white font-medium"
            )}
          >
            {renderItem ? renderItem(item) : formatLabel ? formatLabel(item) : item}
          </button>
        );
      })}
    </div>
  );
};

export default MenuList;
