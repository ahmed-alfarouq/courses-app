import { cn } from "@sglara/cn";
import React, { useEffect, useRef, useState } from "react";

import { MdSettings } from "react-icons/md";
import TabSelector from "./settings/TabSelector";
import MenuList from "./settings/MenuList";

import type { Settings, Tab } from "./VideoPlayer.types";

const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

const SettingsMenu = React.memo(
  ({ videoRef, tracks, setSelectedTrack, defaultTrackLang }: Settings) => {
    const languages = tracks ? tracks.map((track) => track.label) : [];

    const [isOpen, setIsOpen] = useState(false);
    const [currentSpeed, setCurrentSpeed] = useState(1);
    const [activeTab, setActiveTab] = useState<Tab>("speed");
    const [selectedCaption, setSelectedCaption] = useState(
      defaultTrackLang || "Off"
    );

    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const changeSpeed = (speed: number) => {
      if (!videoRef.current) return;
      videoRef.current.playbackRate = speed;
      setCurrentSpeed(speed);
    };

    const changeCaption = (caption: string) => {
      setSelectedTrack(caption);
      setSelectedCaption(caption);
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
            "min-w-24 absolute bottom-full right-full translate-x-1/4 md:left-1/2 md:-translate-x-1/2 mb-2 invisible opacity-0 transition-all flex flex-col bg-black/70 text-white rounded-md w-fit z-50",
            isOpen && "visible opacity-100"
          )}
        >
          <TabSelector
            tabs={["speed", "captions"]}
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

          {activeTab === "captions" && (
            <MenuList
              items={[...languages, "Off"]}
              activeItem={selectedCaption}
              onSelect={changeCaption}
            />
          )}
        </div>
      </div>
    );
  }
);

export default SettingsMenu;
