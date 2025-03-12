import './index.css';
import App from './App.jsx';
import '@styles/global.css';
import "@styles/scrollbars.css";
import "@styles/text-editor.css";
import "@styles/media-query.css";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from "@pages/home-page/HomePage";
import LoginPage from "@pages/auth-page/LoginPage";
import GuestPage from "@pages/guest-page/GuestPage";
import SignUpPage from "@pages/auth-page/SignUpPage";
import Projects from "@pages/projects-page/ProjectsPage";
import DashBoardPage from "@pages/dashboard-page/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<GuestPage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<App />} >
          <Route path="/home" element={<HomePage />} exact />
          <Route path="/projects" element={<Projects />} exact />
          <Route path="/projects/:projectId/dashboard" element={<DashBoardPage />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
)
