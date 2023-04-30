import { orchestrator } from 'satcheljs';
import { fetchUserProfileApi } from '../../../apis';
// import { logOutAction } from '../../store-authentication/action';
import { fetchUserProfileAction } from '../action';
import { updateProfileAction } from '../mutator-action';

let isFetching = false;

orchestrator(fetchUserProfileAction, async () => {
  if (isFetching) return;
  isFetching = true;
  try {
    const { data: profile } = await fetchUserProfileApi();

    updateProfileAction(profile);
  } catch (error) {
    // logOutAction();
    // updateFetchProfileError(error);
  } finally {
    // updateIsFetchingBalance(false);
  }
  isFetching = false;
});
