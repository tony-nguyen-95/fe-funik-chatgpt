import { getStore } from '../store';

export const loadingLoginSelector = () => {
  return getStore().loadingLogin;
};
