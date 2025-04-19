const ProjectCardLoader = () => {
  return (
    <div className="w-full sm:hidden flex justify-between px-3 py-2.5 mt-0.5 items-center rounded-2xl bg-white/2">
      <span className="flex gap-2.5 items-center">
        <p className="loader-pulse h-5 w-14 rounded-md" />
        <p className="loader-pulse h-4 w-10 rounded-2xl" />
      </span>
      <span className="flex gap-4 items-center">
        <span className="loader-pulse h-6 w-6 rounded-full" />
        <span className="loader-pulse h-6 w-6 rounded-full" />
      </span>
    </div>
  );
};

export default ProjectCardLoader;
