import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IUserTableProps } from './user-table.type';
import { IUser } from '../../models';

import { Popup } from '../popup';

const prefixClassName = 'user-table';

const TEMP_DATA: IUser[] = [
  {
    userId: '03431632-1b2e-4e9c-9bf5-96c851605a42',
    userName: 'dungtct',
    password:
      '6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604',
    funixId: '',
    funixEmail: '',
    isDeleted: false,
    loginDate: '2023-05-01T05:10:35.503438',
    createdDate: '2023-04-29T09:32:18.94782',
    updatedDate: '2023-04-29T09:32:18.94782',
    hannah: null,
  },
  {
    userId: '1f3899c2-3d14-4786-bdcd-d02694ec5888',
    userName: 'huynq',
    password:
      '6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604',
    funixId: '',
    funixEmail: '',
    isDeleted: false,
    loginDate: '2023-04-29T09:32:18.947816',
    createdDate: '2023-04-29T09:32:18.947816',
    updatedDate: '2023-04-29T09:32:18.947816',
    hannah: null,
  },
  {
    userId: '4c755940-82a8-4343-b294-739b7c5d3888',
    userName: 'dattlt',
    password:
      '6BFCC4026B5F162799A6DC8305C09DB9C1674AC616BD5C7422A45FBB6D0816AC163047C47A1F426F4F4C6B5B5042C671EABC4FDC7310FD5B183EEF59DC274604',
    funixId: '',
    funixEmail: '',
    isDeleted: false,
    loginDate: '2023-04-29T09:32:18.947814',
    createdDate: '2023-04-29T09:32:18.947813',
    updatedDate: '2023-04-29T09:32:18.947814',
    hannah: null,
  },
  {
    userId: '8ec27a4e-bd28-4acf-8956-71ad6d112351',
    userName: 'Hannah Lan Anh',
    password:
      'BEACBEB5870C14A9A1495A195451C345426F5A125CB7001B019D99298548827E0D93E5A1CD94AF2E4EAAF56B201716C7BDFE7AF39B9D7ACB4ADA4EC9246D2017',
    funixId: '',
    funixEmail: 'hannahlananh@funix.edu.vn',
    isDeleted: false,
    loginDate: '2023-05-02T02:13:03.84036',
    createdDate: '2023-05-02T02:13:03.84034',
    updatedDate: '2023-05-02T02:13:03.840351',
    hannah: null,
  },
];

export const UserTable: React.FC<IUserTableProps> = ({ allUser }) => {
  const [popUp, setPopUp] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);
  const [popUpAdd, setPopUpAdd] = useState(false);
  const [choosenUser, setChoosenUser] = useState<IUser | null>(null);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-start p-5">
        <div className="w-full flex flex-col justify-center items-center">
          <table className="table-auto w-5/6">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center rounded-tl-lg">STT</th>
                <th className="py-3 px-6 text-center">Username</th>
                <th className="py-3 px-6 text-center">Funix ID</th>
                <th className="py-3 px-6 text-center">Funix Email</th>
                <th className="py-3 px-6 text-center rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user, index) => (
                <tr
                  key={user.userId}
                  className="border-gray-200 hover:bg-gray-100 text-gray-600 text-sm leading-normal"
                >
                  <td className="text-center p-2">{index + 1}</td>
                  <td className="p-2">{user.userName}</td>
                  <td className="p-2">{user.funixId || <span className="text-slate-300">chưa cập nhật</span>}</td>
                  <td className="p-2">{user.funixEmail || <span className="text-slate-300">chưa cập nhật</span>}</td>
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
                <td className="text-center p-2">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setPopUpAdd(true);
                    }}
                  >
                    Add new user
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
              const userName = data.get('userName') as string;
              const password = data.get('password') as string;
              const funixId = data.get('funixId') as string;
              const funixEmail = data.get('funixEmail') as string;

              if (choosenUser) {
                const index = TEMP_DATA.findIndex((user) => user.userId === choosenUser.userId);

                if (index !== -1) {
                  TEMP_DATA[index] = {
                    ...choosenUser,
                    userName,
                    password,
                    funixId,
                    funixEmail,
                  };
                }
              }

              setPopUp(false);
              setChoosenUser(null);
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
            Bạn có chắc chắn muốn xóa user <span className="font-bold">{choosenUser?.userName}</span> không?
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
              const userName = data.get('userName') as string;
              const password = data.get('password') as string;
              const funixId = data.get('funixId') as string;
              const funixEmail = data.get('funixEmail') as string;

              if (funixEmail) {
                const index = TEMP_DATA.findIndex((user) => user.funixEmail === funixEmail);
                if (index !== -1) {
                  alert('Email đã tồn tại!');
                  return false;
                }
              }

              if (funixId) {
                const index = TEMP_DATA.findIndex((user) => user.funixId === funixId);

                if (index !== -1) {
                  alert('Funix ID đã tồn tại!');
                  return false;
                }
              }

              if (!userName || !password) {
                alert('Thiếu userName hoặc password!');
                return false;
              }

              TEMP_DATA.push({
                userId: uuidv4(),
                userName,
                password,
                funixId,
                funixEmail,
                isDeleted: false,
                loginDate: new Date().toLocaleString(),
                createdDate: new Date().toLocaleString(),
                updatedDate: new Date().toLocaleString(),
                hannah: null,
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
