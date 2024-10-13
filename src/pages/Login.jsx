import { Link } from "react-router-dom";
import { Logo } from "../components/navbars/navbar-items/NavbarComp";

const Login = () => {
  return (
    <div className="flex justify-center py-20 w-full bg-gradient-to-r from-[#0f3460] to-[#35639a]">
      <div className="flex w-96 p-10 pb-20 rounded-2xl bg-[#151515] drop-shadow-[10px_10px_8px_rgba(0,0,0,.4)]">
        <div className="flex flex-col items-center w-full">
          <div className="-translate-x-1.5">
            <Logo />
          </div>

          <form className="flex flex-col w-full mt-8">
            <label className="text-white mb-0.5">Email Address</label>
            <input
              type="text"
              placeholder="you@example.com"
              className="p-2 rounded-md mb-4 focus:outline-none"
            />

            <label className="text-white mb-0.5">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="p-2 rounded-md mb-10 focus:outline-none"
            />

            <Link to="/home">
              <button className="p-2 rounded-md mb-4 w-full text-white bg-blue-500 hover:bg-blue-800">
                Login
              </button>
            </Link>

            <div className="flex justify-between">
              <Link to="/forgot-password">
                <p className="text-[0.9rem] text-blue-500">
                  <u>Forgot Password?</u>
                </p>
              </Link>

              <Link to="/sign-up">
                <span className="text-[0.9rem] text-blue-500 ">
                  <u>Sign up</u>
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
