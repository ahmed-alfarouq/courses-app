import { cn } from "@sglara/cn";

import type { TabSelectorProps } from "../VideoPlayer.types";

const TabSelector = ({ tabs, activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <div className="flex gap-3 border-b font-medium">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "w-full p-2 text-center capitalize hover:bg-rose-600 cursor-pointer",
            activeTab === tab ? "border-b-2 border-rose-600 font-semibold" : ""
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSelector;
