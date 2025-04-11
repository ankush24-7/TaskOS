import { Close, TickIcon } from "@/assets/icons/icons";

const darkenColor = (color) => {
  switch (color) {
    case "#FFADAD":
      return "#FF8585";
    case "#FFDB99":
      return "#FFBF00";
    case "#C5C2EA":
      return "#8C85D5";
    case "#98ECC7":
      return "#41DC99";
    case "#C2D6EB":
      return "#74A2D2";
    case "#E5C2FF":
      return "#CC85FF";
    case "#D6C2CB":
      return "#BFA6A1";
    case "#DFD6CE":
      return "#AE9884";
    case "#C6C6D2":
      return "#8D8DA5";
    default:
      return "#FBBD23"
  }
}

const RadioSwitch = ({ state, setState, color }) => {
  return (
    <div
      onClick={() => setState(!state)}
      className="flex items-center justify-center gap-2">
      <label
        htmlFor="radio"
        className="relative flex items-center cursor-pointer">
        <input type="radio" name="radio" className="hidden" />
        <div
          style={{ backgroundColor: state ? color : "#d1d5dc" }}
          className="w-10.5 h-6 rounded-full shadow-[inset_0_0_3px_rgba(0,0,0,0.4)] transition-colors duration-300 ease-in-out"
        />
        <div 
          style={{ left: state ? "20px" : "2px"}}
          className="absolute w-5 h-5 rounded-full transition-all duration-300 ease-in-out after:absolute 
            after:inset-0 after:rounded-full after:bg-white/10 drop-shadow-[0_0_1px_rgba(0,0,0,0.3)] bg-white
            flex justify-center items-center">
          {state ? (
            <TickIcon stroke={darkenColor(color)} className="w-3.5 h-3.5 stroke-3" />
          ) : (
            <Close className="w-3.5 h-3.5 mr-[0.08px] stroke-3 stroke-gray-400" />
          )}
        </div>
      </label>
    </div>
  );
};

export default RadioSwitch;
