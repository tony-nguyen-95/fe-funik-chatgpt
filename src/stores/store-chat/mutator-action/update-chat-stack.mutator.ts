import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';
import { IChatItem } from '../../../models/chat-item.model';

export const updateChatStackAction = mutatorAction('updateChatStackAction', (chatStack: IChatItem[]) => {
  getStore().chatStack = chatStack;
});
