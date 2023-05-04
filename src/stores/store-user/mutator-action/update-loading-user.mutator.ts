import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingUserAction = mutatorAction('updateLoadingUserAction', (loadingStatus: boolean) => {
  getStore().loadingUser = loadingStatus;
});
