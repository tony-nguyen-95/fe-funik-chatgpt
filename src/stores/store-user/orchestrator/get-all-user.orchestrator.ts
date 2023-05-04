import { orchestrator } from 'satcheljs';
import { getAllUserAPI } from '../../../apis';
import { getAllUserAction } from '../action';
import { updateAllUserAction, updateLoadingUserAction, updateUserError } from '../mutator-action';

orchestrator(getAllUserAction, async () => {
  updateLoadingUserAction(true);

  try {
    const { data } = await getAllUserAPI();

    if (data.apiStatusCode === 0) {
      updateAllUserAction(data.returnData);
    } else {
      return updateUserError(data.apiMessage);
    }
  } catch (error) {
    if (error === 1) {
      return updateUserError('Something goes wrong!');
    }
  } finally {
    updateLoadingUserAction(false);
  }
});
