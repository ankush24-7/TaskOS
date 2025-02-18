import { useParams } from "react-router-dom";
import KanbanBoard from "./components/KanbanBoard";
import DashboardNav from "./components/DashboardNav";
import { DashboardProvider } from "@/contexts/DashboardContext";

/*
  [ ] Fetch processes by projectId and filter by sections 
*/

function DashBoardPage() {
  const projectId = useParams().projectId;

  return (
    <div className="h-screen w-full flex flex-col pb-0.5 px-7 overflow-y-hidden bg-gradient-to-r from-grad-l to-grad-r">
      <DashboardProvider projectId={projectId}>
        <DashboardNav />
        <KanbanBoard />
      </DashboardProvider>
    </div>
  );
}

export default DashBoardPage;
