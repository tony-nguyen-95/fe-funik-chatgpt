import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IHannahTableProps } from './hannah-table.type';
import { IHannah, IStudent } from '../../models';
import { BsPencilSquare, BsFillPlusCircleFill, BsFillTrash3Fill, BsPersonFillAdd } from 'react-icons/bs';
import { ConfirmDelete } from '../confirm-delete';
import { AddHannah } from './add-hannah';
import { EditHannah } from './edit-hannah';
import { AddStudentForHannah } from './add-student-for-hannah';

const prefixClassName = 'hannah-table';

/**
 * api/Student/GetStudentNotSupport - ❌
 * api/Student/GetStudents          - ✅
 *
 * get all students, not supported students are
 * student that have hannahId = 00000000-0000-0000-0000-000000000000
 */

const TEMP_USERID = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];
const TEMP_DATA: IHannah[] = [
  {
    hannahId: '57b2752c-952f-4769-9fbd-83bf8e26f1e4',
    name: 'Lan Anh',
    email: 'lananh@funix.edu.vn',
    phoneNumber: '0982638897',
    address: 'HCM',
    totalStudentSupport: 3,
  },
];
const TEMP_NOSUPPORT_STUDENT: IStudent[] = [
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

export const HannahTable: React.FC<IHannahTableProps> = (props) => {
  const [editPopup, setEditPopup] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [addStudentPopup, setAddStudentPopup] = useState(false);
  const [currentHannah, setCurrentHannah] = useState<IHannah | null>(null);

  const [idsToBeDeleted, setIdsToBeDeleted] = useState<string[]>([]);
  return (
    <>
      <div className="w-max xl:w-full p-5 relative">
        <table className="table-auto drop-shadow-lg w-[60rem] xl:w-[70rem] m-auto">
          <thead>
            <tr className="text-gray-600 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 uppercase text-sm leading-normal">
              <th className="px-4 py-2 rounded-tl-lg">Chọn</th>
              <th className="px-4 py-2">Tên</th>
              <th className="px-4 py-2">Số ĐT</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Địa Chỉ</th>
              <th className="px-4 py-2">Học Viên</th>
              <th className="px-4 py-2 rounded-tr-lg">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {TEMP_DATA.map((hannah, index) => (
              <tr
                key={hannah.hannahId}
                className={`transition-[background-color] hover:bg-gray-200 hover:text-gray-700 ${
                  index % 2 === 0 && !idsToBeDeleted.includes(hannah.hannahId) ? 'bg-white' : 'bg-gray-100'
                }
								${idsToBeDeleted.includes(hannah.hannahId) ? 'bg-red-200 hover:bg-red-300' : ''}
								`}
              >
                <td className={`border px-4 py-2 text-center ${index === TEMP_DATA.length - 1 ? 'rounded-bl-lg' : ''}`}>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600 "
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIdsToBeDeleted([...idsToBeDeleted, hannah.hannahId]);
                      } else {
                        setIdsToBeDeleted(idsToBeDeleted.filter((id) => id !== hannah.hannahId));
                      }
                    }}
                  />
                </td>
                <td className="border px-4 py-2 font-semibold">{hannah.name}</td>
                <td className="border px-4 py-2">{hannah.phoneNumber}</td>
                <td className="border px-4 py-2">{hannah.email}</td>
                <td className="border px-4 py-2 max-w-xs">{hannah.address}</td>
                <td className="border px-4 py-2 text-center">{hannah.totalStudentSupport ?? 0}</td>
                <td
                  className={`border px-4 py-2 flex justify-center items-center ${
                    index === TEMP_DATA.length - 1 ? 'rounded-br-lg' : ''
                  }`}
                >
                  <button
                    type="button"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      idsToBeDeleted.includes(hannah.hannahId) ? 'pointer-events-none opacity-70' : ''
                    } transition-[background-color]`}
                    onClick={() => {
                      setCurrentHannah(hannah);
                      setEditPopup(true);
                    }}
                    title="Chỉnh sửa"
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    type="button"
                    className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-1 ${
                      idsToBeDeleted.includes(hannah.hannahId) ? 'pointer-events-none opacity-70' : ''
                    } transition-[background-color]`}
                    onClick={() => {
                      setCurrentHannah(hannah);
                      setAddStudentPopup(true);
                    }}
                    title="Thêm học viên"
                  >
                    <BsPersonFillAdd />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-[60rem] xl:w-[70rem] flex justify-end items-center gap-2 mt-5 mx-auto drop-shadow-md">
          <button
            type="button"
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2 transition-[background-color]"
            onClick={() => {
              setAddPopup(true);
            }}
          >
            <BsFillPlusCircleFill /> Thêm
          </button>
          <button
            type="button"
            className={`bg-red-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center ${
              idsToBeDeleted.length === 0 ? 'opacity-50' : 'hover:bg-red-700'
            } gap-2 transition-[background-color]`}
            onClick={() => {
              setConfirmDeletePopup(true);
            }}
            disabled={idsToBeDeleted.length === 0}
          >
            <BsFillTrash3Fill /> Xóa
          </button>
        </div>
      </div>

      <ConfirmDelete
        popup={confirmDeletePopup}
        setPopup={setConfirmDeletePopup}
        callback={() => {
          setIdsToBeDeleted((d) => {
            const newIds = [...d];
            newIds.forEach((id) => {
              const index = TEMP_DATA.findIndex((s) => s.hannahId === id);
              if (index !== -1) {
                TEMP_DATA.splice(index, 1);

                // dummy logic
                TEMP_USERID.push(uuidv4());
              }
            });

            setConfirmDeletePopup(false);

            return [];
          });
        }}
        message={`Bạn có chắc chắn muốn xóa ${idsToBeDeleted.length} hannah?`}
      />
      <EditHannah
        popup={editPopup}
        setPopup={setEditPopup}
        callback={(event) => {
          event.preventDefault();
          const index = TEMP_DATA.findIndex((hannah) => hannah.hannahId === currentHannah?.hannahId);
          if (index !== -1) {
            const name = document.getElementById('name') as HTMLInputElement;
            const phoneNumber = document.getElementById('phoneNumber') as HTMLInputElement;
            const email = document.getElementById('email') as HTMLInputElement;
            const address = document.getElementById('address') as HTMLInputElement;

            if (!name.value || !phoneNumber.value || !email.value) {
              return false;
            }

            TEMP_DATA[index].name = name.value;
            TEMP_DATA[index].phoneNumber = phoneNumber.value;
            TEMP_DATA[index].email = email.value;
            TEMP_DATA[index].address = address.value;
          }

          setEditPopup(false);

          return false;
        }}
        baseInfo={{
          name: currentHannah?.name || '',
          phoneNumber: currentHannah?.phoneNumber || '',
          email: currentHannah?.email || '',
          address: currentHannah?.address || '',
        }}
      />
      <AddHannah
        availableUserIds={TEMP_USERID}
        popup={addPopup}
        setPopup={setAddPopup}
        callback={(event) => {
          const userId = document.getElementById('a-userId') as HTMLInputElement;
          const name = document.getElementById('a-name') as HTMLInputElement;
          const phoneNumber = document.getElementById('a-phoneNumber') as HTMLInputElement;
          const email = document.getElementById('a-email') as HTMLInputElement;
          const address = document.getElementById('a-address') as HTMLInputElement;

          event.preventDefault();

          if (!userId.value || !name.value || !phoneNumber.value || !email.value) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return false;
          }

          const phoneNumberIndex = TEMP_DATA.findIndex((hannah) => hannah.phoneNumber === phoneNumber.value);
          const emailIndex = TEMP_DATA.findIndex((hannah) => hannah.email === email.value);

          if (phoneNumberIndex === -1 && emailIndex === -1) {
            TEMP_DATA.push({
              hannahId: uuidv4(),
              name: name.value,
              phoneNumber: phoneNumber.value,
              email: email.value,
              address: address.value,
              totalStudentSupport: 0,
            });

            // dummy logic
            TEMP_USERID.splice(TEMP_USERID.indexOf(userId.value), 1);

            setAddPopup(false);
          } else {
            phoneNumberIndex !== -1 ? alert('số điện thoại đã tồn tại') : alert('email đã tồn tại');
          }

          return false;
        }}
      />
      <AddStudentForHannah
        students={TEMP_NOSUPPORT_STUDENT}
        popup={addStudentPopup}
        setPopup={setAddStudentPopup}
        callback={(event) => {
          event.preventDefault();

          const studentIdsElement = document.getElementById('a-studentIds') as HTMLSelectElement;
          const studentIds: string[] = [];
          const startDate = document.getElementById('a-startDate') as HTMLInputElement;

          for (let i = 0; i < studentIdsElement.options.length; i++) {
            if (studentIdsElement.options[i].selected) {
              studentIds.push(studentIdsElement.options[i].value);
            }
          }

          if (studentIds.length === 0 || !startDate.value) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return false;
          }

          const index = TEMP_DATA.findIndex((hannah) => hannah.hannahId === currentHannah?.hannahId);
          if (index !== -1) {
            for (let i = studentIdsElement.options.length - 1; i >= 0; i--) {
              studentIdsElement.remove(i);
            }
            TEMP_DATA[index].totalStudentSupport += studentIds.length;

            // dummy logic
            studentIds.forEach((studentId) => {
              const studentIndex = TEMP_NOSUPPORT_STUDENT.findIndex((student) => student.studentId === studentId);
              if (studentIndex !== -1) {
                TEMP_NOSUPPORT_STUDENT.splice(studentIndex, 1);
              }
            });

            setAddStudentPopup(false);
          }

          return false;
        }}
      />
    </>
  );
};
