import './orchestrator';
import * as CoreAuthenticationStore from './export';
import { setApiAccessToken } from '../../apis';

if (CoreAuthenticationStore.isLoginSelector()) {
  setApiAccessToken(CoreAuthenticationStore.accessTokenSelector());
}

export { CoreAuthenticationStore };
