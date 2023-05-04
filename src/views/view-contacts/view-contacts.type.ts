import React from 'react';

import { IStudentContact } from '../../models';

export interface IViewContactsProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  contacts: IStudentContact[];
}
