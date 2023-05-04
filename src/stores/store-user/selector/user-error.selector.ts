import { getStore } from '../store';

export const userErrorSelector = () => {
  return getStore().userError;
};
