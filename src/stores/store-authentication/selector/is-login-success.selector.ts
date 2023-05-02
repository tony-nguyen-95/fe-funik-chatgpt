import { getStore } from '../store';

export const isLoginSuccessSelector = () => {
  return getStore().isLoginSuccess;
};
