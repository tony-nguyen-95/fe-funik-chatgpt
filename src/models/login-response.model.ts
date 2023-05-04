export interface ILoginResponse {
  apiException: null;
  apiHttpStatus: null;
  apiMessage: string;
  apiStatusCode: 0 | 1;
  returnData: ILoginDataResponse;
}

export interface IUserLoginResponse {
  userId: string;
  userName: string;
  password: string;
  funixId: string;
  funixEmail: string;
  isDeleted: boolean;
  loginDate: string;
  createdDate: string;
  updatedDate: string;
  hannah: boolean | null;
}
export interface ILoginDataResponse {
  user: IUserLoginResponse;
  token: string;
}
