function ActivityBarItem({ Icon, label }) {
  return (
    <button>
      <Icon className="w-7 mx-auto" />
      <p className='text-center text-zinc-500 text-xs pt-1'>{label}</p>
    </button>
  );
}

export default ActivityBarItem