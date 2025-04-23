import useDropDown from "@/hooks/useDropDown";
import SectionDropDown from "./SectionDropDown";
import { useEffect, useRef, useState } from "react";
import { Ellipses, DragIcon } from "@/assets/icons/icons";
import { useDashboard } from "@/contexts/DashboardContext";

function SectionHeader({ section, attributes, listeners }) {
  const count = section.processes.length;  
  const { sectionCRUD } = useDashboard();
  const [name, setName] = useState(section.name);
  const [color, setColor] = useState(section.color);
  const [desc, setDesc] = useState(section.description);
  const { dropdownRef, isOpen, setIsOpen } = useDropDown();

  const handleNameBlur = async () => {
    if (!name) setName(section.name);
    if (name !== section.name) {
      section.name = name;
      await sectionCRUD.updateSection(section);
    }
  };

  const handleNameKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      if (!name) setName(section.name);
      if (name !== section.name) {
        section.name = name;
        await sectionCRUD.updateSection(section);
      }
    }
    if (e.key === "Escape") e.target.blur();
  };

  useEffect(() => {
    const updateColor = async () => {
      if (color !== section.color) {
        section.color = color;
        await sectionCRUD.updateSection(section);
      }
    };

    updateColor();
  }, [color]);

  return (
    <div style={{ backgroundColor: color }} className="w-full rounded-t-xl">
      <div className="flex items-center group px-3 py-2">
        <span {...attributes} {...listeners}>
          <DragIcon className="stroke-gray-200 hover:stroke-white cursor-grab" />
        </span>

        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="sectionName" className="absolute -top-96">
            Name
          </label>
          <input
            name="sectionName"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className={`max-w-52 rounded-lg py-2 pl-1 text-xl leading-none text-white focus:outline-none
              focus:bg-prim-black/10 hover:bg-prim-black/10 bg-[${color}]`}
          />
        </form>

        <span className="flex items-center justify-between p-1 mx-1 w-4 h-4 rounded-full bg-prim-black/10">
          <p className="text-sm text-white">{count}</p>
        </span>

        <div className="relative group" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(true)}
            className={`group rounded-full p-0.5 mt-1 cursor-pointer group-hover:opacity-100 hover:bg-prim-black/15
              ${isOpen ? "opacity-100 bg-prim-black/15" : "opacity-100 lg:opacity-0"} `}>
            <Ellipses className="hover:stroke-white w-6 h-6" />
          </button>

          {isOpen && (
            <SectionDropDown
              section={section}
              color={color}
              setColor={setColor}
              desc={desc}
              setDesc={setDesc}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SectionHeader;
