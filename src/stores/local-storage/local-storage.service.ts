import SecureLs from 'secure-ls';
// import { updateAccessTokenAction } from '../store-authentication/action';

class LocalStorageServiceFactory {
  private static _instance: LocalStorageServiceFactory;

  public static instance(): LocalStorageServiceFactory {
    if (!this._instance) {
      this._instance = new LocalStorageServiceFactory();
    }

    return this._instance;
  }

  private _ls: SecureLs;

  private constructor() {
    this._ls = new SecureLs({
      encodingType: 'aes',
      encryptionSecret: 'abc',
    });
  }

  // * return string empty when accessToken is NOT exist
  private getEncryptedItem = <T>(key: string): T | '' | undefined => {
    try {
      return this._ls.get(key) as T;
    } catch (error) {
      //   updateAccessTokenAction(undefined);
    }
  };

  // * return string empty when accessToken is NOT exist
  private getRawItem = <T>(key: string): T | '' => {
    return JSON.parse(localStorage.getItem(key) ?? '""') as T;
  };

  private setItemWithEncrypt = <T = any>(key: string, data: T) => {
    this._ls.set(key, data);
  };

  private setRawItem = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // * return string empty when accessToken is NOT exist
  public getItem = <T = string>(key: string, encrypt: boolean = true): T | '' | undefined => {
    return encrypt ? this.getEncryptedItem<T>(key) : this.getRawItem<T>(key);
  };

  public setItem = <T = any>(key: string, data: T, encrypt: boolean = true) => {
    if (data === null) return;
    encrypt ? this.setItemWithEncrypt(key, data) : this.setRawItem(key, data);
  };

  public removeItem = (key: string) => {
    return this._ls.remove(key);
  };

  public encrypt = (data: any) => {
    return this._ls.processData(data, true);
  };
}

export const LocalStorageService = LocalStorageServiceFactory.instance();

(window as any).setEncryptData = LocalStorageService.setItem;
(window as any).getEncryptData = LocalStorageService.getItem;
