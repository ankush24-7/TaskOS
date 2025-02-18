import * as navbarComp from "@navbtns";
import User from "@/components/ui/User";
import { dashboardNavIcons } from "@icons";
import { useDashboard } from "@/contexts/DashboardContext";

function DashboardNav() {
  const { project, addSection } = useDashboard();
  return (
    <nav className="w-full flex py-2 items-center justify-between sm:py-3">
      <navbarComp.IconBtn
        Icon={() => <dashboardNavIcons.ChevronDown stroke="#fff" className="w-5 h-5 ml-1" />}
        label={project.title}
      />

      <div className="hidden sm:flex justify-end items-center gap-8">
        <navbarComp.IconBtn
          label="Add Section"
          onClick={addSection}
          Icon={() => <dashboardNavIcons.Sparkles className="w-5 h-5 group-hover:stroke-prim-yellow-50" stroke="#fff" />}
        />
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
