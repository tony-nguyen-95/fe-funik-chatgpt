import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateErrorSignin = mutatorAction('updateErrorSignin', (errorText: string) => {
  getStore().signinError = errorText;
});
