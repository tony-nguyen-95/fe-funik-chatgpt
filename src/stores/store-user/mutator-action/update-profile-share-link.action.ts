import { mutatorAction } from 'satcheljs';
import { IProfileShareLinkResponse } from '../../../models';
import { getStore } from '../store';

export const updateProfileShareLinkAction = mutatorAction(
  'updateProfileShareLinkAction',
  (profile: IProfileShareLinkResponse | undefined) => {
    getStore().profileShareLink = profile;
  },
);
