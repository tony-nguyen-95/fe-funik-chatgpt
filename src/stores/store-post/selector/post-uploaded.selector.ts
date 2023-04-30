import { getStore } from '../store';

export const postUploadedSelector = () => {
  return getStore().postUploaded;
};
