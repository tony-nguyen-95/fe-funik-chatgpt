import { IUserLoginResponse } from './login-response.model';

export interface IGetAllUserResponse {
  apiException: null;
  apiHttpStatus: null;
  apiMessage: string;
  apiStatusCode: 0 | 1;
  returnData: IUserLoginResponse[];
}
