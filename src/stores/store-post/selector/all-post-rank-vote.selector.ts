import { getStore } from '../store';

export const allPostRankVoteSelector = () => {
  return getStore().allPostRankVote;
};
