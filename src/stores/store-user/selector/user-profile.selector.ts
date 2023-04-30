import { getStore } from '../store';

export const userProfileSelector = () => {
  return getStore().userProfile;
};
