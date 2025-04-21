import { ChevronDown } from "@/assets/icons/icons";
import { useState } from "react";

const MobileDropDown = ({ showHeader = true, bgColor = "#111", children, header, setIsOpen }) => {
  const [style, setStyle] = useState("open");

  const handleClose = () => {
    setStyle("close");
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="absolute inset-0 z-10 fade-in bg-black/80">
      <div className={`relative top-full mobile-menu rounded-t-2xl ${style === "open" ? "open" : "close"}`}>
        {showHeader && (
          <div
            style={{ backgroundColor: bgColor }}
            className="flex items-center justify-between px-5 py-2 rounded-t-2xl">
            <h1 className="text-2xl text-center py-1 text-white">{header}</h1>
            <button
              onClick={handleClose}
              className="p-2 rounded-full cursor-pointer hover:bg-prim-black/50">
              <ChevronDown className="w-6 h-6 stroke-white" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default MobileDropDown;
