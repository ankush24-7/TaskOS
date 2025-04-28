import { forwardRef } from "react";
import BioForm from "./components/BioForm";
import Profile from "./components/Profile";
import { Close } from "@/assets/icons/icons";
import PersonalInfoForm from "./components/PersonalInfoForm";

const ProfileModal = forwardRef(({ user, setUser, viewOnly, handleModalClose }, ref) => {
  return (
    <div className="absolute z-20 inset-0 overflow-hidden backdrop-blur-[1px] bg-black/10">
      <div
        ref={ref}
        className="modal relative w-full md:w-3/4 h-full md:h-[36rem] z-10 top-1/2 left-1/2 -translate-x-1/2 flex flex-col
        -translate-y-1/2 md:rounded-3xl drop-shadow-[10px_10px_10px_rgba(0,0,0,0.5)] bg-neutral-800">
        <div className="h-34 rounded-t-3xl">
          <div className="absolute inset-0 h-17 md:rounded-t-3xl bg-prim-yellow-200"></div>
          <button
            onClick={handleModalClose}
            className="absolute top-4 right-4 p-0.5 cursor-pointer rounded-full border-[1.5px] border-white hover:bg-zinc-800">
            <Close className="w-5 h-5 stroke-white" />
          </button>

          <Profile user={user} setUser={setUser} viewOnly={viewOnly} />
        </div>

        <div className="h-110 flex flex-col gap-4 px-2 py-4 overflow-y-scroll scrollbar-hide">
          <PersonalInfoForm user={user} setUser={setUser} viewOnly={viewOnly} />
          <BioForm user={user} viewOnly={viewOnly} />
        </div>
      </div>
    </div>
  );
});

export default ProfileModal;
