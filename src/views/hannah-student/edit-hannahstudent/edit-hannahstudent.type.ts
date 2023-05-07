import React from 'react';

export interface IEditHannahStudent {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
  baseInfo: {
    name: string;
    funixId: string;
    funixEmail: string;
    status: number;
    progress: number;
  } | null;
}
