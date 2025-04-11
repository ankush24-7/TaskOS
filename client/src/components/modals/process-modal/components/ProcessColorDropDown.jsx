import DropDown from "@/components/ui/DropDown";

const ProcessColorDropDown = ({ color, setColor, setShowColors }) => {
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
        className={`w-6 h-6 rounded-full cursor-pointer ${c[0] === color ? "border-[1.5px]" : "border"}`}
        style={{ backgroundColor: c[0] }}
      />
    ));
  };

  return (
    <DropDown
      showHeader={false}
      setIsOpen={setShowColors}
      position="bottom-left"
      bgColor="#fff"
      children={
        <span className="flex flex-wrap justify-evenly w-28 gap-1 px-1 py-1.5">
          {renderColors()}
        </span>
      }
    />
  );
};

export default ProcessColorDropDown;
