import { orchestrator } from 'satcheljs';
import { fetchProfileShareLinkByIdApi } from '../../../apis';
import { CorePageStore } from '../../store-page';
import { EPopUp } from '../../store-page/store';
import { fetchProfileShareLinkAction } from '../action';
import { updateLoadingProfileAction, updateProfileShareLinkAction } from '../mutator-action';

orchestrator(fetchProfileShareLinkAction, async (actionMessage) => {
  updateLoadingProfileAction(true);

  const { profileId } = actionMessage;

  try {
    const { data: profile } = await fetchProfileShareLinkByIdApi(profileId);

    updateProfileShareLinkAction(profile);
  } catch (error) {
    CorePageStore.updatePopupAction(EPopUp.ERROR_COMMON);
  } finally {
    updateLoadingProfileAction(false);
  }
});
