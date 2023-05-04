import React, { useEffect, useMemo, useState } from 'react';
import { IUserProps } from './user.type';
import { Header, SideBar, UserTable, HannahTable, StudentTable } from '../../views';
import { observer } from 'mobx-react';
import { CoreUserStore } from '../../stores/store-user';
import { CoreAuthenticationStore } from '../../stores';
import { useHistory } from 'react-router-dom';
import { IUserLoginResponse } from '../../models';

const prefixClassName = 'user';

export const User: React.FC<IUserProps> = observer((props) => {
  const history = useHistory();

  const allUser = CoreUserStore.allUserSelector();

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  const [navHidden, setNavHidden] = useState(true);

  const [tab, setTab] = useState(0);

  const summaryUser = useMemo(() => {
    const all: IUserLoginResponse[] = [];
    const hannahs: IUserLoginResponse[] = [];
    const students: IUserLoginResponse[] = [];

    allUser?.forEach((user) => {
      all.push(user);

      if (user.hannah) {
        hannahs.push(user);
      }

      if (!user.hannah) {
        students.push(user);
      }
    });

    return { all, hannahs, students };
  }, [allUser]);

  useEffect(() => {
    if (!allUser) {
      CoreUserStore.getAllUserAction();
    }
  }, [allUser]);

  useEffect(() => {
    if (!isLogin) {
      history.push('/login');
    }
  }, [history, isLogin]);

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
                All User
              </li>
              <li className={`${tab === 1 && 'border-b-2 border-[#3250ae]'} cursor-pointer`} onClick={() => setTab(1)}>
                Hannah
              </li>
              <li className={`${tab === 2 && 'border-b-2 border-[#3250ae]'} cursor-pointer`} onClick={() => setTab(2)}>
                Student
              </li>
            </ul>

            <div>
              {tab === 0 && <UserTable allUser={summaryUser.all} />}
              {tab === 1 && <HannahTable hannahs={summaryUser.hannahs} />}
              {tab === 2 && <StudentTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
