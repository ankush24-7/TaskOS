import { Close } from "@/assets/icons/icons";

const CloseBtn = ({ onClick, dark }) => {
  return (
    <button
      aria-label="Close"
      onClick={onClick}
      className={`round-btn-hov-expand flex items-center justify-center p-1 cursor-pointer rounded-full
        ${dark ? "hover:bg-white/30" : "hover:bg-white"}`}>
      <Close className={`w-5 h-5 ${dark ? "stroke-zinc-400 hover:stroke-white" : "stroke-gray-700 hover:stroke-black"}`} />
    </button>
  );
};

export default CloseBtn;
