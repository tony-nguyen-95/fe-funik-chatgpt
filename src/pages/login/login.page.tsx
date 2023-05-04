import React, { useEffect, useState } from 'react';
import './login.style.scss';
import { IloginProps } from './login.type';
import LoginBackground from '../../assets/login-background.png';
import HannahsAssistantLogo from "../../assets/hannah's-assistant-logo.png";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import * as yup from 'yup';

import { IoEyeOff, IoEye } from 'react-icons/io5';
import { ILoginForm } from '../../models';
import { CoreAuthenticationStore } from '../../stores';
import { useHistory } from 'react-router-dom';
import { LoadingModal } from '../../components';

const prefixClassName = 'login';

const LoginSchema = yup.object().shape({
  username: yup.string().required('Username không được bỏ trống!'),
  password: yup.string().required('Password không được bỏ trống!').min(6, 'Password ít nhất 6 kí tự!'),
});

export const Login: React.FC<IloginProps> = observer((props) => {
  const history = useHistory();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const loadingLogin = CoreAuthenticationStore.loadingLoginSelector();

  const errorLogin = CoreAuthenticationStore.authErrorSelector();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: 'onSubmit',
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: ILoginForm) => {
    CoreAuthenticationStore.loginAction(data);
  };

  const onError = (errors: any, e: any) => console.log(errors, e);

  useEffect(() => {
    if (isLogin) {
      history.push('/');
    }
  }, [history, isLogin]);

  return (
    <div
      className="min-h-screen h-full v-screen
		bg-no-repeat bg-cover bg-center py-5 flex justify-center items-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="flex flex-col justify-center items-center w-[90vw] md:w-[30rem] bg-[#e4f2fc] px-3 md:px-10 py-10 rounded-lg drop-shadow-lg">
        <img src={HannahsAssistantLogo} alt="Hannah's Assistant Logo" className="w-2/3 md:w-1/2" />
        <form method="post" className="w-full mt-10" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="relative mb-5">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="shadow-lg p-4 w-full rounded-lg"
              {...(register('username') as any)}
            />
            {errors.username && <label className="text-red-500">{errors.username.message}</label>}
          </div>
          <div className="relative mb-5">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              className="shadow-lg p-4 w-full rounded-lg mb-3 pr-12"
              {...(register('password') as any)}
            />
            {errors.password && <label className="text-red-500 mb-5">{errors.password.message}</label>}
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

            {errorLogin && (
              <div
                className="text-[#6fbaed] hover:text-[#90c7f0] cursor-pointer 
							flex justify-start items-center"
              >
                <label htmlFor="remember-me" className="text-md text-red-500">
                  {errorLogin}
                </label>
              </div>
            )}
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

      {loadingLogin && <LoadingModal textOnLoading="Login..." />}
    </div>
  );
});
