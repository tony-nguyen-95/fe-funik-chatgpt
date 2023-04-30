import { getStore } from '../store';

export const detailPostSelector = () => {
  return getStore().detailPost;
};
