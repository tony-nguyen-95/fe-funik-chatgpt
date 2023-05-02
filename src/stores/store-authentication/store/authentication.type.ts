export interface IAuthenticationStore {
  accessToken: string | undefined;
  authError: string | undefined;
  loadingLogin: boolean;
  loadingSignup: boolean;
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
}
