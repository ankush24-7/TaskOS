import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import "@/assets/styles/global.css";
import "@/assets/styles/loaders.css";
import Error404 from '@/pages/Error404';
import "@/assets/styles/scrollbars.css";
import "@/assets/styles/animations.css";
import "@/assets/styles/text-editor.css";
import "@/assets/styles/media-query.css";
import { createRoot } from 'react-dom/client';
import HomePage from "@/pages/home-page/HomePage";
import LoginPage from "@/pages/auth-page/LoginPage";
import GuestPage from "@/pages/guest-page/GuestPage";
import SignUpPage from "@/pages/auth-page/SignUpPage";
import Settings from '@/pages/settings-page/Settings';
import { ToastProvider } from './contexts/ToastContext';
import Projects from "@/pages/projects-page/ProjectsPage";
import TimelinePage from '@/pages/timeline-page/TimelinePage';
import MyProcesses from '@/pages/my-processes-page/MyProcesses';
import DashBoardPage from "@/pages/dashboard-page/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<GuestPage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/" element={<App />} >
            <Route path="/home" element={<HomePage />} exact />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/projects" element={<Projects />} exact />
            <Route path="/my-processes" element={<MyProcesses />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects/:projectId/dashboard" element={<DashBoardPage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </ToastProvider>
    </Router>
  </StrictMode>,
)
