import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ActivityBar from "@components/activity-bar/ActivityBar";

function App() {
  return (
    <div className="h-dvh flex flex-col-reverse antialiased sm:flex-row">
      <AuthProvider>
        <ActivityBar />
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
