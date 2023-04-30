import { action } from 'satcheljs';

export const uploadlPostAction = action('uploadlPostAction', (file: any, contentPost: string) => {
  return { file, contentPost };
});
