import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateUserError = mutatorAction('updateUserError', (errorText: string) => {
  getStore().userError = errorText;
});
