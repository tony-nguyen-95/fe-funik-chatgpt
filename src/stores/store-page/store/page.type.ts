export type TPage =
    | undefined
    | 'HOME'
    | 'RULE'
    | 'FORM_CONTEST'
    | 'REVIEW_FORM'
    | 'THANK_YOU'
    | 'DETAIL'
    | 'THANK_YOU_VOTE'
    | 'PROFILE'
    | 'PRIZE'
    | 'LIST_POST';

export enum EPopUp {
    LOGIN_JOURNEY1 = 'LOGIN_JOURNEY1',
    LOGIN_JOURNEY2 = 'LOGIN_JOURNEY2',
    LOGIN_EMPTY = 'LOGIN_EMPTY',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    CONTACT_FORM = 'CONTACT_FORM',
    UPLOAD_SUCCESS = 'UPLOAD_SUCCESS',
    DETAIL_VOTES = 'DETAIL_VOTES',
    ERROR_UPLOAD = 'ERROR_UPLOAD',
    SUCCESS_CONTACT = 'SUCCESS_CONTACT',
    ERROR_CONTACT = 'ERROR_CONTACT',
    WARNING_POST = 'WARNING_POST',
    ERROR_COMMON = 'ERROR_COMMON',
    ERROR_DETAIL = 'ERROR_DETAIL',
}
export interface IPageStore {
    page: TPage;
    popUpType: EPopUp | undefined;
    language: 'vi' | 'en';
}
