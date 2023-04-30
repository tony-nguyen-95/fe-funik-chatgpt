import { getStore } from '../store';

export const languageSelector = () => {
  return getStore().language;
};
