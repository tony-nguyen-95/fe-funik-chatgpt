import React from 'react';
import { IAddHannahProps } from './add-hannah.type';

import { IoMdCloseCircle } from 'react-icons/io';

const prefixClassName = 'add-student';

export const AddHannah: React.FC<IAddHannahProps> = (props) => {
  const { popup, setPopup, callback, availableUserIds } = props;

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white w-[95%] md:w-auto md:min-w-[40rem] min-h-[27rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-lg md:text-2xl font-semibold text-center text-white">Thêm Hannah</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>

        <form method="POST" onSubmit={callback} className="w-full min-h-[24rem] py-2 px-8 mt-12">
          <label htmlFor="a-userId" className="text-md font-semibold">
            UserId
          </label>
          <br />
          <select name="userId" id="a-userId" className="border border-gray-300 rounded-md p-1 w-full">
            <option value="">Chọn UserId</option>
            {availableUserIds.map((userId) => (
              <option value={userId} key={userId}>
                {userId}
              </option>
            ))}
          </select>
          <br />
          <br />

          <label htmlFor="a-name" className="text-md font-semibold">
            Tên
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="a-name"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập họ tên"
          />
          <br />
          <br />

          <label htmlFor="a-email" className="text-md font-semibold mt-3">
            Email
          </label>
          <br />
          <input
            type="text"
            name="email"
            id="a-email"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập Email Funix của HV"
          />
          <br />
          <br />

          <label htmlFor="a-phoneNumber" className="text-md font-semibold mt-3">
            Số điện thoại
          </label>
          <br />
          <input
            type="text"
            name="phoneNumber"
            id="a-phoneNumber"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập Email Funix của HV"
          />
          <br />
          <br />

          <label htmlFor="a-address" className="text-md font-semibold mt-3">
            Địa chỉ
          </label>
          <br />
          <input
            type="text"
            name="address"
            id="a-address"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập địa chỉ"
          />
          <br />
          <br />

          <div className="flex justify-end items-center w-full mt-5 gap-3">
            <button
              className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold py-2 px-6 rounded"
              type="submit"
            >
              Lưu
            </button>
            <button
              className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-bold py-2 px-6 rounded"
              type="button"
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
