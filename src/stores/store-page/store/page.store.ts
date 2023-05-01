import { createStore } from 'satcheljs';
import { LocalStorageService } from '../../local-storage';
import { IPageStore } from './page.type';

const initStore: IPageStore = {
    page: undefined,
    language: LocalStorageService.getItem('lang') || 'vi',
};

export const getStore = createStore('CorePageStore', initStore);
