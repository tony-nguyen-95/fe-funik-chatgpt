import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingProfileAction = mutatorAction('updateLoadingProfileAction', (loading: boolean) => {
  getStore().loadingProfile = loading;
});
