import { Link } from 'react-router-dom';
import { ActivityBarIcons } from '../../assets/icons/icons.jsx';

function ActivityBar(props) {  
  return (
    <>
      { props.expanded ? 
        <nav className='bg-[#111111] h-[100vh] w-[14rem] flex flex-col px-1'>
          <Link to="/" className='flex mt-5 items-center'>
            <ActivityBarIcons.Logo className='w-12 h-12' />
            <p className='text-white text-3xl'>TaskOS</p>
          </Link>

          <ul className='flex flex-col gap-3 mt-[3.5rem]'>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Sun className="w-7 h-7" />
              <p className='text-white text-lg'>Today</p>
            </button>
            <Link to="/dashboard" className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Rocket className="w-7 h-7" />
              <p className='text-white text-lg'>Projects</p>
            </Link>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Timeline className="w-7 h-7" stroke='#ffffff' />
              <p className='text-white text-lg'>Timeline</p>
            </button>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Star className="w-7 h-7" />
              <p className='text-white text-lg'>Starred</p>
            </button>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Notes className="w-7 h-7" stroke='#fff' />
              <p className='text-white text-lg'>Notes</p>
            </button>
          </ul>
        </nav>
      :
        <div className='bg-[#111111] h-[100vh] w-20 flex flex-col items-center'>
          <Link to="/">
            <ActivityBarIcons.Logo className='w-12 h-12 mt-5' />
          </Link>
          <ul className='flex flex-col gap-[1.15rem] mt-[3.5rem]'>
            <button className='rounded-full p-1.5 hover:bg-[#1b234d]'>
              <ActivityBarIcons.Sun className="w-7 h-7 mx-auto" />
            </button>
            <button className='rounded-full p-1.5 hover:bg-[#1b234d]'>
              <ActivityBarIcons.Rocket className="w-7 h-7 mx-auto" />
            </button>
            <button className='rounded-full p-1.5 hover:bg-[#1b234d]'>
              <ActivityBarIcons.Timeline className="w-7 h-7 mx-auto" stroke='#fff' />
            </button>
            <button className='rounded-full p-1.5 hover:bg-[#1b234d]'>
              <ActivityBarIcons.Star className="w-7 h-7 mx-auto" />
            </button>
            <button className='rounded-full p-1.5 hover:bg-[#1b234d]'>
              <ActivityBarIcons.Notes className="w-7 h-7 mx-auto" stroke='#fff' />
            </button>
          </ul>
        </div>
      }
    </>
  )
}

export default ActivityBar;
