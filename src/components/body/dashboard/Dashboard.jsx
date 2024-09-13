import React from 'react';
import Section from "./section/Section";

function lightenColor(bgColor, percent) {
  const num = parseInt(bgColor.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1).toUpperCase()}`;
}

function DashBoard() {
  const baseColor = '#1a202c';   // bgColor
  const sections = [
    { name: 'Ready', count: 10, headerColor: '#ffd947' },
    { name: 'Running', count: 2, headerColor: '#2563eb' },
    { name: 'CPU', count: 1, headerColor: '#a855f7' },
    { name: 'Blocked', count: 3, headerColor: '#16a34a' },
    { name: 'Completed', count: 2, headerColor: '#047857' },
    { name: 'Terminated', count: 2, headerColor: '#374151' }
  ];

  return (
    <div className="h-full overflow-x-scroll overflow-y-hidden scrollbar-hide">
      <div className="flex h-full w-fit">
        {sections.map((section, index) => (
          <Section
            key={index}
            name={section.name}
            count={section.count}
            headerColor={section.headerColor}
            bgColor={lightenColor(baseColor, index * 0.5)}   // Increase lightness by 0.5%
          />
        ))}
      </div>
    </div>
  );
}

export default DashBoard
