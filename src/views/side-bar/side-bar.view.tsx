import React from 'react';
import { ISideBarProps } from './side-bar.type';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { BiHomeAlt2 } from 'react-icons/bi';
import { BsPeople, BsSpeedometer2 } from 'react-icons/bs';
import { CgToolbox } from 'react-icons/cg';

const prefixClassName = 'sidebar-view';

export const SideBar: React.FC<ISideBarProps> = observer((props) => {
  const { t } = useTranslation();
  const { active, isHidden } = props;

  return (
    <nav
      className={`${
        isHidden ? '-left-full' : 'left-0'
      } md:left-0 absolute h-screen w-60 md:w-20 lg:w-28 py-5 border-r-2 transform transition-all duration-300 ease-in-out bg-white z-50`}
    >
      <div className="block md:flex flex-col justify-evenly items-center h-full p-3 md:px-0 md:py-5">
        <a
          className={`flex gap-5 border-b-2 md:gap-0 md:border-0 md:flex-col justify-start md:justify-center items-center ${
            !active || active === 'home' ? 'text-[#e9a074]' : 'text-[#41609f]'
          }`}
          href="/"
        >
          <BiHomeAlt2 size={40} />
          <span className="text-md md:text-xs">Home</span>
        </a>
        <a
          className={`flex gap-5 border-b-2 md:gap-0 md:border-0 md:flex-col justify-start md:justify-center items-center ${
            active === 'user' ? 'text-[#e9a074]' : 'text-[#41609f]'
          } mt-5 md:mt-0`}
          href="/user"
        >
          <BsPeople size={40} />
          <span className="text-md md:text-xs">User</span>
        </a>
        <a
          className={`flex gap-5 border-b-2 md:gap-0 md:border-0 md:flex-col justify-start md:justify-center items-center ${
            active === 'tools' ? 'text-[#e9a074]' : 'text-[#41609f]'
          } mt-5 md:mt-0`}
          href="/tools"
        >
          <CgToolbox size={40} />
          <span className="text-md md:text-xs">Toolbox</span>
        </a>
        <a
          className={`flex gap-5 border-b-2 md:gap-0 md:border-0 md:flex-col justify-start md:justify-center items-center ${
            active === 'status' ? 'text-[#e9a074]' : 'text-[#41609f]'
          } mt-5 md:mt-0`}
          href="#"
        >
          <BsSpeedometer2 size={40} />
          <span className="text-md md:text-xs">Status</span>
        </a>
      </div>
    </nav>
  );
});
