import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateIsRegisterSuccess = mutatorAction('updateIsRegisterSuccess', (registerStatus: boolean) => {
  getStore().isRegisterSuccess = registerStatus;
});
