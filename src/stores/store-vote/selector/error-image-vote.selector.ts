import { getStore } from '../store';

export const errorImageVoteSelector = () => {
  return getStore().errorImageVote;
};
