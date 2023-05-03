import React, { useState } from 'react';
import { IStudentTableProps } from './student-table.type';
import { IStudent, IStudentContact } from '../../models';
import { v4 as uuidv4 } from 'uuid';
import { BsPencilSquare, BsFillPlusCircleFill, BsFillTrash3Fill, BsFillEyeFill } from 'react-icons/bs';
import { TbExchange } from 'react-icons/tb';

import { getStatus } from '../../utils';

import { AddStudent, ChangeHannah } from '.';
import { ViewContacts, ConfirmDelete, EditStudent } from '..';

const prefixClassName = 'student-table';
const HANNAHS = [
  {
    hannahId: uuidv4(),
    name: 'Lan Anh',
  },
  {
    hannahId: uuidv4(),
    name: 'Lan Huong',
  },
  {
    hannahId: uuidv4(),
    name: 'Tung Lam',
  },
];
const STUDENT_NAMES = ['Nguyễn Văn A', 'Nguyễn Văn B', 'Nguyễn Văn C', 'Nguyễn Văn D', 'Nguyễn Văn E'];
let FUNIXID = 101;
const TEMP_DATA: IStudent[] = [];
const CONTACTS: IStudentContact[] = [
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

// eslint-disable-next-line no-restricted-syntax
for (const name of STUDENT_NAMES) {
  const hannahId = uuidv4();
  TEMP_DATA.push({
    studentId: uuidv4(),
    name,
    funixId: `FX0${String(FUNIXID)}`,
    funixEmail: `${name.replace(/\s/g, '_').toLowerCase()}@funix.edu.vn`,
    status: 1,
    address: 'Hà Nội',
    hannahId,
  });

  HANNAHS.push({
    hannahId,
    name: `Hannah ${HANNAHS.length + 1}`,
  });
  FUNIXID += 1;
}

export const StudentTable: React.FC<IStudentTableProps> = (props) => {
  const [contactPopup, setContactPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [confirmDeletePopup, setConfirmDeletePopup] = useState(false);
  const [addPopup, setAddPopup] = useState(false);
  const [changeHannahPopup, setChangeHannahPopup] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null);

  const [idsToBeDeleted, setIdsToBeDeleted] = useState<string[]>([]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center p-5 relative">
        <table className="table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="px-4 py-2 rounded-tl-lg">Chọn</th>
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
            {TEMP_DATA.map((student) => (
              <tr key={student.studentId}>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-gray-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIdsToBeDeleted([...idsToBeDeleted, student.studentId]);
                      } else {
                        setIdsToBeDeleted(idsToBeDeleted.filter((id) => id !== student.studentId));
                      }
                    }}
                  />
                </td>
                <td className="border px-4 py-2">{student.funixId}</td>
                <td className="border px-4 py-2 font-semibold">{student.name}</td>
                <td className="border px-4 py-2">{student.funixEmail}</td>
                <td className="border px-4 py-2 max-w-xs">{student.address}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 flex justify-center items-center gap-2"
                    onClick={() => {
                      setCurrentStudent(student);
                      setContactPopup(true);
                    }}
                  >
                    <BsFillEyeFill /> Xem
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">{getStatus(student.status)}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setCurrentStudent(student);
                      setEditPopup(true);
                    }}
                    title="Chỉnh sửa"
                  >
                    <BsPencilSquare />
                  </button>
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-1"
                    onClick={() => {
                      setCurrentStudent(student);
                      setChangeHannahPopup(true);
                    }}
                    title="Thay đổi Hannah"
                  >
                    <TbExchange />
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2" />
              <td className="border px-4 py-2 flex justify-center items-center flex-col gap-1">
                <button
                  type="button"
                  className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded flex justify-center items-center gap-2"
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
                  } gap-2`}
                  onClick={() => {
                    setConfirmDeletePopup(true);
                  }}
                  disabled={idsToBeDeleted.length === 0}
                >
                  <BsFillTrash3Fill /> Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ViewContacts popup={contactPopup} setPopup={setContactPopup} contacts={CONTACTS || []} />
      <ConfirmDelete
        popup={confirmDeletePopup}
        setPopup={setConfirmDeletePopup}
        callback={() => {
          setIdsToBeDeleted((d) => {
            const newIds = [...d];
            newIds.forEach((id) => {
              const index = TEMP_DATA.findIndex((s) => s.studentId === id);
              if (index !== -1) {
                TEMP_DATA.splice(index, 1);
              }
            });

            setConfirmDeletePopup(false);

            return [];
          });
        }}
        message={`Bạn có chắc chắn muốn xóa ${idsToBeDeleted.length} học viên?`}
      />
      <EditStudent
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
          }

          setEditPopup(false);

          return false;
        }}
        baseInfo={{
          name: currentStudent?.name || '',
          funixId: currentStudent?.funixId || '',
          funixEmail: currentStudent?.funixEmail || '',
          status: currentStudent?.status || 1,
          address: currentStudent?.address || '',
        }}
      />
      <AddStudent
        popup={addPopup}
        setPopup={setAddPopup}
        callback={(event) => {
          const name = document.getElementById('a-name') as HTMLInputElement;
          const funixId = document.getElementById('a-funixId') as HTMLInputElement;
          const funixEmail = document.getElementById('a-funixEmail') as HTMLInputElement;
          const status = document.getElementById('a-status') as HTMLSelectElement;
          const address = document.getElementById('a-address') as HTMLInputElement;

          event.preventDefault();

          if (!name.value || !funixId.value || !funixEmail.value || !status.value) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return false;
          }

          const funixIdIndex = TEMP_DATA.findIndex((student) => student.funixId === funixId.value);
          const funixEmailIndex = TEMP_DATA.findIndex((student) => student.funixEmail === funixEmail.value);

          if (funixIdIndex === -1 && funixEmailIndex === -1) {
            TEMP_DATA.push({
              studentId: uuidv4(),
              name: name.value,
              funixId: funixId.value,
              funixEmail: funixEmail.value,
              status: Number(status.value),
              hannahId: '00000000-0000-0000-0000-000000000000',
              address: address.value,
            });

            setAddPopup(false);
          } else {
            funixIdIndex !== -1 ? alert('funixId đã tồn tại') : alert('funixEmail đã tồn tại');
          }

          return false;
        }}
      />
      <ChangeHannah
        popup={changeHannahPopup}
        setPopup={setChangeHannahPopup}
        callback={(event) => {
          event.preventDefault();

          const hannahId = document.getElementById('hannahId') as HTMLSelectElement;
          const startDate = document.getElementById('startDate') as HTMLInputElement;

          if (!hannahId.value || !startDate.value) {
            return false;
          }

          const index = TEMP_DATA.findIndex((student) => student.studentId === currentStudent?.studentId);
          if (index !== -1) {
            TEMP_DATA[index].hannahId = hannahId.value;
            // Do something with startDate.value

            setChangeHannahPopup(false);
          }

          return false;
        }}
        HANNAHS={HANNAHS || []}
        baseInfo={{
          hannahId: currentStudent?.hannahId || '00000000-0000-0000-0000-000000000000',
        }}
      />
    </>
  );
};
