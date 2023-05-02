import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateErrorAuth = mutatorAction('updateErrorAuth', (errorText: string) => {
  getStore().authError = errorText;
});
