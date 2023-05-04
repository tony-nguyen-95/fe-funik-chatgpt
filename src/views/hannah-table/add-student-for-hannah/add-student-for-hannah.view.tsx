import React, { useState } from 'react';
import { IAddStudentForHannahProps } from './add-student-for-hannah.type';
import { IoMdCloseCircle } from 'react-icons/io';

const prefixClassName = 'add-student-for-hannah';

export const AddStudentForHannah: React.FC<IAddStudentForHannahProps> = (props) => {
  const { popup, setPopup, callback, students } = props;
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  return (
    <div
      className={`fixed h-screen w-screen z-[100] top-1/2 left-1/2 
	transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-900 bg-opacity-50
		${popup ? 'block' : 'hidden'}
	`}
    >
      <div className="bg-white w-[95%] md:w-auto md:min-w-[40rem] min-h-[27rem] py-5 flex flex-col justify-center items-center rounded-lg relative animate-popup">
        <div
          className="absolute top-0 w-full h-12 px-2 flex justify-between items-center border-b-2 border-gray-300
			bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-t-lg"
        >
          <h2 className="text-lg md:text-2xl font-semibold text-center text-white">Thêm Học Viên cho Hannah</h2>
          <button
            className="text-2xl text-red-500 hover:text-red-600 hover:rotate-90 transition-transform duration-300"
            onClick={() => setPopup(false)}
          >
            <IoMdCloseCircle size={40} />
          </button>
        </div>

        <form method="POST" onSubmit={callback} className="w-full min-h-[24rem] py-2 px-8 mt-12">
          <select
            name="studentIds"
            id="a-studentIds"
            className="border border-gray-300 rounded-md p-1 w-full hidden"
            multiple
          />

          <label htmlFor="a-startDate" className="text-md font-semibold">
            Ngày bắt đầu
          </label>
          <br />
          <input
            type="date"
            name="startDate"
            id="a-startDate"
            className="border border-gray-300 rounded-md p-1 w-full"
            placeholder="Nhập ngày bắt đầu"
          />
          <br />
          <br />

          <div className="w-full overflow-auto">
            <table className="table-auto drop-shadow-lg w-[60rem] xl:w-[70rem] m-auto">
              <thead>
                <tr className="text-gray-600 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 uppercase text-sm leading-normal">
                  <th className="px-4 py-2 rounded-tl-lg">Chọn</th>
                  <th className="px-4 py-2">Mã HV</th>
                  <th className="px-4 py-2">Họ Tên</th>
                  <th className="px-4 py-2 rounded-tr-lg">Email</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {students.map((student, index) => (
                  <tr
                    key={student.studentId}
                    className={`transition-[background-color] hover:text-gray-700 border-b border-gray-200  ${
                      !selectedStudents.includes(student.studentId)
                        ? index % 2 === 0
                          ? 'bg-white hover:bg-gray-100'
                          : 'bg-gray-100'
                        : ''
                    } ${selectedStudents.includes(student.studentId) ? 'bg-emerald-300 hover:bg-emerald-400' : ''}`}
                  >
                    <td
                      className={`px-4 py-2 
												${index === students.length - 1 ? 'rounded-bl-lg' : ''}`}
                    >
                      <input
                        type="checkbox"
                        value={student.studentId}
                        className="h-5 border border-gray-300 rounded-md p-1 w-full"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents((d) => {
                              const selectInput = document.getElementById('a-studentIds') as HTMLSelectElement;

                              selectInput.options[selectInput.options.length] = new Option(
                                student.studentId,
                                student.studentId,
                              );

                              selectInput.options[selectInput.options.length - 1].selected = true;

                              return [...d, student.studentId];
                            });
                          } else {
                            const selectInput = document.getElementById('a-studentIds') as HTMLSelectElement;
                            for (let i = 0; i < selectInput.options.length; i++) {
                              if (selectInput.options[i].value === student.studentId) {
                                selectInput.options[i].remove();
                              }
                            }

                            setSelectedStudents(selectedStudents.filter((id) => id !== student.studentId));
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-2">{student.studentId}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td
                      className={`px-4 py-2
											${index === students.length - 1 ? 'rounded-br-lg' : ''}
									`}
                    >
                      {student.funixEmail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="hover:shadow-md transition-shadow duration-300 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
