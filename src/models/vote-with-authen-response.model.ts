import { IPostVoted } from '../stores/store-vote/store';

export interface IVoteWithAutheResponse {
  post: IPostVoted;
  id: number;
  voteDate: string;
}
