import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import DashBoard from './pages/Dashboard'
import Home from './pages/Home'
import ActivityBar from './components/activity-bar/ActivityBar'

function App() {
  const [isActivityBarExpanded, setIsActivityBarExpanded] = useState(true);
  
  return (
    <Router>
      <LocationHandler setIsActivityBarExpanded={setIsActivityBarExpanded} />
      <div className='flex'>
        <ActivityBar expanded={isActivityBarExpanded} />
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes>
      </div>
    </Router>
  )

  function LocationHandler({setIsActivityBarExpanded}) {
    const location = useLocation();

    useEffect(() => {
      setIsActivityBarExpanded((location.pathname === '/'));
    }, [location]);

    return null;
  }
} 

export default App
