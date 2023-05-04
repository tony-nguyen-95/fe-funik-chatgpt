import React from 'react';

export interface IChangeHannahProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
  baseInfo: {
    hannahId: string;
  };
  HANNAHS: {
    hannahId: string;
    name: string;
  }[];
}
