import { IUploadPostResponse } from '../../models';
import { API } from '../api';

export const uploadPostAPI = (imageFile: any, postContent: string) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('contentPost', postContent);

  return API.post<IUploadPostResponse>('/post/upload', formData, {
    headers: {
      'Access-Control-Allow-Credential': 'true',
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
    withCredentials: true,
  });
};
