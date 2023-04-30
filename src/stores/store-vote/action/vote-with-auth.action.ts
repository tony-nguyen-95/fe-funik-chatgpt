import { action } from 'satcheljs';

export const voteWithAuthAction = action('voteWithAuthAction', (postId: string) => {
  return { postId };
});
