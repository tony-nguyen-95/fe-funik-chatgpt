import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateImageVoteAction = mutatorAction('updateImageVoteAction', (image: string) => {
  getStore().errorImageVote = image;
});
