import React, { useEffect } from 'react';
import { IEditHannahProps } from './edit-hannah.type';

import { IoMdCloseCircle } from 'react-icons/io';

const prefixClassName = 'edit-hannah';

export const EditHannah: React.FC<IEditHannahProps> = (props) => {
  const { popup, setPopup, callback, baseInfo } = props;

  useEffect(() => {
    if (baseInfo) {
      const name = document.getElementById('name') as HTMLInputElement;
      const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const address = document.getElementById('address') as HTMLInputElement;

      name.value = baseInfo.name;
      phoneNumber.value = baseInfo.phoneNumber;
      email.value = baseInfo.email;
      address.value = baseInfo.address;
    }
  }, [baseInfo]);

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white min-w-[40rem] min-h-[27rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-white">Chỉnh sửa thông tin Hannah</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>

        <form method="POST" onSubmit={callback} className="w-full min-h-[24rem] py-2 px-8 mt-12">
          <label htmlFor="name" className="text-md font-semibold">
            Tên
          </label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập họ tên"
          />
          <br />
          <br />

          <label htmlFor="email" className="text-md font-semibold mt-3">
            Email
          </label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập Email Funix của HV"
          />
          <br />
          <br />

          <label htmlFor="phoneNumber" className="text-md font-semibold mt-3">
            Số điện thoại
          </label>
          <br />
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập Email Funix của HV"
          />
          <br />
          <br />

          <label htmlFor="address" className="text-md font-semibold mt-3">
            Địa chỉ
          </label>
          <br />
          <input
            type="text"
            name="address"
            id="address"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập địa chỉ"
          />
          <br />
          <br />

          <div className="flex justify-end items-center w-full mt-5 gap-3">
            <button className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-bold py-2 px-6 rounded">
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
