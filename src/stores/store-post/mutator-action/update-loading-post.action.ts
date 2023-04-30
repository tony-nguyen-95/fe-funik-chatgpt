import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingUploadPostAction = mutatorAction('updateLoadingUploadPostAction', (loading: boolean) => {
  getStore().loadingUploadPost = loading;
});
