import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingSignAndVoteAction = mutatorAction('updateLoadingSignAndVoteAction', (loading: boolean) => {
  getStore().loadingSignAndVote = loading;
});
