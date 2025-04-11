import validate from "@/utils/validateForm";

const EditPersonalInfo = ({ user, errors, setErrors, colors, setColors }) => {
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
              First Name*
            </label>
            <input
              type="text"
              name="firstName"
              autoComplete="off"
              defaultValue={user.name.firstName}
              placeholder="Enter your first name"
              onChange={(e) => validateField(e)}
              style={{ borderColor: colors.firstName }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1">{errors.firstName}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lastName" className="text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              autoComplete="off"
              defaultValue={user.name.lastName}
              placeholder="Enter your last name"
              onChange={(e) => validateField(e)}
              style={{ borderColor: colors.lastName }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1">{errors.lastName}</p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-1/2">
            <label htmlFor="username" className="text-gray-300">
              Username*
            </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              defaultValue={user.username}
              placeholder="Enter your username"
              onChange={(e) => validateField(e)}
              style={{ borderColor: colors.username }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1">{errors.username}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="email" className="text-gray-300">
              Email*
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              defaultValue={user.email}
              placeholder="Enter your email"
              onChange={(e) => validateField(e)}
              style={{ borderColor: colors.email }}
              className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
            />
            <p className="text-red-500 text-[10px] h-1">{errors.email}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="organization" className="text-gray-300">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            autoComplete="off"
            defaultValue={user.organization}
            placeholder="Enter your organization"
            onChange={(e) => validateField(e)}
            style={{ borderColor: colors.organization }}
            className="text-md max-w-60 rounded-lg px-1.5 py-1 mt-1 focus:outline-none border border-white/20 text-white hover:bg-prim-black/30 focus:bg-prim-black/30"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPersonalInfo;
