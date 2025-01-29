import "@styles/scrollbars.css";
import { useState } from "react";
import { authPageIcons } from "@icons";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="auth-form-container w-full flex-grow overflow-y-scroll scrollbar-hide bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <div className="auth-form flex w-full h-full p-10 pb-20 mx-auto bg-prim-black/30">
        <div className="flex flex-col items-center w-full">
          <p className="text-white text-3xl">Welcome Back</p>
          <form
            action="/login"
            method="POST"
            className="flex flex-col w-full mt-8">
            <label for="email" className="flex flex-col text-white">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="p-3 rounded-md mb-4 text-black focus:outline-none"
            />

            <label for="password" className="text-white">
              Password
            </label>
            <div className="flex justify-between mb-4 bg-white rounded-md">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="p-3 rounded-l-md focus:outline-none grow"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="rounded-r-md w-10 bg-white hover:bg-black/[0.15]">
                {showPassword ? (
                  <authPageIcons.HidePassword
                    className="w-5 mx-auto"
                    fill="#818181"
                  />
                ) : (
                  <authPageIcons.ShowPassword
                    fill="#818181"
                    className="w-5 mx-auto"
                  />
                )}
              </button>
            </div>

            <Link to="/forgot-password">
              <p className="text-blue-200 mb-6">Forgot Password?</p>
            </Link>

            {/* <Link to="/home"> */}
            <button
              type="submit"
              className="p-3 rounded-md mb-4 w-full text-white bg-blue-500 hover:bg-blue-800">
              Create Account
            </button>
            {/* </Link> */}
          </form>

          <p className="text-white text-start text-[0.9rem]">
            {"Don't have an account yet? "}
            <Link to="/sign-up">
              <span className="text-blue-200 hover:underline">Sign Up</span>
            </Link>
          </p>

          <div className="flex items-center justify-center gap-4 w-full my-6">
            <span className="w-2/5 h-[0.5px] bg-white"></span>
            <p className="text-white text-sm">OR</p>
            <span className="w-2/5 h-[0.5px] bg-white"></span>
          </div>

          <button className="flex gap-3 p-3 items-center justify-center rounded-md w-full bg-white">
            <authPageIcons.Google className="w-7 h-7" />
            <p className="text-black">Sign in with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
