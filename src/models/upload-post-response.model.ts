import { IUserProfile } from './user-profile.model';

export interface IUploadPostResponse {
  id?: number;
  imagePost?: string;
  createDate?: string;
  contentPost?: string;
  user?: IUserProfile;
}
