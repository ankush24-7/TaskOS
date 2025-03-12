import { Outlet } from "react-router-dom";
import ActivityBar from "@components/activity-bar/ActivityBar";

function App() {
  return (
    <div className="h-dvh flex flex-col-reverse antialiased sm:flex-row">
      <ActivityBar />
      <Outlet />
    </div>
  );
}

export default App;
