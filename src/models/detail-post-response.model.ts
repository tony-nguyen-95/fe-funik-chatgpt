export interface IDetailPostResponse {
  postId: number;
  contentPost: string;
  imagePost: string;
  createDate: string;
  avatar: string;
  name: string;
  votes: Array<IVote>;
}

export interface IVote {
  userIdVoted: string;
  name: string;
  voteDate: string;
  voteId: number;
  avatar: string;
  voteStatus: '' | 'UNCOUNTED';
}
