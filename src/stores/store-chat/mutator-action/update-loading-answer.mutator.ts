import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateLoadingAnswerAction = mutatorAction('updateLoadingAnswerAction', (loadingStatus: boolean) => {
  getStore().loadingAnswer = loadingStatus;
});
