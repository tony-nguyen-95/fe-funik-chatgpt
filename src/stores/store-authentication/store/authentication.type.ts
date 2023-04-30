export interface IAuthenticationStore {
  accessToken: string | undefined;
  signinError: string | undefined;
  loadingSignin: boolean;
  profileLogin: { name: string; avatar?: string } | undefined;
  loadingSignup: boolean;
  isRegisterSuccess: boolean;
}
