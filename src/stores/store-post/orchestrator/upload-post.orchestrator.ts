import { orchestrator } from 'satcheljs';
import { uploadPostAPI } from '../../../apis';
import { CorePageStore } from '../../store-page';
import { EPopUp } from '../../store-page/store';
import { uploadlPostAction } from '../action';
import { updateLoadingUploadPostAction, updatePostUploadedAction } from '../mutator-action';

orchestrator(uploadlPostAction, async (actionMessage: { file: any; contentPost: string }) => {
  const { file, contentPost } = actionMessage;

  updateLoadingUploadPostAction(true);

  try {
    const { data } = await uploadPostAPI(file, contentPost);

    updatePostUploadedAction(data);

    window.scrollTo(0, 0);
  } catch (error) {
    CorePageStore.updatePopupAction(EPopUp.ERROR_UPLOAD);
  } finally {
    updateLoadingUploadPostAction(false);
  }
});
