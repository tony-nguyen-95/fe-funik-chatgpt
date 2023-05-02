import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoginSuccessAction = mutatorAction('updateLoginSuccessAction', (login: boolean) => {
  getStore().isLoginSuccess = login;
});
