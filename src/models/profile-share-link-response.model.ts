export interface IProfileShareLinkResponse {
  id: string;
  method: 'ZALO' | 'FACEBOOK';
  avatar?: string;
  name: string;
  posts?: IPostInProfileShare[];
}

export interface IPostInProfileShare {
  id: number;
  contentPost: string;
  imagePost: string;
  createDate: string;
  receivedVotes: IReceivedVoted[];
  postStatus: PostStatus;
}

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  UNPUBLISHED = 'UNPUBLISHED',
}

export interface IReceivedVoted {
  id: number;
  voteDate: string;
}
