import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';
import { IUserLoginResponse } from '../../../models';

export const updateAllUserAction = mutatorAction('updateAllUserAction', (users: IUserLoginResponse[]) => {
  getStore().allUser = users;
});
