import { Link } from "react-router-dom"
import '../../styles/animations.css'

function ActivityBarItem({ Icon, label, to, expanded, stroke='#fff' }) {
    if (expanded) return (
        <Link to={to} className="activity-bar-item flex items-center py-2 px-3 rounded-lg hover:bg-[#1b234d]">
            <Icon className='w-7 h-7 fixed' stroke={stroke} />
            <p className={`act-bar-label text-lg ml-10 overflow-hidden`} style={{color: stroke}}>{label}</p>
        </Link>
    )
    else return (
        <Link to={to} className="activity-bar-item ml-1.5 p-2 rounded-full w-fit hover:bg-[#1b234d]">
            <Icon className='w-7 h-7' stroke={stroke} />
        </Link>
    );
}

export default ActivityBarItem;
