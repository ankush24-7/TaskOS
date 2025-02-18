import { useState } from "react";
import authAPI from "@/services/AuthAPI";
import { authPageIcons } from "@icons";
import { Toaster, toast } from "sonner";
import validate from "@/utils/validateForm";
import AuthHeader from "./components/AuthHeader";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [colors, setColors] = useState({
    name: "white",
    email: "white",
    password: "white",
    confirmPassword: "white",
  });

  const validateField = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        validate.validateName(value, setColors, setErrors);
        break;
      case "email":
        validate.validateEmail(value, setColors, setErrors);
        break;
      case "password":
        setPassword(value);
        validate.validatePassword(value, setColors, setErrors);
        validate.confirmPassword(password, value, setColors, setErrors);
        break;
      case "confirmPassword":
        validate.confirmPassword(password, value, setColors, setErrors);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = e.target;
    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    if (user.name === "" || user.email === "" || user.password === "") return;
    
    const res = await authAPI.authenticate(user, "register");
    if (res === 201) navigate("/home");
    else return toast.error(res);
  };

  return (
    <div className="w-full h-dvh flex-grow overflow-y-scroll scrollbar-hide pb-10 bg-gradient-to-r from-grad-l to-grad-r">
      <AuthHeader />
      <div className="auth-form flex flex-col items-center w-full h-full px-10 pt-6 pb-10 mt-10 mx-auto bg-prim-black/30">
        <p className="text-white text-3xl">Create Your Account</p>
        <form className="flex flex-col w-full mt-5" onSubmit={handleSubmit}>
          <label className="text-white">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            onChange={(e) => validateField(e)}
            className={`p-2.5 rounded-md focus:outline-none border-2 border-${colors.name}`}
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.name}</p>

          <label className="text-white mt-2">Email Address</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={(e) => validateField(e)}
            className={`p-2.5 rounded-md focus:outline-none border-2 border-${colors.email}`}
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.email}</p>

          <label className="text-white mt-2">Password</label>
          <span className={`flex justify-between bg-white rounded-md border-2 border-${colors.password}`}>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a Password"
              onChange={(e) => validateField(e)}
              className="p-2.5 rounded-l-md focus:outline-none grow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-r-md w-10 bg-white hover:bg-black/[0.15]">
              {showPassword ? (
                <authPageIcons.HidePassword fill="#818181" className="w-5 mx-auto" />
              ) : (
                <authPageIcons.ShowPassword fill="#818181" className="w-5 mx-auto" />
              )}
            </button>
          </span>
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.password}</p>

          <label className="text-white mt-2">Confirm Password</label>
          <span className={`flex justify-between bg-white rounded-md border-2 border-${colors.confirmPassword}`}>
            <input
              id="confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              onChange={(e) => validateField(e)}
              className="p-2.5 rounded-l-md focus:outline-none grow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-r-md w-10 bg-white hover:bg-black/[0.15]">
              {showPassword ? (
                <authPageIcons.HidePassword fill="#818181" className="w-5 mx-auto" />
              ) : (
                <authPageIcons.ShowPassword fill="#818181" className="w-5 mx-auto" />
              )}
            </button>
          </span>
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.confirmPassword}</p>

          <button
            type="submit"
            className="p-3 rounded-md mt-5 mb-2 w-full text-white bg-prim-yellow-200 hover:bg-prim-yellow-300">
            Create Account
          </button>
        </form>

        <p className="text-white text-start text-[0.9rem]">
          {"Already have an account? "}
          <Link to="/login">
            <span className="text-blue-200 underline hover:text-blue-400">
              Login
            </span>
          </Link>
        </p>

        <Toaster richColors position="top-center" />

        {/* <div className="flex items-center justify-center gap-4 w-full my-6">
          <span className="w-2/5 h-[0.5px] bg-white"></span>
          <p className="text-white text-sm">OR</p>
          <span className="w-2/5 h-[0.5px] bg-white"></span>
        </div>

        <button className="flex gap-3 p-3 items-center justify-center rounded-md w-full bg-white">
          <authPageIcons.Google className="w-7 h-7" />
          <p className="text-black">Sign up with Google</p>
        </button> */}
      </div>
    </div>
  );
};

export default SignUpPage;
