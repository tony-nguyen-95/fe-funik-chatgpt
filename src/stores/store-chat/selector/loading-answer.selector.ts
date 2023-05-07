import { getStore } from '../store';

export const loadingAnswerSelector = () => {
  return getStore().loadingAnswer;
};
