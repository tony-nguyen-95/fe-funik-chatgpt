import { mutatorAction } from 'satcheljs';
import { LocalStorageService } from '../../local-storage';
import { getStore } from '../store';

export const updateLanguageAction = mutatorAction('updateLanguageAction', (languageType: 'vi' | 'en') => {
  getStore().language = languageType;

  if (languageType === 'en') {
    LocalStorageService.setItem('lang', languageType);
  } else {
    LocalStorageService.removeItem('lang');
  }
});
