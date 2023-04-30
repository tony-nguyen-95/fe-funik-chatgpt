import { orchestrator } from 'satcheljs';
import { loadDetailPostAPI } from '../../../apis';
import { CorePageStore } from '../../store-page';
import { EPopUp } from '../../store-page/store';
import { fetchDetailPostAction } from '../action';
import { updateDetailPostAction } from '../mutator-action';

orchestrator(fetchDetailPostAction, async (actionMessage: { id: string }) => {
  try {
    const { id } = actionMessage;

    const { data: detailPost } = await loadDetailPostAPI(id);

    updateDetailPostAction(detailPost);
  } catch (error) {
    CorePageStore.updatePopupAction(EPopUp.ERROR_DETAIL);
  }
});
