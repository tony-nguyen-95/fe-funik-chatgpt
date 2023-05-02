import React, { useState } from 'react';
import { IUserProps } from './user.type';
import { Header, SideBar, UserTable, HannahTable, StudentTable } from '../../views';

const prefixClassName = 'user';

export const User: React.FC<IUserProps> = (props) => {
  const [navHidden, setNavHidden] = useState(true);
  const [tab, setTab] = useState(0);

  return (
    <>
      <SideBar isHidden={navHidden} active="user" />
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
          <div className="text-[#3250ae] text-lg font-bold font-sans p-3 md:px-5">USER MANAGER</div>
          <div className="w-full">
            <ul className="m-auto w-5/6 border-b-2 flex justify-evenly items-center text-sm font-bold font-sans text-[#3250ae] p-3 md:px-5">
              <li className={`${tab === 0 && 'border-b-2 border-[#3250ae]'} cursor-pointer`} onClick={() => setTab(0)}>
                User
              </li>
              <li className={`${tab === 1 && 'border-b-2 border-[#3250ae]'} cursor-pointer`} onClick={() => setTab(1)}>
                Hannah
              </li>
              <li className={`${tab === 2 && 'border-b-2 border-[#3250ae]'} cursor-pointer`} onClick={() => setTab(2)}>
                Student
              </li>
            </ul>

            <div>
              {tab === 0 && <UserTable />}
              {tab === 1 && <HannahTable />}
              {tab === 2 && <StudentTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
