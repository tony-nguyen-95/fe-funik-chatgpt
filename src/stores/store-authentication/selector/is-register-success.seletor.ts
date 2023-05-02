import { getStore } from '../store';

export const isRegisterSuccessSelector = () => {
  return getStore().isRegisterSuccess;
};
