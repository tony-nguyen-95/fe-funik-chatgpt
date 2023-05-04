import React, { useEffect, useState } from 'react';
import { IHomeProps } from './home.type';

import { observer } from 'mobx-react';
import { SideBar, Header } from '../../views';
import { DoughnutChart, VerticalBarChart } from '../../components';

import { BsPeopleFill, BsPersonWorkspace, BsShare } from 'react-icons/bs';
import { MdFileDownloadDone, MdOutlineContentPaste } from 'react-icons/md';
import { TfiReload } from 'react-icons/tfi';
import { useHistory } from 'react-router-dom';
import { CoreAuthenticationStore } from '../../stores';

const TEMP_DATA = {
  date: new Intl.DateTimeFormat('vi').format(),
  students: {
    baoluu: 10,
    dunghoc: 5,
    total: 250,
    completed: 85,
    active: 150,
    completedSubjectThisMonth: 35,
    completedCertificateThisMonth: 10,
    tuongtac: [
      {
        moreThanThree: 15,
        oneToThree: 40,
        zero: 95,
      },
      {
        moreThanThree: 10,
        oneToThree: 20,
        zero: 50,
      },
      {
        moreThanThree: 5,
        oneToThree: 30,
        zero: 70,
      },
      {
        moreThanThree: 20,
        oneToThree: 25,
        zero: 80,
      },
      {
        moreThanThree: 15,
        oneToThree: 35,
        zero: 90,
      },
    ],
    progress: {
      over: 15,
      on: 70,
      delay_1: 10,
      delay_2: 5,
    },
  },
  month: new Intl.DateTimeFormat('vi').formatToParts()[2].value,
  year: new Intl.DateTimeFormat('vi').formatToParts()[4].value,
};

export const Home: React.FC<IHomeProps> = observer((props) => {
  const history = useHistory();

  const [navHidden, setNavHidden] = useState(true);

  const isLogin = CoreAuthenticationStore.isLoginSelector();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLogin) {
      history.push('/login');
    }
  }, [history, isLogin]);

  return (
    <>
      <SideBar isHidden={navHidden} />
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
          <div className="w-full py-3 px-3 md:px-5 lg:pr-32 flex justify-between items-center">
            <h1 className="text-[#3250ae] text-lg font-bold font-sans">DASHBOARD</h1>
            <p className="text-[#3250ae] text-lg font-semibold font-sans">Ngày {TEMP_DATA.date}</p>
          </div>
          <div className="w-full p-5 md:grid grid-flow-col grid-cols-5 gap-5">
            <div className="col-start-1 col-end-5 flex justify-evenly items-center gap-2 flex-col md:flex-row">
              <div
                className="bg-[#2d5095] p-2 rounded-md text-white w-full md:w-40 lg:w-52 xl:w-80 h-44
						flex justify-evenly items-start flex-col px-6"
              >
                <BsPeopleFill size={40} />
                <h3 className="text-md font-semibold font-sans">TỔNG SỐ HỌC VIÊN</h3>
                <p className="text-3xl font-semibold font-sans">{TEMP_DATA.students.total}</p>
              </div>
              <div
                className="bg-[#2d5095] p-2 rounded-md text-white w-full md:w-40 lg:w-52 xl:w-80 h-44
						flex justify-evenly items-start flex-col px-6"
              >
                <MdFileDownloadDone size={40} />
                <h3 className="text-md font-semibold font-sans">ĐÃ HOÀN THÀNH</h3>
                <p className="text-3xl font-semibold font-sans">{TEMP_DATA.students.completed}</p>
              </div>
              <div
                className="bg-[#2d5095] p-2 rounded-md text-white w-full md:w-40 lg:w-52 xl:w-80 h-44
						flex justify-evenly items-start flex-col px-6"
              >
                <BsPersonWorkspace size={40} />
                <h3 className="text-md font-semibold font-sans">ĐANG HOẠT ĐỘNG</h3>
                <p className="text-3xl font-semibold font-sans">{TEMP_DATA.students.active}</p>
              </div>
            </div>
            <div className="flex md:flex-col px-5 md:px-0 justify-between items-start mt-5 md:mt-0">
              <div>
                <h3 className="text-lg text-slate-600 font-sans">BẢO LƯU</h3>
                <p className="text-3xl font-semibold font-sans">{TEMP_DATA.students.baoluu}</p>
              </div>
              <div>
                <h3 className="text-lg text-slate-600 font-sans">DỪNG HỌC</h3>
                <p className="text-3xl font-semibold font-sans">{TEMP_DATA.students.dunghoc}</p>
              </div>
            </div>
          </div>
          <div className="py-5 pl-8 text-lg">
            Tháng:{' '}
            <span className="text-2xl font-semibold rounded-md border-2 border-[#5475b7] px-10 py-2">
              {TEMP_DATA.month} / {TEMP_DATA.year}
            </span>
          </div>
          <div className="w-full py-5 px-5 md:px-12 lg:pr-32 flex justify-between items-center flex-col xl:flex-row">
            <div className="w-full xl:w-1/2 border-b-2 xl:border-0 md:flex justify-between items-center gap-5 xl:block">
              <div>
                <div>
                  <h3 className="text-lg font-sans">Hoàn thành môn trong tháng</h3>
                  <p className="text-[#5970f6] text-2xl font-semibold">
                    {TEMP_DATA.students.completedSubjectThisMonth}
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-sans">Hoàn thành CC trong tháng</h3>
                  <p className="text-[#5970f6] text-2xl font-semibold">
                    {TEMP_DATA.students.completedCertificateThisMonth}
                  </p>
                </div>
              </div>
              <div>
                <div className="h-full md:h-[200px] xl:h-[175px] overflow-y-hidden flex justify-start items-center mt-8">
                  <div className="w-full xl:w-[55%]">
                    <DoughnutChart data={TEMP_DATA.students.progress} />
                  </div>
                </div>
                <p className="text-lg xl:text-md font-sans font-semibold mt-4 text-center w-full xl:w-2/3">
                  Tiến độ/Active
                </p>
              </div>
            </div>
            <div className="w-full xl:w-1/2 mt-10 xl:mt-0">
              <div className="w-full flex justify-evenly items-center">
                <div>
                  <h4 className="font-sans">{'> 3 lần'}</h4>
                  <div className="flex justify-center items-center gap-3 mt-3">
                    <BsShare size={30} className="inline" color="#e5864f" />
                    <p className="inline text-[#5970f6] text-2xl ">
                      {TEMP_DATA.students.tuongtac[TEMP_DATA.students.tuongtac.length - 1].moreThanThree}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-sans">1 - 3 lần</h4>
                  <div className="flex justify-center items-center gap-3 mt-3">
                    <TfiReload size={30} className="inline" color="#e5864f" />
                    <p className="inline text-[#5970f6] text-2xl ">
                      {TEMP_DATA.students.tuongtac[TEMP_DATA.students.tuongtac.length - 1].oneToThree}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-sans">Chưa liên hệ</h4>
                  <div className="flex justify-center items-center gap-3 mt-3">
                    <MdOutlineContentPaste size={34} className="inline" color="#e5864f" />
                    <p className="inline text-[#5970f6] text-2xl ">
                      {TEMP_DATA.students.tuongtac[TEMP_DATA.students.tuongtac.length - 1].zero}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-md text-center font-sans font-semibold mt-10 xl:mt-4">
                Số học viên đã tương tác trong tuần
              </p>
              <div className="w-full flex justify-center items-center mt-16 xl:mt-8">
                <div className="w-full xl:w-2/3">
                  <VerticalBarChart data={TEMP_DATA.students.tuongtac} />
                </div>
              </div>
              <p className="text-md font-sans font-semibold mt-8 xl:mt-4 text-center">
                Số học viên đã tương tác trong tháng
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
