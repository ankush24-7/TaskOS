import { Link } from "react-router-dom"
import '../../styles/animations.css'

function ActivityBarItem({ Icon, label, to, expanded, stroke='#fff' }) {
    const style = expanded ?
        'flex items-center py-2 px-3 rounded-lg overflow-hidden' :
        `ml-1.5 p-2 rounded-full w-fit h-fit`;

    return (
        <Link to={to} className={style + ' activity-bar-item hover:bg-[#1b234d]'}>
            <Icon className={`w-7 h-7 ${expanded ? 'fixed':''} `} stroke={stroke} />
            <p className={`text-lg ml-10 text-nowrap ${expanded ? 'relative opacity-100': 'absolute opacity-0'} `} style={{color: stroke}}>{label}</p>
        </Link>
    );
}

export default ActivityBarItem;
