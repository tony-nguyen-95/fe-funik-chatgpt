import { API } from '..';
import { IUserProfile } from '../../models';

export const fetchUserProfileApi = () => {
  return API.get<IUserProfile>('/users/user-profile', {
    headers: {
      'Access-Control-Allow-Credential': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
    withCredentials: true,
  });
};
