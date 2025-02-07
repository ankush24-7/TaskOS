import { createContext, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LogoIcon, SearchIcon, Close } from "@icons";

export function IconBtn({ Icon, label }) {
  return (
    <button className="flex sm:gap-1.5 items-center rounded-lg sm:rounded-xl pl-2 pr-1 py-1.5 sm:px-3 border-[1.5px] border-[#fff] hover:bg-[#111] hover:border-[#111]">
      <p className="text-white">{label}</p>
      {Icon && <Icon />}
    </button>
  );
}

export function NonIconBtn({ label, to }) {
  return (
    <Link
      to={to}
      className="border-[#fff] hover:bg-[#111] hover:border-[#111] flex items-center rounded-lg border-[1.5px] px-5 py-2.5">
      <p className="text-white font-medium leading-none">{label}</p>
    </Link>
  );
}

export function RoundBtn({ Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="round-btn-hov-expand p-1.5 w-fit rounded-3xl hover:bg-[#111]">
      <Icon width="28" height="28" />
    </button>
  );
}