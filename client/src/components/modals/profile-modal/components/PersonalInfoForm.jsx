import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { Pen } from "@/assets/icons/icons";
import userAPI from "@/services/api/userAPI";
import EditPersonalInfo from "./EditPersonalInfo";
import { useToast } from "@/contexts/ToastContext";
import SpinLoader from "@/components/loaders/SpinLoader";

const PersonalInfoForm = ({ user, setUser, viewOnly }) => {
  const { setToastMessage } = useToast();
  const [editInfo, setEditInfo] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [colors, setColors] = useState({
    organization: "#ffffff30",
    firstName: "#ffffff30",
    lastName: "#ffffff30",
    username: "#ffffff30",
    email: "#ffffff30",
  });

  const handleInfoSave = async (e) => {
    e.preventDefault();
    setIsInfoLoading(true);
    const { firstName, lastName, username, email, organization } = e.target;
    const userInfo = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      organization: organization.value,
    };
    if (!userInfo.firstName || !userInfo.username || !userInfo.email) {
      setToastMessage({
        type: "error",
        message: "Please fill all the required fields",
        position: "top-center",
      });
      setIsInfoLoading(false);
      return;
    }

    if (
      userInfo.firstName === user.name.firstName &&
      userInfo.lastName === user.name.lastName &&
      userInfo.email === user.email &&
      userInfo.organization === user.organization &&
      userInfo.username === user.username
    ) {
      setIsInfoLoading(false);
      setEditInfo(false);
      return;
    }

    if (userInfo.email === user.email) userInfo.email = undefined;
    if (userInfo.username === user.username) userInfo.username = undefined;
    const { status, user: updatedUser, message } = await userAPI.updateUserInfo(userInfo);

    if (status === 200) {
      setUser((prev) => ({
        ...prev,
        name: {
          ...prev.name,
          firstName: updatedUser.name.firstName,
          lastName: updatedUser.name.lastName,
        },
        email: updatedUser.email,
        username: updatedUser.username,
        organization: updatedUser.organization,
      }));

      setEditInfo(false);
    } else {
      setToastMessage({
        type: "error",
        message: message,
        position: "top-center",
      });

      if (message === "Username already exists") {
        setErrors((prev) => ({ ...prev, username: message }));
        setColors((prev) => ({ ...prev, username: "#fb2c36" }));
      } else if (message === "Email already exists") {
        setErrors((prev) => ({ ...prev, email: message }));
        setColors((prev) => ({ ...prev, email: "#fb2c36" }));
      }
    }

    setIsInfoLoading(false);
  };

  return (
    <form onSubmit={handleInfoSave} className="flex flex-col">
      <div className="flex items-baseline justify-between px-2">
        <h2 className="text-lg text-white">Personal Info</h2>
        {editInfo ? (
          isInfoLoading ? (
            <SpinLoader width="18px" height="18px" />
          ) : (
            <span className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditInfo(false)}
                className="h-fit gap-1 px-2 py-0.5 -translate-y-1 cursor-pointer rounded-xl border border-white hover:bg-red-500">
                <p className="text-sm text-white">Cancel</p>
              </button>
              <button
                type="submit"
                className="h-fit gap-1 px-3 py-0.5 -translate-y-1 cursor-pointer rounded-xl border border-white hover:bg-prim-yellow-300">
                <p className="text-sm text-white">Save</p>
              </button>
            </span>
          )
        ) : (
          !viewOnly && (
            <button
              type="button"
              onClick={() => setEditInfo(true)}
              className="flex h-fit gap-1 px-2 py-0.5 -translate-y-0.5 items-center cursor-pointer rounded-xl border border-white hover:bg-prim-black">
              <Pen className="w-3.5 h-3.5 stroke-white" />
              <p className="text-sm text-white">Edit</p>
            </button>
          )
        )}
      </div>

      {!editInfo ? (
        <PersonalInfo user={user} />
      ) : (
        <EditPersonalInfo
          user={user}
          errors={errors}
          setErrors={setErrors}
          colors={colors}
          setColors={setColors}
        />
      )}
    </form>
  );
};

export default PersonalInfoForm;
