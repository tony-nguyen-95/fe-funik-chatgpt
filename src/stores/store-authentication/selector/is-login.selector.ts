import { accessTokenSelector } from './access-token.selector';

export const isLoginSelector = () => {
  const token = accessTokenSelector();

  return !!token;
};
