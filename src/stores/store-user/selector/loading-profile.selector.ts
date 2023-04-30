import { getStore } from '../store';

export const loadingProfileSelector = () => {
  return getStore().loadingProfile;
};
