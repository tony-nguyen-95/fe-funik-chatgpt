import { ISignInAndVote } from '../../models';
import { API } from '../api';

export const signinAndVoteFacebookAPI = (postId: string, facebookCode: string) => {
  const formData = new URLSearchParams();
  formData.append('username', `facebook_jn2/${postId}`);
  formData.append('password', facebookCode);

  return API.post<ISignInAndVote | any>('/vote/signin-and-vote-facebook', formData, {
    headers: {
      'Access-Control-Allow-Credential': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
    withCredentials: true,
  });
};
