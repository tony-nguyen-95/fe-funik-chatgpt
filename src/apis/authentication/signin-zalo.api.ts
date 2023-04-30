import { ISignInZaloResponseData } from '../../models';
import { API } from '../api';

export const signinZaloAPI = (zaloCode: string) => {
  const formData = new URLSearchParams();
  formData.append('username', 'zalo_jn1');
  formData.append('password', zaloCode);

  return API.post<ISignInZaloResponseData>('/auth/login', formData, {
    headers: {
      'Access-Control-Allow-Credential': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
    withCredentials: true,
  });
};
