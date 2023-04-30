import { orchestrator } from 'satcheljs';
// import { setApiAccessToken } from '../../../apis';
import { LocalStorageService } from '../../local-storage';
import { updateAccessTokenAction } from '../action';

orchestrator(updateAccessTokenAction, ({ accessToken }) => {
  // setApiAccessToken(accessToken);
  if (accessToken) LocalStorageService.setItem('accessToken', accessToken);
  else LocalStorageService.removeItem('accessToken');
});
