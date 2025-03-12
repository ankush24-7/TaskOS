import { useState } from "react";
import { authPageIcons } from "@icons";
import { Toaster, toast } from "sonner";
import authAPI from "@/services/AuthAPI";
import AuthHeader from "./components/AuthHeader";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { input, password } = e.target;
    const user = {
      input: input.value,
      password: password.value,
    };
    if (user.input === "" || user.password === "") return;

    const res = await authAPI.authenticate(user, "login");
    if (res === 200) navigate("/home");
    else return toast.error(res);
  };

  return (
    <div className="w-full h-dvh flex-grow overflow-y-scroll scrollbar-hide pb-10 bg-gradient-to-r from-grad-l to-grad-r">
      <AuthHeader />
      <div className="auth-form flex flex-col items-center w-full h-full px-10 pt-8 pb-16 mt-20 mx-auto bg-prim-black/30">
        <p className="text-white text-3xl">Welcome Back</p>
        <form className="flex flex-col w-full mt-10" onSubmit={handleSubmit}>
          <label htmlFor="input" className="text-white">Username or Email</label>
          <input
            id="input"
            name="input"
            type="text"
            placeholder="Username or Email"
            className="p-2.5 rounded-md focus:outline-none border-2 border-white bg-white"
          />

          <label className="text-white mt-6">Password</label>
          <span
            className="flex justify-between bg-white rounded-md border-2 border-white">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          <Link to="/forgot-password">
            <p className="mt-10 underline text-[0.9rem] text-blue-200 hover:text-blue-400 w-fit">
              Forgot Password?
            </p>
          </Link>

          <button
            type="submit"
            className="p-3 rounded-md my-2 w-full cursor-pointer text-white bg-prim-yellow-200 hover:bg-prim-yellow-300">
            Log In
          </button>
        </form>

        <p className="text-white text-start text-[0.9rem]">
          {"Don't have an account? "}
          <Link to="/sign-up">
            <span className="text-blue-200 underline hover:text-blue-400">
              Sign Up
            </span>
          </Link>
        </p>

        <Toaster richColors position="top-center" />
      </div>
    </div>
  );
};

export default LoginPage;
