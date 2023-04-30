import { getStore } from '../store';

export const loadingAllPostSelector = () => {
  return getStore().loadingAllPost;
};
