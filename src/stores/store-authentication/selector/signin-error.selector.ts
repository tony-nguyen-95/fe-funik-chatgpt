import { getStore } from '../store';

export const signinErrorSelector = () => {
  return getStore().signinError;
};
