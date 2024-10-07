import Nav from '../components/Nav';
import KanbanBoard from '../components/kanban-board/KanbanBoard';

function DashBoard() {
  return (
    <div className="h-[100vh] w-full overflow-y-hidden">
      <Nav />
      <KanbanBoard />
    </div>
  );
}

export default DashBoard;