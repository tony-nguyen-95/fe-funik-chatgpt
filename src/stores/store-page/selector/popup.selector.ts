import { getStore } from '../store';

export const popupSelector = () => {
  return getStore().popUpType;
};
