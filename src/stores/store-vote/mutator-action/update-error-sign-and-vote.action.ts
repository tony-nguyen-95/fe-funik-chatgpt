import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateErrorSignAndVoteAction = mutatorAction('updateErrorSignAndVoteAction', (error: string) => {
  getStore().errorLoginAndVote = error;
});
