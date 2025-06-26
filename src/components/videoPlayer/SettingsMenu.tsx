import { cn } from "@sglara/cn";
import React, { useEffect, useRef, useState } from "react";

import { MdSettings } from "react-icons/md";
import TabSelector from "./settings/TabSelector";
import MenuList from "./settings/MenuList";

import type { Tab } from "./VideoPlayer.types";

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
// const qualities = ["144p", "360p", "720p", "1080p"];
// const captions = ["Off", "English", "Arabic"];

const SettingsMenu = React.memo(
  ({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement | null> }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [activeTab, setActiveTab] = useState<Tab>("speed");
    // const [quality, setQuality] = useState("720p");
    // const [selectedCaption, setSelectedCaption] = useState("Off");

    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const changeSpeed = (speed: number) => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = speed;
      setCurrentSpeed(speed);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div className="relative flex items-center" ref={menuRef}>
        <button
          type="button"
          className="text-white text-base md:text-xl hover:text-rose-600 transition-colors cursor-pointer"
          aria-label="Settings"
          onClick={toggleMenu}
        >
          <MdSettings />
        </button>

        <div
          className={cn(
            "absolute bottom-full right-full translate-x-1/4 md:left-1/2 md:-translate-x-1/2 mb-2 invisible opacity-0 transition-all flex flex-col bg-black/70 text-white rounded-md w-fit z-50",
            isOpen && "visible opacity-100"
          )}
        >
          <TabSelector
            tabs={["speed", "quality", "captions"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "speed" && (
            <MenuList
              items={speeds}
              activeItem={currentSpeed}
              onSelect={changeSpeed}
              formatLabel={(s) => `${s}x`}
            />
          )}
          {activeTab != "speed" && (
            <span className="inline-block text-white text-xs font-medium p-3">
              Coming soon...
            </span>
          )}
          {/* {activeTab === "quality" && (
            <MenuList
              items={qualities}
              activeItem={quality}
              onSelect={setQuality}
            />
          )}
          {activeTab === "captions" && (
            <MenuList
              items={captions}
              activeItem={selectedCaption}
              onSelect={setSelectedCaption}
            />
          )} */}
        </div>
      </div>
    );
  }
);

export default SettingsMenu;
