import { getStore } from '../store';

export const loadingSigninSelector = () => {
  return getStore().loadingSignin;
};
