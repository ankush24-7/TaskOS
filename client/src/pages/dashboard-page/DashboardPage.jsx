import useModal from "@/hooks/useModal";
import { useLocation } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import DashboardNav from "./components/DashboardNav";
import ProjectModal from "./components/ProjectModal";
import { DashboardProvider } from "@/contexts/DashboardContext";

function DashBoardPage() {
  const location = useLocation();
  const newProject = new URLSearchParams(location.search).get("new");
  const { showModal, setShowModal } = useModal({ modalState: newProject });

  return (
    <div className="h-screen w-full flex flex-col pb-4 overflow-y-hidden px-2 md:px-4 lg:px-5 bg-gradient-to-r from-grad-l to-grad-r">
      <DashboardProvider>
        {showModal && (
          <ProjectModal 
            newProject={newProject}
            setShowModal={setShowModal} 
          />
        )}
        <DashboardNav setShowModal={setShowModal} />
        <KanbanBoard />
      </DashboardProvider>
    </div>
  );
}

export default DashBoardPage;
