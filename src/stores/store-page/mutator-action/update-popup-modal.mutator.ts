import { mutatorAction } from 'satcheljs';
import { EPopUp, getStore } from '../store';

export const updatePopupAction = mutatorAction('updatePopupAction', (popUpType: EPopUp | undefined) => {
  getStore().popUpType = popUpType;
});
