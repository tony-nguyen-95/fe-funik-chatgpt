import React from 'react';

export interface IAddStudent {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: (e: React.FormEvent<HTMLFormElement>) => void;
}
