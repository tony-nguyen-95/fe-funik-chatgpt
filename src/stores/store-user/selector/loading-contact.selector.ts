import { getStore } from '../store';

export const loadingContactSelector = () => {
  return getStore().loadingContact;
};
