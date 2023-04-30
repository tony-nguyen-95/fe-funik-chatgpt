import { mutatorAction } from 'satcheljs';
import { IPostListResponse } from '../../../models';
import { getStore } from '../store';

export const updateAllPostAction = mutatorAction('updateAllPostAction', (listPost: IPostListResponse[]) => {
  const sortPost = listPost
    ?.map((convertPost) => {
      if (convertPost.numberOfVotes === null) {
        return { ...convertPost, numberOfVotes: '0' };
      }
      return convertPost;
    })
    .sort((pre, next) => {
      if (parseInt(pre.numberOfVotes, 10) > parseInt(next.numberOfVotes, 10)) {
        return -1;
      }
      return 1;
    });

  getStore().allPostRankVote = sortPost;
});
