import { Close } from "@/assets/icons/icons";

const CloseBtn = ({ onClick }) => {
  return (
    <button
      aria-label="Close"
      onClick={onClick}
      className="round-btn-hov-expand flex items-center justify-center p-1 cursor-pointer rounded-full hover:bg-prim-black/30">
      <Close className="w-5 h-5 stroke-zinc-400 hover:stroke-white" />
    </button>
  );
};

export default CloseBtn;
