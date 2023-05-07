import { getStore } from '../store';

export const chatStackSelector = () => {
  return getStore().chatStack;
};
