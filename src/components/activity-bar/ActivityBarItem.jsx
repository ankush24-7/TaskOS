import { Link } from "react-router-dom";
import { ChevronsLeft } from "../../assets/icons/icons";

export function CollapseButton({expanded, setExpanded}) {
  const style = expanded 
    ? 'flex items-center gap-2 py-2 px-2.5'
    : 'w-full p-1.5 ml-1';

  return (
    <button 
      className={style + ' group  overflow-hidden'}
      onClick={() => setExpanded(!expanded)}
    >
      <ChevronsLeft 
        stroke='#7F7D76' 
        className={`w-8 h-8 rotation group-hover:stroke-white ${expanded && 'rotate-180'}`} 
      />
      <p className={`text-lg ml-[2.35rem] text-nowrap text-[#7f7d76] group-hover:text-white 
        ${expanded ? " fixed " : " absolute -z-10"}`}
      >
        Collapse
      </p>
    </button>
  );
}

export function GrayButton({ Icon, label, to, onClick, expanded }) {
  const style = expanded 
    ? 'flex items-center gap-2 py-2 px-2.5'
    : 'w-full p-2 ml-1';

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={style + ' group  overflow-hidden'}
    >
      <Icon 
        stroke='#7F7D76' 
        className={`w-7 h-7 rotation group-hover:stroke-white`} 
      />
      <p className={`text-lg ml-10 text-nowrap text-[#7f7d76] group-hover:text-white ${expanded ? "fixed " : "absolute -z-10 -translate-y-10"}`}>
        {label}
      </p>
    </Link>
  );
}

function ActivityBarItem({ Icon, label, to, expanded, stroke = "#fff", currentPath = "", }) {
  const isActive = currentPath === "" ? false : currentPath.startsWith(to);
  const style = expanded
    ? `flex items-center py-2 px-3 rounded-lg`
    : `w-fit h-fit ml-1.5 p-2 rounded-3xl`;

  return (
    <Link
      to={to}
      className={style + ` activity-bar-hov-expand overflow-hidden ${isActive && "bg-[#1b234d]"} hover:rounded-lg hover:bg-[#1b234d]`}>
      <Icon className={`w-7 h-7 ${expanded && "fixed"} `} stroke={stroke} />
      <p
        className={`text-lg ml-10 text-nowrap ${
          expanded
            ? "relative opacity-100"
            : "absolute opacity-0 -translate-y-10 -translate-x-20"
          }`}
        style={{ color: stroke }}
      >
        {label}
      </p>
    </Link>
  );
}

export default ActivityBarItem;
