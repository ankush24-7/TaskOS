import User from "@/components/ui/User";

const MyProcessesHeader = () => {
  return (
    <header className="flex justify-between items-center py-2 px-3 sm:py-2 sm:px-0">
      <h1 className="text-white text-3xl sm:text-4xl">Assigned</h1>
      <User />
    </header>
  );
};

export default MyProcessesHeader;
