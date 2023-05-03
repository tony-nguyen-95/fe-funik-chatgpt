import React from 'react';
import { IAddStudent } from './add-student.type';

import { IoMdCloseCircle } from 'react-icons/io';

const prefixClassName = 'add-student';

export const AddStudent: React.FC<IAddStudent> = (props) => {
  const { popup, setPopup, callback } = props;

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white min-w-[40rem] min-h-[30rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-white">Thêm Học Viên</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>

        <form method="POST" onSubmit={callback} className="w-full min-h-[27rem] py-2 px-8 mt-12">
          <label htmlFor="a-name" className="text-md font-semibold">
            Họ Tên
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

          <label htmlFor="a-funixId" className="text-md font-semibold mt-3">
            Mã HV
          </label>
          <br />
          <input
            type="text"
            name="funixId"
            id="a-funixId"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập mã HV"
          />
          <br />
          <br />

          <label htmlFor="a-funixEmail" className="text-md font-semibold mt-3">
            Email Funix của HV
          </label>
          <br />
          <input
            type="text"
            name="funixEmail"
            id="a-funixEmail"
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

          <label htmlFor="a-status" className="text-md font-semibold mt-3">
            Tình trạng
          </label>
          <br />
          <select className="w-full p-2 border border-gray-300 rounded-md" id="a-status" name="status">
            <option value="1">Mới</option>
            <option value="2">Đang học</option>
            <option value="3">Tạm dừng</option>
            <option value="4">Bảo lưu</option>
            <option value="5">Hoàn thành</option>
          </select>
          <br />

          <div className="flex justify-end items-center w-full mt-5 gap-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" type="submit">
              Lưu
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
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
