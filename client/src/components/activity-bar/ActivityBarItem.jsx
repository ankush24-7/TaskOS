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
        className={`w-8 h-8 transition-transform duration-700 ease-in-out group-hover:stroke-white ${expanded && "rotate-180 fixed"}`}
      />
      <p className={`text-lg ml-10 text-nowrap text-gray-400 group-hover:text-white 
        ${ expanded ? "relative opacity-100" : "absolute opacity-0 -translate-y-10 -translate-x-20" }`}>
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
      <Icon
        stroke="#9ca3af"
        className={`w-7 h-7 rotation group-hover:stroke-white ${
          expanded && "fixed"
        }`}
      />
      <p
        className={`text-lg ml-10 text-nowrap text-gray-400 group-hover:text-white
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

function ActivityBarItem({ Icon, label, to, expanded, stroke = "#fff", currentPath = "" }) {
  const isActive = currentPath === "" ? false : currentPath.startsWith(to);
  const style = expanded
    ? "flex items-center py-2 px-3 rounded-lg"
    : `w-fit h-fit ml-1.5 p-2 hover:rounded-2xl ${isActive ? "rounded-2xl": "rounded-3xl"}`;

  return (
    <Link
      to={to}
      className={
        style + ` activity-bar-hov-expand overflow-hidden hover:bg-prim-yellow-250 ${isActive && "bg-prim-yellow-250"}`
      }>
      <Icon className={`w-7 h-7 ${expanded && "sm:fixed"}`} stroke={stroke} />
      <p
        className={`hidden text-lg ml-10 text-nowrap sm:block
          ${
            expanded
              ? "relative opacity-100"
              : "absolute opacity-0 -translate-y-10 -translate-x-20"
          }`}
        style={{ color: stroke }}>
        {label}
      </p>
    </Link>
  );
}

export default ActivityBarItem;
