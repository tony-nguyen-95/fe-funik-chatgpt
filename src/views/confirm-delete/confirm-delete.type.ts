import React from 'react';

export interface IConfirmDeleteProps {
  popup: boolean;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  callback: () => void;
  message: string;
}
