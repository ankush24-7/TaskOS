import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ActivityBar from "@components/activity-bar/ActivityBar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <div className="h-dvh flex flex-col-reverse antialiased sm:flex-row">
      {isAuthenticated && (<ActivityBar setIsAuthenticated={setIsAuthenticated} />)}
      <Outlet />
    </div>
  );
}

export default App;
