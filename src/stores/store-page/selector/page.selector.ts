import { getStore, TPage } from '../store';

export const pageSelector = (): TPage => {
  return getStore().page;
};
