import React from 'react';

export interface IAddHannahProps {
  availableUserIds: string[];
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
}
