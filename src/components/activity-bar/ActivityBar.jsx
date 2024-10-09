import ActivityBarItem from './ActivityBarItem';
import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { activityBarIcons } from '../../assets/icons/icons.jsx';
import '../../styles/animations.css';

function ActivityBar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [expanded, setExpanded] = useState(isHomePage);

  useMemo(() => {
    setExpanded(isHomePage);
  },[isHomePage]);
  
  const renderCollapseButton = (expanded) => {
    const style = expanded 
      ? 
        'flex items-center gap-2 py-2 px-2.5 rounded-lg'
      :
        'w-fit p-1.5 ml-1 rounded-full';

    return (
      <button 
        className={style + ' activity-bar-item hover:bg-[#1b234d]'}
        onClick={() => setExpanded(!expanded)}
      >
        <activityBarIcons.ChevronsLeft className={`w-8 h-8 chevron-left ${expanded ? 'rotate-0': '-rotate-180'}`} stroke='#7F7D76' />
        { expanded && <p className='act-bar-label text-lg overflow-hidden w-fit' style={{color: '#7F7D76'}}>Collapse</p> }
      </button>
    );
  }

  return (
    <nav 
      className={`activity-bar bg-[#111] h-[100vh] flex flex-col px-1.5 pt-6 pb-3 ${expanded ? 'w-[13rem]': 'w-20'}`}
    >
      <Link to="/" className='flex ml-1.5 items-end'>
        <activityBarIcons.Logo className='w-12 h-12 fixed' />
        <p className={`act-bar-label text-white text-3xl ml-[2.75rem] overflow-hidden ${expanded ? 'w-fit': 'w-0'}`}>TaskOS</p>
      </Link>

      <ul className='flex flex-col gap-2 mt-[4.75rem] flex-grow'>
        <ActivityBarItem Icon={activityBarIcons.Home} label="Home" to="/" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Timeline} label="Timeline" to="/timeline" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Rocket} label="Projects" to="/dashboard" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Star} label="Starred" to="/starred" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.MyTasks} label="My Tasks" to="/my-tasks" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Notes} label="Notes" to="/notes" expanded={expanded} />        
      </ul>

      <ul className='flex flex-col gap-0.5'>
        { renderCollapseButton(expanded) }
        <ActivityBarItem Icon={activityBarIcons.Settings} label="Settings" to="/settings" expanded={expanded} stroke="#7F7D76" />
        <ActivityBarItem Icon={activityBarIcons.QuestionMark} label="Help" to="/help" expanded={expanded} stroke="#7F7D76" />
      </ul>
    </nav>
  )
}

export default ActivityBar;