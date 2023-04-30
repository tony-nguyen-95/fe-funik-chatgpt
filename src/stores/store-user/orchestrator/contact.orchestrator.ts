import { orchestrator } from 'satcheljs';
import { contactAPI } from '../../../apis';
import { CorePageStore } from '../../store-page';
import { EPopUp } from '../../store-page/store';
import { contactAction } from '../action';
import { updateLoadingContactAction } from '../mutator-action';

orchestrator(contactAction, async (actionMessage) => {
  updateLoadingContactAction(true);

  const { name, phoneNumber, message } = actionMessage;

  try {
    const { data } = await contactAPI(message, name, phoneNumber);

    setTimeout(() => CorePageStore.updatePopupAction(EPopUp.SUCCESS_CONTACT), 1000);
  } catch (error) {
    CorePageStore.updatePopupAction(EPopUp.ERROR_CONTACT);
  } finally {
    updateLoadingContactAction(false);
  }
});
