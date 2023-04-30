import { action } from 'satcheljs';

export const contactAction = action('contactAction', (name: string, phoneNumber: string, message: string) => {
  return { name, phoneNumber, message };
});
