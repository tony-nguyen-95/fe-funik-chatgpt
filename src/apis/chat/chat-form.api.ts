import { API } from '..';
import { IChatResponse } from '../../models';

export const chatQuestionAPI = (question: string) => {
  const formData = new URLSearchParams();

  formData.append('Prompt', question);

  return API.post<IChatResponse>('/ChatGPT/GetAnswer', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
