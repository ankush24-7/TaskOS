import { useState } from "react";
import userAPI from "@/services/api/userAPI";
import { useToast } from "@/contexts/ToastContext";
import { CameraIcon, Del } from "@/assets/icons/icons";
import DisplayPicture from "@/components/ui/DisplayPicture";
import ProfileLoader from "@/components/loaders/ProfileLoader";

const Profile = ({ user, setUser, viewOnly }) => {
  const { setToastMessage } = useToast();
  const [uploading, setUploading] = useState(false);

  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024;
      if (fileSize > 3) {
        setToastMessage({
          message: "Please upload an image smaller than 3MB",
          type: "error",
          position: "top-center",
        });
        return;
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("displayPicture", file);
      const { status, displayPicture } = await userAPI.postDisplayPicture(formData);

      setUploading(false);

      if (status === 200) {
        setUser((prev) => {
          return {
            ...prev,
            displayPicture: { publicId: displayPicture.publicId },
          };
        });
      }
    }
  };

  const handlePictureDelete = async () => {
    setUploading(true);
    const { status } = await userAPI.deleteDisplayPicture();
    if (status === 200) {
      setUser((prev) => {
        return {
          ...prev,
          displayPicture: {
            publicId: null,
          },
        };
      });
    } else {
      setToastMessage({
        message: "Failed to delete display picture",
        type: "error",
        position: "top-center",
      });
    }
    setUploading(false);
  };

  return (
    <div className="relative w-fit h-23.5 mt-9 ml-4.5">
      {uploading && (
        <div className="absolute inset-0 rounded-full">
          <ProfileLoader
            width={2}
            radius={47}
            color="#F0AD05"
          />
        </div>
      )}

      <button className="rounded-full p-0.5 bg-white">
        <DisplayPicture
          radius="90px"
          color={user.color}
          firstName={user.name.firstName}
          publicId={user.displayPicture.publicId}
        />
      </button>

      {!viewOnly && !uploading && (
        <div className="absolute group z-10 inset-0.5 rounded-full overflow-hidden">
          {user.displayPicture.publicId ? (
            <>
              <label
                className="absolute bottom-22.5 w-22.5 h-11.25 rounded-t-full border-b border-b-white bg-prim-black/90
                group-hover:bottom-11.25 transition-all duration-400 ease-in-out cursor-pointer flex items-center justify-center">
                <CameraIcon className="w-5.5 h-5.5 stroke-white hover:scale-110 transition-color duration-200 ease-in-out" />
                <input
                  type="file"
                  id="displayPicture"
                  name="displayPicture"
                  accept=".jpeg, .jpg, .png, .webp"
                  className="hidden"
                  onChange={(e) => handlePictureUpload(e)}
                />
              </label>
              <button
                onClick={handlePictureDelete}
                className="absolute top-22.5 w-22.5 h-11.25 rounded-b-full border-t border-t-white bg-prim-black/90
                group-hover:top-11.25 transition-all duration-400 ease-in-out cursor-pointer flex items-center justify-center">
                <Del className="w-5 h-5 mb-1 stroke-white hover:scale-110 transition duration-200 ease-in-out" />
              </button>
            </>
          ) : (
            <label
              className="absolute inset-0 w-22.5 h-22.5 rounded-full opacity-0 hover:opacity-100 transition-all 
              duration-400 linear cursor-pointer flex items-center justify-center bg-prim-black/90">
              <CameraIcon className="w-5.5 h-5.5 stroke-white hover:scale-110 transition-color duration-200 ease-in-out" />
              <input
                type="file"
                id="displayPicture"
                name="displayPicture"
                accept=".jpeg, .jpg, .png, .webp"
                className="hidden"
                onChange={(e) => handlePictureUpload(e)}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
