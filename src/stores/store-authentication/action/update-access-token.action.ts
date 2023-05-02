import { action } from 'satcheljs';

export const updateAccessTokenAction = action('updateAccessTokenAction', (accessToken: string | undefined) => ({
  accessToken,
}));
