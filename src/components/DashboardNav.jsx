import { dashboardNavIcons } from "../assets/icons/icons.jsx";

function NavButton(props) {
  return (
    <button className="hover:bg-gray-200 rounded-full p-1 aspect-square">
      <props.Icon />
    </button>
  );
}

function DashboardNav() {
  return (
    <nav className="py-2.5 px-6 w-full flex items-center justify-between shadow-2xl">
      <button className="flex items-center rounded-full w-fit py-1 px-2 hover:bg-gray-200">
        < dashboardNavIcons.CurrentProject className="w-6 rounded-full bg-cyan-400 p-0.5" />
        <p className="text-zinc-700 text-lg font-semibold pl-1">CurrentProject</p>
        < dashboardNavIcons.ChevronDown className="mt-1 w-5 pl-0.5" />
      </button>
      <div className="flex justify-end items-center gap-8">
        <dashboardNavIcons.AddTask Icon={() => <dashboardNavIcons.AddTask stroke="#2c2c31" />} />
        <dashboardNavIcons.Team Icon={() => <dashboardNavIcons.Team stroke="#2c2c31" />} />
        <dashboardNavIcons.Timeline Icon={() => <dashboardNavIcons.Timeline stroke="#2c2c31" height="22" />} />
      </div>
    </nav>
  );
}

export default DashboardNav;