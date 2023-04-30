import { action } from 'satcheljs';

export const logOutAction = action('logOutAction', (redirectUrl?: string) => {
  return { redirectUrl };
});
