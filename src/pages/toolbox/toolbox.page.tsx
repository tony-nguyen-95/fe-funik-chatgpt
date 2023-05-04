import React, { useState } from 'react';
import { IToolBoxProps } from './toolbox.type';
import { Header, SideBar } from '../../views';
import { GrUserSettings } from 'react-icons/gr';

const prefixClassName = 'toolbox';

export const ToolBox: React.FC<IToolBoxProps> = (props) => {
  const [navHidden, setNavHidden] = useState(true);
  return (
    <>
      <SideBar isHidden={navHidden} active="tools" />
      <div
        className={`float-right w-full md:w-[calc(100%-5rem)] lg:w-[calc(100%-7rem)] overflow-hidden ${
          !navHidden && 'blur-md'
        }`}
      >
        <Header setNavHidden={setNavHidden} />
        <div
          className="h-[calc(100vh-5rem)] overflow-auto"
          onClick={() => {
            setNavHidden(true);
          }}
        >
          <div className="text-[#3250ae] text-lg font-bold font-sans p-3 md:px-5">CÔNG CỤ CHO HANNAH</div>
          <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 p-5 gap-2">
            <a
              className="
								flex justify-center flex-col items-center w-full gap-5
								bg-[#fff] text-[#3250ae] rounded-lg p-5 shadow-lg
								border-4 border-[#3250ae]
								cursor-pointer
								hover:scale-105 hover:shadow-xl
								transform transition-all
							"
              href="/tools/studentByHannah"
            >
              <GrUserSettings size={50} color="white" />
              <div className="text-xl">QUẢN LÝ HỌC VIÊN</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
