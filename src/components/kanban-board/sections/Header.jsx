function Header(props) {   
  const { name, count, headerColor, Icon } = props.sectionData;
  return (
    <div 
      {...props.attributes}
      {...props.listeners}
      className="h-[3.75rem] w-full rounded-t-lg cursor-grab" 
      style={{ backgroundColor: headerColor }}
    >
      <div className="flex justify-between items-center px-3  h-full gap-1">
        <div className="flex items-center grow">
          <button 
            className="rounded-full p-1 hover:bg-[#18181b20]"
            onClick={ () => console.log("clicked") }
          >
            <Icon />
          </button>
          <button className="rounded-lg hover:bg-[#1113] grow py-3 pl-1">
            <p className="text-white text-xl leading-none text-start">
              {name}
            </p>
          </button>
        </div>
        <div className="w-5 h-5 rounded-full bg-[#18181b15] ">
          <p className="text-white text-sm text-center"> {count} </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
