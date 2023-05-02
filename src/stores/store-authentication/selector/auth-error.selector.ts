import { getStore } from '../store';

export const authErrorSelector = () => {
  return getStore().authError;
};
