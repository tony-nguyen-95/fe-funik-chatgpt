import { orchestrator } from 'satcheljs';
// import { logoutAPI } from '../../../apis';
import { logOutAction } from '../action';
// import { updateProfileLogin } from '../mutator-action';

orchestrator(logOutAction, async () => {
  try {
    // const { data } = await logoutAPI();
    // CoreUserStore.updateProfileAction(undefined);
    // updateProfileLogin(undefined);
  } catch (error) {
    console.log(error);
  }
});
