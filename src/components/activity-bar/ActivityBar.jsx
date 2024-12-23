import ActivityBarItem, { CollapseButton, GrayButton } from './ActivityBarItem';
import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { activityBarIcons } from '../../assets/icons/icons.jsx';

function ActivityBar({ setIsAuthenticated }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';
  const [expanded, setExpanded] = useState(isHomePage);

  useMemo(() => {
    setExpanded(isHomePage);
  },[isHomePage]);
  
  
  const handleLogout = () => {
    console.log('Logging out...');
    setIsAuthenticated(false);
  }

  return (
    <nav className={`activity-bar bg-[#111] h-[100vh] flex flex-col px-1.5 pt-6 pb-3 ${expanded ? 'w-[13rem]': 'w-[4.5rem]'}`}>
      <Link to="/home" className='flex ml-1.5 items-end -translate-x-1'>
        <activityBarIcons.LogoIcon className='w-12 h-12 fixed translate-x-1 -translate-y-1.5' />
        <p className={`act-bar-label text-white text-4xl ml-[2.75rem] overflow-hidden font-inconsolata ${expanded ? 'w-fit': 'w-0'}`}>
          TaskOS
        </p>
      </Link>

      <ul className='flex flex-col gap-2 mt-[4.75rem] flex-grow'>
        <ActivityBarItem Icon={activityBarIcons.Home} label="Home" to="/home" expanded={expanded} currentPath={location.pathname} />
        <ActivityBarItem Icon={activityBarIcons.Timeline} label="Timeline" to="/timeline" expanded={expanded} currentPath={location.pathname} />
        <ActivityBarItem Icon={activityBarIcons.Rocket} label="Projects" to="/projects" expanded={expanded} currentPath={location.pathname} />
        <ActivityBarItem Icon={activityBarIcons.Star} label="Starred" to="/starred" expanded={expanded} currentPath={location.pathname} />
        <ActivityBarItem Icon={activityBarIcons.MyTasks} label="My Tasks" to="/my-tasks" expanded={expanded} currentPath={location.pathname} />
        <ActivityBarItem Icon={activityBarIcons.Notes} label="Notes" to="/notes" expanded={expanded} currentPath={location.pathname} />        
      </ul>

      <ul className='flex flex-col gap-0.5'>
        <CollapseButton expanded={expanded} setExpanded={setExpanded} />
        <GrayButton Icon={activityBarIcons.Settings} label="Settings" to="/" expanded={expanded} />
        <GrayButton Icon={activityBarIcons.Logout} label="Logout" to="/" expanded={expanded} onClick={ handleLogout } />
      </ul>
    </nav>
  )
}

export default ActivityBar;