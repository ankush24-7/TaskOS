import { useState, useRef } from "react";
import { Pen } from "@/assets/icons/icons";
import userAPI from "@/services/api/userAPI";
import { useToast } from "@/contexts/ToastContext";
import SpinLoader from "@/components/loaders/SpinLoader";

const BioForm = ({ user, viewOnly }) => {
  const bioRef = useRef(null);
  const { setToastMessage } = useToast();
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState(user.bio || "");
  const [isBioLoading, setIsBioLoading] = useState(false);

  const handleBioSave = async (e) => {
    e.preventDefault();
    setIsBioLoading(true);
    const { bio } = e.target;
    const userBio = { bio: bio.value };

    const { status, message } = await userAPI.updateUserInfo(userBio);
    if (status === 200) {
      setBio(bio.value);
      setEditBio(false);
    } else {
      setToastMessage({
        type: "error",
        message: message,
        position: "top-center",
      });
    }
    setIsBioLoading(false);
  }

  const handleEditClick = () => {
    setEditBio(true);
    setTimeout(() => {
      if (bioRef.current) {
        bioRef.current.focus(); 
        bioRef.current.setSelectionRange(bio.length, bio.length); 
      }
    }, 0);
  };

  return (
    <form onSubmit={handleBioSave} className="flex flex-col flex-grow gap-1.5">
      <div className="flex items-baseline justify-between px-2">
        <h2 className="text-lg text-white">Bio</h2>
        {editBio ? (
          isBioLoading ? (
            <SpinLoader width="18px" height="18px" />
          ) : (
            <span className="flex gap-2">
              <button
                onClick={() => setEditBio(false)}
                className="h-fit gap-1 px-2 py-0.5 -translate-y-1 cursor-pointer rounded-xl border border-white hover:bg-red-500">
                <p className="text-sm text-white">Cancel</p>
              </button>
              <button
                onClick={() => {}}
                className="h-fit gap-1 px-3 py-0.5 -translate-y-1 cursor-pointer rounded-xl border border-white hover:bg-prim-yellow-300">
                <p className="text-sm text-white">Save</p>
              </button>
            </span>
          )
        ) : (
          !viewOnly && (
            <button
              onClick={handleEditClick}
              className="flex h-fit gap-1 px-2 py-0.5 -translate-y-0.5 cursor-pointer items-center rounded-xl border border-white hover:bg-prim-black">
              <Pen className="w-3.5 h-3.5 stroke-white" />
              <p className="text-sm text-white">Edit</p>
            </button>
          )
        )}
      </div>

      {!editBio ? (
        <div className="flex-grow min-h-15 rounded-2xl px-2 py-1 border border-white/20">
          {bio.length > 0 ? (
            <p className="text-white">{bio}</p>
          ) : (
            <p className="text-[#8e8e8e]">Write something about yourself...</p>
          )}
        </div>
      ) : (
        <textarea
          name="bio"
          id="bio"
          ref={bioRef}
          placeholder="Write something about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="flex-grow min-h-15 rounded-2xl px-2 py-1 field-sizing-content vertical-scrollbar focus:outline-none border placehoder:text-gray-400 border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
        />
      )}
    </form>
  );
};

export default BioForm;
