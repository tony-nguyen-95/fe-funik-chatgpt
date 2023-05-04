import { API } from '..';
import { ILoginResponse } from '../../models';

export const loginAPI = (username: string, password: string) => {
  const formData = new URLSearchParams();

  formData.append('UserName', username);
  formData.append('Password', password);

  return API.post<ILoginResponse>(`/User/Auth`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};
