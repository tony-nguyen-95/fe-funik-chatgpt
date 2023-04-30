import { action } from 'satcheljs';

export const signinFacebookAction = action('signinFacebookAction', (facebookCode: string) => {
  return { facebookCode };
});
