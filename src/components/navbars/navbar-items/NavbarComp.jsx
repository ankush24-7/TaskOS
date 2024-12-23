import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoIcon, SearchIcon, Close } from "../../../assets/icons/icons";

export function Logo(){
  return (
    <Link to="/" className="flex items-center">
      <LogoIcon className="w-12 h-12 -translate-y-1.5 translate-x-1.5" />
      <p className="act-bar-label text-white text-4xl font-inconsolata">TaskOS</p>
    </Link>
  );
}

export function IconBtn({ Icon, label }) {
  return (
    <button className='flex gap-1.5 items-center rounded-xl px-3 py-1.5 border-[1.5px] border-[#fff] hover:bg-[#111] hover:border-[#111]'>
      <p className='text-white'>{label}</p>
      {Icon && <Icon />}
    </button>
  );
}

// login signup button
export function NonIconBtn({ label, to }) {
  return (
    <Link 
      to={to}
      className='flex items-center rounded-lg px-5 py-2.5 border-[1.5px] border-[#fff] hover:bg-[#111] hover:border-[#111]'
    >
      <p className='text-white font-medium leading-none'>{label}</p>
    </Link>
  );
}

export function RoundBtn({ Icon, onClick }) {
  return (
    <button 
      onClick={onClick}
      className='round-btn-hov-expand p-1.5 w-fit rounded-3xl hover:bg-[#111]'
    >
      <Icon width='28' height='28' />
    </button>
  );
}

export function SearchBtn({onClick}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search"
        className={`expand-left rounded-l-full px-4 focus:outline-none text-white placeholder:text-[#dcdcdc] bg-[#111] ${isSearchExpanded ? "w-44" : "w-0 absolute -z-10"}`}
      />
      <button
        onClick={() => setIsSearchExpanded(!isSearchExpanded)}
        className={`p-1.5 w-fit rounded-3xl hover:bg-[#111] ${isSearchExpanded && "bg-[#111] rounded-r-full py-2.5"}`}
      >
        {isSearchExpanded ? <Close stroke="#fff" className="w-5 h-5" /> : <SearchIcon />}
      </button>
    </div>
  )
}