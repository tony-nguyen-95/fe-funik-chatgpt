import React from 'react';

export interface IEditStudent {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
  baseInfo: {
    name: string;
    funixId: string;
    funixEmail: string;
    status: number;
    address: string;
  } | null;
}
