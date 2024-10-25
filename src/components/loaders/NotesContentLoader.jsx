import '../../styles/loaders.css';

const NotesContentLoader = () => {
  return (
    <div className='flex flex-col gap-5 h-full'>
      <nav className="flex items-end justify-between">
        <section className="w-1/6 h-12 rounded-lg bg-white/20"></section>
        <ul className="flex items-center gap-5">
          <section className="w-8 h-8 rounded-full bg-white/20"></section>
          <section className="w-8 h-8 rounded-full bg-white/20"></section>
          <section className="w-8 h-8 rounded-full bg-white/20"></section>
          <section className="w-12 h-12 rounded-full bg-white/20"></section>
        </ul>
      </nav>

      <div className="flex flex-col flex-grow w-full rounded-xl gap-4 p-5 bg-white/10">
        <div className="loader w-2/3 h-6 rounded-md"></div>
        <div className="loader w-1/2 h-6 rounded-md"></div>
        <div className="loader w-1/6 h-6 ml-14 rounded-md"></div>
        <div className="loader w-1/6 h-6 ml-14 rounded-md"></div>
        <div className="loader w-1/6 h-6 ml-14 rounded-md"></div>
        <div className="loader w-1/6 h-6 ml-14 rounded-md"></div>
        <div className="loader w-1/2 h-6 rounded-md"></div>
        <div className="loader w-1/2 h-6 rounded-md"></div>
        <div className="loader w-2/3 h-6 rounded-md"></div>
      </div>
    </div>
  );
};

export default NotesContentLoader;
