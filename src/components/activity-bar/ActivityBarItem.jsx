function ActivityBarItem({ icon, label }) {
  return (
    <div>
      <img src={icon} alt={"logo_"+{icon}} className="w-7 mx-auto" />
      <p className='text-center text-zinc-500 text-xs pt-1'>{label}</p>
    </div>
  );
}

export default ActivityBarItem