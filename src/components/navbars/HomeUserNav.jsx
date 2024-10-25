import User from "./navbar-items/User";
import { homeNavIcons } from "../../assets/icons/icons";
import * as navbarComp from "./navbar-items/NavbarComp";

const HomeUserNav = ({ bgColor }) => {
  return (
    <nav className='flex gap-8 px-10 py-5 justify-between items-center'>
      <navbarComp.IconBtn 
        label="Customize"
        Icon={() => <homeNavIcons.Pen className="w-4 h-4" stroke="#fff" />}
        gap='2' 
      />
      <ul className="flex gap-8 items-center">
        <navbarComp.RoundBtn Icon={ homeNavIcons.Bell } />
        <navbarComp.RoundBtn Icon={ homeNavIcons.AddTask } />
        <User />
      </ul>
    </nav>
  );
};

export default HomeUserNav;
