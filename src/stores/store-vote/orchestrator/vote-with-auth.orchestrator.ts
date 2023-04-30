import { orchestrator } from 'satcheljs';
import { voteWithAuthenAPI } from '../../../apis';
import { CoreUserStore } from '../../store-user';
import { voteWithAuthAction } from '../action';
import { updateErrorSignAndVoteAction, updateLoadingSignAndVoteAction, updatePostVotedAction } from '../mutator-action';

orchestrator(voteWithAuthAction, async (actionMessage) => {
  updateLoadingSignAndVoteAction(true);

  try {
    const { postId } = actionMessage;

    const { data } = await voteWithAuthenAPI(postId);

    updatePostVotedAction(data.post);

    setTimeout(() => CoreUserStore.fetchUserProfileAction(), 800);
  } catch (error) {
    if (error === 1) {
      updateErrorSignAndVoteAction('Something goes wrong!');
    }
  } finally {
    updateLoadingSignAndVoteAction(false);
  }
});
