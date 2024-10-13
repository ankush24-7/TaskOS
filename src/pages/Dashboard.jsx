import DashboardNav from '../components/navbars/DashboardNav';
import KanbanBoard from '../components/kanban-board/KanbanBoard';

function DashBoard() {
  return (
    <div className="h-[100vh] w-full overflow-y-hidden">
      <DashboardNav />
      <KanbanBoard />
    </div>
  );
}

export default DashBoard;