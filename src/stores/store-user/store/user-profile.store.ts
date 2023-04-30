import { createStore } from 'satcheljs';
import { IUserProfileStore } from './user-profile.type';

const initStore: IUserProfileStore = {
  userProfile: undefined,
  loadingContact: false,
  loadingProfile: false,
  profileShareLink: undefined,
};

export const getStore = createStore('CoreUserStore', initStore);
