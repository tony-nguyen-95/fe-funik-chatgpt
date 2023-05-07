import React from 'react';
import { IStudentContact } from '../../../models';

export interface IChangeCertificateProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
  contacts: IStudentContact[];
  pendingDelete: Set<string>;
  setPendingDelete: React.Dispatch<React.SetStateAction<Set<string>>>;
}
