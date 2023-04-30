import { IPostListResponse } from '../../models';
import { API } from '../api';

export const loadAllPostAPI = () => {
  return API.get<IPostListResponse[]>(`/post/all`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
