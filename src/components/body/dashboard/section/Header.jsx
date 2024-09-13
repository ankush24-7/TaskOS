function Header({ name, count, color}) {
    // use sectionId to access name, icon, color, and # of tasks of the header

    return (
        <div className="h-[3.75rem] flex justify-between items-center px-2 py-2" style={{backgroundColor : color}}>
            {/* <img src={iconId} alt="section_icon" /> */}
            <p className="text-white text-xl font-semibold leading-none"> {name} </p>
            <div className="w-6 h-6 rounded-full bg-[#18181b15] ">
                <p className="text-white text-center"> {count} </p>
            </div>
        </div>
    )
}

export default Header