import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardNav from "./components/DashboardNav";
import KanbanBoard from "./components/KanbanBoard";

function DashBoardPage() {
  const _id = useParams().projectId;
  useEffect(() => {
    // getProjectByID(_id);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col pb-0.5 overflow-y-hidden bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <DashboardNav />
      <KanbanBoard />
    </div>
  );
}

export default DashBoardPage;
