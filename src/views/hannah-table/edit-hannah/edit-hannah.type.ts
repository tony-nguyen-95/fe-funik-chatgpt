import React from 'react';

export interface IEditHannahProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
  baseInfo: {
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
  } | null;
}
