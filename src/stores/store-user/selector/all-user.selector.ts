import { getStore } from '../store';

export const allUserSelector = () => {
  return getStore().allUser;
};
