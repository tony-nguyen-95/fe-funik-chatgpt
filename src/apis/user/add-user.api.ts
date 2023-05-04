import { API } from '..';
import { IGetAllUserResponse } from '../../models';

export const addUserAPI = () => {
  const formData = new URLSearchParams();

  // formData.append("")
  return API.post<IGetAllUserResponse>('/User/GetUsers', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
