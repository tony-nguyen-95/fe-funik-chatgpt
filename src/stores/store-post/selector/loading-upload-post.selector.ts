import { getStore } from '../store';

export const loadingUploadPostSelector = () => {
  return getStore().loadingUploadPost;
};
