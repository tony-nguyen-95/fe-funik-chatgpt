import { API } from '..';
import { IGetAllUserResponse } from '../../models';

export const getAllUserAPI = () => {
  return API.get<IGetAllUserResponse>('/User/GetUsers', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
