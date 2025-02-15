import { Link } from "react-router-dom";

export function IconBtn({ Icon, label }) {
  return (
    <button className="flex sm:gap-1.5 items-center rounded-lg sm:rounded-xl pl-2 pr-1 py-1.5 sm:px-3 border-[1.5px] border-white hover:bg-prim-black">
      <p className="text-white">{label}</p>
      {Icon && <Icon />}
    </button>
  );
}

export function NonIconBtn({ label, to }) {
  return (
    <Link to={to}>
      <button className="border-[#fff] hover:bg-prim-black flex items-center rounded-lg border-[1.5px] px-5 py-2.5">
        <p className="text-white font-medium leading-none">{label}</p>
      </button>
    </Link>
  );
}

export function RoundBtn({ Icon, onClick, label="" }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="round-btn-hov-expand w-9 h-9 flex items-center justify-center rounded-3xl hover:bg-[#111]">
      <Icon />
    </button>
  );
}