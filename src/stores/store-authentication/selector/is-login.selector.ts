import { userProfileSelector } from '../../store-user/selector';
import { profileLoginSelector } from './profile-login.selector';

export const isLoginSelector = () => {
  return !!profileLoginSelector() || !!userProfileSelector();
};
