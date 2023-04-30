import { action } from 'satcheljs';

export const fetchProfileShareLinkAction = action('fetchProfileShareLinkAction', (profileId: string) => {
  return { profileId };
});
