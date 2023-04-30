import { ISignInZaloResponseData } from '../../models';
import { API } from '../api';

export const signinFacebookAPI = (facebookCode: string) => {
  const formData = new URLSearchParams();
  formData.append('username', 'facebook_jn1');
  formData.append('password', facebookCode);

  return API.post<ISignInZaloResponseData>('/auth/login', formData, {
    headers: {
      'Access-Control-Allow-Credential': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
    withCredentials: true,
  });
};
