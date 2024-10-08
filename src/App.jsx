import React from 'react'
import Home from './pages/Home'
import DashBoard from './pages/Dashboard'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ActivityBar from './components/activity-bar/ActivityBar'

function App() { 
  return (
    <Router>
      <div className='flex'>
        <ActivityBar />
          <Routes>
            <Route path='/' element={<Home />} exact />
            <Route path='/dashboard' element={<DashBoard />} />
          </Routes>
      </div>
    </Router>
  )
} 

export default App
