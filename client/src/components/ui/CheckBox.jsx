import darkenColor from "@/utils/darkenColor";
import { TickIcon } from "@/assets/icons/icons";

const CheckBox = ({ checked, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: checked && "#FBBD23",
        borderColor: checked && darkenColor(),
      }}
      className="w-5 h-5 rounded-md cursor-pointer border-2 transition-normal duration-200 ease-in-out 
      border-neutral-500 hover:bg-black/20">
      {checked && <TickIcon className="w-4 h-4 stroke-3 stroke-white" />}
    </button>
  );
};

export default CheckBox;
