import { mutatorAction } from 'satcheljs';
import { IUploadPostResponse } from '../../../models';
import { getStore } from '../store';

export const updatePostUploadedAction = mutatorAction('updatePostUploadedAction', (post: IUploadPostResponse) => {
  getStore().postUploaded = post;
});
