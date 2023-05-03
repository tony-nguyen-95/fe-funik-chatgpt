import React from 'react';
import { IConfirmDeleteProps } from './confirm-delete.type';

const prefixClassName = 'confirm-delete';

export const ConfirmDelete: React.FC<IConfirmDeleteProps> = (props) => {
  const { popup, setPopup, message, callback } = props;

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white min-w-[30rem] min-h-[14rem] rounded-lg relative animate-popup">
        <h2 className="text-2xl font-semibold text-center border-b-2 border-gray-300 py-2 w-2/3 mx-auto mt-5">
          Vui lòng Xác Nhận
        </h2>
        <div className="w-full h-full pl-16 mt-5">
          <p className="text-lg font-semibold">{message}</p>
        </div>

        <div className="absolute bottom-2 right-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={callback}>
            Xác nhận
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => setPopup(false)}
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};
