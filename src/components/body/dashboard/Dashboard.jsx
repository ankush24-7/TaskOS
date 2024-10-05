import React from 'react';
import Section from "./section/Section";
import { headerIcons } from "../../../assets/icons/icons.jsx";

function DashBoard() {
  const sections = [
    { name: 'New', count: 4, headerColor: '#FBC02D', icon: headerIcons.NewSectionIcon },
    { name: 'Ready', count: 2, headerColor: '#4CAF50', icon: headerIcons.ReadySectionIcon },
    { name: 'Running', count: 0, headerColor: '#2196F3', icon: headerIcons.RunningSectionIcon },
    { name: 'Blocked', count: 1, headerColor: '#F44336', icon: headerIcons.BlockedSectionIcon },
    { name: 'Terminated', count: 10, headerColor: '#009688', icon: headerIcons.TerminatedSectionIcon }
  ];

  return (
    <div className="h-full overflow-x-scroll overflow-y-hidden scrollbar-hide bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      <div className="flex h-full w-fit gap-2 px-2 pt-1">
        {sections.map((section, index) => (
          <Section
            key={index}
            name={section.name}
            count={section.count}
            headerColor={section.headerColor}
            Icon={section.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default DashBoard
