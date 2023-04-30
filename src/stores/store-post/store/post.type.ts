import { IDetailPostResponse, IPostListResponse, IUploadPostResponse } from '../../../models';

export interface IPostStore {
  detailPost: IDetailPostResponse | undefined;
  loadingAllPost: boolean;
  allPostRankVote: IPostListResponse[] | undefined;
  postUploaded: IUploadPostResponse | undefined;
  loadingUploadPost: boolean;
  sortType: 'VOTES' | 'NEWEST';
}
