import DropDown from "@/components/ui/DropDown";
import ColorPalette from "@/components/ui/ColorPalette";
import { useDashboard } from "@/contexts/DashboardContext";

const SectionDropDown = ({ section, color, setColor, desc, setDesc, setIsOpen }) => {
  const { sectionCRUD } = useDashboard();  
  const stateColors = [
    "#FF0000",
    "#F59F00",
    "#E16036",
    "#F67280",
    "#5E807F",
    "#008000",
    "#3D7AB8",
    "#8F00F5",
    "#E43AE4",
    "#00CCA0",
    "#B6A391",
    "#6B7280",
  ];

  const handleDescKeyDown = async (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur();
      if (desc !== section.description) {
        section.description = desc;
        await sectionCRUD.updateSection(section);
      }
    }
  }

  const handleDelete = async () => {
    await sectionCRUD.deleteSection(section._id);
  }

  return (
    <DropDown
      width="268px"
      position="bottom-right"
      header="Options"
      setIsOpen={setIsOpen}
      children={
        <div className="flex flex-col px-1.5 pb-1 rounded-b-xl bg-neutral-800">
          <div className="flex flex-col border-b py-4 gap-2 border-white/10">
            <span className="flex gap-4 flex-wrap justify-evenly">
              <ColorPalette 
                colors={stateColors}
                color={color}
                setColor={setColor}
              />
            </span>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="pt-3 pb-1 border-b border-white/10">
            <label htmlFor="description" className="text-md text-white">
              Description
            </label>
            <textarea
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={handleDescKeyDown}
              placeholder="Press enter to save"
              className="rounded-xl min-h-18 max-h-32 w-full mt-1.5 p-1 field-sizing-content vertical-scrollbar focus:outline-none text-white bg-drop-btn"
            />
          </form>
          <button
            onClick={handleDelete}
            className="w-full gap-2 mt-2 py-2 px-3 rounded-xl cursor-pointer bg-prim-black hover:bg-neutral-900 active:bg-prim-black/30">
            <p className="text-lg text-center text-red-500">Delete Section</p>
          </button>
        </div>
      }
    />
  );
};

export default SectionDropDown;
