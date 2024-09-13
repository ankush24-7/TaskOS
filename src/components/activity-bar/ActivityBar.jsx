import logo from '../../assets/logo.png';
import search from '../../assets/search.svg';
import project from '../../assets/project.svg';
import ActivityBarItem from './ActivityBarItem';

function ActivityBar() {
  return (
    <div className='bg-zinc-800 h-[100vh] w-[5.5%] flex flex-col items-center gap-8 drop-shadow-[2px_0px_3px_rgba(0,0,0,0.5)]'>
        <img src={logo} alt="logo" className='w-9 pt-8 pb-4 mr-1' />
        <ActivityBarItem icon={search} label='Search' />
        <ActivityBarItem icon={project} label='Projects' />
    </div>
  )
}

export default ActivityBar;
