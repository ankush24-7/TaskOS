import { navIcons } from "../../../assets/icons/icons.jsx";

function NavButton(props) {
  return (
    <button className="hover:bg-gray-200 rounded-full p-1 aspect-square">
      <props.Icon />
    </button>
  );
}

function Nav() {
  return (
    <div className="py-2.5 px-6 w-full flex items-center justify-between shadow-2xl">
      <button className="flex items-center rounded-full w-fit py-1 px-2 hover:bg-gray-200">
        < navIcons.CurrentProject className="w-6 rounded-full bg-cyan-400 p-0.5" />
        <p className="text-zinc-700 text-lg font-semibold pl-1">CurrentProject</p>
        < navIcons.ChevronDown className="mt-1 w-5 pl-0.5" />
      </button>
      <div className="flex justify-end items-center gap-8">
        <NavButton Icon={() => <navIcons.AddTask stroke="#2c2c31" />} />
        <NavButton Icon={() => <navIcons.Team stroke="#2c2c31" />} />
        <NavButton Icon={() => <navIcons.Timeline stroke="#2c2c31" />} />

        <button>
          < navIcons.User stroke="#2c2c31" width="30" height="30" />
        </button>
      </div>
    </div>
  );
}

export default Nav;