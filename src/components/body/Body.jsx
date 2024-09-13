import Nav from './nav/Nav';
import DashBoard from './dashboard/Dashboard';

function Body() {
  return (
    <div className="w-full overflow-y-hidden">
      <Nav />
      <DashBoard />
    </div>
  );
}

export default Body