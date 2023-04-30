import { mutatorAction } from 'satcheljs';
import { IUserProfile } from '../../../models';
import { getStore } from '../store';

export const updateProfileAction = mutatorAction('updateProfileAction', (profile: IUserProfile | undefined) => {
  getStore().userProfile = profile;
});
