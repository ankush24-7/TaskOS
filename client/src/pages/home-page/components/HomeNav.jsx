import User from "@/components/ui/User";
import { useUser } from "@/contexts/UserContext";

const HomeNav = ({ greeting }) => {
  const { user } = useUser();

  return (
    <header className="flex gap-8 justify-between items-center pt-1 md:pt-5 lg:py-5">
      <h2 className="text-lg md:text-2xl text-white">
        {`${greeting}, `}
        <span className="text-prim-yellow-200">{`${user?.name.firstName}!`}</span>
      </h2>
      <User />
    </header>
  );
};

export default HomeNav;
