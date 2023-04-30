import { API } from '../api';

export const logoutAPI = () => {
  return API.get<{ msg: string }>('/auth/logout', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
