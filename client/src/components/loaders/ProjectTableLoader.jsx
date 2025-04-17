const ProjectTableLoader = () => {
  return (
    <div className="w-full flex justify-between items-center h-14 rounded-lg bg-white/5">
      <div className="flex w-[32%] h-5 pl-2">
        <span className="loader-pulse h-5 w-1/2 rounded-md" />
      </div>
      <div className="flex w-[16%] h-5">
        <span className="loader-pulse h-5 w-1/2 rounded-md" />
      </div>
      <div className="flex w-[16%] h-5">
        <span className="loader-pulse h-5 w-1/2 rounded-md" />
      </div>
      <div className="flex w-[16%] h-5">
        <span className="loader-pulse h-5 w-1/2 rounded-md" />
      </div>
      <div className="flex w-[16%] h-5">
        <span className="loader-pulse h-5 w-1/2 rounded-md" />
      </div>
    </div>
  );
};

export default ProjectTableLoader;
