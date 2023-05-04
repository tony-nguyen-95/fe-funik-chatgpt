import { createStore } from 'satcheljs';
import { IUserStore } from './user.type';

const initStore: IUserStore = {
  allUser: undefined,
  userError: undefined,
  loadingUser: false,
};

export const getStore = createStore('CoreUserStore', initStore);
