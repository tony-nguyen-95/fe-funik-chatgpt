import React from 'react';
import { IHeaderProps } from './header.type';

import HannahsAssistantLogo from "../../assets/hannah's-assistant-logo.png";
import HannahsAssistantLogoTwo from "../../assets/hannah's-assistant-logo-2.png";
import { MdAccountCircle } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';

const prefixClassName = 'header';
const TEMP_NAME = 'Nguyễn Văn A';

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
      <img src={HannahsAssistantLogo} alt="hannah-logo-2" className="md:hidden w-32" />
      <img src={HannahsAssistantLogoTwo} alt="hannah-logo-2" className="hidden md:block w-72" />
      <div className="flex justify-center items-center">
        <p className="hidden md:inline text-lg font-semibold mr-2">{TEMP_NAME}</p>
        <MdAccountCircle size={40} />
      </div>
    </div>
  );
};
