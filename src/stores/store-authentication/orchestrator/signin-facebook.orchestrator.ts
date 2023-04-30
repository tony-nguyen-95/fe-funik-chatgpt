import { orchestrator } from 'satcheljs';
import { signinFacebookAPI } from '../../../apis';
import { CorePageStore } from '../../store-page';
import { EPopUp } from '../../store-page/store';
import { CoreUserStore } from '../../store-user';
import { signinFacebookAction } from '../action';
import { updateErrorSignin, updateLoadingSignin, updateProfileLogin } from '../mutator-action';

orchestrator(signinFacebookAction, async (actionMessage: { facebookCode: string }) => {
  const { facebookCode } = actionMessage;

  updateLoadingSignin(true);

  try {
    const { data } = await signinFacebookAPI(facebookCode);

    updateProfileLogin({ name: data.name, avatar: data.avatar });

    updateLoadingSignin(false);

    CorePageStore.updatePopupAction(EPopUp.LOGIN_SUCCESS);

    CoreUserStore.fetchUserProfileAction();
  } catch (error) {
    if (error === 1) {
      return updateErrorSignin('The Username or Password is incorrect, please try again!');
    }
    updateErrorSignin('Something goes wrong!');
  }
});
