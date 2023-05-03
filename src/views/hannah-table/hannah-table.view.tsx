import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IHannahTableProps } from './hannah-table.type';
import { IHannah } from '../../models';
// import { Popup } from '../popup';

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
  return <div className="w-full flex flex-col justify-center items-start p-5">HI</div>;
};
