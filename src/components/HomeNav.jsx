import { homeNavIcons } from "../assets/icons/icons";

const HomeNav = () => {
  return (
    <nav className="flex flex-row-reverse pt-5 gap-8 justify-between">
      <ul className="flex flex-row-reverse gap-8">
        <button>
          <homeNavIcons.User addedClass="w-10 h-10" />
        </button>
        <button>
          <homeNavIcons.QuestionMark className="w-7 h-7" stroke="#fff" />
        </button>
        <button>
          <homeNavIcons.AddTask stroke="#fff" width="28" height="28" />
        </button>
      </ul>

      <button className="flex gap-1.5 items-center border-[1px] border-white rounded-full px-3 py-1">
        <p className="text-white">Customize</p>
        <homeNavIcons.Pen className="w-5 h-5" stroke="#fff" />
      </button>
    </nav>
  );
};

export default HomeNav;
