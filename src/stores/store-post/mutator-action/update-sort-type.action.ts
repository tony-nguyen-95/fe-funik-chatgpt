import { mutatorAction } from 'satcheljs';
import { getStore } from '../store';

export const updateSortTypeAction = mutatorAction('updateSortTypeAction', (sortType: 'VOTES' | 'NEWEST') => {
  getStore().sortType = sortType;
});
