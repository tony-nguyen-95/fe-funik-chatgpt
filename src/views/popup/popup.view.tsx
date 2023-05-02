import React from 'react';
import './popup.style.scss';
import { IpopupProps } from './popup.type';

const prefixClassName = 'popup';

export const Popup: React.FC<IpopupProps> = ({ children, popUp }) => {
  return (
    <div
      className={`${!popUp && 'hidden'} fixed w-screen h-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl flex justify-center items-center
				transition-all duration-300 ease-in-out ${prefixClassName}
			`}
    >
      {children}
    </div>
  );
};
