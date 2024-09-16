import add from "../../../assets/add.svg";
import down from "../../../assets/down.svg";
import user from "../../../assets/user.svg";
import checklist from "../../../assets/checklist.png";

function Nav() {
  return (
    <div className="py-3 px-6 w-full flex items-center justify-between shadow-2xl">
      <button className="flex items-center rounded-full w-fit py-1 px-2 hover:bg-gray-200">
        <img src={checklist} alt="" className="w-6 rounded-full" />
        <p className="text-zinc-700 text-lg font-semibold pl-1">Current Project</p>
        <img src={down} alt="logo_down" className="mt-1 w-5 pl-0.5" />
      </button>
      <div className="flex justify-end items-center gap-8">
        <button>
          <img src={add} alt="logo_add" className="w-6" />
        </button>
        <button>
          <img src={user} alt="logo_user" className="w-8" />
        </button>
      </div>
    </div>
  );
}

export default Nav;
