import User from "@/components/ui/User";
import { useUser } from "@/contexts/UserContext";

const HomeNav = ({ greeting }) => {
  const { user } = useUser();

  return (
    <header className="flex gap-8 justify-between items-center py-2 px-3 sm:px-10 sm:py-5">
      <h2 className="text-xl sm:text-2xl text-white">
        {`${greeting}, `}
        <span className="text-prim-yellow-200">{`${user?.name.firstName}!`}</span>
      </h2>
      <User />
    </header>
  );
};

export default HomeNav;
