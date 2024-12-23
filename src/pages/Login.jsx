import { useState } from 'react'
import "../styles/scrollbars.css"
import { Link } from 'react-router-dom'
import { authPageIcons } from '../assets/icons/icons';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (  
    <div className="w-full pb-20 px-20 bg-gradient-to-r from-grad-b-1 to-grad-b-2">
      <div className="flex w-[28rem] p-10 pb-20 mx-auto mt-20 rounded-2xl bg-[#111]/30">
        <div className="flex flex-col items-center w-full">
          <p className='text-white text-3xl'>Welcome Back</p>
          <form className="flex flex-col w-full mt-8">
            <label className="mb-0.5 flex flex-col text-white">
              <p>Email Address</p>
              <input
                id='email'
                type="text"
                placeholder="you@example.com"
                className="p-3 rounded-md mb-4 text-black focus:outline-none"
              />
            </label>

            <label className="text-white">Password</label>
            <div className="flex justify-between mb-4 bg-white rounded-md">
              <input
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="p-3 rounded-l-md focus:outline-none grow"
              />
              <button type='button' onClick={toggleShowPassword} className="rounded-r-md w-10 bg-white hover:bg-black/[0.15]">
                {showPassword ? <authPageIcons.HidePassword className='w-5 mx-auto' fill='#818181' /> : <authPageIcons.ShowPassword fill='#818181' className='w-5 mx-auto' />}
              </button>
            </div>

            <Link to='/forgot-password'>
              <p className='text-blue-200 mb-6'>Forgot Password?</p>
            </Link>

            <Link to="/home">
              <button className="p-3 rounded-md mb-4 w-full text-white bg-blue-500 hover:bg-blue-800">
                Create Account
              </button>
            </Link>
          </form>

          <p className='text-white text-start text-[0.9rem]'>
            {"Don't have an account yet? "}
            <Link to="/sign-up">
              <span className="text-blue-200 hover:underline">Sign Up</span>
            </Link>
          </p>

          <div className='flex items-center justify-center gap-4 w-full my-6'>
            <span className='w-2/5 h-[0.5px] bg-white'></span>
            <p className='text-white text-sm'>OR</p>
            <span className='w-2/5 h-[0.5px] bg-white'></span>
          </div>

          <button className='flex gap-3 p-3 items-center justify-center rounded-md w-full bg-white'>
            <authPageIcons.Google className='w-7 h-7' />
            <p className='text-black'>Sign in with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
