import { getStore } from '../store';

export const errorSignAndVoteSelector = () => {
  return getStore().errorLoginAndVote;
};
