import { Link } from "react-router-dom";
import { LogoIcon } from "../../../assets/icons/icons";

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

export function RoundBtn({ Icon }) {
  return (
    <button className='p-1 w-fit rounded-full hover:bg-[#111]'>
      <Icon stroke='#fff' width='28' height='28' />
    </button>
  );
}