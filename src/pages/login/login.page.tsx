import React, { useState } from 'react';
import './login.style.scss';
import { IloginProps } from './login.type';
import LoginBackground from '../../assets/login-background.png';
import HannahsAssistantLogo from "../../assets/hannah's-assistant-logo.png";

import { IoEyeOff, IoEye } from 'react-icons/io5';

const prefixClassName = 'login';

export const Login: React.FC<IloginProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen h-full v-screen
		bg-no-repeat bg-cover bg-center py-5 flex justify-center items-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="flex flex-col justify-center items-center w-[90vw] md:w-[30rem] bg-[#e4f2fc] px-3 md:px-10 py-10 rounded-lg drop-shadow-lg">
        <img src={HannahsAssistantLogo} alt="Hannah's Assistant Logo" className="w-2/3 md:w-1/2" />
        <form
          method="post"
          className="w-full mt-10"
          onSubmit={(e) => {
            e.preventDefault();

            return false;
          }}
        >
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Email Address"
            className="shadow-lg p-4 w-full rounded-lg mb-5"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              className="shadow-lg p-4 w-full rounded-lg mb-5 pr-12"
            />
            <div
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff size={24} color="#6fbded" /> : <IoEye size={24} color="#6fbded" />}
            </div>

            <div
              className="text-[#6fbaed] hover:text-[#90c7f0] cursor-pointer 
							flex justify-start items-center"
            >
              <input type="checkbox" name="remember-me" id="remember-me" className="mr-2 h-4 w-4" />
              <label htmlFor="remember-me" className="text-md">
                Remember me
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center w-full mt-5 md:mt-10 flex-col border-b-2 border-[#6fbaed]">
            <button className="bg-[#2d5095] text-white p-3 md:p-4 w-3/4 font-bold text-lg hover:drop-shadow-lg">
              Login
            </button>
            <a
              href="#"
              className="text-[#6fbaed] hover:text-[#90c7f0]  text-center text-sm md:text-base mt-3 md:mt-5 mb-3"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex justify-center items-center w-full mt-5">
            <button className="bg-white text-[#2d5095] p-3 md:p-4 w-3/4 font-bold text-lg hover:drop-shadow-lg">
              Login with Google
            </button>
          </div>
        </form>
        <a href="#" className="text-[#6fbaed] hover:text-[#90c7f0] text-center text-sm md:text-base my-5">
          Don&apos;t have an account? Sign Up
        </a>
      </div>
    </div>
  );
};
