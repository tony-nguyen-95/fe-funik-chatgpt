import { createStore } from 'satcheljs';
import { IVoteStore } from './vote.type';

const initStore: IVoteStore = {
  postVoted: undefined,
  loadingSignAndVote: false,
  errorLoginAndVote: undefined,
  errorImageVote: undefined,
};

export const getStore = createStore('CoreVoteStore', initStore);
