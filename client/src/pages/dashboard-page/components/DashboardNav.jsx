import * as navbarComp from "@navbtns";
import User from "@/components/ui/User";
import { dashboardNavIcons } from "@icons";
import useDropDown from "@/hooks/useDropDown";
import { useDashboard } from "@/contexts/DashboardContext";
import ProjectDropDown from "./kanban-board-components/ProjectDropDown";

function DashboardNav({ setShowModal }) {
  const { dropdownRef, isOpen, setIsOpen } = useDropDown();
  const { project, sectionCRUD, setNotification } = useDashboard();

  const handleCreateSection = async () => {
    const response = await sectionCRUD.createSection();
    if (response.status === 201) setNotification({ message: response.message, type: "success" });
    else setNotification({ message: response.message, type: "error" });
  }

  return (
    <nav className="w-full flex py-2 items-center justify-between sm:py-3">
      <div className="relative" ref={dropdownRef}>
        <navbarComp.IconBtn
          onClick={() => setIsOpen(true)}
          label={project.title}
          Icon={() => <dashboardNavIcons.ChevronDown stroke="#fff" className="w-5 h-5 ml-1 -rotate-90" />}
        />

        {isOpen && <ProjectDropDown setIsOpen={setIsOpen} setShowModal={setShowModal} />}
      </div>

      <div className="hidden sm:flex justify-end items-center gap-8">
        <navbarComp.IconBtn
          label="New Section"
          onClick={handleCreateSection}
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
