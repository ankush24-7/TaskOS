import DropDown from "@/components/ui/DropDown";

const ProcessColorDropDown = ({ color, setColor, setShowColors }) => {
  const processColors = [
    ["#FFD6D6", "Tea rose"],
    ["#FFF1D6", "Papaya whip"],
    ["#E8EEED", "Ash gray"],
    ["#D6FFD6", "Tea green"],
    ["#E0EBF5", "Light blue"],
    ["#EED6FF", "Pale purple"],
    ["#C2FFF2", "Celeste"],
    ["#E7E0DA", "Timberwolf"],
    ["#DEDFE3", "Platinum"],
  ];

  const renderColors = () => {
    return processColors.map((c, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setColor({ hex: c[0], name: c[1] })}
        className={`w-6 h-6 rounded-full cursor-pointer ${c[0] === color ? "border-2" : "border"}`}
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
