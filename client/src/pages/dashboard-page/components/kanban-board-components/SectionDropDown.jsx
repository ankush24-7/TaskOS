import DropDown from "@/components/ui/DropDown";
import { useDashboard } from "@/contexts/DashboardContext";

const SectionDropDown = ({ section, color, setColor, desc, setDesc, setIsOpen }) => {
  const { sectionCRUD } = useDashboard();  

  const renderColors = (color) => {
    const colors = [
      "#FF0000",
      "#F59F00",
      "#E16036",
      "#F67280",
      "#5E807F",
      "#008000",
      "#3D7AB8",
      "#4B0082",
      "#E43AE4",
      "#00CCA0",
      "#B6A391",
      "#6B7280",
    ];
    return colors.map((c, i) => (
      <button
        key={i}
        onClick={() => setColor(c)}
        className={`w-6 h-6 rounded-full cursor-pointer ${c === color && "border-2"} border-white`}
        style={{ backgroundColor: c }}
      />
    ));
  };

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
      width={18}
      position="bottom-right"
      header="Options"
      setIsOpen={setIsOpen}
      children={
        <div className="flex flex-col px-2 pb-2">
          <div className="flex flex-col border-b py-4 gap-2 border-drop-border">
            <span className="flex gap-4 flex-wrap">
              {renderColors(color)}
            </span>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="pt-3 pb-2 border-b border-drop-border">
            <label htmlFor="description" className="text-md text-white">
              Description
            </label>
            <textarea
              name="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onKeyDown={handleDescKeyDown}
              placeholder="Press enter to save"
              className="rounded-xl min-h-18 w-full mt-1.5 p-1 field-sizing-content focus:outline-none text-white bg-drop-btn"
            />
          </form>
          <button
            onClick={handleDelete}
            className="w-full gap-2 mt-2 py-2 px-3 rounded-xl cursor-pointer bg-drop-btn hover:bg-drop-btn-hover active:bg-drop-btn-active">
            <p className="text-lg text-center text-red-500">Delete Section</p>
          </button>
        </div>
      }
    />
  );
};

export default SectionDropDown;
