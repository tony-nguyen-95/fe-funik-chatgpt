import { getStore } from '../store';

export const loadingUserSelector = () => {
  return getStore().loadingUser;
};
