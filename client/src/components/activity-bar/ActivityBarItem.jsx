import { Link } from "react-router-dom";
import { ChevronsLeft } from "@/assets/icons/icons";

export function CollapseButton({ expanded, setExpanded }) {
  const style = expanded
    ? "flex items-center gap-2 py-2 pl-2 pr-2.5"
    : "w-full p-1.5 ml-1";

  return (
    <button
      className={style + " group  overflow-hidden cursor-pointer"}
      onClick={() => setExpanded(!expanded)}>
      <ChevronsLeft
        stroke="#9ca3af"
        className={`w-8 h-8 transition-transform duration-700 ease-in-out group-hover:stroke-white ${
          expanded && "rotate-180 fixed"
        }`}
      />
      <p
        className={`text-lg ml-10 text-nowrap text-gray-400 group-hover:text-white 
        ${
          expanded
            ? "relative opacity-100"
            : "absolute opacity-0 -translate-y-10 -translate-x-20"
        }`}>
        Collapse
      </p>
    </button>
  );
}

export function GrayButton({ Icon, label, to, onClick, expanded }) {
  const style = expanded
    ? "flex items-center gap-2 py-2 px-2.5"
    : "w-full p-2 ml-1";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={style + " group  overflow-hidden"}>
      <Icon className={`w-7 h-7 rotation stroke-[#9CA3AF] group-hover:stroke-white ${expanded && "fixed"}`} />
      <p className={`text-lg ml-10 text-nowrap text-gray-400 group-hover:text-white
          ${
            expanded
              ? "relative opacity-100"
              : "absolute opacity-0 -translate-y-10 -translate-x-20"
          }`}>
        {label}
      </p>
    </Link>
  );
}

function ActivityBarItem({ Icon, label, to, expanded, currentPath = "" }) {
  const isActive = currentPath && currentPath.startsWith(to);

  const activeStyle = isActive ? "bg-prim-yellow-250" : "";
  const hoverStyle = "activity-bar-hov-expand overflow-hidden hover:bg-prim-yellow-250";
  const baseStyle = expanded
    ? "flex items-center py-2 px-3 rounded-2xl sm:rounded-lg"
    : `w-fit h-fit ml-1.5 p-2 hover:rounded-2xl ${
        isActive ? "rounded-2xl" : "rounded-3xl"
      }`;

  const labelClass = `hidden sm:block text-lg ml-10 text-nowrap text-white
    ${
      expanded
        ? "relative opacity-100"
        : "absolute opacity-0 -translate-y-10 -translate-x-20"
    }
  `;

  return (
    <Link to={to} className={`${baseStyle} ${hoverStyle} ${activeStyle}`}>
      <Icon className={`w-7 h-7 ${expanded && "sm:fixed"}`} />
      <p className={labelClass}>
        {label}
      </p>
    </Link>
  );
}

export default ActivityBarItem;
