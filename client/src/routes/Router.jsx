import App from "@/App";
import Error404 from "@/pages/Error404";
import HomePage from "@/pages/home-page/HomePage";
import { Analytics } from "@vercel/analytics/react";
import LoginPage from "@/pages/auth-page/LoginPage";
import GuestPage from "@/pages/guest-page/GuestPage";
import SignUpPage from "@/pages/auth-page/SignUpPage";
import Settings from "@/pages/settings-page/Settings";
import { ToastProvider } from "@/contexts/ToastContext";
import Projects from "@/pages/projects-page/ProjectsPage";
import TimelinePage from "@/pages/timeline-page/TimelinePage";
import MyProcesses from "@/pages/my-processes-page/MyProcesses";
import DashBoardPage from "@/pages/dashboard-page/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Analytics />
        <Routes>
          <Route path="/" element={<GuestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          <Route path="/" element={<App />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/my-processes" element={<MyProcesses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects/:projectId/dashboard" element={<DashBoardPage />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default Router;
