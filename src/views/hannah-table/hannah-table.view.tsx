import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IHannahTableProps } from './hannah-table.type';
import { IHannah } from '../../models';
import { Popup } from '../popup';

const prefixClassName = 'hannah-table';
const AVAILABLE_USERID = [uuidv4(), uuidv4(), uuidv4(), '8ec27a4e-bd28-4acf-8956-71ad6d112351'];
const TEMP_DATA: IHannah[] = [
  {
    hannahId: '57b2752c-952f-4769-9fbd-83bf8e26f1e4',
    name: 'Lan Anh',
    birthDay: null,
    email: '',
    phoneNumber: '',
    isDeleted: false,
    students: null,
    userId: '8ec27a4e-bd28-4acf-8956-71ad6d112351',
    user: null,
  },
];

export const HannahTable: React.FC<IHannahTableProps> = (props) => {
  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [popUpAdd, setPopUpAdd] = useState(false);
  const [choosenUser, setChoosenUser] = useState<IHannah | null>(null);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-start p-5">
        <div className="w-full flex flex-col justify-center items-center">
          <table className="table-auto w-5/6">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center rounded-tl-lg">STT</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">Email</th>
                <th className="py-3 px-6 text-center">SDT</th>
                <th className="py-3 px-6 text-center">Ngày sinh</th>
                <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {TEMP_DATA.map((user, index) => (
                <tr
                  key={user.userId}
                  className="border-gray-200 hover:bg-gray-100 text-gray-600 text-sm leading-normal"
                >
                  <td className="text-center p-2">{index + 1}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email || <span className="text-slate-300">chưa cập nhật</span>}</td>
                  <td className="p-2">{user.phoneNumber || <span className="text-slate-300">chưa cập nhật</span>}</td>
                  <td className="p-2">{user.birthDay || <span className="text-slate-300">chưa cập nhật</span>}</td>
                  <td className="text-center p-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        setChoosenUser(user);
                        setPopUp(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={() => {
                        setChoosenUser(user);
                        setPopUpDelete(true);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border-gray-200 hover:bg-gray-100 text-gray-600 text-sm leading-normal border-t-2">
                <td className="text-center p-2" />
                <td className="p-2" />
                <td className="p-2" />
                <td className="p-2" />
                <td className="p-2" />
                <td className="text-center p-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setPopUpAdd(true);
                    }}
                  >
                    Add new Hannah
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Popup popUp={popUp}>
        <div className="w-[30rem] min-h-96 bg-white rounded-md shadow-2xl py-5 px-2">
          <h2 className="font-sans text-xl text-center p-2 font-bold">Chỉnh sửa hồ sơ người dùng</h2>
          <form
            method="POST"
            className="w-full p-3"
            onSubmit={(e) => {
              e.preventDefault();

              const data = new FormData(e.target as HTMLFormElement);
              const name = data.get('name') as string;
              const email = data.get('email') as string;
              const phoneNumber = data.get('phoneNumber') as string;
              const birthDay = data.get('birthDay') as string;
              const userId = data.get('userId') as string;

              if (choosenUser) {
                const index = TEMP_DATA.findIndex((user) => user.userId === choosenUser.userId);

                if (index !== -1) {
                  TEMP_DATA[index] = {
                    ...choosenUser,
                    userId: userId || choosenUser.userId,
                    name: name || choosenUser.name,
                    email: email || choosenUser.email,
                    phoneNumber,
                    birthDay,
                  };
                }
              }

              setPopUp(false);
              setChoosenUser(null);
              return false;
            }}
          >
            <label htmlFor="userId">ID:</label>
            <br />
            <select name="userId" id="userId" className="w-full border-2 border-gray-400 rounded-md p-2">
              {AVAILABLE_USERID.filter((userId) => !TEMP_DATA.some((e) => e.user === userId)).map((userId) => (
                <option value={userId} key={userId}>
                  {userId}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="name">Name:</label>
            <br />
            <input type="text" id="name" name="name" className="w-full border-2 border-gray-400 rounded-md p-2" />
            <br />

            <label htmlFor="email">Email:</label>
            <br />
            <input type="text" id="email" name="email" className="w-full border-2 border-gray-400 rounded-md p-2" />
            <br />
            <br />

            <label htmlFor="phoneNumber">SDT:</label>
            <br />
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full border-2 border-gray-400 rounded-md p-2"
            />
            <br />
            <label htmlFor="birthDay">Ngày Sinh:</label>
            <br />
            <input
              type="text"
              id="birthDay"
              name="birthDay"
              className="w-full border-2 border-gray-400 rounded-md p-2"
            />
            <br />

            <div className="float-right mt-5">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
                onClick={() => {
                  setPopUp(false);
                  setChoosenUser(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 ml-2"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </Popup>
      <Popup popUp={popUpDelete}>
        <div className="w-[30rem] min-h-96 bg-white rounded-md shadow-2xl py-5 px-2">
          <h2 className="font-sans text-xl text-center p-2 font-bold">Xác Nhận</h2>
          <p>
            Bạn có chắc chắn muốn xóa Hannah <span className="font-bold">{choosenUser?.name}</span> không?
          </p>
          <div className="float-right mt-5">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
              onClick={() => {
                setPopUpDelete(false);
                setChoosenUser(null);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3 ml-2"
              onClick={() => {
                setPopUpDelete(false);
                setChoosenUser(null);

                TEMP_DATA.splice(
                  TEMP_DATA.findIndex((user) => user.userId === choosenUser?.userId),
                  1,
                );
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Popup>
      <Popup popUp={popUpAdd}>
        <div className="w-[30rem] min-h-96 bg-white rounded-md shadow-2xl py-5 px-2">
          <h2 className="font-sans text-xl text-center p-2 font-bold">Thêm người dùng</h2>
          <form
            method="POST"
            className="w-full p-3"
            onSubmit={(e) => {
              e.preventDefault();

              const data = new FormData(e.target as HTMLFormElement);
              const name = data.get('name') as string;
              const email = data.get('email') as string;
              const phoneNumber = data.get('phoneNumber') as string;
              const birthDay = data.get('birthDay') as string;
              const userId = data.get('userId') as string;

              if (!userId) {
                alert('Vui lòng nhập userId!');
                return false;
              }

              if (email) {
                const index = TEMP_DATA.findIndex((user) => user.email === email);
                if (index !== -1) {
                  alert('Email đã tồn tại!');
                  return false;
                }
              }

              if (phoneNumber) {
                const index = TEMP_DATA.findIndex((user) => user.phoneNumber === phoneNumber);

                if (index !== -1) {
                  alert('SDT đã tồn tại!');
                  return false;
                }
              }

              TEMP_DATA.push({
                hannahId: uuidv4(),
                name,
                email,
                phoneNumber,
                birthDay,
                isDeleted: false,
                students: null,
                userId,
                user: null,
              });

              setPopUpAdd(false);
              return false;
            }}
          >
            <label htmlFor="userName">UserName:</label>
            <br />
            <input
              type="text"
              id="userName"
              name="userName"
              className="w-full border-2 border-gray-400 rounded-md p-2"
            />
            <br />

            <label htmlFor="password">Password:</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border-2 border-gray-400 rounded-md p-2"
            />
            <br />
            <br />

            <label htmlFor="funixId">Funix ID:</label>
            <br />
            <input type="text" id="funixId" name="funixId" className="w-full border-2 border-gray-400 rounded-md p-2" />
            <br />
            <label htmlFor="funixEmail">Funix Email:</label>
            <br />
            <input
              type="text"
              id="funixEmail"
              name="funixEmail"
              className="w-full border-2 border-gray-400 rounded-md p-2"
            />
            <br />

            <div className="float-right mt-5">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3"
                onClick={() => {
                  setPopUpAdd(false);
                  setChoosenUser(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 ml-2"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Popup>
    </>
  );
};
