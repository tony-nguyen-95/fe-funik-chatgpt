import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingContactAction = mutatorAction('updateLoadingContactAction', (loading: boolean) => {
  getStore().loadingContact = loading;
});
