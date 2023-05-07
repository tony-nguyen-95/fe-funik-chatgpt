import { IChatItem } from '../../../models/chat-item.model';

export interface IChatStore {
  chatStack: IChatItem[] | undefined;
  loadingAnswer: boolean;
}
