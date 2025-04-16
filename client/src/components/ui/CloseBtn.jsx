import { Close } from "@/assets/icons/icons";

const CloseBtn = ({ onClick, dark = true }) => {
  return (
    <button
      aria-label="Close"
      onClick={onClick}
      className="cursor-pointer">
      <Close className={`w-4.5 h-4.5 ${dark ? "stroke-zinc-400 hover:stroke-white" : "stroke-gray-700 hover:stroke-black"}`} />
    </button>
  );
};

export default CloseBtn;
