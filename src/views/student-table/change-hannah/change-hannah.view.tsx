import React from 'react';
import { IChangeHannahProps } from './change-hannah.type';

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
      <div className="bg-white min-w-[30rem] min-h-[20rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <h2 className="text-2xl font-semibold text-center border-b-2 border-gray-300 py-2 w-2/3">Thay đổi Hannah</h2>

        <p id="current-hannah" className="text-lg">
          Hannah hiện tại: <span className="font-semibold">{curHannah?.name || 'Chưa có Hannah'}</span>
        </p>

        <form method="POST" onSubmit={callback} className="w-full py-2 px-8 mt-5">
          <label htmlFor="hannahId" className="text-md font-semibold mt-3">
            Chọn Hannah mới:
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
            Ngày bắt đầu hỗ trợ:
          </label>
          <br />
          <input type="date" name="startDate" id="startDate" className="border border-gray-300 rounded-md p-1 w-full" />

          <div className="flex justify-end items-center w-full mt-5 gap-3">
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Thay đổi
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setPopup(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
