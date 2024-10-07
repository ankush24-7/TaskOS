import { Link } from 'react-router-dom';
import { ActivityBarIcons } from '../../assets/icons/icons.jsx';



function ActivityBar(props) {  
  return (
    <>
      { props.expanded ? 
        <nav className='bg-[#111111] h-[100vh] w-48 flex flex-col px-1'>
          <ul className='flex flex-col gap-3 mt-[7.5rem]'>
            <button className='flex items-center gap-3 py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.SearchIcon className="w-7 h-7" />
              <p className='text-white text-xl'>Search</p>
            </button>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Sun className="w-7 h-7" />
              <p className='text-white text-xl'>Today</p>
            </button>
            <Link to="/dashboard" className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Rocket className="w-7 h-7" />
              <p className='text-white text-xl'>Projects</p>
            </Link>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Timeline className="w-7 h-7" stroke='#ffffff' />
              <p className='text-white text-xl'>Timeline</p>
            </button>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Star className="w-7 h-7" />
              <p className='text-white text-xl'>Starred</p>
            </button>
            <button className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
              <ActivityBarIcons.Complete className="w-7 h-7" stroke='#fff' />
              <p className='text-white text-xl'>Checklist</p>
            </button>
          </ul>
        </nav>
      :
        <div className='bg-[#111111] h-[100vh] w-20 flex flex-col items-center'>
          <ul className='flex flex-col gap-5 mt-[7.5rem]'>
            <button className='rounded-full p-1.5 hover:bg-[#1b234d]'>
              <ActivityBarIcons.SearchIcon className="w-7 h-7 mx-auto" />
            </button>
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
              <ActivityBarIcons.Complete className="w-7 h-7 mx-auto" stroke='#fff' />
            </button>
          </ul>
        </div>
      }
    </>
  )
}

export default ActivityBar;
