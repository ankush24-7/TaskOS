import React, { useState } from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import HomeUser from './pages/HomeUser'
import Projects from './pages/Projects'
import DashBoard from './pages/Dashboard'
import HomeGuest from './pages/HomeGuest'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ActivityBar from './components/activity-bar/ActivityBar'

function App() { 
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  return (
    <Router>
      <div className='flex'>
        {isAuthenticated && <ActivityBar setIsAuthenticated={setIsAuthenticated} />}
        <Routes>
          <Route path='/' element={<HomeGuest />} exact />
          <Route path='/home' element={<HomeUser />} exact />
          <Route path='/projects' element={<Projects />} exact />
          <Route path='/projects/dashboard/:projectName' element={<DashBoard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  )
} 

export default App
