import { API } from '../api';

export const signupAPI = (username: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  return API.post('/auth/signup', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
