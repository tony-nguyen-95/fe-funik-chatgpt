import { API } from '..';
import { IProfileShareLinkResponse } from '../../models';

export const fetchProfileShareLinkByIdApi = (id: string) => {
  return API.get<IProfileShareLinkResponse>(`/users/user-profile-share-link/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
