import { createStore } from 'satcheljs';
import { IChatStore } from './chat.type';

const initStore: IChatStore = {
  chatStack: undefined,
  loadingAnswer: false,
};

export const getStore = createStore('CoreChatStore', initStore);
