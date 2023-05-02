import { createStore } from 'satcheljs';
import { LocalStorageService } from '../../local-storage';
import { IAuthenticationStore } from './authentication.type';

const initStore: IAuthenticationStore = {
  accessToken: LocalStorageService.getItem('accessToken') || undefined,
  authError: undefined,
  loadingLogin: false,
  loadingSignup: false,
  isRegisterSuccess: false,
  isLoginSuccess: false,
};

export const getStore = createStore('CoreAuthenticationStore', initStore);
