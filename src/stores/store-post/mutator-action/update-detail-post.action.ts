import { mutatorAction } from 'satcheljs';
import { IDetailPostResponse } from '../../../models';
import { getStore } from '../store';

export const updateDetailPostAction = mutatorAction(
  'updateDetailPostAction',
  (detailPost: IDetailPostResponse | undefined) => {
    getStore().detailPost = detailPost;
  },
);
