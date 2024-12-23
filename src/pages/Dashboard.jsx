import DashboardNav from '../components/navbars/DashboardNav';
import KanbanBoard from '../components/kanban-board/KanbanBoard';

function DashBoard() {
  return (
    <div className="h-screen w-full flex flex-col pb-0.5 overflow-y-hidden bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <DashboardNav />
      <KanbanBoard />
    </div>
  );
}

export default DashBoard;