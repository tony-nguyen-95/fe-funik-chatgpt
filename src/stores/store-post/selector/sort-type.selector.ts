import { getStore } from '../store';

export const sortTypeSelector = () => {
  return getStore().sortType;
};
