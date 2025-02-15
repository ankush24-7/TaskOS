import { useState } from "react";
import auth from "@/services/auth";
import { authPageIcons } from "@icons";
import { Toaster, toast } from "sonner";
import validate from "@/utils/validateForm";
import AuthHeader from "./components/AuthHeader";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "" });
  const [colors, setColors] = useState({ email: "white" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const user = {
      email: email.value,
      password: password.value,
    };
    if (user.email === "" || user.password === "") return;

    const res = await auth.authenticate(user, "login");
    if (res && res.startsWith("eyJ")) {
      localStorage.setItem("accessToken", res);
      navigate("/home");
    } else {
      return toast.error(res);
    }
  }

  return (
    <div className="w-full h-dvh flex-grow overflow-y-scroll scrollbar-hide pb-10 bg-gradient-to-r from-grad-l to-grad-r">
      <AuthHeader />
      <div className="auth-form flex flex-col items-center w-full h-full px-10 pt-8 pb-16 mt-20 mx-auto bg-prim-black/30">
        <p className="text-white text-3xl">Welcome Back</p>
        <form className="flex flex-col w-full mt-10" onSubmit={handleSubmit}>
          <label className="text-white">Email Address</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email Address"
            onChange={(e) => validate.validateEmail(e.target.value, setColors, setErrors)}
            className={`p-2.5 rounded-md focus:outline-none border-2 border-${colors.email}`}
          />
          <p className="text-red-500 text-xs h-4 pt-0.5">{errors.email}</p>

          <label className="text-white mt-2">Password</label>
          <span
            className="flex justify-between bg-white rounded-md border-2 border-white">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a Password"
              className="p-2.5 rounded-l-md focus:outline-none grow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="rounded-r-md w-10 bg-white hover:bg-black/[0.15]">
              {showPassword ? (
                <authPageIcons.HidePassword
                  fill="#818181"
                  className="w-5 mx-auto"
                />
              ) : (
                <authPageIcons.ShowPassword
                  fill="#818181"
                  className="w-5 mx-auto"
                />
              )}
            </button>
          </span>

          <Link to="/forgot-password">
            <p className="mt-10 underline text-[0.9rem] text-blue-200 hover:text-blue-400 w-fit">
              Forgot Password?
            </p>
          </Link>

          <button
            type="submit"
            className="p-3 rounded-md my-2 w-full text-white bg-prim-yellow-200 hover:bg-prim-yellow-300">
            Log In
          </button>
        </form>

        <p className="text-white text-start text-[0.9rem]">
          {"Already have an account? "}
          <Link to="/login">
            <span className="text-blue-200 underline hover:text-blue-400">
              Sign Up
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
          <p className="text-black">Sign in with Google</p>
        </button> */}
      </div>
    </div>
  );
};

export default LoginPage;
