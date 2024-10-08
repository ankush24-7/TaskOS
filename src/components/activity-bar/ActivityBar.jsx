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
    if (expanded) return (
      <button 
        className='flex items-center gap-2 py-2 px-2.5 rounded-lg hover:bg-[#1b234d]'
        onClick={() => setExpanded(false)}
      >
        <activityBarIcons.ChevronsRight className='w-8 h-8 -rotate-180' stroke='#7F7D76' />
        <p className='act-bar-label text-lg overflow-hidden w-fit' style={{color: '#7F7D76'}}>Collapse</p>
      </button>
    )
    else return (
      <button 
        className='w-fit p-1.5 ml-1 rounded-full hover:bg-[#1b234d]'
        onClick={() => setExpanded(true)}
      >
        <activityBarIcons.ChevronsRight className='w-8 h-8' stroke='#7F7D76' />
      </button>
    );
  }

  return (
    <nav 
      className={`activity-bar bg-[#111] h-[100vh] flex flex-col px-1.5 justify-evenly ${expanded ? 'w-[14rem]': 'w-20'}`}
    >
      <Link to="/" className='flex ml-1.5 items-end'>
        <activityBarIcons.Logo className='w-12 h-12 fixed' />
        <p className={`act-bar-label text-white text-3xl ml-[2.75rem] overflow-hidden ${expanded ? 'w-fit': 'w-0'}`}>TaskOS</p>
      </Link>

      <ul className='flex flex-col mt-[3.5rem] gap-3'>
        <ActivityBarItem Icon={activityBarIcons.Sun} label="Today" to="/today" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Rocket} label="Projects" to="/dashboard" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Star} label="Starred" to="/starred" expanded={expanded} />
        <ActivityBarItem Icon={activityBarIcons.Notes} label="Notes" to="/notes" expanded={expanded} />        
      </ul>

      <ul className='flex flex-col mt-[3.5rem] gap-0.5'>
        { renderCollapseButton(expanded) }
        <ActivityBarItem Icon={activityBarIcons.Settings} label="Settings" to="/settings" expanded={expanded} stroke="#7F7D76" />
        <ActivityBarItem Icon={activityBarIcons.QuestionMark} label="Help" to="/help" expanded={expanded} stroke="#7F7D76" />
      </ul>
    </nav>
  )
}

export default ActivityBar;