import { Link } from "react-router-dom";
import "../../styles/animations.css";

function ActivityBarItem({
  Icon,
  label,
  to,
  expanded,
  onClick,
  stroke = "#fff",
  currentPath = "",
}) {
  const isActive = currentPath === "" ? false : currentPath.startsWith(to);
  const style = expanded
    ? `flex items-center py-2 px-3 rounded-lg`
    : `w-fit h-fit ml-1.5 p-2 rounded-3xl`;

  return (
    <Link
      to={to}
      onClick={ onClick }
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
