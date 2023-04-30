import { getStore } from '../store';

export const postVotedSelector = () => {
  return getStore().postVoted;
};
