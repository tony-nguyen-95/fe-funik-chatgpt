export interface IPostVoted {
  id: number | string;
  contentPost: string;
  imagePost: string;
  createDate: string;
}

export interface IVoteStore {
  postVoted: IPostVoted | undefined;
  loadingSignAndVote: boolean;
  errorLoginAndVote: string | undefined;
  errorImageVote: string | undefined;
}
