import { orchestrator } from 'satcheljs';
import { loginAPI } from '../../../apis';
import { loginAction, updateAccessTokenAction } from '../action';
import { updateErrorAuth, updateLoadingLoginAction } from '../mutator-action';

orchestrator(loginAction, async (actionMessage) => {
  const { username, password } = actionMessage;

  updateLoadingLoginAction(true);

  try {
    const { data } = await loginAPI(username, password);

    if (data.apiStatusCode === 0) {
      updateAccessTokenAction(data.returnData.token);
    } else {
      return updateErrorAuth(data.apiMessage);
    }
  } catch (error) {
    if (error === 1) {
      return updateErrorAuth('The Username or Password is incorrect, please try again!');
    }
  } finally {
    updateLoadingLoginAction(false);
  }
});
