import { API } from '..';

export const loginAPI = (username: string, password: string) => {
  const formData = new URLSearchParams();

  formData.append('UserName', username);
  formData.append('Password', password);

  return API.post(`/User/Auth`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    withCredentials: false,
  });
};
