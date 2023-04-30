import { action } from 'satcheljs';

export const fetchDetailPostAction = action('fetchDetailPostAction', (id: string) => {
  return { id };
});
