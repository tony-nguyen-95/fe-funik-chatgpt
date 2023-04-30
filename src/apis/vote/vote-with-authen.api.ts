import { IVoteWithAutheResponse } from '../../models';
import { API } from '../api';

export const voteWithAuthenAPI = (postId: string) => {
  return API.post<IVoteWithAutheResponse>(`/vote/post/${postId}`, {
    headers: {
      'Access-Control-Allow-Credential': 'true',
    },
    withCredentials: true,
  });
};
