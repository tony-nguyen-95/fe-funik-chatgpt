import { mutator } from 'satcheljs';
import { updateAccessTokenAction } from '../action';
import { getStore } from '../store';

mutator(updateAccessTokenAction, ({ accessToken }) => {
  getStore().accessToken = accessToken;
});
