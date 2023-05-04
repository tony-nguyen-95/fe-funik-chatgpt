import { IUserLoginResponse } from '../../../models';

export interface IUserStore {
  allUser: IUserLoginResponse[] | undefined;
  userError: string | undefined;
  loadingUser: boolean;
}
