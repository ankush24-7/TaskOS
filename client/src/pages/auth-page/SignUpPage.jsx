import { useState } from "react";
import { authPageIcons } from "@icons";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="auth-form-container w-full flex-grow overflow-y-scroll scrollbar-hide bg-gradient-to-r from-grad-l to-grad-r">
      <div className="auth-form flex w-full h-full p-10 pb-20 mx-auto bg-prim-black/30">
        <div className="flex flex-col items-center w-full">
          <p className="text-white text-3xl">Create Your Account</p>
          <form className="flex flex-col w-full mt-8">
            <label className="flex flex-col text-white mb-0.5">
              <p>Name</p>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="p-3 rounded-md mb-4 text-black focus:outline-none"
              />
            </label>

            <label className="mb-0.5 flex flex-col text-white">
              <p>Email Address</p>
              <input
                id="email"
                type="text"
                placeholder="you@example.com"
                className="p-3 rounded-md mb-4 text-black focus:outline-none"
              />
            </label>

            <label className="text-white">Password</label>
            <div className="flex justify-between mb-10 bg-white rounded-md">
              <input
                id="password"
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

            <Link to="/home">
              <button className="p-3 rounded-md mb-4 w-full text-white bg-blue-500 hover:bg-blue-800">
                Create Account
              </button>
            </Link>
          </form>

          <p className="text-white text-start text-[0.9rem]">
            {"Already have an account? "}
            <Link to="/login">
              <span className="text-blue-200 hover:underline">Login</span>
            </Link>
          </p>

          <div className="flex items-center justify-center gap-4 w-full my-6">
            <span className="w-2/5 h-[0.5px] bg-white"></span>
            <p className="text-white text-sm">OR</p>
            <span className="w-2/5 h-[0.5px] bg-white"></span>
          </div>

          <button className="flex gap-3 p-3 items-center justify-center rounded-md w-full bg-white">
            <authPageIcons.Google className="w-7 h-7" />
            <p className="text-black">Sign up with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
