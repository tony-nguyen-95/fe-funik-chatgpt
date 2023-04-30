import { mutatorAction } from 'satcheljs';
import { getStore, TPage } from '../store';

export const updatePageAction = mutatorAction('updatePageAction', (page: TPage, id: string | undefined = undefined) => {
  getStore().page = page;
});
