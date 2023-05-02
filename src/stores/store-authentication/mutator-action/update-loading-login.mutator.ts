import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingLoginAction = mutatorAction('updateLoadingLoginAction', (loadingStatus: boolean) => {
  getStore().loadingLogin = loadingStatus;
});
