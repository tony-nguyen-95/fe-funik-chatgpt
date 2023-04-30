import { orchestrator } from 'satcheljs';
import { signinAndVoteFacebookAPI, signinAndVoteZaloAPI } from '../../../apis';
import { ISignInAndVote } from '../../../models';
import { CoreAuthenticationStore } from '../../store-authentication';
import { CorePageStore } from '../../store-page';
import { EPopUp } from '../../store-page/store';
import { CoreUserStore } from '../../store-user';
import { signInAndVoteAction } from '../action';
import {
  updateErrorSignAndVoteAction,
  updateImageVoteAction,
  updateLoadingSignAndVoteAction,
  updatePostVotedAction,
} from '../mutator-action';

orchestrator(signInAndVoteAction, async (actionMessage) => {
  updateLoadingSignAndVoteAction(true);

  try {
    const { postId, code, method } = actionMessage;

    let signInAndVoteRes: ISignInAndVote;

    if (method === 'FACEBOOK') {
      const { data } = await signinAndVoteFacebookAPI(postId, code);

      if (data.status === 403) {
        CoreAuthenticationStore.updateProfileLogin({ name: data.response.name, avatar: data.response.avatar });

        // CoreAuthenticationStore.updateAccessTokenAction(data.response.accessToken);
        updateImageVoteAction(data.postImageVoted);

        CorePageStore.updatePopupAction(EPopUp.LOGIN_SUCCESS);

        return updateErrorSignAndVoteAction(`${data.message}`);
      }

      signInAndVoteRes = data;
    } else {
      const { data } = await signinAndVoteZaloAPI(postId, code);

      if (data.status === 403) {
        CoreAuthenticationStore.updateProfileLogin({ name: data.response.name, avatar: data.response.avatar });

        updateImageVoteAction(data.postImageVoted);

        // CoreAuthenticationStore.updateAccessTokenAction(data.response.accessToken);

        CorePageStore.updatePopupAction(EPopUp.LOGIN_SUCCESS);

        return updateErrorSignAndVoteAction(`${data.message}`);
      }

      signInAndVoteRes = data;
    }

    CoreAuthenticationStore.updateProfileLogin({ name: signInAndVoteRes.name, avatar: signInAndVoteRes.avatar });

    updatePostVotedAction(signInAndVoteRes.postVoted);

    // CoreAuthenticationStore.updateAccessTokenAction(signInAndVoteRes.accessToken);

    CorePageStore.updatePopupAction(EPopUp.LOGIN_SUCCESS);

    CoreUserStore.fetchUserProfileAction();
  } catch (error) {
    if (error === 1) {
      CorePageStore.updatePopupAction(EPopUp.ERROR_COMMON);
    }
  } finally {
    updateLoadingSignAndVoteAction(false);
  }
});
