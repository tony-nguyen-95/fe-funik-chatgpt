import React from 'react';
import { IChangeHannahProps } from './change-hannah.type';
import { IoMdCloseCircle } from 'react-icons/io';

const prefixClassName = 'confirm-delete';

export const ChangeHannah: React.FC<IChangeHannahProps> = (props) => {
  const { popup, setPopup, baseInfo, callback, HANNAHS } = props;
  const curHannah = HANNAHS.find((hannah) => hannah.hannahId === baseInfo.hannahId);

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white w-[95%] md:w-auto md:min-w-[30rem] min-h-[20rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-xl font-semibold text-center text-white">Thay đổi Hannah</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>

        <div className="w-full min-h-[17rem] mt-12 flex flex-col justify-center items-start">
          <p id="current-hannah" className="text-lg px-4 md:px-8">
            Hannah hiện tại: <span className="font-semibold">{curHannah?.name || 'Chưa có Hannah'}</span>
          </p>

          <form method="POST" onSubmit={callback} className="w-full py-2 px-4 md:px-8 mt-5">
            <label htmlFor="hannahId" className="text-md font-semibold mt-3">
              Chọn Hannah mới
            </label>
            <br />
            <select name="hannahId" id="hannahId" className="border border-gray-300 rounded-md p-1 w-full">
              <option value="00000000-0000-0000-0000-000000000000">Bỏ trống</option>
              {HANNAHS.filter((e) => e.hannahId !== curHannah?.hannahId).map((hannah) => (
                <option key={hannah.hannahId} value={hannah.hannahId}>
                  {hannah.name}
                </option>
              ))}
            </select>
            <br />
            <br />

            <label htmlFor="startDate" className="text-md font-semibold mt-3">
              Ngày bắt đầu hỗ trợ
            </label>
            <br />
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="border border-gray-300 rounded-md p-1 w-full"
            />

            <div className="flex justify-end items-center w-full mt-8 gap-3">
              <button
                type="submit"
                className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white font-bold py-2 px-6 rounded"
              >
                Thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
