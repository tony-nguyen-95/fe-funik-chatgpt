import { getStore } from '../store';

export const profileShareLInkSelector = () => {
  return getStore().profileShareLink;
};
