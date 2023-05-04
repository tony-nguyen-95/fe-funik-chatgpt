import React, { useState } from 'react';
import { IStudentTableByHannahProps } from './student-table-by-hannah.type';
import { Header, SideBar, ViewContacts, EditStudent } from '../../views';
import { IStudent, IStudentContact } from '../../models';
import { BsFillEyeFill, BsPencilSquare, BsFillChatSquareTextFill } from 'react-icons/bs';
import { getStatus } from '../../utils';

const prefixClassName = 'student-table-by-hannah';
const TEMP_DATA: IStudent[] = [
  {
    studentId: '4fcb845d-3f67-4a86-a1c9-bb9ad933673d',
    name: 'Nguyễn Văn A',
    funixId: 'FX0101',
    funixEmail: 'nguyễn_văn_a@funix.edu.vn',
    status: 1,
    address: 'Hà Nội',
    hannahId: '00000000-0000-0000-0000-000000000000',
  },
  {
    studentId: '3bc9a342-2c3e-4091-8c2d-a3c25ff0b96d',
    name: 'Nguyễn Văn B',
    funixId: 'FX0102',
    funixEmail: 'nguyễn_văn_b@funix.edu.vn',
    status: 1,
    address: 'Hà Nội',
    hannahId: '00000000-0000-0000-0000-000000000000',
  },
  {
    studentId: '68adddc2-4d5e-4558-967f-7be72a507e27',
    name: 'Nguyễn Văn C',
    funixId: 'FX0103',
    funixEmail: 'nguyễn_văn_c@funix.edu.vn',
    status: 1,
    address: 'Hà Nội',
    hannahId: '00000000-0000-0000-0000-000000000000',
  },
  {
    studentId: '012b562b-8737-4597-8640-2085b6701bf5',
    name: 'Nguyễn Văn D',
    funixId: 'FX0104',
    funixEmail: 'nguyễn_văn_d@funix.edu.vn',
    status: 1,
    address: 'Hà Nội',
    hannahId: '00000000-0000-0000-0000-000000000000',
  },
  {
    studentId: '2719627a-ee87-4b75-873e-846022bdd5ca',
    name: 'Nguyễn Văn E',
    funixId: 'FX0105',
    funixEmail: 'nguyễn_văn_e@funix.edu.vn',
    status: 1,
    address: 'Hà Nội',
    hannahId: '00000000-0000-0000-0000-000000000000',
  },
];
const DEMO_CONTACTS: IStudentContact[] = [
  {
    studentId: '',
    studentContactId: '',
    contactType: 1,
    name: '0123456789',
  },
  {
    studentId: '',
    studentContactId: '',
    contactType: 2,
    name: 'RFSADRENO#4012',
  },
  {
    studentId: '',
    studentContactId: '',
    contactType: 3,
    name: 'https://facebook.com/NVA',
  },
];

export const StudentTableByHannah: React.FC<IStudentTableByHannahProps> = (props) => {
  const [navHidden, setNavHidden] = useState(true);
  const [contactPopup, setContactPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(0);

  return (
    <>
      <SideBar isHidden={navHidden} active="tools" />
      <div
        className={`float-right w-full md:w-[calc(100%-5rem)] lg:w-[calc(100%-7rem)] overflow-hidden ${
          !navHidden && 'blur-md'
        }`}
      >
        <Header setNavHidden={setNavHidden} />
        <div
          className="h-[calc(100vh-5rem)] overflow-auto"
          onClick={() => {
            setNavHidden(true);
          }}
        >
          <div className="text-[#3250ae] text-lg font-bold font-sans p-3 md:px-5">HỌC VIÊN DO HANNAH QUẢN LÝ</div>
          <div className="w-max xl:w-full p-5 relative">
            <div className="flex justify-end items-center gap-2 w-[60rem] xl:w-[70rem] m-auto">
              {/* search and filter selector */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded-md w-[20rem] xl:w-[30rem] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Tìm kiếm"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-md w-[10rem] xl:w-[15rem] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => setFilter(parseInt(e.target.value, 10))}
                >
                  <option value="0">Tất cả</option>
                  <option value="1">Mới</option>
                  <option value="2">Đang học</option>
                  <option value="3">Tạm dừng</option>
                  <option value="4">Bảo lưu</option>
                  <option value="5">Hoàn thành</option>
                </select>
              </div>
            </div>
            <table className="table-auto drop-shadow-lg w-[60rem] xl:w-[70rem] m-auto mt-5">
              <thead>
                <tr className="text-gray-600 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 uppercase text-sm leading-normal">
                  <th className="px-4 py-2">Mã HV</th>
                  <th className="px-4 py-2">Họ Tên</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Địa Chỉ</th>
                  <th className="px-4 py-2">Liên Hệ</th>
                  <th className="px-4 py-2">Trạng Thái</th>
                  <th className="px-4 py-2 rounded-tr-lg">Chức Năng</th>
                </tr>
              </thead>
              <tbody>
                {TEMP_DATA.filter(
                  (e) =>
                    (filter === 0 || e.status === filter) && e.name?.toLowerCase().includes(search.toLocaleLowerCase()),
                ).map((student, index) => (
                  <tr
                    key={student.studentId}
                    className={`transition-[background-color] hover:bg-gray-200 hover:text-gray-700 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                    }`}
                  >
                    <td className="border px-4 py-2">{student.funixId}</td>
                    <td className="border px-4 py-2 font-semibold">{student.name}</td>
                    <td className="border px-4 py-2">{student.funixEmail}</td>
                    <td className="border px-4 py-2 max-w-xs">{student.address}</td>
                    <td className="border px-4 py-2 flex justify-center items-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded flex justify-center items-center gap-2 transition-[background-color]"
                        onClick={() => {
                          setCurrentStudent(student);
                          setContactPopup(true);
                        }}
                      >
                        <BsFillEyeFill /> Xem
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">{getStatus(student.status)}</td>
                    <td
                      className={`border px-4 py-2 flex justify-center items-center ${
                        index === TEMP_DATA.length - 1 ? 'rounded-br-lg' : ''
                      }`}
                    >
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-[background-color]"
                        onClick={() => {
                          setCurrentStudent(student);
                          setEditPopup(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        <BsPencilSquare />
                      </button>
                      <a
                        type="button"
                        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-[background-color] ml-1"
                        title="Tương tác"
                        href="/tools/interaction"
                        target="_blank"
                      >
                        <BsFillChatSquareTextFill />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ViewContacts popup={contactPopup} setPopup={setContactPopup} contacts={DEMO_CONTACTS} />
            <EditStudent
              baseInfo={{
                name: currentStudent?.name || '',
                funixId: currentStudent?.funixId || '',
                funixEmail: currentStudent?.funixEmail || '',
                address: currentStudent?.address || '',
                status: currentStudent?.status || 1,
              }}
              popup={editPopup}
              setPopup={setEditPopup}
              callback={(event) => {
                event.preventDefault();

                const index = TEMP_DATA.findIndex((student) => student.studentId === currentStudent?.studentId);
                if (index !== -1) {
                  const name = document.getElementById('name') as HTMLInputElement;
                  const funixId = document.getElementById('funixId') as HTMLInputElement;
                  const funixEmail = document.getElementById('funixEmail') as HTMLInputElement;
                  const status = document.getElementById('status') as HTMLSelectElement;
                  const address = document.getElementById('address') as HTMLInputElement;

                  if (!name.value || !funixId.value || !funixEmail.value || !status.value) {
                    return false;
                  }

                  TEMP_DATA[index].name = name.value;
                  TEMP_DATA[index].funixId = funixId.value;
                  TEMP_DATA[index].funixEmail = funixEmail.value;
                  TEMP_DATA[index].status = Number(status.value);
                  TEMP_DATA[index].address = address.value;

                  setEditPopup(false);
                }

                return false;
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
