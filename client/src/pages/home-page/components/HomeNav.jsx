import * as navBtns from "@navbtns";
import { homeNavIcons } from "@icons";
import Logo from "@/components/ui/Logo";
import User from "@/components/ui/User";

const HomeNav = ({ greeting, user }) => {
  return (
    <header className="flex gap-8 justify-between items-center py-2 px-3 sm:px-10 sm:py-5">
      <span className="block sm:hidden">
        <Logo />
      </span>
      <h2 className="text-white text-2xl self-end">
        {`${greeting}, `}
        <span className="text-prim-yellow-200">{`${user.firstName}!`}</span>
      </h2>
      <ul className="flex items-center sm:gap-8">
        <span className="hidden gap-8 sm:flex">
          <navBtns.RoundBtn Icon={homeNavIcons.AddTask} label="Add" />
        </span>
        <User />
      </ul>
    </header>
  );
};

export default HomeNav;
