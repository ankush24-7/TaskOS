import * as navbarComp from "@navbtns";
import { dashboardNavIcons } from "@icons";
import User from "@components/navbar-items/User";

function DashboardNav() {
  return (
    <nav className="w-full flex flex-grow py-2 px-3 items-center justify-between sm:py-2.5">
      <navbarComp.IconBtn
        Icon={() => <dashboardNavIcons.ChevronDown stroke="#fff" />}
        label="Demo Project 1"
      />

      <div className="hidden sm:flex justify-end items-center gap-8">
        <navbarComp.RoundBtn Icon={() => <dashboardNavIcons.AddTask />} />
        <navbarComp.RoundBtn
          Icon={() => (
            <dashboardNavIcons.Team
              stroke="#fff"
              className="w-7 h-7 scale-110"
            />
          )}
        />
        <navbarComp.RoundBtn
          Icon={() => <dashboardNavIcons.Timeline stroke="#fff" />}
        />
        <navbarComp.RoundBtn
          Icon={() => <dashboardNavIcons.Filter stroke="#fff" />}
        />
        <navbarComp.RoundBtn
          Icon={() => <dashboardNavIcons.VR stroke="#fff" />}
        />
        <User />
      </div>

      <span className="sm:hidden">
        <User />
      </span>
    </nav>
  );
}

export default DashboardNav;
