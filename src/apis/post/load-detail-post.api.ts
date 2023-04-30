import { IDetailPostResponse } from '../../models';
import { API } from '../api';

export const loadDetailPostAPI = (id: string) => {
  return API.get<IDetailPostResponse>(`/post/detail-with-vote/${id}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
