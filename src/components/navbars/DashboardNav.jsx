import User from "./navbar-items/User.jsx";
import * as navbarComp from "./navbar-items/NavbarComp.jsx"
import { dashboardNavIcons } from "../../assets/icons/icons.jsx";

function DashboardNav() {
  return (
    <nav className="py-2.5 px-3 w-full flex items-center justify-between">
      <navbarComp.IconBtn 
        Icon={() => <dashboardNavIcons.ChevronDown stroke="#fff" />} 
        label="Demo Project 1"
      />
      <div className="flex justify-end items-center gap-8">
        <navbarComp.RoundBtn Icon={() => <dashboardNavIcons.AddTask /> } />
        <navbarComp.RoundBtn Icon={() => <dashboardNavIcons.Team stroke="#fff" className="w-7 h-7 scale-110" /> } />
        <navbarComp.RoundBtn Icon={() => <dashboardNavIcons.Timeline stroke="#fff" /> } />
        <navbarComp.RoundBtn Icon={() => <dashboardNavIcons.Filter stroke="#fff" /> } />
        <navbarComp.RoundBtn Icon={() => <dashboardNavIcons.VR stroke="#fff" /> } />
        <User />
      </div>
    </nav>
  );
}

export default DashboardNav;