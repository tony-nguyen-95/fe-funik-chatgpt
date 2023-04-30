import { IPostVoted } from '../stores/store-vote/store';

export interface ISignInAndVote {
  accessToken: string;
  name: string;
  avatar: string;
  postVoted: IPostVoted;
  postImageVoted?: string;
}
