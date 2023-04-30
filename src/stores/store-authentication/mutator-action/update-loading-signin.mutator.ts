import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingSignin = mutatorAction('updateLoadingSignin', (loadingStatus: boolean) => {
  getStore().loadingSignin = loadingStatus;
});
