import { ISignInAndVote } from '../../models';
import { API } from '../api';

export const signinAndVoteZaloAPI = (postId: string, zaloCode: string) => {
  const formData = new URLSearchParams();
  formData.append('username', `zalo_jn2/${postId}`);
  formData.append('password', zaloCode);

  return API.post<ISignInAndVote | any>('/vote/signin-and-vote-zalo', formData, {
    headers: {
      'Access-Control-Allow-Credential': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
    withCredentials: true,
  });
};
