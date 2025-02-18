import { useEffect, useRef, useState } from "react";
import { useDashboard } from "@/contexts/DashboardContext";
import { Ellipses, DragIcon, Close } from "@/assets/icons/icons";

function Header ({ section, attributes, listeners }) {
  const dropdownRef = useRef(null);
  const count = section.processes.length;
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(section.name);
  const [color, setColor] = useState(section.color);
  const [desc, setDesc] = useState(section.description);
  const { updateSection, deleteSection } = useDashboard();

  const renderColors = (color) => {
    const colors = ["#FF0000", "#F59F00", "#E16036", "#F67280", "#5E807F" ,"#008000", "#3D7AB8", "#4B0082", "#E43AE4", "#00CCA0", "#B6A391", "#6B7280"];
    return colors.map((c, i) => (
      <button 
        key={i}
        onClick={() => setColor(c)}
        className={`w-6 h-6 rounded-full cursor-pointer ${c === color && "border-2"} border-white`}
        style={{ backgroundColor: c }}
      />
    ));
  }

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  const handleNameBlur = async () => {
    if (!name) setName(section.name);
    if (name !== section.name) {
      section.name = name;
      await updateSection(section);
    }
  }

  const handleNameKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      if(!name) setName(section.name);
      if (name !== section.name) {
        section.name = name;
        await updateSection(section);
      }
    }
    if (e.key === "Escape") e.target.blur();
  }

  const handleDescBlur = async () => {
    if (!desc) setDesc(section.description);
    if (desc !== section.description) {
      section.desciption = desc;
      await updateSection(section);
    }
  }

  const handleDescKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.target.blur();
      if (!desc) setDesc(section.description);
      if (desc !== section.description) {
        section.description = desc;
        await updateSection(section);
      }
    }
    if (e.key === "Escape") e.target.blur();
  }

  const handleDelete = async () => {
    await deleteSection(section._id);
  }

  useEffect(() => {
    const updateColor = async () => {
      if (color !== section.color) {
        section.color = color;
        await updateSection(section);
      }
    }

    updateColor();
  }, [color]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div 
      style={{ backgroundColor: section.color }}
      className="w-full rounded-t-lg">
      <div className="flex items-center group px-3 py-2">
        <span 
          {...attributes}
          {...listeners}>
          <DragIcon className="stroke-gray-200 hover:stroke-white cursor-grab" />
        </span>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="sectionName" className="absolute -top-96">Name</label>
          <input 
            name="sectionName"
            type="text" 
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            className={`max-w-52 rounded-lg py-2 pl-1 text-xl leading-none text-white focus:outline-none
              focus:bg-prim-black/15 hover:bg-prim-black/15 bg-[${section.color}]`}
          />
        </form>

        <span className="flex items-center justify-between p-1 mx-1 w-4 h-4 rounded-full bg-prim-black/15">
          <p className="text-sm text-white">{count}</p>
        </span>
        
        <div className="relative group" ref={dropdownRef}>
          <button 
            onClick={() => setIsOpen(true)}
            className={`group rounded-full p-0.5 mt-1 cursor-pointer ${isOpen ? "opacity-100": "opacity-0"} group-hover:opacity-100 hover:bg-prim-black/15`}>
            <Ellipses className="hover:stroke-white w-6 h-6" />
          </button>

          {isOpen && (
            <div className="absolute flex flex-col top-full right-0 w-72 rounded-xl bg-prim-black">
              <div className="flex items-center justify-between px-2.5 py-1 rounded-t-xl border-b border-drop-border bg-drop-header">
                <h1 className="text-lg text-center py-1 text-white">Options</h1>
                <button
                  aria-label="Close"
                  onClick={() => setIsOpen(false)}
                  className="round-btn-hov-expand flex items-center justify-center p-1 cursor-pointer rounded-full hover:bg-prim-black/30">
                  <Close className="w-5 h-5 stroke-zinc-400 hover:stroke-white" />
                </button>
              </div>
              <div className="flex flex-col px-2 pb-2"> 
                <div className="flex flex-col border-b py-4 gap-2 border-drop-border">
                  <span className="flex gap-4 flex-wrap">
                    {renderColors(section.color)}
                  </span>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="pt-3 pb-2 border-b border-drop-border">
                  <label htmlFor="description" className="text-md text-white">Description</label>
                  <textarea 
                    name="description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    onBlur={handleDescBlur}
                    onKeyDown={handleDescKeyDown}
                    placeholder="Only visible when there are no tasks in the section."
                    className="rounded-xl min-h-18 w-full mt-1.5 p-1 field-sizing-content focus:outline-none text-white bg-drop-btn"
                  />
                </form>
                <button 
                  onClick={handleDelete}
                  className="w-full gap-2 mt-2 py-2 px-3 rounded-xl cursor-pointer bg-drop-btn hover:bg-drop-btn-hover active:bg-[#9f9fa935]">
                  <p className="text-lg text-center text-red-500">Delete section</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
