export type TPage = undefined | 'HOME' | 'LOGIN';

export interface IPageStore {
  page: TPage;
  language: 'vi' | 'en';
}
