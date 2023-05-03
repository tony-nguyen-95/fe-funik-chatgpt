import React from 'react';
import { IConfirmDeleteProps } from './confirm-delete.type';
import { IoMdCloseCircle } from 'react-icons/io';

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
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-t-lg"
        >
          <h2 className="text-xl font-semibold text-center text-white">Vui lòng Xác Nhận</h2>
          <button
            className="text-2xl text-slate-100 hover:text-slate-200 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>
        <div className="w-full min-h-[11rem] flex flex-col justify-center items-center">
          <p className="text-lg font-semibold">{message}</p>

          <div className="absolute bottom-2 right-2">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={callback}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
