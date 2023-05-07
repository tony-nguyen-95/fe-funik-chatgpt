import React from 'react';
import { IChangeCertificateProps } from './edit-contact.type';
import { IoMdCloseCircle } from 'react-icons/io';
import { getContactType } from '../../../utils';
import { BsFillTrashFill } from 'react-icons/bs';
import { CiUndo } from 'react-icons/ci';

const prefixClassName = 'confirm-delete';

export const EditContact: React.FC<IChangeCertificateProps> = (props) => {
  const { popup, setPopup, contacts, pendingDelete, setPendingDelete, callback } = props;

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
			transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
				${popup ? 'block' : 'hidden'}
			`}
    >
      <div className="bg-white w-[95%] md:w-auto md:min-w-[30rem] min-h-[28rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
					bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-lg md:text-2xl font-semibold text-center text-white">Cập nhật thông tin liên hệ</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>

        <div className="w-full min-h-[25rem] flex justify-center items-center flex-col">
          {contacts ? (
            <div className="w-full px-4 md:px-8">
              <p className="text-md font-semibold">Danh sách liên hệ:</p>
              <ul>
                {contacts.map((contact) => {
                  return (
                    <li
                      key={contact.studentContactId}
                      className={`flex justify-between items-center w-full ${
                        pendingDelete?.has(contact.studentContactId) ? 'bg-red-100' : ''
                      }`}
                    >
                      <p className="text-md">{getContactType(contact.contactType)}</p>
                      <div className="text-md flex justify-center items-center gap-2">
                        <p>{contact.name}</p>
                        {!pendingDelete?.has(contact.studentContactId) ? (
                          <button
                            className="text-red-500 hover:text-red-600 transition-colors duration-300"
                            onClick={() => {
                              setPendingDelete((prev) => {
                                prev.add(contact.studentContactId);
                                return new Set(prev);
                              });
                            }}
                          >
                            <BsFillTrashFill size={20} />
                          </button>
                        ) : (
                          <button
                            className="text-lime-500 hover:text-lime-600 transition-colors duration-300"
                            onClick={() => {
                              setPendingDelete((prev) => {
                                prev.delete(contact.studentContactId);
                                return new Set(prev);
                              });
                            }}
                          >
                            <CiUndo size={20} />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          <form method="POST" onSubmit={callback} className="w-full py-2 px-4 md:px-8 mt-5">
            <label htmlFor="contactType" className="text-md font-semibold mt-3">
              Chọn loại liên hệ
            </label>
            <br />
            <select name="contactType" id="contactType" className="border border-gray-300 rounded-md p-1 w-full">
              <option value="1">Zalo</option>
              <option value="2">Discord</option>
              <option value="3">Facebook</option>
              <option value="4">Email</option>
              <option value="5">Viber</option>
              <option value="6">Telegram</option>
              <option value="7">Skype</option>
              <option value="8">PhoneNumber</option>
              <option value="9">Khác</option>
            </select>
            <br />
            <br />

            <label htmlFor="name" className="text-md font-semibold mt-3">
              Tên liên hệ
            </label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-300 rounded-md p-1 w-full"
              placeholder="Nhập tên liên hệ"
            />
            <br />
            <br />

            <div className="flex justify-end items-center w-full mt-8">
              <button
                type="button"
                className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white font-bold py-2 px-6 rounded"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
