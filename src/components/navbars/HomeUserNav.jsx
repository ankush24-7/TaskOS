import User from "./navbar-items/User";
import { homeNavIcons } from "../../assets/icons/icons";
import * as navbarComp from "./navbar-items/NavbarComp";

const HomeUserNav = ({ bgColor }) => {
  return (
    <nav className='flex flex-row-reverse gap-8 px-10 py-5 justify-between items-center'>
      <ul className="flex flex-row-reverse gap-8 items-center">
        <User />
        <navbarComp.RoundBtn Icon={ homeNavIcons.AddTask } />
        <navbarComp.RoundBtn Icon={ homeNavIcons.Bell } />
      </ul>
      <navbarComp.IconBtn 
        label="Customize"
        Icon={() => <homeNavIcons.Pen className="w-4 h-4" stroke="#fff" />}
        gap='2' 
      />
    </nav>
  );
};

export default HomeUserNav;
