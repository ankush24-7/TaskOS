import useDropDown from "@/hooks/useDropDown";
import DropDown from "@/components/dropdowns/DropDown";

const ProcessColorDropDown = ({ color, setColor }) => {
  const { isOpen: showColors, setIsOpen: setShowColors, dropdownRef: colorsRef } = useDropDown();
  const processColors = [
    ["#FFADAD", "Melon"],
    ["#FFDB99", "Sunset"],
    ["#C5C2EA", "Periwinkle"],
    ["#98ECC7", "Aquamarine"],
    ["#C2D6EB", "Light blue"],
    ["#E5C2FF", "Mauve"],
    ["#D6C2CB", "Thistle"],
    ["#DFD6CE", "Timberwolf"],
    ["#C6C6D2", "French gray"],
  ];

  const renderColors = () => {
    return processColors.map((c, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setColor({ hex: c[0], name: c[1] })}
        className={`w-6 h-6 rounded-full cursor-pointer ${
          c[0] === color ? "border-[1.5px]" : "border"
        }`}
        style={{ backgroundColor: c[0] }}
      />
    ));
  };

  return (
    <div className="relative w-fit" ref={colorsRef}>
      <button
        type="button"
        onClick={() => setShowColors(!showColors)}
        className="btn-shadow flex item-center w-fit p-1.5 gap-1.5 cursor-pointer rounded-full bg-white">
        <span
          style={{
            backgroundColor: color.hex || "transparent",
          }}
          className="w-6 h-6 rounded-full border border-black"></span>
        <p className="text-neutral-900">{color.name}</p>
      </button>

      {showColors && (
        <DropDown
          showHeader={false}
          position="bottom-left"
          children={
            <span className="flex flex-wrap justify-evenly w-28 gap-1 px-1 py-1.5 rounded-xl bg-white">
              {renderColors()}
            </span>
          }
        />
      )}
    </div>
  );
};

export default ProcessColorDropDown;
