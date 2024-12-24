import React, { useState } from 'react'
import './styles/media-query.css'
import Login from './pages/Login'
import Notes from './pages/Notes'
import SignUp from './pages/SignUp'
import HomeUser from './pages/HomeUser'
import Projects from './pages/Projects'
import DashBoard from './pages/Dashboard'
import HomeGuest from './pages/HomeGuest'
import NotesContent from './pages/NotesContent'
import ActivityBar from './components/activity-bar/ActivityBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() { 
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Router>
      <div className='h-dvh flex flex-col-reverse antialiased sm:flex-row'>
        {isAuthenticated && <ActivityBar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path='/' element={<HomeGuest />} exact />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />

          <Route path='/home' element={<HomeUser />} exact />
          <Route path='/projects' element={<Projects />} exact />
          <Route path='/projects/dashboard/:projectName' element={<DashBoard />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/notes/:notesTitle/:id' element={<NotesContent />} />
        </Routes>
      </div>
    </Router>
  )
} 

export default App
