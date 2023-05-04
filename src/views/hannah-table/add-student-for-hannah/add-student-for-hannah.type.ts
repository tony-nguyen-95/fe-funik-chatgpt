import React from 'react';
import { IStudent } from '../../../models';

export interface IAddStudentForHannahProps {
  students: IStudent[];
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
}
