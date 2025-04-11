import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import authAPI from "@/services/authAPI";
import useDropDown from "@/hooks/useDropDown";
import DisplayPicture from "./DisplayPicture";
import { useUser } from "@/contexts/UserContext";
import { Profile, Logout, Settings } from "@/assets/icons/icons";

const User = () => {
  const { user, setShowModal } = useUser();
  const { isOpen, setIsOpen, dropdownRef } = useDropDown();

  const handleClick = () => {
    setIsOpen(false);
    setShowModal(true);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full cursor-pointer"
        aria-label="display picture">
        <DisplayPicture 
          radius="44px"
          color={user?.color || "#B1401B"}
          firstName={user?.name?.firstName || ""}
          publicId={user?.displayPicture.publicId || ""}
        />
      </button>

      {isOpen && (
        <DropDown 
          showHeader={false}
          position="bottom-right"
          children={
            <div className="flex flex-col p-0.75 rounded-xl bg-neutral-800">
              <button 
                onClick={handleClick}
                className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-neutral-900">
                <Profile className="w-5 h-5 stroke-white" />
                <p>My Profile</p>
              </button>
              <Link to="/settings">
                <button className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-neutral-900">
                  <Settings className="w-5 h-5 stroke-white" />
                  <p>Settings</p>
                </button>
              </Link>
              <Link to="/">
                <button 
                  onClick={() => authAPI.logout()}
                  className="w-full flex gap-2 pl-2 pr-4 py-2 items-center whitespace-nowrap cursor-pointer rounded-xl text-white hover:bg-neutral-900">
                  <Logout className="w-5 h-5 stroke-white" />
                  <p>Logout</p>
                </button>
              </Link>
            </div>
          }
        />
      )}
    </div>
  );
};

export default User;