import { action } from 'satcheljs';
import { ILoginForm } from '../../../models';

export const loginAction = action('loginAction', ({ username, password }: ILoginForm) => {
  return { username, password };
});
