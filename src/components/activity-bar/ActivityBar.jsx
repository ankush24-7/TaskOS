import { Link } from 'react-router-dom';
import { ActivityBarIcons } from '../../assets/icons/icons.jsx';

const ActivityBarItem = ({ Icon, label, to, expanded }) => {
  const content = (
    <>
      <Icon className={`w-7 h-7 ${!expanded && 'mx-auto'}`} stroke="#fff" />
      { expanded && <p className='text-white text-lg'>{label}</p> }
    </>
  );
  
  return (
    expanded ? (
      <Link to={to} className='flex items-center gap-[12px] py-2 px-1 rounded-lg hover:bg-[#1b234d]'>
        { content }
      </Link>
    ) : (
      <Link to={to} className='p-1.5 rounded-full hover:bg-[#1b234d]'>
        { content }
      </Link>
    )
  );
}

function ActivityBar(props) {
  const { expanded } = props;  
  return (
    <nav className={`bg-[#111111] h-[100vh] flex flex-col px-1 ${expanded ? 'w-[14rem]': 'w-20 items-center'}`}>
      <Link to="/" className='flex mt-5 items-center'>
        <ActivityBarIcons.Logo className='w-12 h-12' />
        { expanded && <p className='text-white text-3xl'>TaskOS</p>}
      </Link>

      <ul className={`flex flex-col mt-[3.5rem] ${expanded ? 'gap-3': 'gap-[1.15rem]'}`}>
        <ActivityBarItem Icon={ActivityBarIcons.Sun} label="Today" to="/today" expanded={expanded} />
        <ActivityBarItem Icon={ActivityBarIcons.Rocket} label="Projects" to="/dashboard" expanded={expanded} />
        <ActivityBarItem Icon={ActivityBarIcons.Timeline} label="Timeline" to="/timeline" expanded={expanded} />
        <ActivityBarItem Icon={ActivityBarIcons.Star} label="Starred" to="/starred" expanded={expanded} />
        <ActivityBarItem Icon={ActivityBarIcons.Notes} label="Notes" to="/notes" expanded={expanded} />
      </ul>
    </nav>
  )
}

export default ActivityBar;