import BioForm from "./components/BioForm";
import Profile from "./components/Profile";
import { Close } from "@/assets/icons/icons";
import PersonalInfoForm from "./components/PersonalInfoForm";

const ProfileModal = ({ user, setUser, viewOnly, handleModalClose }) => {
  return (
    <div className="absolute z-20 inset-0 overflow-hidden backdrop-blur-[1px] bg-black/10">
      <div
        className="modal relative w-[37rem] h-[36rem] z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl 
        drop-shadow-[10px_10px_10px_rgba(0,0,0,0.5)] bg-neutral-800 flex flex-col">
        <div className="h-32 rounded-t-3xl">
          <div className="absolute inset-0 h-20 rounded-t-3xl bg-prim-yellow-200"></div>
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 p-0.5 cursor-pointer rounded-full border-[1.5px] border-white hover:bg-zinc-800">
            <Close className="w-5 h-5 stroke-white" />
          </button>

          <Profile user={user} setUser={setUser} viewOnly={viewOnly} />
        </div>

        <div className="h-112 flex flex-col gap-4 px-2 py-4 overflow-y-scroll scrollbar-hide">
          <PersonalInfoForm user={user} setUser={setUser} viewOnly={viewOnly} />
          <BioForm user={user} viewOnly={viewOnly} />
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
