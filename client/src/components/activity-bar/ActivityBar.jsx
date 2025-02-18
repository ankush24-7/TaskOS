import authAPI from "@/services/AuthAPI";
import { activityBarIcons } from "@icons";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import ActivityBarItem, { CollapseButton, GrayButton } from "./ActivityBarItem";

function ActivityBar() {
  const location = useLocation();
  const { setAccessToken } = useAuth(); 
  const isHomePage = location.pathname === "/home";
  const [expanded, setExpanded] = useState(isHomePage);

  useEffect(() => {
    setExpanded(isHomePage);
  }, [isHomePage]);

  const handleLogout = () => {
    authAPI.logout();
    setAccessToken(null);
  };

  return (
    <nav className={`bg-prim-black activity-bar flex w-full p-1 ${expanded ? "sm:w-[13rem]" : "sm:w-[4.5rem]"}`}>
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
          Icon={activityBarIcons.Star}
          label="Starred"
          to="/starred"
          expanded={expanded}
          currentPath={location.pathname}
        />
        <ActivityBarItem
          Icon={activityBarIcons.MyTasks}
          label="My Tasks"
          to="/my-tasks"
          expanded={expanded}
          currentPath={location.pathname}
        />
        <ActivityBarItem
          Icon={activityBarIcons.Notes}
          label="Notes"
          to="/notes"
          expanded={expanded}
          currentPath={location.pathname}
        />
      </ul>

      <ul className="hidden flex-col gap-0.5 sm:flex">        
        <CollapseButton expanded={expanded} setExpanded={setExpanded} />
        <GrayButton
          Icon={activityBarIcons.Settings}
          label="Settings"
          to="/"
          expanded={expanded}
        />
        <GrayButton
          Icon={activityBarIcons.Logout}
          label="Logout"
          to="/"
          expanded={expanded}
          onClick={handleLogout}
        />
      </ul>
    </nav>
  );
}

export default ActivityBar;
