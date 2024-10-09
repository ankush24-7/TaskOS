import { homeNavIcons } from "../assets/icons/icons";
import User from "./User";

const HomeNavUser = () => {
  return (
    <nav className="flex flex-row-reverse gap-8 justify-between items-center">
      <ul className="flex flex-row-reverse gap-8">
        <User />
        <button>
          <homeNavIcons.AddTask stroke="#fff" width="28" height="28" />
        </button>
        <button>
          <homeNavIcons.Bell stroke="#fff" width="28" height="28" />
        </button>
      </ul>

      <button className="flex gap-1.5 items-center border-[1.5px] border-white rounded-full px-3 py-2">
        <p className="text-white">Customize</p>
        <homeNavIcons.Pen className="w-5 h-5" stroke="#fff" />
      </button>
    </nav>
  );
};

export default HomeNavUser;
