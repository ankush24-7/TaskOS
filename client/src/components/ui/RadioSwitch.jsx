import darkenColor from "@/utils/darkenColor";
import { Close, TickIcon } from "@/assets/icons/icons";

const RadioSwitch = ({ checked, setChecked, color }) => {
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="flex items-center justify-center gap-2">
      <label
        htmlFor="radio"
        className="relative flex items-center cursor-pointer">
        <input type="radio" name="radio" className="hidden" />
        <div
          style={{ backgroundColor: checked ? color : "#d1d5dc", borderColor: checked ? darkenColor(color) : "#99a1af" }}
          className="w-10.5 h-6 rounded-full border-2 transition-colors duration-300 ease-in-out"
        />
        <div 
          style={{ left: checked ? "22px" : "4px"}}
          className="absolute w-4 h-4 rounded-full transition-all duration-300 ease-in-out after:absolute 
            after:inset-0 after:rounded-full after:bg-white/10 drop-shadow-[0_0_1px_rgba(0,0,0,0.3)] bg-white
            flex justify-center items-center">
          {checked ? (
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
