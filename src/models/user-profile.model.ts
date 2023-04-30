import { IUploadPostResponse } from './upload-post-response.model';
import { IVoteWithAutheResponse } from './vote-with-authen-response.model';

export interface IUserProfile {
  id: string;
  thirdPartyId: string;
  method: 'ZALO' | 'FACEBOOK';
  avatar?: string;
  email?: string;
  name: string;
  role: string;
  posts?: IUploadPostResponse[];
  gaveVotes: IVoteWithAutheResponse[];
}
