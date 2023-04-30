import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingAllPostAction = mutatorAction('updateLoadingAllPostAction', (loading: boolean) => {
  getStore().loadingAllPost = loading;
});
