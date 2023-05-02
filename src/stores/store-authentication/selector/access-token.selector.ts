import { getStore } from '../store';

export const accessTokenSelector = () => {
  return getStore().accessToken;
};
