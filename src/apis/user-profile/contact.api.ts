import { IContactResponse } from '../../models';
import { API } from '../api';

export const contactAPI = (name: string, phoneNumber: string, message: string) => {
  const formData = new URLSearchParams();
  formData.append('name', name);
  formData.append('phoneNumber', phoneNumber);
  formData.append('message', message);

  return API.post<IContactResponse>('/contact', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'clean-request': 'no-clean',
    },
  });
};
