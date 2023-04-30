import { orchestrator } from 'satcheljs';
import { signinZaloAPI } from '../../../apis';
import { signinZaloAction } from '../action';
import { updateLoadingSignin, updateProfileLogin } from '../mutator-action';
import { EPopUp } from '../../store-page/store';
import { CorePageStore } from '../../store-page';
import { CoreUserStore } from '../../store-user';

orchestrator(signinZaloAction, async (actionMessage: { zaloCode: string }) => {
  const { zaloCode } = actionMessage;

  updateLoadingSignin(true);

  try {
    const { data } = await signinZaloAPI(zaloCode);

    // updateAccessTokenAction(data.accessToken);

    await updateProfileLogin({ name: data.name, avatar: data.avatar });

    updateLoadingSignin(false);

    CorePageStore.updatePopupAction(EPopUp.LOGIN_SUCCESS);

    CoreUserStore.fetchUserProfileAction();
  } catch (error) {
    CorePageStore.updatePopupAction(EPopUp.LOGIN_ERROR);
  } finally {
    updateLoadingSignin(false);
  }
});
