import authAPI from "@/services/authAPI";
import { useEffect, useState } from "react";
import SpinLoader from "../loaders/SpinLoader";
import { activityBarIcons } from "@/assets/icons/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ActivityBarItem, { CollapseButton, GrayButton } from "./ActivityBarItem";

function ActivityBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(isHomePage);
  const style = expanded
    ? "flex items-center gap-2 py-2 px-2.5"
    : "w-full p-2 ml-1";

  useEffect(() => {
    setExpanded(isHomePage);
  }, [isHomePage]);

  const handleLogout = async () => {
    setIsLoading(true);
    await authAPI.logout();
    navigate("/", { replace: true });
    setIsLoading(false);
  };

  return (
    <nav
      className={`bg-prim-black activity-bar flex w-full px-3 py-1 sm:p-1 ${
        expanded ? "sm:w-[13rem]" : "sm:w-[4.5rem]"
      }`}>
      <Link
        to="/home"
        className="ml-1.5 items-end -translate-x-1 hidden sm:flex">
        <activityBarIcons.LogoIcon className="w-12 h-12 fixed translate-x-1 -translate-y-1.5" />
        <p
          className={`text-white act-bar-label text-4xl ml-[2.75rem] overflow-hidden font-inconsolata ${
            expanded ? "w-fit" : "w-0"
          }`}>
          TaskOS
        </p>
      </Link>

      <ul className="nav-lst-1 w-full flex justify-between gap-2">
        <ActivityBarItem
          Icon={activityBarIcons.Home}
          label="Home"
          to="/home"
          expanded={expanded}
          currentPath={location.pathname}
        />
        <ActivityBarItem
          Icon={activityBarIcons.Timeline}
          label="Timeline"
          to="/timeline"
          expanded={expanded}
          currentPath={location.pathname}
        />
        <ActivityBarItem
          Icon={activityBarIcons.Rocket}
          label="Projects"
          to="/projects"
          expanded={expanded}
          currentPath={location.pathname}
        />
        <ActivityBarItem
          Icon={activityBarIcons.MyTasks}
          label="Assigned"
          to="/my-processes"
          expanded={expanded}
          currentPath={location.pathname}
        />
      </ul>

      <ul className="hidden flex-col sm:flex">
        <CollapseButton expanded={expanded} setExpanded={setExpanded} />
        <GrayButton
          Icon={activityBarIcons.Settings}
          label="Settings"
          to="/settings"
          expanded={expanded}
        />
        <button
          onClick={handleLogout}
          className={style + " ml-0.5 group cursor-pointer overflow-hidden"}>
          {isLoading ? (
            <SpinLoader width="22px" height="22px" color="#fff" />
          ) : (
            <activityBarIcons.Logout className={`w-7 h-7 rotation stroke-[#9CA3AF] group-hover:stroke-white ${expanded && "fixed"}`}/>
          )}
          <p 
            style={{ marginLeft: isLoading ? "0.5rem" : "2.5rem" }}
            className={`text-lg ml-10 text-nowrap text-gray-400 group-hover:text-white ${
            expanded
              ? "relative opacity-100"
              : "absolute opacity-0 -translate-y-10 -translate-x-20"
          }`}>
            Logout          
          </p>
        </button>
      </ul>
    </nav>
  );
}

export default ActivityBar;
