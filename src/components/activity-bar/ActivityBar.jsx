import logo from '../../assets/logo.png';
import ActivityBarItem from './ActivityBarItem';
import { ActivityBarIcons } from '../../assets/icons/icons.jsx';

function ActivityBar() {
  return (
    <div className='bg-[#0a0f28] h-[100vh] w-[5.5%] flex flex-col items-center gap-8'>
      <button className='mt-5'>
        < ActivityBarIcons.User addedClass='w-[2.2rem] h-[2.2rem] p-1' />
      </button>
      <ActivityBarItem Icon={ ActivityBarIcons.SearchIcon } label='Search' />
      <ActivityBarItem Icon={ ActivityBarIcons.Rocket } label='Projects' />
    </div>
  )
}

export default ActivityBar;
