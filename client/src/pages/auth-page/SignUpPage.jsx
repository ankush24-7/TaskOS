import { useState } from "react";
import authAPI from "@/services/authAPI";
import validate from "@/utils/validateForm";
import AuthHeader from "./components/AuthHeader";
import { useToast } from "@/contexts/ToastContext";
import { authPageIcons } from "@/assets/icons/icons";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setToastMessage } = useToast();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [colors, setColors] = useState({
    firstName: "white",
    lastName: "white",
    username: "white",
    email: "white",
    password: "white",
    confirmPassword: "white",
  });
  const displayColors = [
    "#E00000",
    "#F59F00",
    "#B1401B",
    "#F0192E",
    "#5E807F",
    "#4E6A69",
    "#336699",
    "#8300E0",
    "#C51BC5",
    "#008F70",
    "#625141",
    "#545964",
  ];

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
    const { firstName, lastName, username, email, password } = e.target;
    const user = {
      name: {
        firstName: firstName.value,
        lastName: lastName.value,
      },
      username: username.value,
      email: email.value,
      password: password.value,
      color: displayColors[Math.floor(Math.random() * displayColors.length)],
    };
    if (!user.name.firstName || !user.username || !user.email || !user.password) return;
    
    const res = await authAPI.authenticate(user, "register");
    if (res === 201) {
      navigate("/home");
      setToastMessage({ 
        type: "success",
        position: "top-center",
        message: "Welcome to TaskOS", 
      });
    }
    else setToastMessage({ message: res, type: "error" });
  };

  return (
    <div className="w-full h-dvh flex-grow overflow-y-scroll scrollbar-hide pb-10 bg-gradient-to-r from-grad-l to-grad-r">
      <AuthHeader />
      <div className="auth-form flex flex-col items-center w-full h-full px-10 pt-6 pb-10 mt-10 mx-auto bg-prim-black/30">
        <p className="text-white text-3xl">Create Your Account</p>
        <form className="flex flex-col w-full mt-5" onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="text-white">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.firstName }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.firstName}</p>

          <label htmlFor="lastName" className="text-white">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.lastName }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.lastName}</p>

          <label htmlFor="username" className="text-white">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.username }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.username}</p>

          <label className="text-white mt-2">Email Address</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={(e) => validateField(e)}
            style={{ "borderColor": colors.email }}
            className="px-2.5 py-2 rounded-md focus:outline-none border-2 bg-white"
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.email}</p>

          <label className="text-white mt-2">Password</label>
          <span 
            style={{ "borderColor": colors.password }}
            className="flex justify-between bg-white rounded-md border-2">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a Password"
              onChange={(e) => validateField(e)}
              className="px-2.5 py-2 rounded-l-md focus:outline-none grow"
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
          <span 
            style={{ "borderColor": colors.confirmPassword }}
            className="flex justify-between bg-white rounded-md border-2">
            <input
              id="confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              onChange={(e) => validateField(e)}
              className="px-2.5 py-2 rounded-l-md focus:outline-none grow"
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
            className="p-3 rounded-md mt-5 mb-2 w-full cursor-pointer text-white bg-prim-yellow-200 hover:bg-prim-yellow-300">
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
      </div>
    </div>
  );
};

export default SignUpPage;
