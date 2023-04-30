import { action } from 'satcheljs';

export const signInAndVoteAction = action(
  'signInAndVoteAction',
  (postId: string, code: string, method: 'FACEBOOK' | 'ZALO') => {
    return { postId, code, method };
  },
);
