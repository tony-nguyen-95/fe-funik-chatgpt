import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingSignup = mutatorAction('updateLoadingSignup', (loadingStatus: boolean) => {
  getStore().loadingSignup = loadingStatus;
});
