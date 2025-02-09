import "@styles/media-query.css";
import React, { useState } from "react";
import HomePage from "@pages/home-page/HomePage";
import LoginPage from "@pages/auth-page/LoginPage";
import NotesPage from "@pages/notes-page/NotesPage";
import GuestPage from "@pages/guest-page/GuestPage";
import SignUpPage from "@pages/auth-page/SignUpPage";
import Projects from "@pages/projects-page/ProjectsPage";
import NoteEditorPage from "@pages/notes-page/NoteEditorPage";
import ActivityBar from "@components/activity-bar/ActivityBar";
import DashBoardPage from "@pages/dashboard-page/DashboardPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Router>
      <div className="h-dvh flex flex-col-reverse antialiased sm:flex-row">
        {isAuthenticated && (<ActivityBar setIsAuthenticated={setIsAuthenticated} />)}
        <Routes>
          <Route path="/" element={<GuestPage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} exact />
          <Route path="/projects" element={<Projects />} exact />
          <Route path="/projects/:projectId/dashboard" element={<DashBoardPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:notesTitle/:id" element={<NoteEditorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
