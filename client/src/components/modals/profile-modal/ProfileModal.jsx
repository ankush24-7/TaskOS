import { useState } from "react";
import Bio from "./components/Bio";
import EditBio from "./components/EditBio";
import Profile from "./components/Profile";
import { Pen, Close } from "@/assets/icons/icons";
import PersonalInfo from "./components/PersonalInfo";
import EditPersonalInfo from "./components/EditPersonalInfo";

const ProfileModal = ({ user, setUser, viewOnly, handleModalClose}) => {
  const [editInfo, setEditInfo] = useState(false);

  return (
    <div className="absolute z-20 inset-0 overflow-hidden backdrop-blur-[1px] bg-black/10">
      <div className="modal relative w-[37rem] h-[36rem] z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 pb-3 flex flex-col rounded-3xl drop-shadow-[10px_10px_10px_rgba(0,0,0,0.5)] bg-neutral-800">
        <div className="absolute inset-0 bottom-[88%] rounded-t-3xl -z-10 bg-prim-yellow-200"></div>
        <button
          onClick={handleModalClose}
          className="absolute top-4 right-4 p-0.5 cursor-pointer rounded-full border-[1.5px] border-white hover:bg-zinc-800">
          <Close className="w-5 h-5 stroke-white" />
        </button>

        <Profile 
          user={user}
          setUser={setUser}
          viewOnly={viewOnly}
        />

        <div className="flex items-baseline justify-between mt-4 px-2">
          <h2 className="text-lg text-white">Personal Info</h2>
          {editInfo ? (
            <span className="flex gap-2">
              <button 
                onClick={() => setEditInfo(false)}
                className="h-fit gap-1 px-2 py-1 -translate-y-1 cursor-pointer rounded-xl border border-white hover:bg-red-500">
                <p className="text-sm text-white">Cancel</p>
              </button>
              <button 
                onClick={() => {}}
                className="h-fit gap-1 px-3 py-1 -translate-y-1 cursor-pointer rounded-xl border border-white hover:bg-prim-yellow-300">
                <p className="text-sm text-white">Save</p>
              </button>
            </span>
          ) : !viewOnly && (
            <button 
              onClick={() => setEditInfo(true)}
              className="flex h-fit gap-1 px-2 py-1 -translate-y-1 items-center cursor-pointer rounded-xl border border-white hover:bg-prim-black">
              <Pen className="w-3.5 h-3.5 stroke-white" />
              <p className="text-sm text-white">Edit</p>
            </button>
          )}
        </div>
        {editInfo ? (
          <EditPersonalInfo 
            user={user}
            setUser={setUser}
          />
        ) : (
          <PersonalInfo user={user} /> 
        )}

        {viewOnly 
          ? user.bio.length > 0 && <Bio bio={user.bio} />
          : <EditBio bio={user.bio} setUser={setUser} />
        }
      </div>
    </div>
  );
};

export default ProfileModal;
