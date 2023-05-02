import React from 'react';
import './header.style.scss';
import { IHeaderProps } from './header.type';

import HannahsAssistantLogo from "../../assets/hannah's-assistant-logo-2.png";
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';

const prefixClassName = 'header';

export const Header: React.FC<IHeaderProps> = (props) => {
  const { setNavHidden } = props;

  return (
    <div className="h-16 lg:h-20 w-full flex justify-between items-center px-2 border-b-2">
      <AiOutlineMenu
        size={40}
        className="md:hidden cursor-pointer"
        onClick={() => {
          setNavHidden((v) => !v);
        }}
        id="menu-icon"
      />
      <img src={HannahsAssistantLogo} alt="hannah-logo-2" className="w-72" />
      <MdAccountCircle size={40} />
    </div>
  );
};
