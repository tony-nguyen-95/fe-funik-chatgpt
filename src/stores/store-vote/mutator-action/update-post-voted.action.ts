import { mutatorAction } from 'satcheljs';
import { getStore, IPostVoted } from '../store';

export const updatePostVotedAction = mutatorAction('updatePostVotedAction', (detailPost: IPostVoted | undefined) => {
  getStore().postVoted = detailPost;
});
