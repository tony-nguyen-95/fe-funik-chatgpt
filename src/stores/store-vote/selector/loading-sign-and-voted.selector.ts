import { getStore } from '../store';

export const loadingSignAndVoteSelector = () => {
  return getStore().loadingSignAndVote;
};
