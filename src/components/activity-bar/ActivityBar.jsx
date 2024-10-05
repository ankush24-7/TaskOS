import logo from '../../assets/logo.png';
import ActivityBarItem from './ActivityBarItem';
import { SearchIcon, Rocket } from '../../assets/icons/icons.jsx';

function ActivityBar() {
  return (
    <div className='bg-[#10101c] h-[100vh] w-[5.5%] flex flex-col items-center gap-8'>
        <img src={logo} alt="logo" className='w-9 pt-8 pb-4 mr-1' />
        <ActivityBarItem Icon={ SearchIcon } label='Search' />
        <ActivityBarItem Icon={ Rocket } label='Projects' />
    </div>
  )
}

export default ActivityBar;
