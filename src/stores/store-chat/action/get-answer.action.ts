import { action } from 'satcheljs';

export const getAnswerAction = action('getAnswerAction', (question: string) => {
  return { question };
});
