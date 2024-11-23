"use client";
import { useEffect, useRef, useState } from "react";

export const SlidingTabBar = ({
  tabs,
  activeTab,
  onTabChange,
  defaultActiveTab,
}) => {
  const tabsRef = useRef([]); // Reference for tab elements
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  // Update active tab index whenever the activeTab prop changes
  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.id === activeTab);
    if (index !== -1) {
      setActiveTabIndex(index);
    }
  }, [activeTab, tabs]);

  // Update the underline position and width when the active tab index changes
  useEffect(() => {
    if (activeTabIndex === null) {
      return;
    }

    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft || 0);
      setTabUnderlineWidth(currentTab?.clientWidth || 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => {
      window.removeEventListener("resize", setTabPosition);
    };
  }, [activeTabIndex]);

  // Set the default active tab if provided
  useEffect(() => {
    if (defaultActiveTab && activeTab === null) {
      const index = tabs.findIndex((tab) => tab.id === defaultActiveTab);
      if (index !== -1) {
        setActiveTabIndex(index);
        onTabChange?.(tabs[index].id);
      }
    }
  }, [defaultActiveTab, tabs, activeTab, onTabChange]);

  return (
    <div className="relative flex h-12 rounded-3xl bg-white border-[0.3px] border-lightGray p-2 backdrop-blur-sm text-secondary">
      {/* Underline for active tab */}
      <span
        className="absolute bottom-1 top-1 -z-10 flex overflow-hidden rounded-3xl transition-all duration-300 bg-blue-100"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-3xl" />
      </span>

      {/* Render tabs */}
      {tabs.map((tab, index) => {
        const isActive = activeTabIndex === index;

        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            className={`${isActive ? `text-secondary font-medium` : `hover:text-secondary`
              } my-auto cursor-pointer select-none rounded-full px-4 text-center`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
