import { useState } from "react";
import validate from "@/utils/validateForm";
import { useUser } from "@/contexts/UserContext";

const EditPersonalInfo = ({ user, setUser }) => {
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

  const validateField = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        validate.validateFirstName(value, setColors, setErrors);
        break;
      case "lastName": 
        validate.validateLastName(value, setColors, setErrors);
        break;
      case "username": 
        validate.validateUsername(value, setColors, setErrors);
        break;
      case "email":
        validate.validateEmail(value, setColors, setErrors);
        break;
      case "organization":
        value.length 
          ? setColors({ ...colors, organization: "#00a63e" })
          : setColors({ ...colors, organization: "#ffffff30" });
        break;
    }
  };

  return (
    <div className="flex rounded-2xl px-4 py-3 mt-2 border border-white/20">
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <label htmlFor="firstName" className="text-gray-300">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder={user.name.firstName}
              autoComplete="off"
              onChange={(e) => validateField(e)}
              style={{ "borderColor": colors.firstName }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1 pt-0.5">{errors.firstName}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastName" className="text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder={user.name.lastName || "Enter your last name"}
              autoComplete="off"
              onChange={(e) => validateField(e)}
              style={{ "borderColor": colors.lastName }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1 pt-0.5">{errors.lastName}</p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <label htmlFor="username" className="text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder={user.username}
              autoComplete="off"
              onChange={(e) => validateField(e)}
              style={{ "borderColor": colors.username }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1 pt-0.5">{errors.username}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder={user.email}
              autoComplete="off"
              onChange={(e) => validateField(e)}
              style={{ "borderColor": colors.email }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1 pt-0.5">{errors.email}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="organization" className="text-gray-300">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            placeholder={user.organization || "Enter your organization"}
            autoComplete="off"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.organization }}
            className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
