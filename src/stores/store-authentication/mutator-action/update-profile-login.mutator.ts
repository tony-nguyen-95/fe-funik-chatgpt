import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateProfileLogin = mutatorAction(
  'updateProfileLogin',
  (profileLogin: { name: string; avatar?: string } | undefined) => {
    getStore().profileLogin = profileLogin;
  },
);
