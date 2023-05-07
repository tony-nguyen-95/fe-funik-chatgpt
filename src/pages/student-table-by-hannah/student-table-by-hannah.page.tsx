import React, { useState } from 'react';
import { IStudentTableByHannahProps } from './student-table-by-hannah.type';
import { Header, SideBar, ViewContacts, EditHannahStudent, EditContact } from '../../views';
import { IHannahStudent } from '../../models';
import { BsFillEyeFill, BsPencilSquare, BsFillChatSquareTextFill } from 'react-icons/bs';
import { getProgress, getStatus } from '../../utils';
import { AiFillPlusCircle } from 'react-icons/ai';

const prefixClassName = 'student-table-by-hannah';
const TEMP_DATA: IHannahStudent[] = [
  {
    hannahStudentId: '2c02b42d-71b9-473f-bf8f-85c3b2a34a49',
    studentId: '5c663bdd-ed07-4c47-8b6b-65bb5aa3902f',
    name: 'Nguyễn Chí Công',
    funixEmail: 'nguyenchicong@funix.edu.vn',
    funixId: 'FX24221',
    certificate: 'Chưa có chứng chỉ',
    endCertificateDate: null,
    subjectLessionLearning: 'Chưa bắt đầu học',
    supportStartDate: '2023-05-04T01:25:19.562',
    status: 1,
    progress: 0,
    contacts: [],
  },
  {
    hannahStudentId: '2ef5b6c1-6704-4a24-8ae2-35cd52665959',
    studentId: '7a5d86bb-2e21-44f3-911a-eab2942392a4',
    name: 'Nguyễn Văn A',
    funixEmail: 'abs@funix.edu.vn',
    funixId: 'FX0101',
    certificate: 'Chứng chỉ 002',
    endCertificateDate: null,
    subjectLessionLearning: 'Chưa bắt đầu học',
    supportStartDate: '2023-05-04T01:25:19.562',
    status: 1,
    progress: 0,
    contacts: [
      {
        studentId: '7a5d86bb-2e21-44f3-911a-eab2942392a4',
        studentContactId: '4ceb68f8-725b-4e22-b1b1-71b1bfe80ef6',
        contactType: 3,
        name: 'https://facebook.com/NVA',
      },
    ],
  },
];

export const StudentTableByHannah: React.FC<IStudentTableByHannahProps> = (props) => {
  const [navHidden, setNavHidden] = useState(true);
  const [contactPopup, setContactPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [editContactPopup, setEditContactPopup] = useState(false);
  const [contactDeletePending, setContactDeletePending] = useState(new Set<string>());
  const [currentStudent, setCurrentStudent] = useState<IHannahStudent | null>(null);
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
                  <th className="px-4 py-2">T.Thái</th>
                  <th className="px-4 py-2">Tiến Độ</th>
                  <th className="px-4 py-2">Liên Hệ</th>
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
                    <td className="border px-4 py-2 text-center">{getStatus(student.status)}</td>
                    <td className="border px-4 py-2 text-center">{getProgress(student.progress)}</td>
                    <td className="border px-4 py-2">
                      <div className="m-auto flex justify-center items-center gap-1">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded flex justify-center items-center gap-2 transition-[background-color]"
                          onClick={() => {
                            setCurrentStudent(student);
                            setContactPopup(true);
                          }}
                          title="Xem liên hệ"
                        >
                          <BsFillEyeFill /> Xem
                        </button>
                        <button
                          className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded text-white transition-[background-color]"
                          onClick={() => {
                            setCurrentStudent(student);
                            setEditContactPopup(true);
                          }}
                          title="Cập nhật liên hệ"
                        >
                          <AiFillPlusCircle />
                        </button>
                      </div>
                    </td>
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

            <ViewContacts popup={contactPopup} setPopup={setContactPopup} contacts={currentStudent?.contacts ?? []} />
            <EditHannahStudent
              baseInfo={{
                name: currentStudent?.name || '',
                funixId: currentStudent?.funixId || '',
                funixEmail: currentStudent?.funixEmail || '',
                status: currentStudent?.status || 1,
                progress: currentStudent?.progress || 0,
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
                  const progress = document.getElementById('progress') as HTMLSelectElement;

                  if (!name.value || !funixId.value || !funixEmail.value) {
                    return false;
                  }

                  TEMP_DATA[index].name = name.value;
                  TEMP_DATA[index].funixId = funixId.value;
                  TEMP_DATA[index].funixEmail = funixEmail.value;
                  TEMP_DATA[index].status = Number(status.value);
                  TEMP_DATA[index].progress = Number(progress.value);

                  setEditPopup(false);
                }

                return false;
              }}
            />
            <EditContact
              popup={editContactPopup}
              setPopup={setEditContactPopup}
              pendingDelete={contactDeletePending}
              setPendingDelete={setContactDeletePending}
              contacts={currentStudent?.contacts ?? []}
              callback={(event) => {
                event.preventDefault();

                return false;
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
