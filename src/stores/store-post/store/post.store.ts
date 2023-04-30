import { createStore } from 'satcheljs';
import { IPostStore } from './post.type';

const initStore: IPostStore = {
  detailPost: undefined,
  loadingAllPost: false,
  allPostRankVote: undefined,
  postUploaded: undefined,
  loadingUploadPost: false,
  sortType: 'VOTES',
};

export const getStore = createStore('CorePostStore', initStore);
