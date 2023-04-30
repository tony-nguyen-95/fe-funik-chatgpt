import { action } from 'satcheljs';

export const signinZaloAction = action('signinAction', (zaloCode: string) => {
  return { zaloCode };
});
