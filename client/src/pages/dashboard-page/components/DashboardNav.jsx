import * as navbarComp from "@navbtns";
import User from "@/components/ui/User";
import { dashboardHeaderIcons } from "@icons";
import useDropDown from "@/hooks/useDropDown";
import { useDashboard } from "@/contexts/DashboardContext";
import ProjectDropDown from "./kanban-board-components/ProjectDropDown";

function DashboardNav({ setShowModal }) {
  const { dropdownRef, isOpen, setIsOpen } = useDropDown();
  const { project, sectionCRUD } = useDashboard();

  const handleCreateSection = async () => {
    await sectionCRUD.createSection();
  }

  return (
    <nav className="w-full flex py-2 items-center justify-between sm:px-5">
      <div className="relative" ref={dropdownRef}>
        <navbarComp.IconBtn
          onClick={() => setIsOpen(true)}
          label={project.title}
          Icon={() => <dashboardHeaderIcons.ChevronDown stroke="#fff" className="w-5 h-5 ml-1 -rotate-90" />}
        />

        {isOpen && <ProjectDropDown setIsOpen={setIsOpen} setShowModal={setShowModal} />}
      </div>

      <div className="hidden sm:flex justify-end items-center gap-8">
        <navbarComp.IconBtn
          label="New Section"
          onClick={handleCreateSection}
          Icon={() => <dashboardHeaderIcons.Sparkles className="w-5 h-5" stroke="#fff" />}
        />
        <navbarComp.RoundBtn
          Icon={() => <dashboardHeaderIcons.Team className="w-8 h-8 stroke-[0.75px] stroke-white" />}
        />
        <navbarComp.RoundBtn Icon={() => <dashboardHeaderIcons.Timeline />} />
        <User />
      </div>

      <span className="sm:hidden">
        <User />
      </span>
    </nav>
  );
}

export default DashboardNav;
