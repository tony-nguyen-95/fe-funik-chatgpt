import { IProfileShareLinkResponse, IUserProfile } from '../../../models';

export interface IUserProfileStore {
  userProfile: IUserProfile | undefined;
  loadingContact: boolean;
  profileShareLink: IProfileShareLinkResponse | undefined;
  loadingProfile: boolean;
}
