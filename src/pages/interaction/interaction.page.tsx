import React, { useState } from 'react';
import { IInteractionProps } from './interaction.type';
import { v4 as uuidv4 } from 'uuid';
import { getContactType } from '../../utils';
import { Header, SideBar } from '../../views';

const prefixClassName = 'interaction';

const TEMP_DATA = [
  {
    studentId: uuidv4(),
    messages: [
      {
        message: 'Thứ 2 này chị hẹn mentor gặp em nhé Thứ 2 này chị hẹn mentor gặp em nhé!',
        date: '04/04/2023',
        id: uuidv4(),
        status: 3,
      },
      {
        message: 'Thi xong chưa?',
        date: '01/05/2023',
        id: uuidv4(),
        status: 1,
      },
    ],
  },
  {
    studentId: uuidv4(),
    messages: [
      {
        message: 'Cố lên nhé em, sắp xong môn roài 😁',
        date: '04/03/2023',
        id: uuidv4(),
        status: 2,
      },
    ],
  },
  {
    studentId: uuidv4(),
    messages: [
      {
        message: 'Chúc mừng em qua môn nha!',
        date: '02/04/2023',
        id: uuidv4(),
        status: 1,
      },
    ],
  },
];

export const Interaction: React.FC<IInteractionProps> = (props) => {
  const [navHidden, setNavHidden] = useState(true);
  const [currentStudentId, setCurrentStudentId] = useState<string>(TEMP_DATA[0].studentId);

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
          <div className="text-[#3250ae] text-lg font-bold font-sans p-3 md:px-5">TƯƠNG TÁC VỚI HỌC VIÊN</div>
          <div className="w-full p-5 relative">
            <div className="flex justify-center flex-col items-start">
              <label htmlFor="studentId" className="text-[#3250ae] text-lg font-bold font-sans p-2">
                Chọn học viên
              </label>
              <select
                id="studentId"
                className="w-full md:w-96 p-2 border-2 border-[#3250ae] rounded-lg shadow-lg"
                onChange={(e) => {
                  setCurrentStudentId(e.target.value);
                }}
              >
                {TEMP_DATA.map((item) => (
                  <option value={item.studentId} key={item.studentId}>
                    {item.studentId}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mt-10 w-full">
              {TEMP_DATA.find((e) => e.studentId === currentStudentId)?.messages.map((item) => (
                <div
                  className="
										bg-[#fff] text-[#3250ae] rounded-lg p-2 shadow-lg
										border-4 border-[#3250ae]
										cursor-pointer
										hover:scale-105 hover:shadow-xl
										transform transition-all
										relative
									"
                  key={item.id}
                >
                  <p className="text-start h-20 overflow-hidden" title={item.message}>
                    {item.message}
                  </p>
                  <div className="flex justify-between items-start flex-col w-full border-t-2">
                    <div className="text-start text-sm font-semibold">{item.date}</div>
                    <div className="text-start text-md font-semibold">{getContactType(item.status)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
