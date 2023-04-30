import { getStore } from '../store';

export const profileLoginSelector = () => {
  return getStore().profileLogin;
};
